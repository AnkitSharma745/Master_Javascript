import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { parseNewIssue, type Issue } from "../../labs/contracts.js";

class HttpError extends Error {
  constructor(readonly status: number, readonly code: string, message: string) { super(message); }
}

async function jsonBody(request: IncomingMessage, maximum: number): Promise<unknown> {
  const contentType = request.headers["content-type"]?.split(";")[0]?.trim().toLowerCase();
  if (contentType !== "application/json") throw new HttpError(415, "MEDIA_TYPE", "Use application/json");
  if (Number(request.headers["content-length"]) > maximum) {
    throw new HttpError(413, "BODY_LIMIT", "Request body too large");
  }
  const chunks: Buffer[] = [];
  let bytes = 0;
  for await (const chunk of request.iterator({ destroyOnReturn: false })) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk as string);
    bytes += buffer.length;
    if (bytes > maximum) throw new HttpError(413, "BODY_LIMIT", "Request body too large");
    chunks.push(buffer);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown; }
  catch { throw new HttpError(400, "JSON", "Malformed JSON"); }
}

type LogEntry = { requestId: string; method: string; status: number; durationMs: number };
type Options = { now?: () => number; maxRecords?: number; maxIdempotency?: number;
  idempotencyTtlMs?: number; maxBodyBytes?: number; log?: (entry: LogEntry) => void | Promise<void> };

export function createIssueServer(options: Options = {}) {
  const now = options.now ?? Date.now;
  const maxRecords = options.maxRecords ?? 500;
  const maxIdempotency = options.maxIdempotency ?? 100;
  const ttl = options.idempotencyTtlMs ?? 60_000;
  const maxBody = options.maxBodyBytes ?? 1024;
  for (const value of [maxRecords, maxIdempotency, maxBody]) {
    if (!Number.isInteger(value) || value < 1) throw new TypeError("Invalid server limit");
  }
  if (!Number.isFinite(ttl) || ttl <= 0) throw new TypeError("Invalid TTL");
  const issues: Issue[] = [];
  const keys = new Map<string, { title: string; issue: Issue; expires: number }>();
  const assets = new Map<string, { filename: string; type: string }>([
    ["/", { filename: "index.html", type: "text/html; charset=utf-8" }],
    ["/client.js", { filename: "client.js", type: "text/javascript; charset=utf-8" }],
    ["/styles.css", { filename: "styles.css", type: "text/css; charset=utf-8" }]
  ]);
  const server = createServer((request, response) => {
    void handle(request, response).catch(() => { response.destroy(); });
  });
  server.headersTimeout = 10_000;
  server.requestTimeout = 15_000;

  async function handle(request: IncomingMessage, response: ServerResponse): Promise<void> {
    const requestId = randomUUID();
    const started = performance.now();
    response.setHeader("X-Request-ID", requestId);
    response.setHeader("Cache-Control", "no-store");
    response.setHeader("X-Content-Type-Options", "nosniff");
    response.setHeader("Content-Security-Policy", "default-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'");
    const send = (status: number, body: unknown) => {
      response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
      response.end(JSON.stringify(body));
    };
    try {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : 3000;
      const hosts = new Set([`127.0.0.1:${port}`, `localhost:${port}`]);
      if (!hosts.has(request.headers.host ?? "")) throw new HttpError(403, "HOST", "Unexpected host");
      const origin = request.headers.origin;
      if (origin && !hosts.has(origin.replace(/^http:\/\//, ""))) {
        throw new HttpError(403, "ORIGIN", "Unexpected origin");
      }
      const url = new URL(request.url ?? "/", `http://127.0.0.1:${port}`);
      if (request.method === "GET" && assets.has(url.pathname)) {
        const asset = assets.get(url.pathname)!;
        const data = await readFile(resolve(__dirname, "../../../projects/issue-board/public", asset.filename));
        response.writeHead(200, { "Content-Type": asset.type });
        response.end(data);
        return;
      }
      if (url.pathname !== "/api/issues") throw new HttpError(404, "NOT_FOUND", "Not found");
      if (request.method === "GET") {
        const rawLimit = url.searchParams.get("limit") ?? "50";
        if (!/^\d+$/.test(rawLimit)) throw new HttpError(400, "LIMIT", "Limit must be an integer from 1 to 50");
        const limit = Number(rawLimit);
        const query = url.searchParams.get("q") ?? "";
        if (limit < 1 || limit > 50 || query.length > 120) throw new HttpError(400, "QUERY", "Invalid query or limit");
        const matches = issues.filter(issue => issue.title.toLowerCase().includes(query.toLowerCase()));
        send(200, matches.slice(0, limit));
        return;
      }
      if (request.method !== "POST") {
        response.setHeader("Allow", "GET, POST");
        throw new HttpError(405, "METHOD", "Method not allowed");
      }
      let title: string;
      try { title = parseNewIssue(await jsonBody(request, maxBody)).title; }
      catch (error) {
        if (error instanceof HttpError) throw error;
        if (error instanceof TypeError) throw new HttpError(400, "VALIDATION", error.message);
        throw error;
      }
      const rawKey = request.headers["idempotency-key"];
      if (rawKey !== undefined && (typeof rawKey !== "string" || !/^[A-Za-z0-9_-]{1,80}$/.test(rawKey))) {
        throw new HttpError(400, "KEY", "Invalid idempotency key");
      }
      for (const [key, record] of keys) if (record.expires <= now()) keys.delete(key);
      const key = typeof rawKey === "string" ? rawKey : undefined;
      const previous = key ? keys.get(key) : undefined;
      if (previous) {
        if (previous.title !== title) throw new HttpError(409, "KEY_CONFLICT", "Key reused with different title");
        send(201, previous.issue);
        return;
      }
      if (issues.length >= maxRecords) throw new HttpError(503, "CAPACITY", "Demo storage full");
      // No await between key check and creation: atomic only in this one process.
      const issue: Issue = { id: randomUUID(), title, status: "open" };
      issues.push(issue);
      if (key) {
        keys.set(key, { title, issue, expires: now() + ttl });
        while (keys.size > maxIdempotency) keys.delete(keys.keys().next().value!);
      }
      send(201, issue);
    } catch (error) {
      request.resume(); // Drain remaining input; retained buffers stay bounded.
      response.setHeader("Connection", "close");
      const known = error instanceof HttpError;
      send(known ? error.status : 500, { error: {
        code: known ? error.code : "INTERNAL",
        message: known ? error.message : "Unexpected server error",
        requestId
      }});
    } finally {
      // Logging failure must not change an already-written operation result.
      try { void Promise.resolve(options.log?.({ requestId, method: request.method ?? "", status: response.statusCode,
        durationMs: performance.now() - started })).catch(() => {}); } catch { /* Isolated logging sink. */ }
    }
  }
  return server;
}

if (require.main === module) {
  const server = createIssueServer({ log: entry => console.log(JSON.stringify(entry)) });
  server.listen(3000, "127.0.0.1", () => console.log("Issue board: http://127.0.0.1:3000"));
  let stopping = false;
  const stop = () => {
    if (stopping) return;
    stopping = true;
    const deadline = setTimeout(() => { server.closeAllConnections(); }, 5000);
    deadline.unref();
    server.close(() => { clearTimeout(deadline); });
  };
  process.on("SIGTERM", stop);
  process.on("SIGINT", stop);
}

# Production Node.js

> In this document you will learn what it takes to run a Node.js service safely in production: configuration, structured logging, health checks, graceful shutdown, Docker images, security hardening (including rate limiting algorithms), performance profiling, memory leaks, observability and zero-downtime deployments. Senior backend interviews often end with "How would you run this in production?" — this document gives you a complete answer.

**Before this:** [HTTP servers and Express](06-http-servers-and-express.md) · [Validation and error handling](08-validation-and-error-handling.md) · [Concurrency, worker threads and cluster](12-concurrency-worker-threads-and-cluster.md) · **Interview questions:** [jump to the interview section](#interview-questions)

## Table of contents

1. [What production-ready means](#what-production-ready-means)
2. [Configuration and secrets](#configuration-and-secrets)
3. [Structured logging](#structured-logging)
4. [Health checks: liveness and readiness](#health-checks-liveness-and-readiness)
5. [Graceful shutdown](#graceful-shutdown)
6. [Process managers and containers](#process-managers-and-containers)
7. [Docker for Node.js](#docker-for-nodejs)
8. [Security hardening](#security-hardening)
9. [Rate limiting](#rate-limiting)
10. [Performance: profiling, memory and connections](#performance-profiling-memory-and-connections)
11. [Observability: metrics and tracing](#observability-metrics-and-tracing)
12. [Deployment options](#deployment-options)
13. [Zero-downtime deployments](#zero-downtime-deployments)
14. [Production checklist](#production-checklist)
15. [How to explain this in an interview](#how-to-explain-this-in-an-interview)
16. [Interview questions](#interview-questions)
17. [Summary](#summary)
18. [References](#references)

---

## What production-ready means

Code that "works on my machine" is not production-ready. In production your service must also:

- **Start correctly** with the right configuration, or refuse to start with a clear error.
- **Tell you what it is doing** (logs, metrics, traces) so you can debug problems you did not expect.
- **Tell the platform whether it is healthy**, so traffic goes only to working instances.
- **Stop cleanly**, without dropping requests during deploys.
- **Survive bad input and attacks** (huge bodies, slow clients, brute force, injection).
- **Stay fast and stable** under load, without memory leaks.
- **Deploy without downtime** and roll back quickly.

The rest of this document goes through these one by one. Many examples use Express; the ideas apply to Fastify, NestJS and plain `http` too.

---

## Configuration and secrets

### The twelve-factor rule

The **Twelve-Factor App** is a well-known set of rules for cloud services. Its config rule: **store configuration in the environment**, not in the code. The same build artifact (Docker image) runs in development, staging and production; only environment variables change.

Configuration is everything that differs between environments: database URLs, API keys, ports, log levels, feature flags. Code is everything that does not.

```ts
// ❌ Wrong: hard-coded, different per environment, secret in git
const db = new Pool({ connectionString: "postgres://admin:SuperSecret@prod-db:5432/shop" });

// ✅ Correct: read from the environment
const db = new Pool({ connectionString: process.env.DATABASE_URL });
```

### Validate configuration at startup

`process.env` values are always strings (or `undefined`). A typo in a variable name or a missing secret should stop the app **at startup**, not cause a strange error at 3 a.m. when the first payment runs. Validate once, convert types, and export a typed, frozen object.

```ts
// config.ts
import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]).default("info"),
});

export type Config = z.infer<typeof EnvSchema>;

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Readonly<Config> {
  const result = EnvSchema.safeParse(env);
  if (!result.success) {
    const problems = result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`);
    // Do not print the values: they may be secrets.
    throw new Error(`Invalid configuration:\n  ${problems.join("\n  ")}`);
  }
  return Object.freeze(result.data);
}

export const config = loadConfig();
```

What happens with bad and good input (tested with Zod 4):

```js
loadConfig({ PORT: "abc", DATABASE_URL: "not-a-url", JWT_SECRET: "short" });
// Error: Invalid configuration:
//   PORT: Invalid input: expected number, received NaN
//   DATABASE_URL: Invalid URL
//   JWT_SECRET: Too small: expected string to have >=32 characters

const cfg = loadConfig({ PORT: "8080", DATABASE_URL: "postgres://app@db:5432/shop", JWT_SECRET: "x".repeat(40) });
console.log(cfg.PORT, typeof cfg.PORT, cfg.NODE_ENV, cfg.LOG_LEVEL); // 8080 number development info
```

The rest of the code imports `config` and never touches `process.env` directly. This gives you one place to see every setting, correct types, and fail-fast behavior.

### Loading `.env` files

For local development, people keep variables in a `.env` file. Modern Node.js can load it without the `dotenv` package:

```bash
node --env-file=.env dist/server.js
node --env-file-if-exists=.env.local --env-file=.env dist/server.js
```

Or from code: `process.loadEnvFile(".env")`.

> **Version note:** `--env-file` was added in Node.js 20.6, `process.loadEnvFile()` in 21.7 / 20.12, and `--env-file-if-exists` in 22.9. They were marked stable (no longer experimental) in Node.js 24.10 and 22.21. Variables already set in the real environment win over values from the file.

Rules:

- **Never commit `.env` files with real secrets.** Commit a `.env.example` with fake values and add `.env` to `.gitignore`.
- In production, do not ship `.env` files inside the image. Let the platform inject variables.

### Secrets

**Secrets** are config values that give access: database passwords, API keys, JWT signing keys, private keys.

- Store them in a **secret manager** (AWS Secrets Manager, Google Secret Manager, Azure Key Vault, HashiCorp Vault) or the platform's secret store (Kubernetes Secrets, ideally encrypted at rest).
- Inject them as environment variables or mounted files at runtime. Never bake them into the Docker image.
- **Rotate** them regularly and after any leak. Design the app to accept two valid keys during a rotation (for example, verify JWTs with the old and new key).
- Never log them. Redact them in logs and error messages.
- Give each service its own credentials with the least privileges it needs.

More in [Authentication and authorization](../07-nodejs-backend/09-authentication-and-authorization.md).

### `NODE_ENV`

`NODE_ENV=production` is a convention. Express and many libraries use it to turn on caching of view templates, less verbose errors and other optimizations. Set it in production. But do not use `NODE_ENV` for *your* environment names (staging vs production); use a separate variable like `APP_ENV`, because staging should run with `NODE_ENV=production` too.

---

## Structured logging

### Why structured logs

In production you search logs from many instances in a tool like Elasticsearch/OpenSearch, Grafana Loki, Datadog or CloudWatch. Plain text like `User 42 placed order 1001` is hard to search and filter. **Structured logs** are JSON objects with fixed fields:

```json
{"level":30,"time":1792324800000,"service":"orders-api","requestId":"3f2c...","userId":"42","orderId":"1001","msg":"order placed"}
```

Now you can search `orderId:1001` or "all errors for requestId 3f2c…" across every instance.

### pino

**pino** is the most widely used fast JSON logger for Node.js (Fastify uses it by default). It writes JSON lines to standard output.

```ts
// logger.ts
import { pino } from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  base: { service: "orders-api", version: process.env.APP_VERSION }, // added to every line
  redact: {
    paths: ["req.headers.authorization", "req.headers.cookie", "*.password", "*.token"],
    censor: "[REDACTED]",
  },
});

logger.info({ orderId: "1001", totalCents: 4599 }, "order placed");
logger.warn({ attempt: 3 }, "payment provider slow, retrying");
logger.error({ err: new Error("connection refused") }, "could not reach database");

// A child logger adds fields to every line it writes
const paymentLogger = logger.child({ module: "payments" });
paymentLogger.info("refund issued");
```

Log levels (from most to least severe): `fatal`, `error`, `warn`, `info`, `debug`, `trace`. Use `info` in production by default and switch to `debug` temporarily when you investigate.

| Level | Use for |
| --- | --- |
| `fatal` | The process cannot continue (right before exit) |
| `error` | A request or job failed and needs attention |
| `warn` | Something unusual but handled (retry, fallback, slow dependency) |
| `info` | Important business and lifecycle events (server started, order placed) |
| `debug` | Details for investigating problems |
| `trace` | Very detailed internals |

Rules:

- **Log to stdout.** Do not write log files from the app in containers. The platform collects stdout and ships it. (This is another twelve-factor rule: treat logs as event streams.)
- **Do not use `pino-pretty` in production.** Pretty printing is for local development (`node app.js | pino-pretty`).
- **Never log secrets or personal data** (passwords, tokens, full card numbers, sometimes emails). Use `redact`.
- **Log errors with the `err` key** so pino serializes the message and stack.
- **Avoid `console.log` in production code.** It is synchronous when writing to files and terminals, has no levels, and is not structured.

### Request IDs and correlation IDs

A **request ID** (or correlation ID) is a unique ID for one incoming request. Put it in every log line for that request, return it in a response header, and pass it to downstream services. When a user reports an error, they give you the ID from the error response, and you find every log line of that request across services.

The hard part: how does a function deep in your code (a repository, a payment client) know the current request ID, without passing it as a parameter everywhere? Answer: **`AsyncLocalStorage`**.

### `AsyncLocalStorage`

`AsyncLocalStorage` (from `node:async_hooks`, stable since Node.js 16.4) stores a value that follows the **async context**: everything that runs inside `als.run(store, fn)` — including code after `await`, timers and promise callbacks started there — sees the same store. It works like a thread-local variable, but for async flows.

```js
import { AsyncLocalStorage } from "node:async_hooks";

const requestContext = new AsyncLocalStorage();

function log(message) {
  const ctx = requestContext.getStore();
  console.log(JSON.stringify({ msg: message, requestId: ctx?.requestId ?? null }));
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function loadOrders() {
  await sleep(10);
  log("orders loaded"); // no requestId parameter, but it still knows the request
}

async function handleRequest(requestId, delay) {
  return requestContext.run({ requestId }, async () => {
    log("request started");
    await sleep(delay);
    await loadOrders();
  });
}

await Promise.all([handleRequest("req-A", 20), handleRequest("req-B", 5)]);
log("outside any request");
```

Output:

```text
{"msg":"request started","requestId":"req-A"}
{"msg":"request started","requestId":"req-B"}
{"msg":"orders loaded","requestId":"req-B"}
{"msg":"orders loaded","requestId":"req-A"}
{"msg":"outside any request","requestId":null}
```

The two requests are interleaved on the same thread, yet each log line has the correct ID. Outside `run()`, `getStore()` returns `undefined`.

### Putting it together in Express

```ts
import express from "express";
import { randomUUID } from "node:crypto";
import { AsyncLocalStorage } from "node:async_hooks";
import { pino } from "pino";
import { pinoHttp } from "pino-http";

export const requestContext = new AsyncLocalStorage<{ requestId: string; userId?: string }>();

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  // mixin() runs for every log line: add the current request context automatically
  mixin() {
    return requestContext.getStore() ?? {};
  },
});

const app = express();

// 1. Create or accept a request ID and start the async context
app.use((req, res, next) => {
  const incoming = req.get("x-request-id");
  // Accept an upstream ID only if it looks safe; otherwise create one
  const requestId = incoming && /^[\w-]{1,64}$/.test(incoming) ? incoming : randomUUID();
  res.setHeader("x-request-id", requestId);
  requestContext.run({ requestId }, next);
});

// 2. Log every request and response (method, URL, status, duration)
app.use(
  pinoHttp({
    logger,
    genReqId: (_req, res) => String(res.getHeader("x-request-id")),
    autoLogging: { ignore: (req) => req.url === "/healthz" }, // do not flood logs with probes
  }),
);
```

Now `logger.info("order placed")` anywhere in the request's async flow includes `requestId`. When you call another service, forward the header: `fetch(url, { headers: { "x-request-id": requestContext.getStore()?.requestId ?? "" } })`. With OpenTelemetry tracing (later), the trace ID plays the same role across services.

The broader topic of logs, metrics and traces is in Production Node.js.

---

## Health checks: liveness and readiness

Load balancers and orchestrators (Kubernetes, ECS) call health endpoints to decide what to do with an instance. There are two different questions, so use two endpoints.

| Check | Question | If it fails | Should check |
| --- | --- | --- | --- |
| **Liveness** (`/healthz`, `/livez`) | "Is the process alive and not stuck?" | The platform **restarts** the container | Only the process itself. Keep it trivial. |
| **Readiness** (`/readyz`) | "Can this instance serve traffic right now?" | The platform **stops sending traffic** to it (no restart) | Critical dependencies (database reachable), warm-up done, not shutting down |
| **Startup** (Kubernetes `startupProbe`) | "Has the app finished starting?" | Liveness checks wait until it succeeds | Same as readiness, for slow starters |

```mermaid
flowchart TD
    L["Liveness probe<br/>GET /healthz"] -->|"200"| L1["Keep running"]
    L -->|"fails N times"| L2["Restart the container"]
    R["Readiness probe<br/>GET /readyz"] -->|"200"| R1["Send traffic to this instance"]
    R -->|"503"| R2["Remove from load balancer<br/>no restart"]
```

```ts
let shuttingDown = false;

// Liveness: if the event loop can answer this, the process is alive.
app.get("/healthz", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// Readiness: can we do useful work?
app.get("/readyz", async (_req, res) => {
  if (shuttingDown) return res.status(503).json({ status: "shutting_down" });
  try {
    await withTimeout(db.query("SELECT 1"), 1_000);
    res.status(200).json({ status: "ready" });
  } catch {
    res.status(503).json({ status: "not_ready" });
  }
});

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), ms)),
  ]);
}
```

### The big mistake: checking dependencies in liveness

If the liveness check queries the database, a short database outage makes **every** instance fail liveness. The platform restarts all of them at once. They come back, the database is still down, they fail again — a restart loop that makes recovery slower. The database problem is not fixed by restarting Node.js. So: **liveness = process only; readiness = dependencies.**

Also be careful with readiness: if *all* instances become "not ready" because of one shared dependency, the load balancer has nowhere to send traffic. For non-critical dependencies (a recommendations service), do not fail readiness; degrade the feature instead.

Kubernetes example:

```yaml
livenessProbe:
  httpGet: { path: /healthz, port: 3000 }
  periodSeconds: 10
  failureThreshold: 3
readinessProbe:
  httpGet: { path: /readyz, port: 3000 }
  periodSeconds: 5
  failureThreshold: 2
```

---

## Graceful shutdown

### Why it matters

Your process is stopped often: every deploy, every scale-down, every node maintenance. If it simply dies, the requests in progress fail, database transactions are cut, and jobs are half done. A **graceful shutdown** finishes current work before exiting.

### What happens on a deploy

When Kubernetes (or Docker, ECS, systemd) stops a container, it sends **`SIGTERM`**. It waits for a grace period (Kubernetes default: 30 seconds). If the process is still running, it sends **`SIGKILL`**, which cannot be caught.

```mermaid
sequenceDiagram
    participant K as Orchestrator
    participant N as Node.js process
    participant LB as Load balancer
    K->>N: SIGTERM
    N->>N: mark not ready, readyz returns 503
    K->>LB: remove instance from endpoints
    N->>N: server.close() - no new connections
    N->>N: finish in-flight requests
    N->>N: stop workers, close DB pool and Redis
    N-->>K: exit code 0
    Note over K,N: If still running after the grace period, SIGKILL
```

### Code

```ts
import http from "node:http";
import { once } from "node:events";

const server = http.createServer(app);
server.listen(config.PORT);

let shuttingDown = false;

async function shutdown(signal: string) {
  if (shuttingDown) return; // ignore a second signal
  shuttingDown = true;      // readiness now returns 503
  logger.info({ signal }, "shutdown started");

  // Safety net: if connections do not finish in time, close them by force.
  const forceTimer = setTimeout(() => {
    logger.warn("forcing remaining connections closed");
    server.closeAllConnections();
  }, 20_000);
  forceTimer.unref(); // this timer alone must not keep the process alive

  try {
    // 1. Stop accepting new connections; wait for in-flight requests to finish.
    server.close();
    await once(server, "close");

    // 2. Stop background work and close resources, in reverse order of creation.
    await emailWorker.close();
    await redis.close();
    await db.end();

    logger.info("shutdown complete");
    process.exitCode = 0;
  } catch (err) {
    logger.error({ err }, "error during shutdown");
    process.exitCode = 1;
  } finally {
    clearTimeout(forceTimer);
  }
}

process.on("SIGTERM", () => void shutdown("SIGTERM"));
process.on("SIGINT", () => void shutdown("SIGINT")); // Ctrl+C in development
```

I tested the core behavior with a request that takes 1 second, starting shutdown 100 ms after it began:

```text
SIGTERM received: stop accepting new connections
new request after close(): error ECONNREFUSED
all connections closed
cleanup done, exit code 0
in-flight request: 200 slow done
```

The new connection was refused, and the request already in progress completed with `200`.

Details that matter:

- **`server.close()`** stops accepting new connections and calls back when all connections are closed. Since Node.js 19, it also closes **idle** keep-alive connections right away. Before that, idle keep-alive sockets could keep the server open until they timed out.
- **`server.closeAllConnections()`** (Node.js 18.2+) closes every connection, including active ones. Use it only as the last step after a timeout.
- **`server.closeIdleConnections()`** (Node.js 18.2+) closes only keep-alive sockets that have no active request. You can call it again during shutdown for connections that became idle after `close()`.
- Set `process.exitCode` and let the process end naturally, or call `process.exit()` after cleanup if something (an open handle) keeps it alive. **`process.exit()` does not wait** for pending async work such as log flushing, so flush the logger first.
- Use exit code `0` for a normal stop and `1` when the shutdown was caused by a crash. The crash case is shown in [Validation and error handling](08-validation-and-error-handling.md#graceful-shutdown).
- **Keep the total shutdown time below the platform grace period.**
- When a process has a `SIGTERM` listener, Node.js no longer exits on `SIGTERM` by itself — your handler must finish the job.
- On Windows, `SIGTERM` is not really sent by the OS; this is mainly a Linux/container concern.

### The readiness race in Kubernetes

Removing a pod from the load balancer's endpoints happens **in parallel** with sending `SIGTERM`. For a short time, new requests can still arrive after you call `server.close()`. Common fix: on `SIGTERM`, first mark not-ready and **wait a few seconds** (or use a `preStop` hook with `sleep 5`) before closing the server, so the load balancer stops sending traffic first.

### Crashes are different

For `uncaughtException` and `unhandledRejection`, the process is in an unknown state. Log the error, try a short cleanup, and **exit with a non-zero code**; let the process manager restart it. Do not keep serving. (Since Node.js 15, an unhandled rejection crashes the process by default.) Details in [Validation and error handling](08-validation-and-error-handling.md).

---

## Process managers and containers

Someone must start your Node.js process, restart it when it crashes, collect its logs and run several copies. Options:

| Tool | Where | What it does |
| --- | --- | --- |
| **systemd** | Linux VMs | Starts the service at boot, restarts on failure (`Restart=on-failure`), collects logs in journald |
| **PM2** | VMs | Node.js-specific: cluster mode, restarts, memory-based restarts, log files, zero-downtime `reload` |
| **Docker + orchestrator** (Kubernetes, ECS, Nomad, Cloud Run) | Containers | Restart policies, health checks, rolling deploys, autoscaling across machines |

A minimal systemd unit:

```ini
# /etc/systemd/system/orders-api.service
[Unit]
Description=Orders API
After=network.target

[Service]
User=orders
WorkingDirectory=/srv/orders-api
EnvironmentFile=/etc/orders-api/env
ExecStart=/usr/bin/node dist/server.js
Restart=on-failure
RestartSec=2
# systemd sends SIGTERM on stop, then SIGKILL after this timeout
TimeoutStopSec=30

[Install]
WantedBy=multi-user.target
```

In containers, do **not** run PM2 inside the container just for restarts — the orchestrator already restarts containers, and an extra layer hides crashes from it. Run `node` directly as the container's main process, one process per container, and scale with replicas. See [Concurrency, worker threads and cluster](12-concurrency-worker-threads-and-cluster.md#scaling-with-containers-instead).

---

## Docker for Node.js

### A production Dockerfile

```dockerfile
# syntax=docker/dockerfile:1

# ---------- Stage 1: build ----------
FROM node:24-slim AS build
WORKDIR /app

# Copy only the dependency files first, so this layer is cached
# until package.json or the lockfile changes.
COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src
# Compile TypeScript to dist/
RUN npm run build

# Remove devDependencies (TypeScript, test tools) from node_modules
RUN npm prune --omit=dev

# ---------- Stage 2: runtime ----------
FROM node:24-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app

# Copy only what the app needs at runtime, owned by the non-root "node" user
COPY --from=build --chown=node:node /app/package.json ./
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist

# Never run as root
USER node
EXPOSE 3000

# Exec form: node is PID 1 of the app and receives SIGTERM directly
CMD ["node", "dist/server.js"]
```

Why each part:

- **Multi-stage build:** the first stage has compilers, TypeScript and devDependencies; the final image contains only runtime files. Smaller image, smaller attack surface.
- **Copy the lockfile first, then `npm ci`:** Docker caches this layer. Changing a source file does not reinstall all dependencies.
- **`npm ci`** installs exactly what the lockfile says and fails if `package.json` and the lockfile disagree. (`npm ci --omit=dev` installs only production dependencies, if you do not need devDependencies to build.)
- **Pin the base image** to a major version (`node:24-slim`) or, for full reproducibility, a digest. Use an **LTS** Node.js version.
- **`slim`** (Debian-based, small) is a good default. **`alpine`** is smaller but uses musl instead of glibc, which can break some native modules. **Distroless** images (no shell, no package manager) are even smaller and safer, but harder to debug.
- **`USER node`:** the official Node.js images include an unprivileged `node` user. If an attacker gets code execution, they are not root in the container.
- **Exec-form `CMD ["node", ...]`**, not `CMD npm start` and not shell form `CMD node dist/server.js`. With `npm start` or a shell in between, `SIGTERM` may not reach Node.js, so graceful shutdown never runs and the container is killed after the grace period.

### PID 1 and signals

The first process in a container is **PID 1**. Linux treats PID 1 specially (for example, default signal handlers do not apply), and Node.js was not designed to run as PID 1. The Node.js Docker team recommends running with an init process: `docker run --init ...` (Docker adds a tiny init called tini), or installing `tini` in the image. Kubernetes does not have an `--init` flag; add tini to the image if you need it, and always handle `SIGTERM` in your code.

### `.dockerignore`

```text
node_modules
dist
.git
.env
.env.*
coverage
*.log
Dockerfile
docker-compose*.yml
```

Without it, `COPY . .` sends your local `node_modules` (built for your OS), your `.git` history and possibly your `.env` secrets into the image.

### Memory limits

Set a memory limit for each container. By default, V8 picks a maximum heap size from the memory it detects. But the JavaScript heap is only part of the process memory: buffers, native code and thread stacks use more. If the container is often OOM-killed (killed by the kernel for using too much memory), check for leaks first. Then set `--max-old-space-size` (in MB) explicitly to cap the V8 old generation below the container limit, leaving room for the rest:

```dockerfile
# For a container with a 512 MB memory limit
CMD ["node", "--max-old-space-size=384", "dist/server.js"]
```

### Image security

- Scan images for known vulnerabilities (Docker Scout, Trivy, Grype) in CI.
- Rebuild regularly to get base image security patches.
- Do not put secrets in `ENV`, `ARG` or files in the image; they stay in the image layers. Use build secrets (`RUN --mount=type=secret`) for private registry tokens.
- Use a read-only root filesystem where possible, and drop Linux capabilities in Kubernetes (`securityContext`).

---

## Security hardening

This section covers the Node.js-specific hardening of a service. Attacks like XSS, CSRF and CORS in depth are in [Web security](../01-cs-and-web-fundamentals/08-browser-storage-and-web-security-basics.md); secrets and dependency security in [Authentication and authorization](../07-nodejs-backend/09-authentication-and-authorization.md).

### Security headers with helmet

**helmet** sets a group of HTTP security headers with good defaults: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `X-Frame-Options`, `Referrer-Policy` and more. It also removes `X-Powered-By`.

```ts
import helmet from "helmet";

app.use(helmet());
app.disable("x-powered-by"); // helmet already removes it; this makes the intent explicit
```

For a pure JSON API most headers do little harm and some help (for example, `nosniff`). For apps that serve HTML, tune the CSP for your scripts and styles.

### CORS: allow only known origins

CORS controls which **browser** origins may read your API responses. It is not an authentication mechanism and does not stop server-to-server calls.

```ts
import cors from "cors";

app.use(
  cors({
    origin: ["https://app.example.com", "https://admin.example.com"], // explicit allow-list
    credentials: true,                                                // allow cookies
    methods: ["GET", "POST", "PATCH", "DELETE"],
  }),
);
```

```ts
// ❌ Wrong: reflects any origin AND allows credentials — any website can read users' data
app.use(cors({ origin: true, credentials: true }));
```

### Body size limits

Without a limit, an attacker can send a 1 GB JSON body and your server tries to buffer and parse it.

```ts
app.use(express.json({ limit: "100kb" }));                   // the default is 100kb; set it explicitly
app.use(express.urlencoded({ extended: false, limit: "100kb" }));
// For uploads, stream to storage with a size limit instead of buffering (see the Streams document).
```

Also limit array lengths, string lengths and nesting depth in your validation schemas. See [Validation and error handling](08-validation-and-error-handling.md).

### Timeouts everywhere

Slow clients and slow dependencies are an attack surface (for example, **Slowloris** attacks open many connections and send headers very slowly).

Server side (Node.js `http` defaults: `requestTimeout` 300 s since Node.js 18, `headersTimeout` 60 s, `keepAliveTimeout` 5 s):

```ts
import http from "node:http";

const server = http.createServer(
  {
    requestTimeout: 30_000,   // whole request must arrive within 30 s (headers timeout follows it)
    keepAliveTimeout: 65_000, // longer than the load balancer's idle timeout (e.g. 60 s on AWS ALB)
  },
  app,
);
```

Why `keepAliveTimeout` above the load balancer's idle timeout? If Node.js closes an idle keep-alive connection at the same moment the load balancer sends a new request on it, the load balancer gets a connection reset and returns a `502` to the user. Letting the load balancer close idle connections first avoids these random 502s. (Note: if you pass `headersTimeout` in the options, it must not be larger than `requestTimeout`, or Node.js throws `ERR_OUT_OF_RANGE`.)

All server timeout settings and their defaults are explained in [HTTP servers and Express](06-http-servers-and-express.md#server-timeouts-and-limits).

Client side: **every outgoing call needs a timeout**. `fetch` has no timeout by default, so pass `signal: AbortSignal.timeout(5_000)`. Also set query timeouts in your database client (for example, `statement_timeout` in PostgreSQL) and connection acquire timeouts in pools. The code, and how to fit all downstream timeouts inside one request budget, are in [Validation and error handling: Timeouts for downstream calls](08-validation-and-error-handling.md#timeouts-for-downstream-calls).

### Avoid code and command injection

- Never use `eval()`, `new Function()` or `vm` with user input. The `vm` module is **not a security sandbox**.
- Use `execFile`/`spawn` with argument arrays, never `exec` with user input. See [Concurrency](12-concurrency-worker-threads-and-cluster.md#security-shell-injection-with-exec).
- Use parameterized SQL queries. See [Databases](10-databases.md).
- Validate file paths: `path.join(baseDir, userInput)` can escape `baseDir` with `../`. Resolve the path and check that it still starts with the base directory.

### Prototype pollution

In JavaScript, almost every object inherits from `Object.prototype`. **Prototype pollution** happens when user input can add properties to `Object.prototype` — then *every* object in the process gets them.

```js
// ❌ A naive deep merge, as found in many old utility libraries
function mergeUnsafe(target, source) {
  for (const key in source) {
    if (typeof source[key] === "object" && source[key] !== null) {
      target[key] ??= {};
      mergeUnsafe(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// JSON.parse creates an own property literally named "__proto__"
const payload = JSON.parse('{"__proto__": {"isAdmin": true}}');
mergeUnsafe({}, payload);

const someUser = {};
console.log("isAdmin on a new object:", someUser.isAdmin); // isAdmin on a new object: true
```

**Step by step:** the loop reaches key `"__proto__"`. `target["__proto__"]` returns `Object.prototype` (the getter), so the recursive merge writes `isAdmin = true` onto `Object.prototype`. Now `if (user.isAdmin)` is true for every object without its own `isAdmin` property.

Defenses:

```js
// ✅ Skip dangerous keys and only follow own properties
function mergeSafe(target, source) {
  for (const key of Object.keys(source)) {
    if (key === "__proto__" || key === "constructor" || key === "prototype") continue;
    const value = source[key];
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      target[key] = mergeSafe(Object.hasOwn(target, key) ? target[key] : {}, value);
    } else {
      target[key] = value;
    }
  }
  return target;
}
```

- Validate input with a schema that allows only known keys (Zod `strict()`), so `__proto__` is rejected.
- Use `Map` for user-keyed data, or objects created with `Object.create(null)`.
- Keep dependencies updated (many old merge/clone/query-string libraries had this bug).
- Node.js has a `--disable-proto=delete` (or `=throw`) flag that removes the `__proto__` accessor entirely.

### ReDoS (regular expression denial of service)

Some regular expressions take **exponential time** on certain inputs because the regex engine tries many ways to match (catastrophic backtracking). Since regex matching runs on the main thread, one request can block the whole server.

```js
const evil = /^(a+)+$/;           // nested quantifiers: dangerous
evil.test("a".repeat(26) + "!");  // hundreds of milliseconds; each extra "a" roughly doubles the time
```

The measured demo, with a step-by-step explanation of why the engine is so slow, is in [The Node.js event loop: Common ways to block the loop](02-node-event-loop.md#common-ways-to-block-the-loop). The equivalent `/^a+$/` checks a 100,000-character string in under a millisecond.

Defenses:

- Avoid nested quantifiers (`(a+)+`, `(.*)*`, `(\w+\s?)*`) and overlapping alternatives.
- **Limit input length before matching.**
- Use tools that detect unsafe patterns (for example, `eslint-plugin-regexp` or `safe-regex`-style linters).
- Use validated libraries for emails, URLs, etc., instead of home-made regexes.
- For user-supplied patterns, use a linear-time engine (for example, the `re2` package) or do not allow them.

### Dependency security

Most of your code is other people's code (`node_modules`). Supply-chain attacks (malicious package versions, typosquatting, compromised maintainer accounts) are real.

- **Commit the lockfile** and install with `npm ci` in CI and Docker.
- Run **`npm audit`** (or `npm audit --omit=dev` for production dependencies) in CI, and use Dependabot or Renovate for updates.
- Review new dependencies: maintenance, download counts, install scripts. Fewer dependencies = smaller risk.
- Consider `npm install --ignore-scripts` in CI where possible (install scripts run arbitrary code).
- More details: [Modules, npm and packages](03-modules-npm-and-packages.md) and [Authentication and authorization](../07-nodejs-backend/09-authentication-and-authorization.md).

### Least privilege

- Run as a **non-root user** (container `USER node`).
- Give the database user only the permissions the service needs (no `DROP TABLE` for the API user).
- Use separate credentials per service and environment.
- **Node.js permission model:** `node --permission --allow-fs-read=/app ...` restricts file system access, child processes, worker threads and more for the whole process. It became stable in Node.js 23.5 and 22.13. It is a defense-in-depth layer, not a full sandbox for untrusted code.
- Restrict network egress at the infrastructure level where possible (a compromised process cannot call arbitrary hosts).

### Other essentials

- **HTTPS everywhere.** TLS is usually terminated at the load balancer or reverse proxy; then set `app.set("trust proxy", 1)` (the number of proxies) so `req.ip` and `req.protocol` are correct. Do not set `trust proxy` to `true` blindly, or clients can fake their IP with `X-Forwarded-For` and bypass IP-based rate limits.
- **Do not leak internals in errors:** no stack traces in production responses. Return a generic message with the request ID.
- **Authentication and authorization** on every route: see [Authentication and authorization](09-authentication-and-authorization.md).

---

## Rate limiting

**Rate limiting** controls how many requests a client can make in a time period. It protects you from brute-force login attempts, scraping, abusive clients, accidental retry loops and overload. When the limit is exceeded, respond with **`429 Too Many Requests`** and a `Retry-After` header.

You can rate limit at several layers: the CDN/WAF, the API gateway or Nginx, and the application. Application-level limits can use business identity (user ID, API key, tenant), which the edge often does not know.

### What to use as the key

- **User ID or API key** for authenticated routes (fair per customer).
- **IP address** for anonymous routes (watch out: many users can share one IP behind a corporate NAT; IPv6 users can have many addresses — limit per /64 subnet).
- **Two separate limits for login:** one keyed by IP (stops one machine trying many accounts) and one keyed by account (stops many machines attacking one account). A single combined "account + IP" key stops neither attack. Code in [Authentication and authorization](09-authentication-and-authorization.md#protecting-the-login-endpoint).

### The algorithms

| Algorithm | Idea | Pros | Cons |
| --- | --- | --- | --- |
| **Fixed window** | Count requests per calendar window (e.g. per minute); reset at the window boundary | Very simple, one counter (`INCR` + `EXPIRE`) | Bursts at the boundary: up to 2× the limit in a short time |
| **Sliding window log** | Store the timestamp of every request; count those in the last N seconds | Exact | Memory grows with the limit (one entry per request) |
| **Sliding window counter** | Weighted mix of the previous and current fixed windows | Smooth, cheap (two counters) | Approximate |
| **Token bucket** | A bucket holds up to C tokens and refills at R tokens/second; each request takes a token | Allows short bursts up to C while keeping the average rate R; very common in APIs | Slightly more state (tokens + last refill time) |
| **Leaky bucket** | Requests enter a queue that drains at a fixed rate | Smooth output rate | Adds latency (queueing); bursts are delayed, not allowed |

### Fixed window

```js
function createFixedWindowLimiter({ limit, windowMs, now = () => Date.now() }) {
  const counters = new Map(); // in production: Redis INCR + EXPIRE, and clean up old windows
  return function allow(key) {
    const windowStart = Math.floor(now() / windowMs) * windowMs;
    const id = `${key}:${windowStart}`;
    const count = (counters.get(id) ?? 0) + 1;
    counters.set(id, count);
    return count <= limit;
  };
}

let clock = 59_000; // 1 second before a window boundary
const fixed = createFixedWindowLimiter({ limit: 3, windowMs: 60_000, now: () => clock });
const a = [fixed("u1"), fixed("u1"), fixed("u1")];
clock = 60_500;     // 1.5 seconds later: a new window has started
const b = [fixed("u1"), fixed("u1"), fixed("u1"), fixed("u1")];
console.log(a.join(" "), "|", b.join(" ")); // true true true | true true true false
```

The boundary problem in action: the limit is 3 per minute, but 6 requests were allowed within 1.5 seconds.

### Sliding window log

```js
function createSlidingWindowLimiter({ limit, windowMs, now = () => Date.now() }) {
  const logs = new Map(); // key -> timestamps of allowed requests (Redis: a sorted set)
  return function allow(key) {
    const current = now();
    const timestamps = (logs.get(key) ?? []).filter((ts) => ts > current - windowMs);
    if (timestamps.length >= limit) {
      logs.set(key, timestamps);
      return false;
    }
    timestamps.push(current);
    logs.set(key, timestamps);
    return true;
  };
}

clock = 59_000;
const sliding = createSlidingWindowLimiter({ limit: 3, windowMs: 60_000, now: () => clock });
const c = [sliding("u1"), sliding("u1"), sliding("u1")];
clock = 60_500;
const d = [sliding("u1"), sliding("u1")];
clock = 119_001; // just over 60 s after the first three requests
const e = [sliding("u1")];
console.log(c.join(" "), "|", d.join(" "), "|", e.join(" ")); // true true true | false false | true
```

No boundary burst: the window always looks at the last 60 seconds. In Redis you implement it with a sorted set per key (`ZADD` the timestamp, `ZREMRANGEBYSCORE` old entries, `ZCARD` to count), inside a Lua script or `MULTI` so it is atomic.

### Sliding window counter

Keep a counter for the previous and the current fixed window, and estimate:

```text
estimate = previousCount × (time left of previous window's weight) + currentCount
```

```js
function slidingCounterEstimate(prevCount, currCount, elapsedInWindowMs, windowMs) {
  return prevCount * ((windowMs - elapsedInWindowMs) / windowMs) + currCount;
}
// 80 requests last minute, 30 so far this minute, 15 s into the current minute:
console.log(slidingCounterEstimate(80, 30, 15_000, 60_000)); // 90  (80 × 0.75 + 30)
```

With a limit of 100, the next request is allowed. It is cheap (two counters) and much smoother than a fixed window.

### Token bucket

```js
class TokenBucket {
  #capacity;
  #refillPerSecond;
  #tokens;
  #lastRefill;
  #now;

  constructor({ capacity, refillPerSecond, now = () => Date.now() }) {
    this.#capacity = capacity;
    this.#refillPerSecond = refillPerSecond;
    this.#now = now;
    this.#tokens = capacity;       // start full
    this.#lastRefill = now();
  }

  #refill() {
    const now = this.#now();
    const elapsedSeconds = (now - this.#lastRefill) / 1000;
    this.#tokens = Math.min(this.#capacity, this.#tokens + elapsedSeconds * this.#refillPerSecond);
    this.#lastRefill = now;
  }

  tryRemove(cost = 1) {
    this.#refill();
    if (this.#tokens >= cost) {
      this.#tokens -= cost;
      return true;
    }
    return false;
  }
}

let t = 0;
const bucket = new TokenBucket({ capacity: 5, refillPerSecond: 1, now: () => t });
console.log(Array.from({ length: 7 }, () => bucket.tryRemove()).join(" "));
// true true true true true false false   <- a burst of 5 is allowed, then empty
t += 2000;                                 // 2 seconds later: 2 tokens refilled
console.log(bucket.tryRemove(), bucket.tryRemove(), bucket.tryRemove()); // true true false
```

**Step by step:**

1. The bucket starts with 5 tokens. Seven quick requests: the first 5 take a token each; requests 6 and 7 find 0 tokens and are rejected.
2. Two seconds pass. `#refill` adds `2 × 1 = 2` tokens.
3. Two requests succeed; the third is rejected.

```mermaid
flowchart LR
    Refill["Refill: R tokens per second<br/>up to capacity C"] --> Bucket["Bucket<br/>current tokens"]
    Req["Incoming request"] --> Check{"Token available?"}
    Bucket --> Check
    Check -->|"yes, take one"| Allow["Handle the request"]
    Check -->|"no"| Reject["429 Too Many Requests<br/>with Retry-After"]
```

The **capacity** controls the allowed burst; the **refill rate** controls the long-term average. Many public APIs (and AWS API Gateway throttling) use this model. The `cost` parameter lets expensive endpoints take more tokens.

### Distributed rate limiting with Redis

All the examples above keep state in memory. With several instances, each one counts separately (6 instances × 100 = 600 requests allowed). Keep the counters in **Redis** so all instances share them.

In Express, **`express-rate-limit`** (v8 at the time of writing) with the **`rate-limit-redis`** store is a common choice:

```ts
import { rateLimit } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import { createClient } from "redis";

const redis = createClient({ url: process.env.REDIS_URL });
await redis.connect();

// General API limit: 100 requests per minute per client, shared across instances
const apiLimiter = rateLimit({
  windowMs: 60_000,
  limit: 100,
  standardHeaders: "draft-8", // send the standard RateLimit headers
  legacyHeaders: false,       // do not send the old X-RateLimit-* headers
  store: new RedisStore({
    sendCommand: (...args: string[]) => redis.sendCommand(args),
    prefix: "rl:api:",
  }),
});

// Strict limit for login: 5 failed attempts per 15 minutes per IP
// (add a second, per-account limiter as shown in the authentication document)
const loginLimiter = rateLimit({
  windowMs: 15 * 60_000,
  limit: 5,
  skipSuccessfulRequests: true, // only failed logins count
  standardHeaders: "draft-8",
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand: (...args: string[]) => redis.sendCommand(args),
    prefix: "rl:login:",
  }),
});

app.use("/api", apiLimiter);
app.post("/api/auth/login", loginLimiter, loginHandler);
```

By default `express-rate-limit` keys by client IP (and groups IPv6 addresses by subnet), so set `trust proxy` correctly behind a load balancer. Use the `keyGenerator` option to limit by user ID or API key instead.

Decide what happens when Redis is down: **fail open** (allow requests; the API keeps working without protection) for general limits, and consider a local in-memory fallback or **fail closed** for sensitive endpoints such as login.

Login protection is covered further in [Authentication and authorization](09-authentication-and-authorization.md#protecting-the-login-endpoint). The `429` response format and the `RateLimit` headers are explained in [REST API design](07-rest-api-design.md#rate-limiting-headers).

---

## Performance: profiling, memory and connections

The first rule of performance work: **measure, do not guess.** Find the actual bottleneck with metrics and a profiler, fix it, and measure again.

### Find where the time goes

| Symptom | Likely cause | Tool |
| --- | --- | --- |
| High event loop delay, ELU near 1, high CPU | CPU-heavy JavaScript | CPU profile |
| High latency but low CPU and low ELU | Waiting on I/O: slow queries, slow APIs, pool waits | Tracing, query logs, pool metrics |
| Memory grows until OOM | Memory leak or unbounded cache/queue | Heap snapshots, heap profile |
| Latency spikes every few seconds | Long GC pauses (often from huge heaps) | `--trace-gc`, GC metrics |

### CPU profiling

**1. Chrome DevTools with `--inspect`:**

```bash
node --inspect dist/server.js          # debugger listens on 127.0.0.1:9229
```

Open `chrome://inspect` in Chrome, click "inspect", go to the **Performance** or **Profiler** tab, record while you send load (for example with `autocannon`), and look at the flame chart for wide bars (functions that use a lot of time). Never expose the inspector port publicly: anyone who connects can run code in your process.

**2. `--cpu-prof` (write a profile file on exit):**

```bash
node --cpu-prof --cpu-prof-dir=./profiles dist/server.js
# run a load test, then stop the server (Ctrl+C); open the .cpuprofile file in Chrome DevTools
```

The `--cpu-prof` and `--heap-prof` flags are stable since Node.js 22.4 / 20.16.

**3. clinic.js and 0x:** `clinic doctor` runs your app under load and suggests whether the problem is CPU, I/O or memory; `clinic flame` and `0x` produce flame graphs.

```bash
npx clinic doctor --on-port "autocannon -c 50 -d 20 localhost:3000/api/products" -- node dist/server.js
```

Common findings: synchronous JSON work on huge payloads, inefficient loops, logging too much, regexes, password hashing with sync APIs, template rendering. Fixes: better algorithms, caching, streaming, moving CPU work to workers ([Concurrency](12-concurrency-worker-threads-and-cluster.md)).

### Memory leaks

A **memory leak** in Node.js means objects stay reachable when you do not need them anymore, so the garbage collector cannot free them. The heap grows until the process crashes with "JavaScript heap out of memory" or the container is OOM-killed.

Common causes:

- **Unbounded caches**: a `Map` used as a cache with no size limit and no TTL.
- **Global arrays** that collect data ("for debugging") and never shrink.
- **Event listeners** added on every request to a long-lived emitter and never removed (watch for `MaxListenersExceededWarning`).
- **Timers** (`setInterval`) that are never cleared and keep closures alive.
- **Closures** that capture large objects (a request or a big buffer) and are stored somewhere long-lived.
- **Unbounded queues** of pending work under load (promises waiting for a saturated pool).

How to find a leak:

1. Confirm it: heap used grows steadily under constant load and does not go down after GC (look at `process.memoryUsage().heapUsed` or the default metrics).
2. Take **heap snapshots** at different times:

   ```bash
   node --heapsnapshot-signal=SIGUSR2 dist/server.js
   kill -USR2 <pid>    # writes a .heapsnapshot file; repeat after some minutes of load
   ```

   Or from code: `v8.writeHeapSnapshot()`. Or `--heapsnapshot-near-heap-limit=2` to write snapshots automatically before an OOM crash.
3. Load two or three snapshots in Chrome DevTools (**Memory** tab) and use the **Comparison** view: which object types grow between snapshots? Then follow the **Retainers** path to see what keeps them alive (for example, a `Map` in a module).
4. Fix the cause (add a limit, remove the listener, clear the timer) and verify with a load test.

Taking a heap snapshot pauses the process and needs a lot of memory (it can roughly double memory use), so be careful on production instances; prefer one instance taken out of the load balancer.

One large snapshot does not prove a leak. Growth over time under the same load does.

### Compression

Compressing responses (gzip, Brotli) reduces bandwidth for JSON and text. In production it is usually better to compress at the **reverse proxy or CDN** (Nginx, the load balancer), because compression is CPU work and Node.js would do it on your service's CPU. If there is no proxy, the `compression` middleware for Express works. Do not compress already-compressed content (images, video, zip files).

### Keep-alive for outgoing requests

Creating a new TCP + TLS connection for every outgoing HTTP request adds latency (several round trips) and CPU. **Keep-alive** reuses connections.

- Node.js's built-in `fetch` (based on undici) reuses connections by default.
- For the `http`/`https` modules, the global agent uses keep-alive by default since Node.js 19. For custom agents, set `keepAlive: true` and a sensible `maxSockets`.

```ts
import https from "node:https";

export const paymentsAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 50, // at most 50 concurrent connections to this host
});
```

### Connection pools

Opening a database connection is slow (TCP, TLS, authentication). A **connection pool** keeps a set of open connections and lends them to queries. Every database client has one (`pg.Pool`, Prisma, Mongoose).

- Create **one pool per process** at startup, not per request.
- Size it with the database's limits in mind: `instances × pool size` must stay below the database's max connections. A typical starting point is 10–20 per instance.
- Watch **pool wait time**: if queries wait for a free connection, either queries are slow or the pool is too small.
- In serverless environments, each function instance has its own pool, which can exhaust the database; use a connection proxy (for example, RDS Proxy or PgBouncer).

More in [Databases](10-databases.md). Caching to reduce database load is in [Caching](11-caching.md).

---

## Observability: metrics and tracing

**Observability** means you can understand what your system is doing from the outside, using three kinds of signals:

| Signal | Answers | Example |
| --- | --- | --- |
| **Logs** | What exactly happened in this request? | `payment failed: card declined, requestId=...` |
| **Metrics** | How is the system doing overall, over time? | p95 latency 180 ms, 2% errors, ELU 0.7 |
| **Traces** | Where did the time go in this request, across services? | API 400 ms = DB 30 ms + payments 350 ms |

Logging was covered above. The full topic (dashboards, alerting, SLOs) is in Production Node.js.

### Metrics with Prometheus

**Prometheus** scrapes a `/metrics` endpoint on each instance at regular intervals. The Node.js client library was published as **`prom-client`** for many years; in 2026 it moved to the Prometheus organization and is now published as **`@prometheus-io/client`** (same API; `prom-client` is marked deprecated on npm).

```ts
import client from "@prometheus-io/client";

// Process and Node.js metrics: CPU, memory, event loop lag, GC, active handles...
client.collectDefaultMetrics();

const httpDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration in seconds",
  labelNames: ["method", "route", "status_code"] as const,
  buckets: [0.01, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5],
});

app.use((req, res, next) => {
  const end = httpDuration.startTimer();
  res.on("finish", () => {
    end({
      method: req.method,
      route: req.route?.path ?? "unmatched", // the route pattern, NOT the raw URL
      status_code: res.statusCode,
    });
  });
  next();
});

app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.send(await client.register.metrics());
});
```

Important:

- Use the **route pattern** (`/orders/:id`) as a label, never the raw URL (`/orders/8f3a...`). Each distinct label value creates a new time series; raw IDs create millions (**high cardinality**) and can crash your metrics system.
- Protect `/metrics` (internal network only or authentication).
- With cluster mode, each worker has its own registry; use `AggregatorRegistry` or scrape each worker.

What to measure — the **RED** method for services:

- **R**ate: requests per second.
- **E**rrors: failed requests per second (5xx, and important 4xx).
- **D**uration: latency percentiles (p50, p95, p99), not only the average.

Plus Node.js-specific signals: event loop delay and utilization, heap used, GC pauses, pool usage and wait time, queue depth, cache hit ratio.

### Distributed tracing with OpenTelemetry

**OpenTelemetry** (OTel) is the vendor-neutral standard for traces, metrics and logs. A **trace** is the full journey of one request; it consists of **spans** (one per operation: the HTTP handler, each database query, each outgoing call). The trace context is passed between services in the standard `traceparent` HTTP header.

The Node.js SDK can **auto-instrument** common libraries (http, Express, pg, Redis, and many more) without code changes:

```ts
// instrumentation.ts — must be loaded BEFORE the application code
import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

const sdk = new NodeSDK({
  serviceName: "orders-api",
  traceExporter: new OTLPTraceExporter({
    url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? "http://localhost:4318/v1/traces",
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
process.on("SIGTERM", () => void sdk.shutdown()); // flush remaining spans
```

```bash
node --import ./dist/instrumentation.js dist/server.js
```

It must load first because instrumentation works by patching modules when they are imported. Then send the data to a backend such as Jaeger, Grafana Tempo, Honeycomb or Datadog. You can add your own spans for important business steps:

```ts
import { trace } from "@opentelemetry/api";

const tracer = trace.getTracer("orders-api");

export async function priceOrder(orderId: string) {
  return tracer.startActiveSpan("priceOrder", async (span) => {
    try {
      span.setAttribute("order.id", orderId);
      return await calculatePrice(orderId);
    } finally {
      span.end();
    }
  });
}
```

Add the trace ID to your log lines (many logger integrations do this automatically) so you can jump from a log line to its trace.

---

## Deployment options

| Option | What it is | Good for | Watch out for |
| --- | --- | --- | --- |
| **Virtual machines** (EC2, Compute Engine) with systemd or PM2 | You manage the OS and processes | Simple setups, special hardware, legacy | Patching, scaling and deploys are your job |
| **Containers on an orchestrator** (Kubernetes, ECS, Nomad) | Docker images; the platform schedules, restarts and scales | Most production services today | Platform complexity; needs good health checks and resource limits |
| **Managed container platforms / PaaS** (Cloud Run, App Runner, Azure Container Apps, Render, Fly.io, Heroku) | You give an image or repo; the platform runs it | Small and medium teams, fast setup | Less control; platform-specific limits |
| **Serverless functions** (AWS Lambda, Azure Functions, Google Cloud Functions) | Code runs per event; you pay per invocation | Spiky or low traffic, event processing, glue code | Cold starts, execution time limits, database connection exhaustion, no long-lived connections (WebSockets need special services), in-memory state is lost between invocations |

For a typical Express or NestJS API with steady traffic, containers (on Kubernetes or a managed container platform) are the common default. Serverless shines for event-driven work (a file uploaded → process it) and unpredictable traffic.

---

## Zero-downtime deployments

Users should not notice deploys. The main strategies:

| Strategy | How it works | Pros | Cons |
| --- | --- | --- | --- |
| **Rolling update** | Replace instances a few at a time; new ones must pass readiness before old ones stop | Default in Kubernetes; no extra capacity | Old and new versions run at the same time for a while; rollback is another rollout |
| **Blue-green** | Run the new version (green) next to the old (blue); switch all traffic at once | Instant switch and instant rollback | Double capacity during the deploy |
| **Canary** | Send a small share of traffic (1%, 5%, 25%...) to the new version; watch metrics; continue or roll back | Limits the blast radius of bad releases | Needs good metrics and traffic splitting |
| **Feature flags** | Deploy code turned off; enable features separately | Decouples deploy from release; instant "rollback" of a feature | Flag management and cleanup |

What the application must do to make this work:

1. **Readiness checks** that are honest: an instance is ready only when it can serve.
2. **Graceful shutdown**: finish in-flight requests on `SIGTERM`.
3. **Backward-compatible changes**, because old and new versions run side by side:
   - **Database migrations with expand/contract:** first add new columns/tables (expand) in a way the old code ignores; deploy code that writes both and reads the new; backfill data; later remove the old columns (contract) in a separate release. Never rename or drop a column in the same deploy that stops using it.
   - **API changes:** add fields, do not remove or rename them; version breaking changes (see [REST API design](07-rest-api-design.md)).
   - **Queue messages:** new workers must handle old message formats, and old workers must ignore unknown fields.
4. **Fast rollback:** keep the previous image, automate rollback, and watch error rate and latency after each deploy.

The deployment pipeline itself (CI/CD, environments, approvals) is in Production Node.js.

---

## Production checklist

**Configuration and secrets**
- [ ] All config from environment variables, validated at startup with clear errors
- [ ] Secrets in a secret manager, never in git or the image; rotation possible
- [ ] `NODE_ENV=production`

**Reliability**
- [ ] Liveness (process only) and readiness (dependencies, shutdown state) endpoints
- [ ] Graceful shutdown on `SIGTERM`, below the platform grace period
- [ ] Crash on `uncaughtException`/`unhandledRejection` after logging; automatic restarts
- [ ] Timeouts on server, outgoing HTTP calls and database queries
- [ ] Retries only for idempotent operations, with backoff and jitter

**Security**
- [ ] helmet, strict CORS allow-list, body size limits
- [ ] Rate limiting (shared store), stricter on login and expensive endpoints
- [ ] Non-root container, least-privilege database user
- [ ] Input validation; no `eval`, no `exec` with user input; safe regexes
- [ ] `npm ci` with a committed lockfile; `npm audit` and image scanning in CI
- [ ] `trust proxy` configured correctly; HTTPS everywhere; no stack traces in responses

**Observability**
- [ ] Structured JSON logs to stdout with request IDs; secrets redacted
- [ ] Metrics: rate, errors, latency percentiles, event loop delay/ELU, memory, pool usage
- [ ] Distributed tracing (OpenTelemetry)
- [ ] Dashboards and alerts on symptoms users feel (error rate, latency)

**Performance and capacity**
- [ ] One DB pool per process, sized against database limits
- [ ] Keep-alive for outgoing calls; compression at the proxy
- [ ] CPU-heavy work in worker pools or background jobs
- [ ] Load test before big launches; memory stable under sustained load

**Deployment**
- [ ] Multi-stage Docker image, slim base, `.dockerignore`, exec-form `CMD`
- [ ] Rolling/canary deploys with readiness gates; expand/contract migrations
- [ ] Fast, tested rollback

---

## How to explain this in an interview

1. **Define it:** "Running Node.js in production means the service is configurable, observable, safe, and can be deployed and stopped without hurting users."
2. **Why it matters:** "Most outages are not code bugs in the happy path; they are bad config, overload, slow dependencies, leaks and deploy problems."
3. **How I do it:** "I validate config at startup, log JSON with pino and request IDs through AsyncLocalStorage, expose liveness and readiness probes, and handle SIGTERM with a graceful shutdown. I ship a multi-stage Docker image running as non-root with node as the main process. I add helmet, strict CORS, body limits, timeouts and Redis-backed rate limiting. I export RED metrics plus event loop metrics, and use OpenTelemetry for tracing."
4. **Small example:** "On a deploy, Kubernetes sends SIGTERM; my readiness probe turns 503, the server stops accepting connections, in-flight requests finish, I close the DB pool and exit 0 — users see no errors."
5. **Where it is useful:** "Every service; it is the difference between a demo and something you can be on call for."
6. **Trade-offs / gotchas:** "Liveness must not check the database or you get restart storms; keep-alive timeout must be above the load balancer's; metrics labels must use route patterns, not raw URLs; and in-memory rate limits don't work with many instances."

---

## Interview questions

### Q1. How do you manage configuration and secrets in a Node.js service?

**What the interviewer is checking:** Twelve-factor thinking, validation and secret hygiene.

**Short spoken answer (30–60 seconds):**
> I follow the twelve-factor approach: the same build runs everywhere, and everything that differs between environments comes from environment variables. At startup I validate all variables with a schema, for example Zod, convert them to the right types, and freeze the result into one typed config object. If something is missing or invalid, the app refuses to start with a clear message — but without printing secret values. Secrets live in a secret manager or the platform's secret store, are injected at runtime, never committed and never baked into the Docker image, and they can be rotated. Locally I use a .env file loaded with node --env-file, and only a .env.example goes into git.

**Follow-up questions:**
- **Why validate at startup and not when the value is used?** — Fail fast: a deploy with bad config fails its readiness immediately and is rolled back, instead of failing hours later on a rare code path.
- **How do you rotate a JWT signing key without logging everyone out?** — Support several keys: sign with the new key, verify with both (key IDs in the token header) until old tokens expire.
- **Do you still need `dotenv`?** — Not for basic cases: Node.js has `--env-file` (20.6+) and `process.loadEnvFile()`; they are stable since 24.10 / 22.21.

**Common mistakes:** Reading `process.env` all over the code; secrets in Dockerfiles or git history; logging the whole config.

**Where this is used in real projects:** Every deployable service.

### Q2. Why structured logging, and how do you attach a request ID to every log line?

**What the interviewer is checking:** Practical observability and knowledge of `AsyncLocalStorage`.

**Short spoken answer (30–60 seconds):**
> In production I search logs across many instances, so I log JSON objects with fixed fields instead of free text — with pino, writing to stdout, and the platform ships them to a log system. Every request gets a request ID: I accept a safe incoming X-Request-ID or generate a UUID, return it in the response header, and pass it to downstream calls. To put it on every log line without passing it through every function, I use AsyncLocalStorage: a middleware runs the rest of the request inside als.run with the ID, and pino's mixin reads getStore and adds it to each line. So when a user reports an error with the request ID, I can find the whole story.

**Follow-up questions:**
- **How does `AsyncLocalStorage` work?** — Node.js tracks async context; a store set with `run()` is visible to all async operations started inside that callback, across `await`s, timers and promise chains, and not outside.
- **What should you never log?** — Passwords, tokens, session cookies, full card numbers, secrets; often personal data too. Use pino's `redact`.
- **Why not `console.log`?** — No levels, no structure, and it can be synchronous for files and terminals, slowing the event loop.

**Common mistakes:** Logging huge objects (whole requests) at info level; pretty-printing in production; trusting any incoming request ID without validation (log injection).

**Where this is used in real projects:** All microservice architectures; together with OpenTelemetry trace IDs.

### Q3. What is the difference between liveness and readiness probes? What goes wrong if you mix them up?

**What the interviewer is checking:** Operational experience with orchestrators.

**Short spoken answer (30–60 seconds):**
> Liveness asks "is the process alive or stuck?" If it fails, the orchestrator restarts the container. Readiness asks "can this instance serve traffic right now?" If it fails, the instance is removed from the load balancer but not restarted. So liveness should be trivial — if the event loop can answer, it's alive. Readiness checks critical dependencies like the database and returns 503 during startup and shutdown. The classic mistake is checking the database in liveness: when the database has a short outage, every instance fails liveness and gets restarted at the same time, which causes a restart storm and slows recovery, and restarting Node doesn't fix the database anyway.

**Follow-up questions:**
- **Should readiness check every dependency?** — Only critical ones. If a non-critical service is down, degrade that feature instead; otherwise all instances become unready and the whole API goes down.
- **What is a startup probe?** — A Kubernetes probe that delays liveness checks until slow startup finishes, so slow starters are not killed.
- **What if the event loop is blocked?** — The liveness endpoint times out; after the failure threshold the container is restarted, which is correct for a truly stuck process.

### Q4. Walk me through a graceful shutdown.

**What the interviewer is checking:** Correct order of steps and knowledge of Node.js server APIs.

**Short spoken answer (30–60 seconds):**
> The platform sends SIGTERM and waits a grace period, 30 seconds by default in Kubernetes, before SIGKILL. In my SIGTERM handler, I first mark the instance as not ready so the load balancer stops sending traffic, often with a short wait because endpoint removal happens in parallel. Then I call server.close(), which stops accepting new connections and, since Node 19, closes idle keep-alive connections, and I wait for in-flight requests to finish. Then I stop background consumers, like worker.close() for BullMQ, and close the database pool and Redis. I set a timer as a safety net that calls server.closeAllConnections() if requests don't finish in time, and I make sure the total stays under the grace period. Then I exit with code 0.

**Follow-up questions:**
- **Why doesn't the container stop on `SIGTERM` when started with `npm start`?** — npm (or a shell in shell-form `CMD`) can be PID 1 and may not forward the signal to Node.js; use exec-form `CMD ["node", "dist/server.js"]`, and `--init`/tini.
- **What about WebSocket or long-polling connections?** — They never become idle; send clients a "reconnect" message, close them gracefully, and rely on client-side reconnection with backoff.
- **What is different for `uncaughtException`?** — The state is unknown; log, do minimal cleanup and exit non-zero quickly. Do not continue serving.

**Common mistakes:** Calling `process.exit()` immediately on `SIGTERM`; no timeout (shutdown hangs until SIGKILL); closing the DB pool before in-flight requests finish.

### Q5. What does a good Dockerfile for a Node.js service look like?

**Short spoken answer (30–60 seconds):**
> I use a multi-stage build. The build stage copies package.json and the lockfile first and runs npm ci, so that layer is cached, then copies the source and builds TypeScript, then prunes devDependencies. The runtime stage starts from a slim LTS Node image, sets NODE_ENV=production, copies only package.json, production node_modules and the compiled output, owned by the node user, and switches to USER node so it doesn't run as root. The CMD uses exec form, node dist/server.js, not npm start, so SIGTERM reaches Node. I add a .dockerignore for node_modules, .git and .env files, set a memory limit, scan the image in CI, and never put secrets in ENV or ARG.

**Follow-up questions:**
- **Alpine or slim?** — Slim (glibc) is the safer default; Alpine is smaller but uses musl, which can break native modules. Distroless is smallest and safest but has no shell for debugging.
- **Why copy the lockfile before the source?** — Docker layer caching: dependencies are reinstalled only when the lockfile changes.
- **What is the PID 1 problem?** — Node.js is not designed to be PID 1 (signal handling and zombie reaping differ); use `docker run --init` or tini.

### Q6. Explain the main rate limiting algorithms. Which would you use for a public API?

**What the interviewer is checking:** Algorithm knowledge and trade-offs.

**Short spoken answer (30–60 seconds):**
> A fixed window counts requests per calendar window, like per minute. It's just one counter with INCR and EXPIRE, but it allows bursts at the boundary: a client can send the full limit at the end of one minute and again at the start of the next. A sliding window log stores every request timestamp and counts the last N seconds — exact but memory-heavy. A sliding window counter estimates using the previous window's count weighted by the overlap plus the current count — cheap and smooth. A token bucket has a capacity and a refill rate: each request takes a token, so short bursts up to the capacity are allowed while the average stays at the refill rate. For a public API I'd use a token bucket or a sliding window counter per API key, stored in Redis so all instances share it, return 429 with Retry-After and RateLimit headers, and use stricter limits for login.

**Follow-up questions:**
- **Why does the in-memory version break with multiple instances?** — Each instance counts separately, so the effective limit is multiplied by the number of instances, and counters reset on restart.
- **How do you make the Redis check atomic?** — `INCR` is atomic for a fixed window; for sliding windows and token buckets use a Lua script so read-compute-write happens in one step.
- **Leaky bucket vs token bucket?** — Leaky bucket queues requests and drains them at a constant rate (smooth output, added latency); token bucket allows bursts immediately and rejects when empty.

**Common mistakes:** Rate limiting by IP behind a proxy without `trust proxy` (every client shares the proxy IP); trusting `X-Forwarded-For` from anyone.

### Q7. What does this print? (token bucket)

```js
// TokenBucket as defined in this document: capacity 5, refill 1 token per second, fake clock t
let t = 0;
const bucket = new TokenBucket({ capacity: 5, refillPerSecond: 1, now: () => t });
console.log(Array.from({ length: 7 }, () => bucket.tryRemove()).join(" "));
t += 2000;
console.log(bucket.tryRemove(), bucket.tryRemove(), bucket.tryRemove());
```

**Answer:**

```text
true true true true true false false
true true false
```

**Explanation:** The bucket starts full with 5 tokens. With no time passing, the first five calls succeed and the last two fail. After 2 seconds, refill adds 2 tokens (1 per second), so two calls succeed and the third fails.

### Q8. What does this print? (fixed window boundary)

```js
let clock = 59_000;
const fixed = createFixedWindowLimiter({ limit: 3, windowMs: 60_000, now: () => clock });
const a = [fixed("u1"), fixed("u1"), fixed("u1")];
clock = 60_500;
const b = [fixed("u1"), fixed("u1"), fixed("u1"), fixed("u1")];
console.log(a.join(" "), "|", b.join(" "));
```

**Answer:** `true true true | true true true false`

**Explanation:** At 59,000 ms we are in the window starting at 0; three requests are allowed. At 60,500 ms a new window (starting at 60,000) begins with a fresh counter, so three more are allowed and the fourth is rejected. Six requests passed within 1.5 seconds although the limit is "3 per minute" — the fixed window boundary burst. A sliding window would reject requests 4 and 5.

### Q9. What is prototype pollution? Show how it happens.

**What the interviewer is checking:** JavaScript-specific security knowledge.

**Short spoken answer (30–60 seconds):**
> Almost every object inherits from Object.prototype. Prototype pollution is when user input manages to add properties to Object.prototype, so every object in the process suddenly has them. The usual path is a recursive merge or "set by path" function that copies a key called __proto__ from parsed JSON: target.__proto__ is Object.prototype, so the merge writes into it. Then a check like if (user.isAdmin) becomes true for everyone. To prevent it, I validate input with a strict schema that rejects unknown keys, skip __proto__, constructor and prototype in merge utilities, use Map or Object.create(null) for user-keyed data, keep dependencies updated, and I can run Node with --disable-proto.

**Code:**

```js
const payload = JSON.parse('{"__proto__": {"isAdmin": true}}');
mergeUnsafe({}, payload);
console.log({}.isAdmin); // true
```

**Follow-up questions:**
- **Why does `JSON.parse` matter here?** — An object literal `{ __proto__: {...} }` sets the prototype of that one object, but `JSON.parse` creates an own property named `"__proto__"`, which a `for...in` merge then copies through the setter.
- **Can it lead to remote code execution?** — In some cases, yes: polluted options can change how libraries spawn processes or render templates ("gadgets"). That is why it is treated as serious.

### Q10. What is ReDoS and how do you prevent it in Node.js?

**Short spoken answer (30–60 seconds):**
> ReDoS is regular expression denial of service. Some regexes with nested or overlapping quantifiers, like ^(a+)+$, backtrack exponentially on inputs that almost match. Because regex matching runs on the main thread in Node, one request with a crafted 30-character string can block the event loop for seconds, and every other request waits. I measured /^(a+)+$/ going from 77 milliseconds at 24 characters to 1.5 seconds at 28 — about four times slower for every two characters. Prevention: limit input length before matching, avoid nested quantifiers, lint regexes for unsafe patterns, use well-tested validators, and for user-supplied patterns use a linear-time engine like RE2.

### Q11. Your Node.js service's memory keeps growing until it is OOM-killed. How do you investigate?

**What the interviewer is checking:** Systematic debugging of memory leaks.

**Short spoken answer (30–60 seconds):**
> First I confirm it's a leak: heap used grows steadily under constant load and doesn't drop after garbage collection, versus memory that just follows traffic. I check the usual suspects: unbounded caches or Maps, global arrays, event listeners added per request, intervals never cleared, and queues that grow under load. Then I take heap snapshots a few minutes apart — with --heapsnapshot-signal or v8.writeHeapSnapshot — ideally on an instance out of rotation, and compare them in Chrome DevTools. The comparison view shows which object types grow, and the retainers path shows what keeps them alive, like a module-level Map. I fix it, for example by adding a size limit and TTL, and confirm with a load test that memory is flat.

**Follow-up questions:**
- **What if it crashes before you can take a snapshot?** — Use `--heapsnapshot-near-heap-limit` to write snapshots automatically near the limit, or reproduce in staging with a smaller heap (`--max-old-space-size`).
- **Heap is stable but RSS grows?** — Look outside the JS heap: Buffers and external memory (`process.memoryUsage().external`, `arrayBuffers`), native addons, or memory fragmentation.
- **Why not just raise the memory limit?** — It only delays the crash and hides the bug.

### Q12. How do you profile a slow Node.js endpoint?

**Short answer:** First decide whether it is **CPU** or **waiting**. Check event loop utilization and delay: if ELU is high, it is CPU — record a CPU profile (`node --cpu-prof`, or `--inspect` with Chrome DevTools, or `clinic flame`/`0x`) under realistic load (for example `autocannon`) and look for wide frames in the flame graph. If ELU is low but latency is high, it is waiting — use tracing (OpenTelemetry) to see which query or downstream call is slow, check database query plans, and check connection pool wait time. Fix the biggest cost first and measure again.

### Q13. Users see random 502 errors from the load balancer, about 0.1% of requests, especially under low traffic. What could it be?

**Short spoken answer (30–60 seconds):**
> A classic cause is a keep-alive timeout mismatch. Node's default server.keepAliveTimeout is 5 seconds, while load balancers like AWS ALB keep idle connections for 60 seconds. When Node closes an idle connection at the same moment the load balancer reuses it for a new request, the load balancer gets a connection reset and returns 502. It happens more with low traffic because connections sit idle longer. The fix is to set keepAliveTimeout higher than the load balancer's idle timeout, for example 65 seconds. Other causes I'd check: instances being killed without graceful shutdown during deploys, crashes, or readiness that says ready before the server listens.

### Q14. How do you deploy a database migration without downtime?

**Short spoken answer (30–60 seconds):**
> During a rolling deploy, old and new versions of the app run at the same time, so every schema change must work with both. I use expand and contract. First expand: add the new column or table in a backward-compatible way, nullable or with a default, and deploy. Then deploy code that writes both the old and new fields and reads the new one, and backfill existing rows in batches. Once nothing reads the old field, contract: remove it in a later release. I never rename or drop a column in the same deploy that stops using it. I also watch for migrations that lock big tables, and run long backfills as background jobs.

### Q15. Rolling, blue-green or canary — how do you choose?

**Short answer:** **Rolling** is the default in Kubernetes: no extra capacity, but old and new versions overlap and rollback is another rollout. **Blue-green** gives an instant switch and instant rollback, at the cost of double capacity during the deploy — good for risky releases or when versions must not mix. **Canary** sends a small share of traffic to the new version and increases it while watching error rate and latency — best for limiting the blast radius in high-traffic systems, but it needs good metrics and traffic splitting. Feature flags complement all three by separating deploy from release.

### Q16. What metrics would you put on a dashboard for a Node.js API?

**Short answer:** The **RED** metrics per route — request rate, error rate (5xx and important 4xx), and latency percentiles (p50, p95, p99) using route patterns as labels. Plus Node.js runtime metrics: event loop delay p99 and event loop utilization, heap used and GC pauses, CPU and memory per instance, restarts. Plus dependencies: DB pool usage and wait time, query latency, Redis latency and errors, cache hit ratio, queue depth and job age, outgoing call latency and errors. Alert on what users feel (error rate, latency SLO burn), not on every internal metric.

### Q17. Code review: what is wrong with this production setup?

```js
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.set("trust proxy", true);

app.get("/health", async (req, res) => {
  await db.query("SELECT 1");
  res.send("ok");
});

app.get("/api/report", async (req, res) => {
  const rows = await db.query("SELECT * FROM orders");
  res.json(buildHugeReport(rows)); // CPU-heavy
});

process.on("uncaughtException", (err) => console.log(err));
app.listen(3000);
```

**Answer:**

1. **CORS reflects any origin with credentials** — any website can make authenticated requests and read the responses. Use an explicit allow-list.
2. **50 MB JSON limit** — allows memory exhaustion; use a small limit (for example 100 KB) and stream uploads.
3. **`trust proxy` set to `true`** — clients can spoof their IP with `X-Forwarded-For`, defeating IP rate limits and audit logs. Set the actual number of proxies.
4. **One health endpoint checking the database** — if used for liveness, a DB blip restarts every instance. Split liveness and readiness; add a timeout to the DB check.
5. **Unbounded query + CPU-heavy report in the request** — loads all orders into memory and blocks the event loop. Paginate/stream, and generate the report in a background job or worker pool.
6. **`uncaughtException` only logs** — the process keeps running in an unknown state. Log with a real logger and exit non-zero.
7. **No graceful shutdown, no helmet, no rate limiting, no timeouts, `console.log` instead of structured logging.**

### Q18. When would you choose serverless for a Node.js backend, and what are the pitfalls?

**Short spoken answer (30–60 seconds):**
> Serverless functions are great for event-driven or spiky workloads — processing an uploaded file, handling webhooks, scheduled tasks, or an API with very uneven traffic — because I pay per use and don't manage servers. The pitfalls: cold starts add latency, especially with big dependency trees; there are execution time and payload limits; in-memory state and caches don't survive between invocations; WebSockets and long-lived connections need special services; and many concurrent function instances can exhaust the database connections, so I'd use a connection proxy like RDS Proxy or PgBouncer. For a steady, high-traffic API, containers are usually cheaper and simpler to reason about.

---

## Summary

- **Config:** environment variables, validated at startup into a typed frozen object; secrets in a secret manager; `--env-file` for local development.
- **Logging:** JSON to stdout with pino; levels; redact secrets; request IDs on every line via `AsyncLocalStorage` and pino `mixin`.
- **Health:** liveness = process only; readiness = critical dependencies and shutdown state. Never check the database in liveness.
- **Graceful shutdown:** on `SIGTERM` → not ready → `server.close()` → finish requests → stop workers → close pools → exit, with a force timeout below the grace period.
- **Containers:** multi-stage build, slim LTS base, `npm ci`, prune dev dependencies, `USER node`, exec-form `CMD ["node", ...]`, `.dockerignore`, memory limits; one process per container, scale with replicas.
- **Security:** helmet, strict CORS, body limits, server and client timeouts, no `eval`/`exec` with input, prototype pollution and ReDoS defenses, `npm ci` + audit, least privilege, permission model (stable since 22.13 / 23.5), correct `trust proxy`.
- **Rate limiting:** fixed window (boundary bursts), sliding log (exact, memory), sliding counter (cheap, smooth), token bucket (bursts + average); shared in Redis; 429 + headers; stricter for login.
- **Performance:** measure first; `--cpu-prof`/`--inspect`/clinic for CPU; heap snapshots for leaks; keep-alive agents; one right-sized pool per process; compression at the proxy; `keepAliveTimeout` above the load balancer's idle timeout.
- **Observability:** RED metrics + event loop metrics with `@prometheus-io/client` (formerly `prom-client`), route patterns as labels; OpenTelemetry tracing loaded with `--import`.
- **Deploys:** rolling, blue-green or canary with honest readiness, graceful shutdown, expand/contract migrations and fast rollback.

## References

- The Twelve-Factor App: https://12factor.net/
- Node.js docs — Command-line options (`--env-file`, `--cpu-prof`, `--heapsnapshot-signal`, `--permission`): https://nodejs.org/api/cli.html
- Node.js docs — `process` (signals, `loadEnvFile`, `uncaughtException`): https://nodejs.org/api/process.html
- Node.js docs — HTTP (`server.close`, `closeAllConnections`, timeouts, `globalAgent`): https://nodejs.org/api/http.html
- Node.js docs — Asynchronous context tracking (`AsyncLocalStorage`): https://nodejs.org/api/async_context.html
- Node.js docs — Permissions: https://nodejs.org/api/permissions.html
- Node.js guide — Diagnostics: memory and profiling: https://nodejs.org/en/learn/diagnostics/memory
- Node.js Docker best practices: https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md
- Docker docs — Multi-stage builds: https://docs.docker.com/build/building/multi-stage/
- Kubernetes docs — Liveness, readiness and startup probes: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/
- Kubernetes docs — Pod termination: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-termination
- pino: https://getpino.io/
- helmet: https://helmetjs.github.io/
- express-rate-limit: https://express-rate-limit.mintlify.app/
- Express — Production best practices (security and performance): https://expressjs.com/en/advanced/best-practice-security.html
- Prometheus client for Node.js (`@prometheus-io/client`): https://github.com/prometheus/client_js
- OpenTelemetry JavaScript — Getting started with Node.js: https://opentelemetry.io/docs/languages/js/getting-started/nodejs/
- OWASP — Node.js Security Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html
- OWASP — Regular expression Denial of Service (ReDoS): https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS
- Clinic.js: https://clinicjs.org/

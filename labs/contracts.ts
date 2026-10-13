export type IssueStatus = "open" | "closed";
export type Issue = { id: string; title: string; status: IssueStatus };
export type LoadState<T> =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; data: T }
  | { kind: "error"; message: string };

function object(value: unknown): Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError("Expected object");
  }
  return value as Record<string, unknown>;
}

export function parseTitle(value: unknown): string {
  if (typeof value !== "string") throw new TypeError("Title must be text");
  const title = value.trim();
  if (title.length === 0 || title.length > 120) {
    throw new TypeError("Title must contain 1–120 characters after trimming");
  }
  return title;
}

export function parseNewIssue(value: unknown): { title: string } {
  const row = object(value);
  if (Object.keys(row).some(key => key !== "title")) {
    throw new TypeError("Only title may be supplied");
  }
  return { title: parseTitle(row.title) };
}

export function parseIssue(value: unknown): Issue {
  const row = object(value);
  if (typeof row.id !== "string" || !row.id.trim() || row.id.length > 120) {
    throw new TypeError("Invalid issue ID");
  }
  if (row.status !== "open" && row.status !== "closed") {
    throw new TypeError("Invalid issue status");
  }
  return { id: row.id, title: parseTitle(row.title), status: row.status };
}

export function parseIssues(value: unknown): Issue[] {
  if (!Array.isArray(value)) throw new TypeError("Expected issue list");
  // Array.from visits holes too; map would silently skip missing rows.
  return Array.from(value, parseIssue);
}

export function get<T, K extends keyof T>(value: T, key: K): T[K] {
  return value[key];
}

export function pluck<T, K extends keyof T>(rows: readonly T[], key: K): T[K][] {
  return rows.map(row => row[key]);
}

export type WritableIssue = Pick<Issue, "title" | "status">;
export type IssuePatch = Partial<WritableIssue>;
export type Result<T> = { ok: true; value: T } | { ok: false; error: string };
export type ArrayOf<T> = T extends unknown ? T[] : never;

// Compile-only counterexamples. @ts-expect-error fails if the error disappears.
function typeEvidence(): void {
  const value = { id: "i1", retries: 2 };
  const retries: number = get(value, "retries");
  void retries;
  // @ts-expect-error Missing keys are rejected.
  get(value, "missing");
  // @ts-expect-error Unknown needs narrowing.
  const text: string = {} as unknown;
  void text;
  // @ts-expect-error Readonly is checked by the compiler.
  const mutable: string[] = ["x"] as readonly string[];
  void mutable;
  const invalid: IssuePatch = {
    // @ts-expect-error ID is not writable.
    id: "new"
  };
  void invalid;
}
void typeEvidence;

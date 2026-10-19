# 07 — Node.js and Backend Engineering

This section teaches backend engineering with Node.js. It starts with how the runtime works inside (V8, libuv, the event loop) and goes on to HTTP servers, REST API design, validation, authentication, databases, caching, concurrency, background jobs and running Node.js in production. Examples use JavaScript and TypeScript with Express, and the documents explain when Fastify or NestJS is a better fit.

Version assumption: **Node.js 22 and 24 LTS**.

**Before this:** [02 — JavaScript](../02-javascript/README.md) (especially the event loop, promises and modules) and [HTTP](../01-cs-and-web-fundamentals/05-http-https-and-tls.md).

## Study order

### Part 1 — The runtime

| # | Topic | What you will learn |
| --- | --- | --- |
| 1 | [Node.js runtime and architecture](01-nodejs-runtime-and-architecture.md) | V8 + libuv, the thread pool, non-blocking I/O, Node vs browser |
| 2 | [The Node.js event loop](02-node-event-loop.md) | The phases, `process.nextTick`, `setImmediate` vs `setTimeout`, blocking the loop |
| 3 | [Modules, npm and packages](03-modules-npm-and-packages.md) | `require` resolution, ESM in Node, package.json, semver, lockfiles, npm vs pnpm |
| 4 | [Core modules: fs, path, events, Buffer](04-core-modules-fs-path-events-buffer.md) | File system, EventEmitter, Buffer, crypto, process signals |
| 5 | [Streams](05-streams.md) | Stream types, piping, backpressure, transforms, streaming HTTP |

### Part 2 — Building APIs

| # | Topic | What you will learn |
| --- | --- | --- |
| 6 | [HTTP servers and Express](06-http-servers-and-express.md) | The `http` module, Express routing and middleware, project structure |
| 7 | [REST API design](07-rest-api-design.md) | Resources, status codes, errors, pagination, versioning, idempotency |
| 8 | [Validation and error handling](08-validation-and-error-handling.md) | Input validation, error middleware, crashes, graceful shutdown |
| 9 | [Authentication and authorization](09-authentication-and-authorization.md) | Passwords, sessions vs JWT, refresh tokens, OAuth 2.0/OIDC, RBAC |
| 10 | [Databases](10-databases.md) | SQL vs NoSQL, indexes, transactions, N+1, connection pools, ORMs |

### Part 3 — Scale and production

| # | Topic | What you will learn |
| --- | --- | --- |
| 11 | [Caching](11-caching.md) | Cache-aside, Redis, invalidation, cache stampede, HTTP caching |
| 12 | [Concurrency: worker threads and cluster](12-concurrency-worker-threads-and-cluster.md) | CPU-bound work, worker threads, child processes, cluster, race conditions |
| 13 | [Background jobs and queues](13-background-jobs-and-queues.md) | BullMQ, RabbitMQ, Kafka, retries, idempotent consumers, webhooks |
| 14 | [Production Node.js](14-production-nodejs.md) | Config, logging, health checks, Docker, security hardening, rate limiting, profiling |

**Interview practice:** every topic ends with its own interview questions. For mixed questions across the whole subject, see [interview-questions.md](interview-questions.md). API testing is in [10 — Testing Node.js APIs](../10-testing-security-production/03-testing-nodejs-apis.md).

**Next subject:** [08 — Electron and Desktop Development](../08-electron-desktop/README.md)

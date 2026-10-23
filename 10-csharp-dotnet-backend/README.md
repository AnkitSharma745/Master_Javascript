# 10 — C# and .NET Backend

This section teaches backend development with C# and ASP.NET Core: the C# language and type system, async/await and threading, memory and performance, ASP.NET Core and dependency injection, Web APIs, Entity Framework Core, authentication, caching and background jobs, testing, and production architecture.

Version assumption: **C# 14 on .NET 10 (LTS)**. Differences from **.NET 8 (LTS)**, which many companies still run, are clearly marked.

**Before this:** [07 — Node.js and Backend](../07-nodejs-backend/README.md) is helpful. This section compares .NET with Node.js where that makes things faster to learn, and links to the general backend concepts (REST design, auth, databases) instead of repeating them.

## Study order

### Part 1 — The C# language

| # | Topic | What you will learn |
| --- | --- | --- |
| 1 | [C# fundamentals and the type system](01-csharp-fundamentals-and-type-system.md) | Value vs reference types, structs, records, equality, nullable types, pattern matching |
| 2 | [OOP, interfaces, generics and delegates](02-oop-interfaces-generics-and-delegates.md) | Inheritance and hiding, interfaces vs abstract classes, generics, delegates, events, lambdas |
| 3 | [Collections and LINQ](03-collections-and-linq.md) | List, Dictionary, HashSet, IEnumerable vs IQueryable, deferred execution, LINQ |
| 4 | [Async/await, tasks and threading](04-async-await-tasks-and-threading.md) | Task vs Thread, the state machine, ConfigureAwait, deadlocks, cancellation, locking, channels |
| 5 | [Memory, GC and performance](05-memory-gc-and-performance.md) | Garbage collector generations, IDisposable, Span&lt;T&gt;, pooling, diagnostics, Native AOT |

### Part 2 — ASP.NET Core

| # | Topic | What you will learn |
| --- | --- | --- |
| 6 | [.NET runtime, SDK and project structure](06-dotnet-runtime-sdk-and-project-structure.md) | CLR, IL, JIT, the dotnet CLI, .csproj, NuGet, publishing options |
| 7 | [ASP.NET Core fundamentals and middleware](07-aspnet-core-fundamentals-and-middleware.md) | Hosting, the middleware pipeline, routing, minimal APIs vs controllers, configuration, options |
| 8 | [Dependency injection in ASP.NET Core](08-dependency-injection-in-aspnet-core.md) | Lifetimes, captive dependencies, scopes, keyed services, IHttpClientFactory |
| 9 | [Web APIs, validation and error handling](09-web-apis-validation-and-error-handling.md) | DTOs, validation, ProblemDetails, versioning, OpenAPI, rate limiting |
| 10 | [Entity Framework Core and data access](10-entity-framework-core-and-data-access.md) | DbContext, migrations, tracking, N+1, transactions, concurrency, Dapper |

### Part 3 — Production backend

| # | Topic | What you will learn |
| --- | --- | --- |
| 11 | [Authentication and authorization](11-authentication-and-authorization.md) | Cookies vs JWT, Identity, policies, resource-based authorization, antiforgery |
| 12 | [Caching, background jobs and messaging](12-caching-background-jobs-and-messaging.md) | IMemoryCache, HybridCache, BackgroundService, message brokers, SignalR |
| 13 | [Testing .NET applications](13-testing-dotnet-applications.md) | xUnit, mocking, WebApplicationFactory, Testcontainers, TimeProvider |
| 14 | [Production, architecture and performance](14-production-architecture-and-performance.md) | Logging, health checks, resilience, Docker, Clean Architecture, CQRS trade-offs |

**Interview practice:** every topic ends with its own interview questions. For mixed questions across the whole subject, see [interview-questions.md](interview-questions.md).

**Next subject:** [11 — Coding Problems and Technical Interviews](../11-coding-interviews/README.md)

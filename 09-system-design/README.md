# 09 — Frontend and Full-Stack System Design

System design interviews ask you to design a whole application and explain your trade-offs. This section first teaches how to run that interview and the building blocks (scaling, caching, API styles, real-time communication, frontend architecture, auth and multi-tenancy). Then it works through eight complete case studies, from an enterprise admin portal to a file upload service.

**Before this:** [01 — Fundamentals](../01-cs-and-web-fundamentals/README.md), [05 — Frontend](../05-frontend-engineering/README.md) and [07 — Node.js](../07-nodejs-backend/README.md). You can start the concept chapters earlier, but the case studies assume you know those subjects.

## Study order

### Part 1 — Concepts

| # | Topic | What you will learn |
| --- | --- | --- |
| 1 | [How to approach system design interviews](01-system-design-interview-approach.md) | A step-by-step framework, estimates, the RADIO framework for frontend design |
| 2 | [Scalability and core building blocks](02-scalability-and-core-building-blocks.md) | Load balancers, replication, sharding, CAP, queues, microservices |
| 3 | [Caching strategies and invalidation](03-caching-strategies-and-invalidation.md) | Caching at every layer, strategies, invalidation, stampede protection |
| 4 | [API styles and real-time communication](04-api-styles-and-real-time-communication.md) | REST vs GraphQL vs gRPC, BFF, polling vs SSE vs WebSockets |
| 5 | [Frontend architecture at scale](05-frontend-architecture-at-scale.md) | Boundaries, design systems, monorepos, micro-frontends, multi-tenant UIs |
| 6 | [Auth architecture and multi-tenancy](06-auth-architecture-and-multi-tenancy.md) | SSO and OIDC, token handling in SPAs, RBAC/ABAC, tenant isolation |

### Part 2 — Case studies

| # | Case study | Main ideas |
| --- | --- | --- |
| 7 | [Enterprise admin portal](07-case-study-enterprise-admin-portal.md) | RBAC, large tables, audit logs, complex forms |
| 8 | [E-commerce application](08-case-study-ecommerce-application.md) | Catalog, cart, checkout, payments, inventory, SEO |
| 9 | [Analytics dashboard and large tables](09-case-study-analytics-dashboard-and-large-tables.md) | Virtual scrolling, server-side queries, charts, exports |
| 10 | [Real-time chat and notifications](10-case-study-real-time-chat-and-notifications.md) | WebSockets at scale, presence, ordering, offline |
| 11 | [Autocomplete search](11-case-study-autocomplete-search.md) | Debounce, cancellation, caching, prefix search, ranking |
| 12 | [News feed with infinite scroll](12-case-study-news-feed-infinite-scroll.md) | Fan-out, cursor pagination, virtualization |
| 13 | [URL shortener](13-case-study-url-shortener.md) | ID generation, redirects, analytics, scale estimates |
| 14 | [File upload service](14-case-study-file-upload-service.md) | Chunked and resumable uploads, presigned URLs, scanning |

**Interview practice:** every document ends with its own interview questions. For mixed questions across the whole subject, see [interview-questions.md](interview-questions.md).

**Next subject:** [10 — C# and .NET Backend](../10-csharp-dotnet-backend/README.md)

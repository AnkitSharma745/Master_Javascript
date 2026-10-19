# 10 — Testing, Security and Production Engineering

This section covers what turns working code into reliable software: testing at every level, web security, protecting secrets and dependencies, debugging and profiling, observability, resilience patterns, and CI/CD.

**Before this:** [02 — JavaScript](../02-javascript/README.md). The security chapters build on [browser storage and web security basics](../01-cs-and-web-fundamentals/08-browser-storage-and-web-security-basics.md).

## Study order

### Part 1 — Testing

| # | Topic | What you will learn |
| --- | --- | --- |
| 1 | [Testing fundamentals](01-testing-fundamentals.md) | Test types, the test pyramid, test doubles, TDD, coverage, flaky tests |
| 2 | [Unit testing with Jest and Vitest](02-unit-testing-jest-and-vitest.md) | Matchers, mocks, fake timers, async tests, writing testable code |
| 3 | [Testing Node.js APIs](03-testing-nodejs-apis.md) | supertest, real vs mocked databases, auth routes, load testing |
| 4 | [Component and E2E testing with Playwright](04-component-and-e2e-testing-playwright.md) | Testing Library, Playwright locators, fixtures, network mocking, Electron testing |

Angular-specific testing is in [06 — Angular testing](../06-angular-16/14-testing.md).

### Part 2 — Security

| # | Topic | What you will learn |
| --- | --- | --- |
| 5 | [Web security: XSS, CSRF, CORS, CSP](05-web-security-xss-csrf-cors-csp.md) | How each attack works, how to defend, security headers, OWASP Top 10 |
| 6 | [Secure auth, secrets and dependencies](06-secure-auth-secrets-and-dependencies.md) | Auth checklist, secrets management, supply-chain security, threat modeling |

### Part 3 — Production engineering

| # | Topic | What you will learn |
| --- | --- | --- |
| 7 | [Debugging and profiling](07-debugging-and-profiling.md) | DevTools in depth, Node and Electron debugging, finding memory leaks |
| 8 | [Logging, monitoring and observability](08-logging-monitoring-and-observability.md) | Logs, metrics, traces, SLOs, alerting, OpenTelemetry |
| 9 | [Reliability and resilience](09-reliability-and-resilience.md) | Timeouts, retries with backoff, circuit breakers, graceful degradation |
| 10 | [CI/CD and deployment](10-ci-cd-and-deployment.md) | Pipelines, GitHub Actions, deployment strategies, Docker and Kubernetes basics |

**Interview practice:** every topic ends with its own interview questions. For mixed questions across the whole subject, see [interview-questions.md](interview-questions.md).

**Next subject:** [11 — Coding Problems and Technical Interviews](../11-coding-interviews/README.md)

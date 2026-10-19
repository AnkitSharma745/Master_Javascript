# References and Version Notes

These are the main sources used to write and check this repository. Prefer the official documentation when you want to go deeper. Each topic document also ends with its own short reference list.

## Version assumptions

| Technology | Version used in this repository | Notes |
| --- | --- | --- |
| JavaScript | ECMAScript 2025 | Modern features are labeled with the edition that added them. |
| TypeScript | 5.x | Examples compile with TypeScript 5.0+ unless a newer feature is labeled. |
| Angular | 16 (main target) | Newer-version differences are marked "Newer Angular (17+)". See [Angular 16 vs newer versions](06-angular-16/16-angular-16-vs-newer-versions.md). |
| RxJS | 7.x | The version used by Angular 16. |
| Node.js | 22 and 24 LTS | Newer or experimental APIs are labeled. |
| Electron | Current stable majors | Secure defaults: `contextIsolation: true`, `nodeIntegration: false`, `sandbox: true`. |
| React | 18 and 19 | Frontend chapter only. |

## Language and platform

- ECMAScript specification — https://tc39.es/ecma262/
- TC39 finished proposals (which feature landed in which year) — https://github.com/tc39/proposals/blob/main/finished-proposals.md
- MDN Web Docs (JavaScript, Web APIs, HTTP, CSS, HTML) — https://developer.mozilla.org/
- HTML Living Standard (event loop, script loading) — https://html.spec.whatwg.org/
- V8 blog (engine internals, garbage collection) — https://v8.dev/blog
- web.dev (performance, Core Web Vitals) — https://web.dev/
- Chrome for Developers (DevTools, rendering) — https://developer.chrome.com/

## TypeScript

- TypeScript Handbook — https://www.typescriptlang.org/docs/handbook/intro.html
- TSConfig reference — https://www.typescriptlang.org/tsconfig
- TypeScript release notes — https://www.typescriptlang.org/docs/handbook/release-notes/overview.html
- Zod (runtime validation) — https://zod.dev/

## Angular, RxJS and NgRx

- Angular 16 documentation (archived version site) — https://v16.angular.io/docs
- Current Angular documentation — https://angular.dev/
- Angular blog (release announcements) — https://blog.angular.dev/
- Angular changelog — https://github.com/angular/angular/blob/main/CHANGELOG.md
- Angular version support policy — https://angular.dev/reference/releases
- RxJS documentation — https://rxjs.dev/
- NgRx documentation — https://ngrx.io/

## Frontend

- React documentation — https://react.dev/
- WCAG 2.2 — https://www.w3.org/TR/WCAG22/
- WAI-ARIA Authoring Practices Guide — https://www.w3.org/WAI/ARIA/apg/
- Vite — https://vite.dev/
- webpack — https://webpack.js.org/

## Node.js and backend

- Node.js API documentation — https://nodejs.org/docs/latest/api/
- Node.js release schedule — https://nodejs.org/en/about/previous-releases
- Node.js guide: the event loop, timers and `process.nextTick()` — https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick
- Express — https://expressjs.com/
- Fastify — https://fastify.dev/
- NestJS — https://docs.nestjs.com/
- PostgreSQL documentation — https://www.postgresql.org/docs/
- MongoDB documentation — https://www.mongodb.com/docs/
- Redis documentation — https://redis.io/docs/
- BullMQ — https://docs.bullmq.io/

## Electron

- Electron documentation — https://www.electronjs.org/docs/latest/
- Electron process model — https://www.electronjs.org/docs/latest/tutorial/process-model
- Electron security checklist — https://www.electronjs.org/docs/latest/tutorial/security
- Electron release timelines and support — https://www.electronjs.org/docs/latest/tutorial/electron-timelines
- electron-builder — https://www.electron.build/
- Electron Forge — https://www.electronforge.io/

## Protocols and standards (RFCs)

- HTTP Semantics (RFC 9110) — https://www.rfc-editor.org/rfc/rfc9110
- HTTP Caching (RFC 9111) — https://www.rfc-editor.org/rfc/rfc9111
- HTTP/2 (RFC 9113) — https://www.rfc-editor.org/rfc/rfc9113
- HTTP/3 (RFC 9114) and QUIC (RFC 9000) — https://www.rfc-editor.org/rfc/rfc9114
- TLS 1.3 (RFC 8446) — https://www.rfc-editor.org/rfc/rfc8446
- Problem Details for HTTP APIs (RFC 9457) — https://www.rfc-editor.org/rfc/rfc9457
- OAuth 2.0 (RFC 6749) and PKCE (RFC 7636) — https://www.rfc-editor.org/rfc/rfc6749
- JSON Web Token (RFC 7519) — https://www.rfc-editor.org/rfc/rfc7519
- OpenID Connect Core — https://openid.net/specs/openid-connect-core-1_0.html
- WebSocket protocol (RFC 6455) — https://www.rfc-editor.org/rfc/rfc6455

## Testing, security and production

- Jest — https://jestjs.io/
- Vitest — https://vitest.dev/
- Node.js test runner — https://nodejs.org/api/test.html
- Playwright — https://playwright.dev/
- Testing Library — https://testing-library.com/
- OWASP Top 10 — https://owasp.org/Top10/
- OWASP Cheat Sheet Series — https://cheatsheetseries.owasp.org/
- OpenTelemetry — https://opentelemetry.io/docs/
- Google SRE books (SLOs, monitoring, incident response) — https://sre.google/books/
- GitHub Actions documentation — https://docs.github.com/actions

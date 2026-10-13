# Angular 16 feature exercise

This is a **feature library exercise**, not a bootstrapped enterprise portal. It compiles NgModule composition, a nonNullable reactive search control, an injectable HttpClient adapter, shared runtime parsing, OnPush, AsyncPipe, loading/error/empty states, and stable row tracking. Source lives in [src/issue.module.ts](src/issue.module.ts); data flow lives in [src/search.ts](src/search.ts).

The shared parser in `../../labs/contracts.ts` is compiled with this project's compiler too. This deliberately checks one contract with two isolated compiler baselines, rather than maintaining two drifting parser copies. The emitted directory mirrors repository paths because rootDir spans the shared contract.

```sh
cd projects/angular16-feature
npm ci --ignore-scripts
npm test
```

ngc checks TypeScript and Angular templates; RxJS TestScheduler checks prior-inner unsubscription, recovery after an inner failure, and switchMap/mergeMap/concatMap/exhaustMap behavior. Search replacement occurs after the normalized term passes debounce. A prior result can legitimately arrive during the debounce period; define whether to keep or clear it according to the product's stale-data policy.

Packages are pinned to Angular 16.2.12, TS 5.1.6, RxJS 7.8.2, and Zone.js 0.13.3. Read [version policy](../../references/versions.md) before reproducing checks; historical Angular-compatible Node versions are unsupported today. Local compiler/tests ran on Node 22.20.0, outside Angular 16's historical official matrix. CI separately defines a historical Node 18 maintenance exercise, but its hosted execution was not observed in this task.

To integrate into your existing Angular 16 application, import IssueModule once in the appropriate feature boundary, mount learning-issue-search, and configure same-origin /api/issues routing/proxy. A real app should provide transport concerns at the root; this self-contained exercise imports HttpClientModule to make its dependency visible. Its fixed input ID assumes one mounted instance; a reusable component library should accept/generate unique IDs.

AsyncPipe owns view subscriptions. Avoid a manual nested subscribe in the component. The API adapter requests unknown then parses it, so a malformed successful response becomes a stream error. Inner catchError maps it to a feature state while permitting later queries. The component uses conventional Angular 16 syntax, not newer built-in control flow.

Future work: routed shell, edit forms/server field errors, authentication/permission UX with server enforcement, NgRx where justified, i18n, accessible component browser tests, end-to-end integration, SSR/hydration and production build/deployment. None of those is claimed as implemented. Interview: draw raw intent → debounce → replacement → HttpClient → parser → state → AsyncPipe, then discuss error recovery and cancellation limits.

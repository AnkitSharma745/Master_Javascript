# 13 — React Interview Preparation

This section prepares you for React interviews: React itself and the tools used with it, including Redux Toolkit, axios, TanStack Query, React Router, React Hook Form, React Testing Library and Next.js.

It is **interview-first**. Each document explains the concepts briefly and clearly, then spends most of its space on interview questions. For each one you get:

- **What the interviewer is checking** — the real point of the question.
- **What to say** — a natural 30–60 second spoken answer.
- **Deeper explanation** — the concept behind the answer, with code.
- **Follow-up questions and how to answer them** — what usually comes next, with answers.
- **Common mistakes** — answers that lose points, and why.

Versions (October 2026): **React 19.3** (19.2 came out in October 2025, 19.3 in September 2026), with React 18 differences marked; React Compiler 1.0 (stable since October 2025); Redux Toolkit 2 with React-Redux 9; TanStack Query v5; axios 1.x; **React Router v7** as the main target, with notes on **v8** (June 2026: `react-router-dom` removed, ESM-only, React 19.2.7+); React Hook Form 7 and Zod 4; Vitest, React Testing Library and **MSW 3**; **Next.js 16** (16.4 is the latest; `proxy.ts` replaces `middleware.ts`; Cache Components).

**Before this:** [02 — JavaScript](../02-javascript/README.md) (closures, `this`, promises, the event loop) and the short [React essentials](../05-frontend-engineering/08-react-essentials.md) chapter.

## Study order

| # | Topic | What you will learn |
| --- | --- | --- |
| 1 | [Fundamentals: JSX, components, props and state](01-react-fundamentals-jsx-components-props-and-state.md) | JSX, props vs state, state snapshots, events, lists, lifting state up |
| 2 | [Rendering, reconciliation and keys](02-rendering-reconciliation-and-keys.md) | What triggers a render, render vs commit, diffing, Fiber, keys, batching |
| 3 | [Hooks in depth](03-hooks-in-depth.md) | useState, useEffect, useRef, useMemo, useCallback, useReducer, custom hooks, stale closures |
| 4 | [React 18 and 19 features](04-react-18-and-19-concurrent-features-and-server-components.md) | Concurrent rendering, transitions, Suspense, Actions, `use`, Server Components, React Compiler |
| 5 | [State management: Context, Redux Toolkit, Zustand](05-state-management-context-redux-toolkit-and-zustand.md) | Context pitfalls, Redux flow, createSlice, thunks, selectors, RTK Query, choosing a tool |
| 6 | [Data fetching: axios and TanStack Query](06-data-fetching-axios-and-tanstack-query.md) | fetch vs axios, interceptors, token refresh, cancellation, caching, mutations |
| 7 | [Routing and forms](07-routing-and-forms.md) | React Router v7, protected routes, lazy routes, React Hook Form, Zod, form Actions |
| 8 | [Performance optimization](08-performance-optimization.md) | Profiling, React.memo, useMemo/useCallback, virtualization, code splitting |
| 9 | [Patterns, architecture and TypeScript](09-patterns-architecture-and-typescript.md) | Custom hooks, compound components, HOCs, portals, error boundaries, typing React |
| 10 | [Testing React applications](10-testing-react-applications.md) | React Testing Library, user-event, MSW, testing hooks, Redux and queries |
| 11 | [Next.js essentials for interviews](11-nextjs-essentials-for-interviews.md) | App Router, Server Components, caching, SSR/SSG/ISR, Server Actions |

**Interview practice:** every document has 25–35 interview questions and a quick revision list. For mixed questions across the whole subject, see [interview-questions.md](interview-questions.md). For React machine-coding practice, see [Machine coding round](../11-coding-interviews/05-machine-coding-round.md).

**Back to:** [repository home](../README.md)

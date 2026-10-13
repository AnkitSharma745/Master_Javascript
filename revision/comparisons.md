# Compact comparison sheet

| Contrast | Core distinction | Recall check |
| --- | --- | --- |
| Mutation / rebinding | Shared object's property versus local binding target | Trace an object argument assigned a new object |
| Hoisting / TDZ | Declaration processing versus created-uninitialized binding | Can typeof throw? |
| Closure / this | Lexical name lookup versus call/arrow receiver | Where is each determined? |
| Prototype / own property | Lookup delegation versus direct property | What changes after delete of a shadowing own key? |
| Hole / undefined | Absent index versus present value | What does map skip? |
| === / Object.is / SameValueZero | NaN and signed-zero rules differ | Predict NaN and -0 comparisons |
| Promise / Observable | Single eventual outcome versus producer-defined sequence/teardown | Does unsubscribe undo a write? |
| switch / merge / concat / exhaust | Replace / overlap / queue / ignore | Match one business intent to each |
| unknown / any | Requires evidence versus bypasses checking | Does an assertion validate JSON? |
| readonly / freeze | Compile-time shallow restriction versus runtime shallow property restriction | Can nested data still change? |
| DI / DIP | Supplying collaborators versus policy dependency direction | Can concrete injection still couple policy? |
| Adapter / facade / proxy | Translate / simplify / mediate | Which boundary changes? |
| SSR / hydration | Produce HTML on server versus attach/reuse on client | What mismatches can break Angular 16 hydration? |
| Client guard / server authorization | UX navigation versus trusted operation enforcement | Can direct HTTP bypass the guard? |
| no-cache / no-store | Validate reuse versus do not retain | Is a no-cache response storable? |
| TTL / capacity / invalidation | Freshness / retained size / domain-triggered removal | Can an in-flight result restore invalidated data? |
| Concurrency / rate / parallelism | Active overlap / starts per interval / simultaneous execution | Does Promise.all provide a pool? |
| Timeout / failed write | Observed delay versus uncertain server outcome | Is retry safe without idempotency? |

For one-page revision, choose 6–8 relevant rows, hide the distinction column, answer aloud, and write an example for the weakest row. This is a recall aid, not a substitute for the lessons.

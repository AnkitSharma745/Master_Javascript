# IV01 — Explain, investigate, and verify independently

## Learning objective

Give structured technical and behavioral answers and audit AI output. Examples distinguish implemented labs from design sketches and production extensions.

## Prerequisites

[F01](../../lessons/01-foundations/F01-programs.md), [JS02](../../lessons/02-javascript/JS02-scope.md). Use later cross-topic scenarios as you reach their technical lessons; communication drills can begin early.

## Explanation and mechanism

Interview performance combines correctness with visible reasoning. Build answers from a mental structure: definition, mechanism, example, use case, trade-off. A short first answer invites follow-up; a long memorized paragraph can hide whether you understand the behavior.

Treat unfamiliar questions as a reasoning task. State what you know, separate assumptions, create a small counterexample, and propose how to verify. Do not invent an API or claim certainty about runtime-specific behavior.

## Technical and behavioral response structures

For a technical question:
```text
1. State the contract or behavior in plain English.
2. Explain the mechanism.
3. Trace one small example.
4. Name an edge case or alternative.
5. Connect to an engineering decision.
```

For a design question, clarify requirements and constraints before choosing boundaries. For coding, state input assumptions, propose a simple solution, explain the invariant, implement, test, and analyze complexity. Communicate while reasoning without narrating every keystroke.

For behavioral examples, describe situation, responsibility, actions you personally took, result/evidence, and what you learned. Replace “we improved performance” with the specific investigation, change, measurement, trade-off, and your contribution. Do not fabricate measurements; distinguish a measured improvement from a plausible expected one.

## Worked spoken answer

Question: why did old search results replace new ones?

“The UI allowed several requests to overlap. The older request finished last and committed its result, because the code treated completion order as user intent order. I added a generation check before committing state and used transport cancellation where available. I tested reordered completion and old failures. For writes I would need a different ordering/idempotency policy because cancellation cannot undo a server commit.”

Deeper follow-ups: Which state must be guarded? What if abort arrives after response parsing? What if two callers share one in-flight request? Why not use sequential calls? Answer from the contract, not from a memorized operator name.

## AI verification workflow

Use AI after an independent attempt:
1. Spend a fixed period defining the contract and writing your own solution.
2. Preserve that attempt and tests.
3. Ask for counterexamples and alternative designs, not just a replacement.
4. Verify API names/signatures against official versioned docs or installed declarations.
5. Compile/run tests that can distinguish a correct implementation from a plausible mistake.
6. Explain the final design without the generated answer.

Review generated code for unsafe HTML, guessed framework APIs, skipped runtime parsing, unbounded caching, floating promises, overbroad permissions, and unjustified abstractions. An answer that compiles can still violate the problem; tests that mirror its implementation may miss the same defect.

## Alternatives and common mistakes

Flashcards help retrieve distinctions, but cannot replace implementation and debugging. A mock interview should include follow-ups and unfamiliar variants. Fluent delivery without evidence is not mastery; silent correct code can also leave an interviewer unable to assess reasoning.

Public employer interview guides support coding, problem solving, testing, design, and communication preparation. They do not establish that every topic here is frequently asked. Role-specific tracks are curriculum choices, not a prediction about a particular company's process.

## Interview preparation

“I explain the contract and mechanism, use a small example, and discuss the decision and trade-off. When uncertain I identify the uncertainty and verify it instead of guessing.” Follow-up: demonstrate this approach on a scheduling question with an unspecified runtime.

## Practice

Record a 60-second closure answer and a three-minute architecture decision. Run [a mock](../../interviews/mock-interviews.md). Review an AI solution containing a fake Angular API, an assertion on network data, and a truthiness cache; write falsifying tests.

## Revision

Claim → mechanism → example → trade-off → evidence. Uncertainty → assumption → experiment → verification.

## Completion criteria

Pass a mixed mock with follow-ups, show an independently written solution, and revise one weak answer based on recorded evidence.

[Hints and solutions](../../practice/solutions.md#iv01) · [Question Q29](../../interviews/answers.md#q29)

## References

[Primary sources and version notes](../../references/README.md#microsoft); verified 2026-10-13.


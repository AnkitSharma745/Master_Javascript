# Revision and mastery system

Reading is an input; retrieval, implementation, and transfer supply evidence. Research supports retrieval practice and distributed practice; applying them to engineering tasks is a curriculum inference. Our 1/3/7/14/30-day interval ladder is a practical heuristic, not a proven universal optimum. See [research](../references/README.md#spacing).

## Reusable tracking

[progress.template.json](progress.template.json) has one entry per authored lesson with seven independent ratings: recognition, explanation, implementation, debugging, application, trade-off, and interview. Copy it to ignored `revision/personal/progress.json`, or use `npm run review -- init`. Never store employer secrets or personal credentials as evidence.

```sh
npm run review -- init
npm run review -- due --date 2026-10-13
npm run review -- record F01 2 2 2 2 2 2 2 --date 2026-10-13 --evidence "Independent sum; empty and overflow tests"
```

Record real performance, not desired scores. The dates above are usage examples. The default date uses Asia/Kolkata; --date accepts another explicit ISO calendar date. The CLI tracks due studied lessons; it does not send reminders or create an automation. [Cards](cards.json) are generated from question metadata and are ready to transform into your flashcard format.

## Ratings and mastery

0: cannot do it; 1: recognition/with prompting; 2: independent and correct; 3: succeeds on an unfamiliar variant. Unreviewed rows have null review dates; their initial zeros are placeholders until assessed. The weakest relevant dimension controls review priority. A success requires all seven at 2+; a weak review resets spacing. Advance only after a review on a later calendar date. A score is self-reported evidence, not a tool-certified competence.

Before marking mastery: demonstrate the lesson's outcome independently, pass meaningful edge tests, explain the mechanism and trade-off, and repeat after a delay. Then pass the relevant cumulative/project assessment. Use [weak-topic tracker](weak-topics.md), [comparisons](comparisons.md), [mixed quiz](mixed-quiz.md), and [assessments](assessments.md).

## A review session

Answer a question without notes; reconstruct the diagram; write a small example from memory; identify a failure; explain one trade-off aloud. Then inspect the answer, correct your attempt, and schedule a changed example. Interleave related contrasts: closure/this, promise/Observable, readonly/freeze, client/server permissions, TTL/capacity. Do not spend all revision time rereading comfortable subjects.

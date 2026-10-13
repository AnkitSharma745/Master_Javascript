# Contributing

Fix the learner's misconception or missing capability. Describe the input, runtime, expected result, and failure case. Never renumber published lesson IDs. Each substantial lesson needs an outcome, prerequisites, mechanics, examples, trade-offs, interview practice, independent exercises, revision prompts, and observable completion criteria.

Keep the canonical explanation in one lesson. Other lessons should link to it and apply it. Archive material is supplementary and may contain unverified examples. Do not promote it without review.

Add a row to `curriculum/manifest.json`, including sources and question IDs. Use [the template](docs/lesson-template.md). Cite official version-specific documentation; mark proposals separately from shipped features. Avoid unsupported claims about interview frequency.

```sh
npm ci
npm run indexes
npm run check
```

Commit generated indexes with their source manifest. For runnable fences, use `<!-- runnable:node -->` before a JavaScript fence and `// expect: ...` comments for stdout. Isolate intentionally failing code and label it. Tests must distinguish correct behavior from a plausible mistake. Archived snippets are not automatically executed.

For Angular changes, also use the isolated project's compiler check. State which browser, integration, load, security, and deployment checks you actually ran. Syntax checking is not production readiness.

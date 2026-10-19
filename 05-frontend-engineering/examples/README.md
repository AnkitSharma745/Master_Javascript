# Frontend examples

Small, self-contained HTML pages that show the ideas from the frontend documents in a real browser. Each page has its HTML, CSS and JavaScript in one file, with no build step and no dependencies.

## How to open them

- **Simplest:** double-click the file, or drag it into a browser window. All pages work from `file://`.
- **With a local server** (closer to a real site): from this folder run `npx serve .` or `python -m http.server 8000`, then open `http://localhost:8000/` (or the port shown).
- Open the browser DevTools (F12) to see console output and to inspect the DOM and the Accessibility pane.
- Try every page with the keyboard only (Tab, Shift+Tab, Enter, Space, Escape).

## Files

| File | What it shows | Related document |
|---|---|---|
| [dom-basics.html](./dom-basics.html) | Creating and removing elements, `classList`, `hidden` with `aria-expanded`, attributes versus properties, traversal, safe text insertion with `textContent` | [DOM and events](../03-dom-and-events.md) |
| [event-propagation.html](./event-propagation.html) | Capture, target and bubble phases in a live log; `stopPropagation`, `stopImmediatePropagation`, `preventDefault`; `target` versus `currentTarget` | [DOM and events](../03-dom-and-events.md#event-propagation-capture-target-and-bubble) |
| [event-delegation.html](./event-delegation.html) | A todo list with one delegated listener per event type, `<template>`, state-driven rendering, focus management after delete, a live region | [DOM and events](../03-dom-and-events.md#example-a-todo-list-with-event-delegation) |
| [form-validation.html](./form-validation.html) | Constraint validation API with `novalidate`, custom messages, `setCustomValidity`, `aria-invalid`, `aria-describedby`, an error summary that receives focus, `FormData` | [HTML forms](../01-html-semantics-and-forms.md#native-form-validation), [Accessibility](../04-accessibility.md#accessible-forms-and-error-messages) |
| [lazy-loading.html](./lazy-loading.html) | `IntersectionObserver` for lazy images (with `rootMargin`) and infinite scroll with a sentinel, plus a "Load more" button as the accessible alternative. Works offline (generated SVG images). | [DOM and events](../03-dom-and-events.md#intersectionobserver) |
| [accessible-dialog.html](./accessible-dialog.html) | A native `<dialog>` with `showModal()` and `method="dialog"`, and a custom modal with a manual focus trap, `inert` background, Escape and focus return | [Accessibility](../04-accessibility.md#modals-and-focus-traps) |
| [web-component.html](./web-component.html) | A custom element with shadow DOM, a slot, `observedAttributes`, theming with CSS custom properties, and a `composed` custom event | [HTML semantics](../01-html-semantics-and-forms.md#template-dialog-and-web-components) |
| [fetch-and-render.html](./fetch-and-render.html) | `fetch` with `response.ok` checks, loading/error/success states, `AbortController` for cancel and timeout, `Promise.all`, safe rendering of API data. **Needs internet** (uses the public JSONPlaceholder test API). | [API integration](../07-api-integration-and-data-fetching.md) |

## What changed from the old demos

These pages replace the older demos in `archive/09_DOM_Manipulation/DOM_Examples/` and `archive/10_Asynchronous_Javascript/Examples/`:

- External image URLs were replaced with generated images, so the pages do not break when a third-party image disappears.
- Every control is a real `<button>` or form field with a label, focus is visible, and dynamic messages use live regions.
- User and API data is always inserted with `textContent`, never with `innerHTML`.
- The old real-time chat demo was removed because it connected to a WebSocket server that does not exist (`wss://example.com/chat`). The fullscreen and contentEditable demos were removed because they did not teach topics covered in these documents.

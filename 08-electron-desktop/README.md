# 08 — Electron and Desktop Development

Electron lets you build desktop applications with web technology: Chromium for the UI and Node.js for system access. This section explains the process model, IPC, preload scripts and security first, because these are the core of every Electron interview. It then covers packaging, installers, code signing, auto-updates, crash recovery and the architecture of a real Windows desktop application.

All examples use **secure defaults**: `contextIsolation: true`, `nodeIntegration: false` and `sandbox: true`.

**Before this:** [02 — JavaScript](../02-javascript/README.md), [Node.js runtime](../07-nodejs-backend/01-nodejs-runtime-and-architecture.md), and [processes and IPC basics](../01-cs-and-web-fundamentals/03-operating-systems-processes-threads-memory.md).

## Study order

| # | Topic | What you will learn |
| --- | --- | --- |
| 1 | [Electron architecture and process model](01-electron-architecture-and-process-model.md) | Main, renderer, preload and utility processes; a minimal secure app |
| 2 | [App and window lifecycle](02-app-and-window-lifecycle.md) | App events, BrowserWindow, single instance, deep links, tray, menus |
| 3 | [IPC and preload scripts](03-ipc-and-preload-scripts.md) | invoke/handle, send/on, contextBridge, typed IPC contracts, Angular + Electron |
| 4 | [Electron security](04-electron-security.md) | Context isolation, sandbox, CSP, navigation control, fuses, a secure config |
| 5 | [Filesystem, child processes and native features](05-filesystem-child-processes-and-native-features.md) | Safe file access, dialogs, SQLite, child processes, notifications, printing |
| 6 | [Packaging, installers and code signing](06-packaging-installers-and-code-signing.md) | electron-builder vs Forge, ASAR, NSIS/MSI, Windows code signing |
| 7 | [Auto-updates](07-auto-updates.md) | electron-updater, update flow, staged rollouts, enterprise environments |
| 8 | [Logging, crash recovery and monitoring](08-logging-crash-recovery-and-monitoring.md) | electron-log, crash reporting, recovering from crashes, process metrics |
| 9 | [Performance, architecture and alternatives](09-performance-architecture-and-alternatives.md) | Startup speed, real app architecture, testing, Tauri/.NET/PWA comparison |

**Interview practice:** every topic ends with its own interview questions. For mixed questions across the whole subject, see [interview-questions.md](interview-questions.md).

**Next subject:** [09 — Frontend and Full-Stack System Design](../09-system-design/README.md)

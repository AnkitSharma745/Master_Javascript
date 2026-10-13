> Supplementary original notes. Start with [TS01](../../lessons/05-typescript/TS01-contracts.md). Run snippets separately; this archive is not a fully executed lesson suite. See the [audit](../../docs/audit/original-audit.md).

# TypeScript Configuration

## 1. Introduction to `tsconfig.json`

The `tsconfig.json` file is the core configuration file for TypeScript projects. It specifies compiler options, file inclusions/exclusions, and project structure.

### Creating a `tsconfig.json`

Run the following command to generate a default `tsconfig.json`:

```sh
npx tsc --init
```

A basic `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

---

## 2. Compiler Options

### Strict Mode (`strict`)

```json
"strict": true
```

Enables all strict type-checking options.

### Module System (`module`)

```json
"module": "CommonJS"
```

Defines the module system, e.g., `CommonJS`, `ESNext`, `UMD`.

### Target Version (`target`)

```json
"target": "ES6"
```

Specifies the ECMAScript version to compile to.

### Root Directory (`rootDir`)

```json
"rootDir": "src"
```

Defines the source folder.

### Output Directory (`outDir`)

```json
"outDir": "dist"
```

Defines the compiled output folder.

### Module Resolution (`moduleResolution`)

```json
"moduleResolution": "node"
```

Controls how modules are resolved (e.g., `node` for Node.js environments).

---

## 3. Handling Third-Party Type Definitions

### Installing Type Definitions

```sh
npm install --save-dev @types/node
```

Use `@types` packages for third-party libraries like Express, React, etc.

### Allowing JS Files in TypeScript

```json
"allowJs": true
```

Enables JavaScript file compilation.

### Checking JavaScript Files

```json
"checkJs": true
```

Enables type-checking for JavaScript files.

---

## 4. Including and Excluding Files

### Include Specific Files

```json
"include": ["src/**/*"]
```

Includes all files in `src/`.

### Exclude Certain Files

```json
"exclude": ["node_modules", "dist"]
```

Excludes compiled and dependency files.

---

## 5. Compilation Outputs

### Generating Source Maps for Debugging

```json
"sourceMap": true
```

Enables source maps for debugging in browsers or Node.js.

### Compilation Modes

#### CommonJS (Node.js)

```json
"module": "CommonJS"
```

For Node.js environments.

#### ES Module (Frontend)

```json
"module": "ESNext"
```

For modern frontend projects.

---

## 6. Debugging TypeScript

### Debugging with VS Code

1. Install the **Debugger for Chrome** extension.
2. Configure `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch TypeScript",
      "program": "${workspaceFolder}/src/index.ts",
      "preLaunchTask": "tsc: build - tsconfig.json",
      "outFiles": ["${workspaceFolder}/dist/**/*.js"],
      "sourceMaps": true
    }
  ]
}
```

3. Press **F5** to start debugging.

---

## 7. Best Practices

- Use `strict: true` for better type safety.
- Keep `tsconfig.json` minimal and well-structured.
- Use `exclude` to prevent compiling unnecessary files.
- Use source maps for better debugging.

By properly configuring TypeScript, you can enhance maintainability and performance in your projects.

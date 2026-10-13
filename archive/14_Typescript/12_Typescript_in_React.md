> Historical React supplement; setup commands and library-version assumptions need current official verification before reuse.

> Supplementary original notes. Start with [TS01](../../lessons/05-typescript/TS01-contracts.md). Run snippets separately; this archive is not a fully executed lesson suite. See the [audit](../../docs/audit/original-audit.md).

# TypeScript with React

TypeScript is a powerful tool when working with React, providing strong typing, better autocompletion, and improved maintainability. This guide covers how to use TypeScript effectively with React.

---

## 1. Setting Up TypeScript with React

### Create a New TypeScript React App:

Using `create-react-app` with TypeScript:

```sh
npx create-react-app my-app --template typescript
```

Or manually add TypeScript to an existing React project:

```sh
npm install --save typescript @types/react @types/react-dom @types/node
```

### TypeScript Configuration (`tsconfig.json`):

```json
{
  "compilerOptions": {
    "strict": true,
    "jsx": "react-jsx",
    "moduleResolution": "node",
    "target": "es6",
    "module": "esnext"
  }
}
```

---

## 2. Typing Props and State

### Defining Props for Functional Components:

```tsx
type ButtonProps = {
  label: string;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};
```

### Typing Props for Class Components:

```tsx
type CounterProps = {
  initialCount: number;
};

type CounterState = {
  count: number;
};

class Counter extends React.Component<CounterProps, CounterState> {
  state = { count: this.props.initialCount };

  increment = () => this.setState({ count: this.state.count + 1 });

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}
```

---

## 3. Typing Functional Components

### Using `React.FC`:

```tsx
const Greeting: React.FC<{ name: string }> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};
```

### Using Explicit Function Types:

```tsx
type GreetingProps = { name: string };

const Greeting = ({ name }: GreetingProps): JSX.Element => {
  return <h1>Hello, {name}!</h1>;
};
```

---

## 4. Typing React Hooks

### `useState` Hook:

```tsx
const [count, setCount] = useState<number>(0);
```

### `useEffect` Hook:

```tsx
useEffect(() => {
  console.log("Component mounted");
}, []);
```

---

## 5. Event Handling in TypeScript

### Handling Button Click Events:

```tsx
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  console.log("Button clicked", event);
};
```

### Handling Input Change Events:

```tsx
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log("Input changed: ", event.target.value);
};
```

---

## 6. Typing Context API

### Creating a Context:

```tsx
type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
```

### Using Context in a Component:

```tsx
const ThemeToggle: React.FC = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("ThemeToggle must be used within a ThemeProvider");
  return <button onClick={context.toggleTheme}>Toggle Theme</button>;
};
```

---

## 7. Form Handling and Validation

### Typing Forms with React:

```tsx
type FormState = {
  email: string;
  password: string;
};

const [form, setForm] = useState<FormState>({ email: "", password: "" });

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};
```

### Form Validation with Yup:

```tsx
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too short").required("Required"),
});
```

---

## 8. TypeScript with React Router

### Defining Route Parameters:

```tsx
type RouteParams = {
  id: string;
};

const UserPage: React.FC = () => {
  const { id } = useParams<RouteParams>();
  return <div>User ID: {id}</div>;
};
```

---

## 9. Best Practices for TypeScript in React

- **Use interfaces or types for props and state.**
- **Prefer `React.FC` for functional components.**
- **Always define types for event handlers.**
- **Use utility types like `Partial<T>` and `Readonly<T>`.**
- **Enable `strict` mode in `tsconfig.json`.**

---

## Summary

- TypeScript enhances React development with better type safety.
- Props and state should always be explicitly typed.
- Hooks like `useState` and `useEffect` require proper type annotations.
- Event handlers should have correct type definitions.
- Context API, forms, and routing benefit from TypeScript’s type safety.

By following these best practices, you can build robust and maintainable React applications with TypeScript.

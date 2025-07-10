export const STATIC_RULES = {
  "cursor-rules.mdc": `---
description: Cursor Rules Location and Structure Guidelines
globs: 
alwaysApply: true
---
# Cursor Rules Location

How to add new cursor rules to the project

1. Always place rule files in PROJECT_ROOT/.cursor/rules/:
    \`\`\`
    .cursor/rules/
    ├── your-rule-name.mdc
    ├── another-rule.mdc
    └── ...
    \`\`\`

2. Follow the naming convention:
    - Use kebab-case for filenames
    - Always use .mdc extension
    - Make names descriptive of the rule's purpose

3. Directory structure:
    \`\`\`
    PROJECT_ROOT/
    ├── .cursor/
    │   └── rules/
    │       ├── your-rule-name.mdc
    │       └── ...
    └── ...
    \`\`\`

4. Never place rule files:
    - In the project root
    - In subdirectories outside .cursor/rules
    - In any other location

5. Cursor rules have the following structure:

\`\`\`
---
description: Short description of the rule's purpose
globs: optional/path/pattern/**/*
alwaysApply: false
---
# Rule Title

Main content explaining the rule with markdown formatting.

1. Step-by-step instructions
2. Code examples
3. Guidelines

Example:

\`\`\`typescript
// Good example
function goodExample() {
  // Implementation following guidelines
}

// Bad example
function badExample() {
  // Implementation not following guidelines
}
\`\`\``,

  "self-improve.mdc": `---
description: Continuous Rule Improvement and Pattern Recognition
globs: 
alwaysApply: true
---
# Rule Improvement Triggers

Continuously monitor and improve rules based on:

## Code Pattern Analysis
- **Repeated Implementation Patterns**: When the same solution appears 3+ times across files
- **Common Error Patterns**: Bugs that could be prevented by better rules
- **Performance Anti-patterns**: Inefficient code that rule guidance could prevent
- **Security Vulnerabilities**: Patterns that create security risks

## Technology Evolution Monitoring
- **New Language Features**: TypeScript updates, React patterns, modern APIs
- **Framework Best Practices**: Updated recommendations from official docs
- **Ecosystem Changes**: New tools, linting rules, testing approaches
- **Industry Standards**: Emerging patterns from leading tech companies

## Rule Quality Assessment

### Effectiveness Metrics
- **Adoption Rate**: How often rules are followed vs ignored
- **Issue Prevention**: Reduction in bugs after rule implementation
- **Developer Velocity**: Time saved vs overhead introduced
- **Code Review Efficiency**: Fewer review comments on covered topics

### Rule Deprecation Indicators
- **Technology Obsolescence**: Deprecated APIs or patterns
- **Better Alternatives**: Superseded by superior approaches
- **Low Impact**: Rules that don't meaningfully improve outcomes
- **Conflicting Guidance**: Rules that contradict newer best practices

## Continuous Improvement Process

### Monthly Review Cycle
1. **Pattern Mining**: Analyze recent code changes for emerging patterns
2. **Issue Correlation**: Link production issues to missing rule coverage
3. **Developer Feedback**: Collect input on rule effectiveness and gaps
4. **External Research**: Review latest best practices and documentation

### Rule Update Framework
\`\`\`typescript
// Example: Before updating a rule, validate the change
interface RuleUpdate {
  trigger: 'bug-prevention' | 'performance' | 'security' | 'maintainability';
  evidence: string[]; // Links to sources, issues, or patterns
  impact: 'low' | 'medium' | 'high';
  breakingChange: boolean;
}

// Update process
const updateRule = (rule: string, update: RuleUpdate) => {
  if (update.impact === 'high' || update.breakingChange) {
    // Require team review and gradual rollout
    return scheduleTeamReview(rule, update);
  }
  return applyUpdate(rule, update);
};
\`\`\`

### Knowledge Sources
- **Official Documentation**: Framework and language specifications
- **Industry Leaders**: Google, Facebook, Microsoft engineering blogs
- **Static Analysis**: ESLint, SonarQube, CodeClimate reports
- **Performance Monitoring**: Real application metrics and bottlenecks

Follow [cursor-rules.mdc](mdc:.cursor/rules/cursor-rules.mdc) for proper rule formatting and structure.`
};

export const FRAMEWORK_TEMPLATES = {
  react: {
    "react-development.mdc": `---
description: Modern React development patterns and performance optimization
globs: "**/*.{tsx,jsx}"
alwaysApply: false
---
# React Development Excellence

## Modern Component Patterns

### Server Components First (React 18+)
- Default to Server Components for static content and data fetching
- Use Client Components only when interactivity is needed
- Mark Client Components with \`'use client'\` directive

\`\`\`tsx
// Good: Server Component for data display
async function UserProfile({ userId }: { userId: string }) {
  const user = await fetchUser(userId); // Server-side data fetching
  return <div>{user.name}</div>;
}

// Good: Client Component only when needed
'use client';
function InteractiveCounter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
\`\`\`

### Component Composition Over Inheritance
- Favor composition patterns for reusable logic
- Use render props or children for flexible APIs
- Implement compound components for complex UIs

\`\`\`tsx
// Good: Compound component pattern
const Accordion = ({ children }: { children: React.ReactNode }) => (
  <div className="accordion">{children}</div>
);

const AccordionItem = ({ title, children }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>{title}</button>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

// Usage
<Accordion>
  <AccordionItem title="Section 1">Content 1</AccordionItem>
  <AccordionItem title="Section 2">Content 2</AccordionItem>
</Accordion>
\`\`\`

## Performance Optimization

### Memoization Strategy
- Use \`React.memo\` for components with stable props
- Apply \`useMemo\` for expensive calculations only
- Implement \`useCallback\` to stabilize function references

\`\`\`tsx
// Good: Strategic memoization
interface ListItemProps {
  item: Item;
  onSelect: (id: string) => void;
}

const ListItem = React.memo(({ item, onSelect }: ListItemProps) => {
  const handleClick = useCallback(() => {
    onSelect(item.id);
  }, [item.id, onSelect]);

  // Expensive calculation only when item changes
  const processedData = useMemo(() => {
    return heavyProcessing(item.data);
  }, [item.data]);

  return (
    <div onClick={handleClick}>
      {item.name} - {processedData}
    </div>
  );
});

// Bad: Over-memoization
const SimpleComponent = React.memo(({ text }: { text: string }) => (
  <span>{text}</span> // Simple rendering doesn't need memoization
));
\`\`\`

### Virtual Scrolling for Large Lists
- Use react-window or react-virtualized for 1000+ items
- Implement proper key props for stable rendering
- Consider infinite scrolling with intersection observer

\`\`\`tsx
import { FixedSizeList as List } from 'react-window';

// Good: Virtualized list for performance
const VirtualizedList = ({ items }: { items: Item[] }) => (
  <List
    height={600}
    itemCount={items.length}
    itemSize={60}
    width="100%"
  >
    {({ index, style }) => (
      <div style={style} key={items[index].id}>
        {items[index].name}
      </div>
    )}
  </List>
);
\`\`\`

### Code Splitting and Lazy Loading
- Implement route-based code splitting
- Lazy load heavy components below the fold
- Use Suspense boundaries for loading states

\`\`\`tsx
import { lazy, Suspense } from 'react';

// Good: Route-based code splitting
const Dashboard = lazy(() => import('./Dashboard'));
const Analytics = lazy(() => import('./Analytics'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Suspense>
  </Router>
);
\`\`\`

## State Management Best Practices

### Local State First
- Keep state as local as possible
- Lift state only when sharing between components
- Use compound components to avoid prop drilling

\`\`\`tsx
// Good: Local state for component-specific data
const UserForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  // Form state stays local unless shared
};

// Good: Lifted state when sharing needed
const UserManagement = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  return (
    <>
      <UserList onUserSelect={setSelectedUser} />
      <UserDetails user={selectedUser} />
    </>
  );
};
\`\`\`

### Server State vs Client State
- Use React Query/SWR for server state management
- Keep client state in React state or Zustand
- Avoid Redux for simple applications

\`\`\`tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Good: Server state with React Query
const UserProfile = ({ userId }: { userId: string }) => {
  const queryClient = useQueryClient();
  
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
    },
  });

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorBoundary error={error} />;
  
  return <UserForm user={user} onSave={updateMutation.mutate} />;
};
\`\`\`

## Error Handling and Resilience

### Error Boundaries
- Implement error boundaries for component trees
- Provide fallback UIs for graceful degradation
- Log errors for monitoring and debugging

\`\`\`tsx
class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo);
    // Send to error monitoring service
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}
\`\`\`

### Loading and Error States
- Always handle loading, error, and empty states
- Use skeleton screens for better perceived performance
- Implement retry mechanisms for failed requests

\`\`\`tsx
// Good: Comprehensive state handling
const DataList = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
    retry: 3,
  });

  if (isLoading) return <SkeletonList />;
  
  if (error) {
    return (
      <ErrorState 
        message="Failed to load data" 
        onRetry={refetch}
      />
    );
  }

  if (!data?.length) {
    return <EmptyState message="No data available" />;
  }

  return <List items={data} />;
};
\`\`\`

## Testing and Quality Assurance

### Component Testing Strategy
- Test behavior, not implementation details
- Use React Testing Library for user-centric tests
- Mock external dependencies appropriately

\`\`\`tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Good: Testing user behavior
test('should display error message when form submission fails', async () => {
  const mockSubmit = jest.fn().mockRejectedValue(new Error('Submit failed'));
  
  render(<ContactForm onSubmit={mockSubmit} />);
  
  await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));
  
  await waitFor(() => {
    expect(screen.getByText(/submit failed/i)).toBeInTheDocument();
  });
});
\`\`\`

## Performance Anti-Patterns to Avoid

### Common Mistakes
- Creating objects/functions in render
- Inline styles that recreate objects
- Missing dependency arrays in hooks
- Overusing useEffect for derived state

\`\`\`tsx
// Bad: Performance anti-patterns
const BadComponent = ({ items, filter }) => {
  // ❌ Creates new object every render
  const style = { color: 'red', fontSize: '14px' };
  
  // ❌ Creates new function every render
  const handleClick = () => console.log('clicked');
  
  // ❌ useEffect for derived state
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    setFilteredItems(items.filter(item => item.type === filter));
  }, [items, filter]);

  return (
    <div style={style}>
      {filteredItems.map(item => (
        <div key={item.id} onClick={handleClick}>
          {item.name}
        </div>
      ))}
    </div>
  );
};

// Good: Optimized version
const style = { color: 'red', fontSize: '14px' }; // Outside component

const GoodComponent = ({ items, filter }) => {
  // ✅ Derived state with useMemo
  const filteredItems = useMemo(() => 
    items.filter(item => item.type === filter), 
    [items, filter]
  );
  
  // ✅ Stable function reference
  const handleClick = useCallback(() => console.log('clicked'), []);

  return (
    <div style={style}>
      {filteredItems.map(item => (
        <div key={item.id} onClick={handleClick}>
          {item.name}
        </div>
      ))}
    </div>
  );
};
\`\`\``,

    "typescript-quality.mdc": `---
description: Advanced TypeScript practices for React applications
globs: "**/*.{ts,tsx}"
alwaysApply: true
---
# TypeScript Excellence in React

## Strict Configuration
Enable the strictest possible TypeScript settings for maximum type safety:

\`\`\`json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "allowUnreachableCode": false,
    "allowUnusedLabels": false
  }
}
\`\`\`

## Advanced Type Patterns

### Template Literal Types for Type Safety
Use template literals for dynamic string types and APIs:

\`\`\`typescript
// Good: Type-safe API endpoints
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiEndpoint = \`/api/\${string}\`;
type FullApiCall = \`\${HttpMethod} \${ApiEndpoint}\`;

// Usage
function makeApiCall(call: FullApiCall) {
  const [method, endpoint] = call.split(' ') as [HttpMethod, ApiEndpoint];
  // TypeScript knows the exact types
}

// Good: CSS-in-JS type safety
type CSSUnit = 'px' | 'rem' | 'em' | '%' | 'vh' | 'vw';
type Size = \`\${number}\${CSSUnit}\`;

const StyledDiv = styled.div<{ width: Size; height: Size }>\`
  width: \${props => props.width};
  height: \${props => props.height};
\`;
\`\`\`

### Discriminated Unions for State Management
Use discriminated unions for complex state that can be in different modes:

\`\`\`typescript
// Good: Discriminated union for async state
type AsyncData<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

const useAsyncData = <T>(fetcher: () => Promise<T>) => {
  const [state, setState] = useState<AsyncData<T>>({ status: 'idle' });

  const fetch = async () => {
    setState({ status: 'loading' });
    try {
      const data = await fetcher();
      setState({ status: 'success', data });
    } catch (error) {
      setState({ status: 'error', error: error.message });
    }
  };

  // TypeScript ensures exhaustive checking
  const render = () => {
    switch (state.status) {
      case 'idle':
        return <div>Click to load</div>;
      case 'loading':
        return <div>Loading...</div>;
      case 'success':
        return <div>{state.data}</div>; // data is available
      case 'error':
        return <div>Error: {state.error}</div>; // error is available
      default:
        // TypeScript ensures this is never reached
        const _exhaustive: never = state;
        return _exhaustive;
    }
  };

  return { state, fetch, render };
};
\`\`\`

### Branded Types for Domain Safety
Create branded types to prevent mixing of similar but distinct values:

\`\`\`typescript
// Good: Branded types for business domain
type UserId = string & { readonly brand: unique symbol };
type Email = string & { readonly brand: unique symbol };
type ProductId = string & { readonly brand: unique symbol };

const createUserId = (id: string): UserId => {
  if (!id || id.length < 3) throw new Error('Invalid user ID');
  return id as UserId;
};

const createEmail = (email: string): Email => {
  if (!/\S+@\S+\.\S+/.test(email)) throw new Error('Invalid email');
  return email as Email;
};

// Prevents accidental mixing
const sendEmailToUser = (userId: UserId, email: Email) => {
  // Implementation
};

// This will cause a TypeScript error:
// sendEmailToUser(email, userId); // ❌ Arguments in wrong order
\`\`\`

## React-Specific TypeScript Patterns

### Advanced Component Props
Use advanced patterns for flexible, type-safe component APIs:

\`\`\`typescript
// Good: Polymorphic component with 'as' prop
type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

interface BoxProps {
  color?: 'primary' | 'secondary';
  padding?: number;
}

type BoxComponent = <C extends React.ElementType = 'div'>(
  props: PolymorphicComponentProp<C, BoxProps>
) => React.ReactElement | null;

const Box: BoxComponent = ({ as, color, padding, children, ...props }) => {
  const Component = as || 'div';
  return (
    <Component
      style={{ 
        color: color === 'primary' ? 'blue' : 'gray',
        padding: \`\${padding}px\`
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

// Usage - all type-safe:
<Box>Default div</Box>
<Box as="button" onClick={handleClick}>Button</Box>
<Box as="a" href="/link">Link</Box>
\`\`\`

### Advanced Hook Typing
Create sophisticated hooks with proper TypeScript support:

\`\`\`typescript
// Good: Generic hook with overloads
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prevValue: T) => T)) => void];

function useLocalStorage<T = undefined>(
  key: string
): [T | undefined, (value: T | ((prevValue: T | undefined) => T)) => void];

function useLocalStorage<T>(key: string, initialValue?: T) {
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(\`Error reading localStorage key "\${key}":\`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((prevValue: T | undefined) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(\`Error setting localStorage key "\${key}":\`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
}

// Usage:
const [name, setName] = useLocalStorage('name', 'Anonymous'); // T is string
const [settings, setSettings] = useLocalStorage<UserSettings>('settings'); // T is UserSettings | undefined
\`\`\`

### Form Validation with Types
Create type-safe form validation:

\`\`\`typescript
// Good: Type-safe form validation
type ValidationRule<T> = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: T) => string | undefined;
};

type FormSchema<T> = {
  [K in keyof T]: ValidationRule<T[K]>;
};

type FormErrors<T> = {
  [K in keyof T]?: string;
};

const useFormValidation = <T extends Record<string, any>>(
  schema: FormSchema<T>
) => {
  const validate = (data: T): FormErrors<T> => {
    const errors: FormErrors<T> = {};

    (Object.keys(schema) as Array<keyof T>).forEach(field => {
      const value = data[field];
      const rules = schema[field];

      if (rules.required && (!value || value === '')) {
        errors[field] = \`\${String(field)} is required\`;
        return;
      }

      if (typeof value === 'string') {
        if (rules.minLength && value.length < rules.minLength) {
          errors[field] = \`\${String(field)} must be at least \${rules.minLength} characters\`;
        }
        if (rules.maxLength && value.length > rules.maxLength) {
          errors[field] = \`\${String(field)} must be no more than \${rules.maxLength} characters\`;
        }
        if (rules.pattern && !rules.pattern.test(value)) {
          errors[field] = \`\${String(field)} format is invalid\`;
        }
      }

      if (rules.custom) {
        const customError = rules.custom(value);
        if (customError) {
          errors[field] = customError;
        }
      }
    });

    return errors;
  };

  return { validate };
};

// Usage:
interface UserForm {
  email: string;
  password: string;
  age: number;
}

const schema: FormSchema<UserForm> = {
  email: {
    required: true,
    pattern: /\S+@\S+\.\S+/,
  },
  password: {
    required: true,
    minLength: 8,
    custom: (password) => {
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        return 'Password must contain uppercase, lowercase, and number';
      }
    },
  },
  age: {
    required: true,
    custom: (age) => {
      if (age < 18) return 'Must be 18 or older';
    },
  },
};
\`\`\`

## Type Safety Anti-Patterns

### Avoid These Common Mistakes

\`\`\`typescript
// ❌ Bad: Using any
const fetchData = async (): Promise<any> => {
  // Disables all type checking
};

// ✅ Good: Proper typing
interface ApiResponse {
  data: User[];
  meta: { total: number; page: number };
}

const fetchData = async (): Promise<ApiResponse> => {
  // Maintains type safety
};

// ❌ Bad: Type assertions without checks
const element = document.getElementById('my-element') as HTMLInputElement;

// ✅ Good: Type guards
const getInputElement = (id: string): HTMLInputElement | null => {
  const element = document.getElementById(id);
  return element instanceof HTMLInputElement ? element : null;
};

// ❌ Bad: Ignoring null/undefined
interface User {
  name: string;
  email?: string;
}

const displayEmail = (user: User) => {
  return user.email.toLowerCase(); // ❌ Might crash
};

// ✅ Good: Proper null handling
const displayEmail = (user: User): string => {
  return user.email?.toLowerCase() ?? 'No email provided';
};
\`\`\`

## Utility Types and Generics

### Advanced Utility Types
Leverage TypeScript's built-in and custom utility types:

\`\`\`typescript
// Good: Custom utility types
type OptionalExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;
type RequiredExcept<T, K extends keyof T> = Required<T> & Partial<Pick<T, K>>;

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
}

// Creating user requires id and name, everything else optional
type CreateUserInput = OptionalExcept<User, 'id' | 'name'>;

// Updating user makes everything optional except id
type UpdateUserInput = RequiredExcept<Partial<User>, 'id'>;

// Good: Conditional types for API responses
type ApiResponse<T> = T extends string
  ? { message: T }
  : T extends any[]
  ? { data: T; count: number }
  : { data: T };

// Usage
const stringResponse: ApiResponse<string> = { message: "Success" };
const arrayResponse: ApiResponse<User[]> = { data: [], count: 0 };
const objectResponse: ApiResponse<User> = { data: user };
\`\`\`

## Integration with Development Tools

### ESLint TypeScript Rules
Configure comprehensive TypeScript-specific linting:

\`\`\`json
// .eslintrc.js
{
  "extends": [
    "@typescript-eslint/recommended",
    "@typescript-eslint/recommended-requiring-type-checking"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/prefer-as-const": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/strict-boolean-expressions": "error",
    "@typescript-eslint/switch-exhaustiveness-check": "error",
    "@typescript-eslint/consistent-type-imports": "error"
  }
}
\`\`\``
  },

  vue: {
    "vue-development.mdc": `---
description: Vue.js development best practices and patterns
globs: "**/*.vue"
alwaysApply: false
---
# Vue.js Development Guidelines

## Component Structure
- Use Composition API with \`<script setup>\`
- Keep template, script, and style sections organized
- Use single-file components (SFCs)
- Follow Vue naming conventions

## Reactivity
- Use \`ref()\` for primitive values
- Use \`reactive()\` for objects
- Prefer \`computed()\` over methods for derived state
- Use \`watch()\` for side effects

## Performance
- Use \`v-memo\` for expensive list items
- Implement proper key attributes in \`v-for\`
- Use \`shallowRef\` and \`shallowReactive\` when appropriate

## Code Examples:

\`\`\`vue
<template>
  <div class="user-profile">
    <h1>{{ user.name }}</h1>
    <p>{{ user.email }}</p>
    <button @click="updateUser">Update</button>
  </div>
</template>

<script setup lang="ts">
interface User {
  id: string;
  name: string;
  email: string;
}

const props = defineProps<{
  userId: string;
}>();

const emit = defineEmits<{
  userUpdated: [user: User];
}>();

const user = ref<User | null>(null);

const updateUser = () => {
  if (user.value) {
    emit('userUpdated', user.value);
  }
};
</script>
\`\``
  },

  nextjs: {
    "nextjs-development.mdc": `---
description: Next.js development best practices and patterns
globs: "**/*.{tsx,jsx,ts,js}"
alwaysApply: false
---
# Next.js Development Guidelines

## App Router Structure
- Use app directory for new projects
- Implement proper loading and error states
- Use server components by default
- Add 'use client' only when necessary

## Data Fetching
- Use server-side data fetching when possible
- Implement proper caching strategies
- Use SWR or React Query for client-side fetching
- Handle loading and error states gracefully

## Performance
- Optimize images with next/image
- Use dynamic imports for code splitting
- Implement proper meta tags for SEO
- Use Next.js built-in optimization features

## Code Examples:

\`\`\`tsx
// Good: Server component with proper data fetching
async function UserProfile({ userId }: { userId: string }) {
  const user = await fetchUser(userId);
  
  return (
    <div>
      <h1>{user.name}</h1>
      <UserActions user={user} />
    </div>
  );
}

// Good: Client component when needed
'use client';
import { useState } from 'react';

function UserActions({ user }: { user: User }) {
  const [isLoading, setIsLoading] = useState(false);
  
  // Client-side logic here
}
\`\``
  },

  nodejs: {
    "nodejs-development.mdc": `---
description: Node.js and Express development best practices
globs: "**/*.{ts,js}"
alwaysApply: false
---
# Node.js Development Guidelines

## Express Best Practices
- Use proper middleware ordering
- Implement error handling middleware
- Use async/await for better error handling
- Validate input data with middleware

## API Design
- Follow RESTful conventions
- Use proper HTTP status codes
- Implement consistent error responses
- Add proper CORS configuration

## Security
- Use helmet for security headers
- Implement rate limiting
- Validate and sanitize input
- Use environment variables for secrets

## Code Examples:

\`\`\`typescript
// Good: Proper Express route with error handling
app.get('/api/users/:id', async (req, res, next) => {
  try {
    const user = await userService.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Good: Error handling middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
});
\`\``
  }
};

export const TASK_TEMPLATES = {
  features: `---
description: Feature development guidelines and best practices
globs: 
alwaysApply: false
---
# Feature Development Guidelines

## Planning Phase
- Break down features into small, testable units
- Define clear acceptance criteria
- Consider edge cases and error scenarios
- Plan for backwards compatibility

## Implementation
- Follow TDD when possible
- Write self-documenting code
- Implement proper error handling
- Add logging for debugging

## Testing
- Write unit tests for business logic
- Add integration tests for critical paths
- Test edge cases and error conditions
- Update existing tests when needed

## Code Examples:

\`\`\`typescript
// Good: Feature implementation with proper structure
class UserService {
  async createUser(userData: CreateUserRequest): Promise<User> {
    // Validate input
    const validatedData = await this.validateUserData(userData);
    
    // Check for existing user
    const existingUser = await this.findByEmail(validatedData.email);
    if (existingUser) {
      throw new ConflictError('User already exists');
    }
    
    // Create user
    const user = await this.userRepository.create(validatedData);
    
    // Send welcome email
    await this.emailService.sendWelcomeEmail(user);
    
    return user;
  }
}
\`\`\``,

  bugs: `---
description: Systematic bug fixing methodology and best practices based on industry standards
globs: 
alwaysApply: false
---
# Professional Bug Fixing Methodology

## The 5 R's Framework for Bug Resolution

Based on industry best practices, follow this systematic approach for reliable bug fixes:

### 1. Reproduce
**Always reproduce the bug before attempting any fix**

\`\`\`bash
# Document reproduction steps
echo "Bug reproduction checklist:
1. Exact steps to trigger the issue
2. Expected vs actual behavior
3. Environment details (OS, browser, versions)
4. Sample data that causes the issue
5. Screenshots/videos if applicable" > bug_reproduction.md
\`\`\`

### 2. Root Cause Analysis
**Understand the underlying cause, not just symptoms**

\`\`\`typescript
// Good: Systematic investigation approach
class BugInvestigation {
  private logs: string[] = [];
  
  investigate(issue: Issue) {
    // Step 1: Gather contextual information
    this.log(\`Investigating issue: \${issue.description}\`);
    this.log(\`Environment: \${issue.environment}\`);
    this.log(\`User actions: \${issue.userActions.join(' -> ')}\`);
    
    // Step 2: Check system state
    const systemState = this.captureSystemState();
    this.log(\`System state: \${JSON.stringify(systemState)}\`);
    
    // Step 3: Trace execution path
    const executionTrace = this.traceExecution(issue.steps);
    this.log(\`Execution trace: \${executionTrace}\`);
    
    // Step 4: Identify root cause
    return this.analyzeRootCause(systemState, executionTrace);
  }
  
  private analyzeRootCause(state: SystemState, trace: ExecutionTrace): RootCause {
    // Look for patterns: race conditions, invalid state, missing validation
    if (trace.hasRaceCondition) {
      return { type: 'race-condition', location: trace.racyCode };
    }
    
    if (state.hasInvalidData) {
      return { type: 'data-validation', location: state.invalidDataSource };
    }
    
    if (trace.hasUnhandledException) {
      return { type: 'exception-handling', location: trace.exceptionPoint };
    }
    
    return { type: 'unknown', needsDeepDive: true };
  }
}
\`\`\`

### 3. Resolve
**Implement minimal, targeted fixes**

\`\`\`typescript
// Good: Minimal, focused fix with validation
class UserService {
  async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<User> {
    // Bug was: Race condition when multiple updates happen simultaneously
    // Root cause: No optimistic locking or state validation
    
    // Fix: Add version-based optimistic locking
    const currentUser = await this.userRepository.findByIdWithVersion(userId);
    if (!currentUser) {
      throw new NotFoundError(\`User \${userId} not found\`);
    }
    
    // Validate updates don't conflict with current state
    const validatedUpdates = this.validateUpdates(currentUser, updates);
    
    try {
      // Atomic update with version check
      const updatedUser = await this.userRepository.updateWithVersion(
        userId,
        validatedUpdates,
        currentUser.version
      );
      
      this.logger.info(\`User \${userId} updated successfully\`, {
        updates: validatedUpdates,
        version: updatedUser.version
      });
      
      return updatedUser;
    } catch (error) {
      if (error instanceof VersionConflictError) {
        throw new ConflictError('User was modified by another process. Please refresh and try again.');
      }
      throw error;
    }
  }
  
  private validateUpdates(current: User, updates: Partial<UserProfile>): Partial<UserProfile> {
    const validated = { ...updates };
    
    // Prevent invalid state transitions
    if (updates.status && !this.isValidStatusTransition(current.status, updates.status)) {
      throw new ValidationError(\`Invalid status transition from \${current.status} to \${updates.status}\`);
    }
    
    // Sanitize inputs
    if (updates.email) {
      validated.email = updates.email.trim().toLowerCase();
      if (!this.isValidEmail(validated.email)) {
        throw new ValidationError('Invalid email format');
      }
    }
    
    return validated;
  }
}
\`\`\`

### 4. Regression Testing
**Ensure the fix works and doesn't break anything else**

\`\`\`typescript
// Good: Comprehensive regression test suite
describe('UserService Bug Fix - Profile Update Race Condition', () => {
  describe('Concurrent Update Protection', () => {
    it('should handle concurrent updates gracefully', async () => {
      // Arrange: Set up initial user state
      const user = await testUtils.createUser({
        name: 'John Doe',
        email: 'john@example.com',
        status: 'active'
      });
      
      // Act: Simulate concurrent updates
      const update1Promise = userService.updateUserProfile(user.id, {
        name: 'John Smith'
      });
      
      const update2Promise = userService.updateUserProfile(user.id, {
        email: 'john.smith@example.com'
      });
      
      // Assert: One should succeed, one should fail with conflict error
      const results = await Promise.allSettled([update1Promise, update2Promise]);
      
      const successful = results.filter(r => r.status === 'fulfilled');
      const failed = results.filter(r => r.status === 'rejected');
      
      expect(successful).toHaveLength(1);
      expect(failed).toHaveLength(1);
      expect(failed[0].reason).toBeInstanceOf(ConflictError);
    });
    
    it('should prevent invalid status transitions', async () => {
      // Test business logic edge cases
      const user = await testUtils.createUser({ status: 'suspended' });
      
      await expect(
        userService.updateUserProfile(user.id, { status: 'admin' })
      ).rejects.toThrow('Invalid status transition');
    });
    
    it('should maintain data integrity during updates', async () => {
      // Test that related data remains consistent
      const user = await testUtils.createUser();
      
      await userService.updateUserProfile(user.id, {
        email: 'newemail@example.com'
      });
      
      // Verify related records are updated
      const userSettings = await settingsService.getByUserId(user.id);
      expect(userSettings.notificationEmail).toBe('newemail@example.com');
    });
  });
  
  describe('Regression Tests', () => {
    it('should not affect existing update functionality', async () => {
      // Test that normal updates still work as expected
      const user = await testUtils.createUser();
      
      const updated = await userService.updateUserProfile(user.id, {
        name: 'Updated Name',
        bio: 'Updated bio'
      });
      
      expect(updated.name).toBe('Updated Name');
      expect(updated.bio).toBe('Updated bio');
      expect(updated.version).toBe(user.version + 1);
    });
  });
});
\`\`\`

### 5. Retrospect
**Learn from the bug to prevent similar issues**

\`\`\`typescript
// Good: Post-incident analysis and prevention
interface BugAnalysis {
  bugId: string;
  rootCause: string;
  introducedIn: string; // Git commit hash
  detectionDelay: number; // Hours between introduction and detection
  impactAssessment: {
    usersAffected: number;
    severity: 'low' | 'medium' | 'high' | 'critical';
    businessImpact: string;
  };
  preventionMeasures: {
    codeChanges: string[];
    processImprovements: string[];
    toolingUpdates: string[];
  };
}

class BugRetrospective {
  async analyzeAndImprove(bug: ResolvedBug): Promise<BugAnalysis> {
    const analysis: BugAnalysis = {
      bugId: bug.id,
      rootCause: await this.identifyRootCause(bug),
      introducedIn: await this.findIntroductionCommit(bug),
      detectionDelay: this.calculateDetectionDelay(bug),
      impactAssessment: await this.assessImpact(bug),
      preventionMeasures: {
        codeChanges: [],
        processImprovements: [],
        toolingUpdates: []
      }
    };
    
    // Suggest improvements based on bug type
    if (analysis.rootCause.includes('race condition')) {
      analysis.preventionMeasures.codeChanges.push(
        'Add optimistic locking to concurrent operations',
        'Implement proper state validation',
        'Add transaction isolation where needed'
      );
      analysis.preventionMeasures.toolingUpdates.push(
        'Add race condition detection in static analysis',
        'Implement load testing for concurrent scenarios'
      );
    }
    
    if (analysis.rootCause.includes('validation')) {
      analysis.preventionMeasures.codeChanges.push(
        'Add comprehensive input validation',
        'Implement type-safe API contracts',
        'Add boundary condition tests'
      );
      analysis.preventionMeasures.processImprovements.push(
        'Include edge case testing in PR review checklist',
        'Add input validation coverage to definition of done'
      );
    }
    
    // Schedule implementation of prevention measures
    await this.scheduleImprovements(analysis.preventionMeasures);
    
    return analysis;
  }
}
\`\`\`

## Advanced Debugging Techniques

### Binary Search Debugging
When dealing with complex issues, use binary search to narrow down the problem:

\`\`\`typescript
// Good: Systematic state inspection
class SystemInspector {
  async debugPerformanceIssue(endpoint: string) {
    const checkpoints = [
      'request-validation',
      'database-query',
      'business-logic',
      'response-serialization',
      'network-transmission'
    ];
    
    // Binary search through the pipeline
    let left = 0;
    let right = checkpoints.length - 1;
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const checkpoint = checkpoints[mid];
      
      const performance = await this.measurePerformance(endpoint, checkpoint);
      
      if (performance.isBottleneck) {
        // Found the bottleneck, narrow down further
        return this.deepDiveIntoComponent(checkpoint);
      } else if (performance.timeToHere > performance.timeExpected) {
        // Problem is in earlier stages
        right = mid - 1;
      } else {
        // Problem is in later stages
        left = mid + 1;
      }
    }
  }
}
\`\`\`

### Defensive Programming Patterns
Implement patterns that prevent bugs from occurring:

\`\`\`typescript
// Good: Defensive programming practices
class RobustService {
  async processPayment(paymentData: PaymentRequest): Promise<PaymentResult> {
    // Validate preconditions
    this.validatePaymentData(paymentData);
    
    // Check business rules
    await this.validateBusinessRules(paymentData);
    
    // Create idempotency key to prevent double processing
    const idempotencyKey = this.generateIdempotencyKey(paymentData);
    
    // Check if already processed
    const existingPayment = await this.paymentRepository.findByIdempotencyKey(idempotencyKey);
    if (existingPayment) {
      this.logger.info(\`Payment already processed\`, { idempotencyKey });
      return existingPayment;
    }
    
    // Process with timeout and retry logic
    const result = await this.withRetryAndTimeout(
      async () => await this.paymentGateway.process(paymentData),
      {
        maxRetries: 3,
        timeoutMs: 30000,
        backoffMultiplier: 2
      }
    );
    
    // Verify result integrity
    this.validatePaymentResult(result, paymentData);
    
    // Store with audit trail
    await this.savePaymentWithAudit(result, paymentData, idempotencyKey);
    
    return result;
  }
  
  private validatePaymentData(data: PaymentRequest): void {
    const errors: string[] = [];
    
    if (!data.amount || data.amount <= 0) {
      errors.push('Amount must be positive');
    }
    
    if (!data.currency || !this.supportedCurrencies.includes(data.currency)) {
      errors.push('Invalid currency');
    }
    
    if (!data.paymentMethod || !this.isValidPaymentMethod(data.paymentMethod)) {
      errors.push('Invalid payment method');
    }
    
    if (errors.length > 0) {
      throw new ValidationError('Payment validation failed', errors);
    }
  }
}
\`\`\`

## Bug Prevention Strategies

### Static Analysis Integration
Set up comprehensive static analysis to catch bugs before they reach production:

\`\`\`json
// .eslintrc.js - Enhanced bug-catching rules
{
  "extends": [
    "@typescript-eslint/recommended",
    "@typescript-eslint/recommended-requiring-type-checking"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/strict-boolean-expressions": "error",
    "@typescript-eslint/switch-exhaustiveness-check": "error",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/no-misused-promises": "error",
    "no-implicit-coercion": "error",
    "no-magic-numbers": ["error", { "ignore": [0, 1, -1] }],
    "prefer-const": "error",
    "no-var": "error"
  }
}
\`\`\`

### Monitoring and Alerting
Set up proactive monitoring to catch issues early:

\`\`\`typescript
// Good: Comprehensive error monitoring
class ErrorMonitor {
  constructor(
    private logger: Logger,
    private metrics: MetricsCollector,
    private alerting: AlertService
  ) {}
  
  captureError(error: Error, context: ErrorContext): void {
    // Log with full context
    this.logger.error('Application error', {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack
      },
      context: {
        userId: context.userId,
        endpoint: context.endpoint,
        requestId: context.requestId,
        userAgent: context.userAgent,
        timestamp: new Date().toISOString()
      }
    });
    
    // Track metrics
    this.metrics.increment('errors.total', {
      type: error.name,
      endpoint: context.endpoint
    });
    
    // Alert if error rate is too high
    this.checkErrorRateAndAlert(context.endpoint);
    
    // Alert immediately for critical errors
    if (this.isCriticalError(error)) {
      this.alerting.sendImmediateAlert({
        severity: 'critical',
        message: \`Critical error in \${context.endpoint}: \${error.message}\`,
        context
      });
    }
  }
  
  private isCriticalError(error: Error): boolean {
    return error.name === 'DatabaseConnectionError' ||
           error.name === 'PaymentProcessingError' ||
           error.message.includes('memory') ||
           error.message.includes('timeout');
  }
}
\`\`\`

Remember: A systematic approach to bug fixing not only resolves current issues but builds knowledge and processes that prevent future bugs.`,

  testing: `---
description: Comprehensive testing guidelines and best practices based on modern testing strategies
globs: "**/*.{test,spec}.{ts,tsx,js,jsx}"
alwaysApply: false
---
# Modern Testing Excellence Framework

## Testing Philosophy and Strategy

### The Testing Pyramid
Build a balanced test suite following the testing pyramid principle:

\`\`\`
    /\\
   /  \\    E2E Tests (5-10%)
  /____\\ 
 /      \\  Integration Tests (15-25%)
/________\\ 
           Unit Tests (70-80%)
\`\`\`

### Test-Driven Development (TDD)
Follow the Red-Green-Refactor cycle for robust development:

\`\`\`typescript
// 1. RED: Write failing test first
describe('PasswordValidator', () => {
  it('should reject passwords shorter than 8 characters', () => {
    const validator = new PasswordValidator({ minLength: 8 });
    
    const result = validator.validate('abc123');
    
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Password must be at least 8 characters');
  });
});

// 2. GREEN: Write minimal code to pass
export class PasswordValidator {
  constructor(private options: { minLength: number }) {}
  
  validate(password: string): ValidationResult {
    const errors: string[] = [];
    
    if (password.length < this.options.minLength) {
      errors.push(\`Password must be at least \${this.options.minLength} characters\`);
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// 3. REFACTOR: Improve code quality without breaking tests
export class PasswordValidator {
  constructor(private options: PasswordOptions) {}
  
  validate(password: string): ValidationResult {
    const rules = [
      this.validateLength,
      this.validateComplexity,
      this.validateCommonPasswords
    ];
    
    const errors = rules
      .map(rule => rule(password))
      .filter(Boolean) as string[];
    
    return { isValid: errors.length === 0, errors };
  }
  
  private validateLength = (password: string): string | null => {
    return password.length < this.options.minLength
      ? \`Password must be at least \${this.options.minLength} characters\`
      : null;
  };
}
\`\`\`

## Unit Testing Excellence

### Test Structure and Organization
Follow the AAA pattern (Arrange, Act, Assert) with clear test structure:

\`\`\`typescript
// Good: Comprehensive unit test structure
describe('UserService', () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<UserRepository>;
  let mockEmailService: jest.Mocked<EmailService>;
  let mockLogger: jest.Mocked<Logger>;
  
  beforeEach(() => {
    // Arrange - Set up fresh mocks for each test
    mockUserRepository = createMockUserRepository();
    mockEmailService = createMockEmailService();
    mockLogger = createMockLogger();
    
    userService = new UserService(
      mockUserRepository,
      mockEmailService,
      mockLogger
    );
  });
  
  describe('createUser', () => {
    const validUserData = {
      email: 'john@example.com',
      name: 'John Doe',
      password: 'SecurePass123!'
    };
    
    describe('when called with valid data', () => {
      it('should create and return a new user', async () => {
        // Arrange
        const expectedUser = { id: 'user-123', ...validUserData };
        mockUserRepository.findByEmail.mockResolvedValue(null);
        mockUserRepository.create.mockResolvedValue(expectedUser);
        mockEmailService.sendWelcomeEmail.mockResolvedValue(undefined);
        
        // Act
        const result = await userService.createUser(validUserData);
        
        // Assert
        expect(result).toEqual(expectedUser);
        expect(mockUserRepository.create).toHaveBeenCalledWith(
          expect.objectContaining({
            email: validUserData.email.toLowerCase(),
            name: validUserData.name.trim()
          })
        );
        expect(mockEmailService.sendWelcomeEmail).toHaveBeenCalledWith(
          validUserData.email
        );
      });
      
      it('should log user creation event', async () => {
        // Arrange
        const expectedUser = { id: 'user-123', ...validUserData };
        mockUserRepository.findByEmail.mockResolvedValue(null);
        mockUserRepository.create.mockResolvedValue(expectedUser);
        
        // Act
        await userService.createUser(validUserData);
        
        // Assert
        expect(mockLogger.info).toHaveBeenCalledWith(
          'User created successfully',
          expect.objectContaining({
            userId: expectedUser.id,
            email: validUserData.email
          })
        );
      });
    });
    
    describe('when called with duplicate email', () => {
      it('should throw ConflictError', async () => {
        // Arrange
        const existingUser = { id: 'existing-user', email: validUserData.email };
        mockUserRepository.findByEmail.mockResolvedValue(existingUser);
        
        // Act & Assert
        await expect(userService.createUser(validUserData))
          .rejects.toThrow(ConflictError);
        
        expect(mockUserRepository.create).not.toHaveBeenCalled();
        expect(mockEmailService.sendWelcomeEmail).not.toHaveBeenCalled();
      });
    });
    
    describe('when repository throws an error', () => {
      it('should log error and re-throw', async () => {
        // Arrange
        const dbError = new Error('Database connection failed');
        mockUserRepository.findByEmail.mockResolvedValue(null);
        mockUserRepository.create.mockRejectedValue(dbError);
        
        // Act & Assert
        await expect(userService.createUser(validUserData))
          .rejects.toThrow('Database connection failed');
        
        expect(mockLogger.error).toHaveBeenCalledWith(
          'User creation failed',
          expect.objectContaining({
            error: dbError,
            userData: expect.any(Object)
          })
        );
      });
    });
  });
  
  describe('edge cases and boundary conditions', () => {
    it('should handle empty strings gracefully', async () => {
      const invalidData = { email: '', name: '', password: '' };
      
      await expect(userService.createUser(invalidData))
        .rejects.toThrow(ValidationError);
    });
    
    it('should handle extremely long input', async () => {
      const longString = 'a'.repeat(10000);
      const invalidData = {
        email: \`\${longString}@example.com\`,
        name: longString,
        password: longString
      };
      
      await expect(userService.createUser(invalidData))
        .rejects.toThrow(ValidationError);
    });
    
    it('should handle special characters in names', async () => {
      const specialCharData = {
        ...validUserData,
        name: "José María O'Connor-Smith"
      };
      
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.create.mockResolvedValue({ id: 'user-123', ...specialCharData });
      
      const result = await userService.createUser(specialCharData);
      
      expect(result.name).toBe("José María O'Connor-Smith");
    });
  });
});
\`\`\`

### Property-Based Testing
Use property-based testing for comprehensive input validation:

\`\`\`typescript
import { fc } from 'fast-check';

describe('EmailValidator (Property-Based Tests)', () => {
  it('should always validate proper email format', () => {
    fc.assert(
      fc.property(
        fc.string().filter(s => s.includes('@') && s.includes('.')),
        (email) => {
          const validator = new EmailValidator();
          
          // Property: Valid emails should always pass basic format check
          if (isValidEmailFormat(email)) {
            const result = validator.validate(email);
            expect(result.isValid).toBe(true);
          }
        }
      )
    );
  });
  
  it('should never crash on any string input', () => {
    fc.assert(
      fc.property(
        fc.string(),
        (input) => {
          const validator = new EmailValidator();
          
          // Property: Validator should never throw, only return validation result
          expect(() => validator.validate(input)).not.toThrow();
        }
      )
    );
  });
  
  it('should be consistent across multiple validations', () => {
    fc.assert(
      fc.property(
        fc.emailAddress(),
        (email) => {
          const validator = new EmailValidator();
          
          // Property: Same input should always produce same result
          const result1 = validator.validate(email);
          const result2 = validator.validate(email);
          
          expect(result1).toEqual(result2);
        }
      )
    );
  });
});
\`\`\`

## Integration Testing Strategies

### Database Integration Tests
Test real database interactions with proper setup and teardown:

\`\`\`typescript
// Good: Database integration test
describe('UserRepository Integration', () => {
  let database: Database;
  let userRepository: UserRepository;
  
  beforeAll(async () => {
    // Set up test database
    database = await createTestDatabase();
    await database.migrate();
    userRepository = new UserRepository(database);
  });
  
  afterAll(async () => {
    await database.close();
  });
  
  beforeEach(async () => {
    // Clean state before each test
    await database.truncate(['users']);
  });
  
  describe('create and findByEmail', () => {
    it('should persist user and retrieve by email', async () => {
      // Arrange
      const userData = {
        email: 'test@example.com',
        name: 'Test User',
        hashedPassword: 'hashed123'
      };
      
      // Act
      const createdUser = await userRepository.create(userData);
      const foundUser = await userRepository.findByEmail(userData.email);
      
      // Assert
      expect(createdUser).toMatchObject(userData);
      expect(foundUser).toMatchObject(userData);
      expect(createdUser.id).toBe(foundUser?.id);
      expect(createdUser.createdAt).toBeInstanceOf(Date);
    });
    
    it('should handle unique constraint violations', async () => {
      // Arrange
      const userData = {
        email: 'duplicate@example.com',
        name: 'Test User',
        hashedPassword: 'hashed123'
      };
      
      await userRepository.create(userData);
      
      // Act & Assert
      await expect(userRepository.create(userData))
        .rejects.toThrow(UniqueConstraintError);
    });
    
    it('should support case-insensitive email lookup', async () => {
      // Arrange
      const userData = {
        email: 'CaseSensitive@Example.com',
        name: 'Test User',
        hashedPassword: 'hashed123'
      };
      
      await userRepository.create(userData);
      
      // Act
      const foundUser = await userRepository.findByEmail('casesensitive@example.com');
      
      // Assert
      expect(foundUser).toBeTruthy();
      expect(foundUser?.email).toBe(userData.email.toLowerCase());
    });
  });
  
  describe('transaction support', () => {
    it('should rollback on transaction failure', async () => {
      // Arrange
      const userData = {
        email: 'transaction@example.com',
        name: 'Test User',
        hashedPassword: 'hashed123'
      };
      
      // Act & Assert
      await expect(
        database.transaction(async (tx) => {
          await userRepository.create(userData, tx);
          // Simulate error that should trigger rollback
          throw new Error('Simulated transaction error');
        })
      ).rejects.toThrow('Simulated transaction error');
      
      // Verify rollback
      const foundUser = await userRepository.findByEmail(userData.email);
      expect(foundUser).toBeNull();
    });
  });
});
\`\`\`

### API Integration Tests
Test complete request/response cycles:

\`\`\`typescript
// Good: API integration test
describe('User API Integration', () => {
  let app: Application;
  let database: Database;
  
  beforeAll(async () => {
    database = await createTestDatabase();
    app = createTestApp(database);
  });
  
  afterAll(async () => {
    await database.close();
  });
  
  beforeEach(async () => {
    await database.truncate(['users']);
  });
  
  describe('POST /api/users', () => {
    const validUserData = {
      email: 'newuser@example.com',
      name: 'New User',
      password: 'SecurePass123!'
    };
    
    it('should create user and return 201 with user data', async () => {
      // Act
      const response = await request(app)
        .post('/api/users')
        .send(validUserData)
        .expect(201);
      
      // Assert
      expect(response.body).toMatchObject({
        id: expect.any(String),
        email: validUserData.email,
        name: validUserData.name,
        createdAt: expect.any(String)
      });
      expect(response.body.password).toBeUndefined(); // Sensitive data not returned
      
      // Verify persistence
      const savedUser = await database.query(
        'SELECT * FROM users WHERE email = $1',
        [validUserData.email]
      );
      expect(savedUser.rows).toHaveLength(1);
    });
    
    it('should return 400 for invalid email format', async () => {
      // Act
      const response = await request(app)
        .post('/api/users')
        .send({ ...validUserData, email: 'invalid-email' })
        .expect(400);
      
      // Assert
      expect(response.body).toMatchObject({
        error: 'Validation failed',
        details: expect.arrayContaining([
          expect.objectContaining({
            field: 'email',
            message: expect.stringContaining('Invalid email format')
          })
        ])
      });
    });
    
    it('should return 409 for duplicate email', async () => {
      // Arrange
      await request(app)
        .post('/api/users')
        .send(validUserData)
        .expect(201);
      
      // Act
      const response = await request(app)
        .post('/api/users')
        .send(validUserData)
        .expect(409);
      
      // Assert
      expect(response.body).toMatchObject({
        error: 'User already exists'
      });
    });
    
    it('should handle rate limiting', async () => {
      // Act - Send many requests quickly
      const requests = Array.from({ length: 20 }, () =>
        request(app)
          .post('/api/users')
          .send({ ...validUserData, email: \`user\${Math.random()}@example.com\` })
      );
      
      const responses = await Promise.all(requests);
      
      // Assert - Some requests should be rate limited
      const rateLimitedResponses = responses.filter(r => r.status === 429);
      expect(rateLimitedResponses.length).toBeGreaterThan(0);
    });
  });
});
\`\`\`

## End-to-End Testing

### User Journey Testing
Test complete user workflows across the application:

\`\`\`typescript
// Good: E2E user journey test
describe('User Registration and Login Journey', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3000');
    await clearDatabase();
  });
  
  it('should complete full registration and login flow', async () => {
    const userData = {
      email: 'e2e@example.com',
      name: 'E2E Test User',
      password: 'SecurePass123!'
    };
    
    // Step 1: Navigate to registration
    await page.click('[data-testid="register-link"]');
    await expect(page).toHaveURL(/.*\/register/);
    
    // Step 2: Fill and submit registration form
    await page.fill('[data-testid="email-input"]', userData.email);
    await page.fill('[data-testid="name-input"]', userData.name);
    await page.fill('[data-testid="password-input"]', userData.password);
    await page.fill('[data-testid="confirm-password-input"]', userData.password);
    
    await page.click('[data-testid="register-button"]');
    
    // Step 3: Verify registration success
    await expect(page.locator('[data-testid="success-message"]'))
      .toContainText('Registration successful');
    
    // Step 4: Verify welcome email was sent
    const emails = await getTestEmails();
    expect(emails).toHaveLength(1);
    expect(emails[0].to).toBe(userData.email);
    expect(emails[0].subject).toContain('Welcome');
    
    // Step 5: Login with new credentials
    await page.click('[data-testid="login-link"]');
    await page.fill('[data-testid="login-email"]', userData.email);
    await page.fill('[data-testid="login-password"]', userData.password);
    await page.click('[data-testid="login-button"]');
    
    // Step 6: Verify successful login
    await expect(page).toHaveURL(/.*\/dashboard/);
    await expect(page.locator('[data-testid="user-name"]'))
      .toContainText(userData.name);
    
    // Step 7: Verify user can access protected content
    await page.click('[data-testid="profile-link"]');
    await expect(page.locator('[data-testid="profile-email"]'))
      .toContainText(userData.email);
  });
  
  it('should handle network failures gracefully', async () => {
    // Simulate network failure
    await page.route('**/api/users', route => {
      route.abort('failed');
    });
    
    await page.click('[data-testid="register-link"]');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="name-input"]', 'Test User');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.fill('[data-testid="confirm-password-input"]', 'password123');
    await page.click('[data-testid="register-button"]');
    
    // Verify error handling
    await expect(page.locator('[data-testid="error-message"]'))
      .toContainText('Network error. Please try again.');
    
    // Verify form state is preserved
    expect(await page.inputValue('[data-testid="email-input"]')).toBe('test@example.com');
    expect(await page.inputValue('[data-testid="name-input"]')).toBe('Test User');
  });
});
\`\`\`

## Advanced Testing Techniques

### Mutation Testing
Ensure test quality with mutation testing:

\`\`\`typescript
// Configure mutation testing with Stryker
module.exports = {
  packageManager: 'npm',
  reporters: ['html', 'clear-text', 'progress'],
  testRunner: 'jest',
  mutate: [
    'src/**/*.ts',
    '!src/**/*.test.ts',
    '!src/**/*.spec.ts'
  ],
  coverageAnalysis: 'perTest',
  thresholds: {
    high: 90,
    low: 80,
    break: 75
  },
  mutator: {
    plugins: ['typescript'],
    excludedMutations: ['StringLiteral', 'ArrowFunction']
  }
};

// Example: Test that would fail mutation testing
describe('MathUtils', () => {
  // Bad: This test would not catch the > vs >= mutation
  it('should return true for positive numbers', () => {
    expect(MathUtils.isPositive(1)).toBe(true);
  });
  
  // Good: This test would catch boundary mutations
  it('should return false for zero', () => {
    expect(MathUtils.isPositive(0)).toBe(false);
  });
  
  it('should return true for positive numbers', () => {
    expect(MathUtils.isPositive(1)).toBe(true);
    expect(MathUtils.isPositive(0.1)).toBe(true);
  });
  
  it('should return false for negative numbers', () => {
    expect(MathUtils.isPositive(-1)).toBe(false);
    expect(MathUtils.isPositive(-0.1)).toBe(false);
  });
});
\`\`\`

### Contract Testing
Ensure API compatibility between services:

\`\`\`typescript
// Good: Consumer-driven contract test
import { pactWith } from 'jest-pact';
import { Matchers } from '@pact-foundation/pact';

pactWith({ consumer: 'UserService', provider: 'EmailService' }, provider => {
  describe('Email Service Contract', () => {
    beforeEach(() => {
      const expectedEmailRequest = {
        to: 'user@example.com',
        template: 'welcome',
        data: {
          name: Matchers.string('John Doe'),
          activationLink: Matchers.string('https://app.com/activate/123')
        }
      };
      
      provider
        .given('User registration is successful')
        .uponReceiving('a request to send welcome email')
        .withRequest({
          method: 'POST',
          path: '/api/email/send',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': Matchers.string('Bearer token123')
          },
          body: expectedEmailRequest
        })
        .willRespondWith({
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            messageId: Matchers.string('msg-123'),
            status: 'queued'
          }
        });
    });
    
    it('should send welcome email successfully', async () => {
      const emailService = new EmailService(provider.mockService.baseUrl);
      
      const result = await emailService.sendWelcomeEmail({
        to: 'user@example.com',
        name: 'John Doe',
        activationLink: 'https://app.com/activate/123'
      });
      
      expect(result).toMatchObject({
        messageId: expect.any(String),
        status: 'queued'
      });
    });
  });
});
\`\`\`

### Performance Testing
Test application performance under load:

\`\`\`typescript
// Good: Performance test
describe('UserService Performance', () => {
  it('should handle 1000 concurrent user creations', async () => {
    const startTime = Date.now();
    
    // Create 1000 concurrent requests
    const requests = Array.from({ length: 1000 }, (_, i) => 
      userService.createUser({
        email: \`user\${i}@example.com\`,
        name: \`User \${i}\`,
        password: 'password123'
      })
    );
    
    const results = await Promise.all(requests);
    const endTime = Date.now();
    
    // Assert performance requirements
    expect(results).toHaveLength(1000);
    expect(endTime - startTime).toBeLessThan(5000); // 5 seconds max
    
    // Verify all users were created successfully
    results.forEach(user => {
      expect(user.id).toBeDefined();
      expect(user.email).toMatch(/user\d+@example\.com/);
    });
  });
  
  it('should maintain response time under load', async () => {
    const responseTimes: number[] = [];
    
    // Run 100 sequential requests to measure response time
    for (let i = 0; i < 100; i++) {
      const startTime = performance.now();
      
      await userService.findById('existing-user-id');
      
      const endTime = performance.now();
      responseTimes.push(endTime - startTime);
    }
    
    // Calculate statistics
    const averageResponseTime = responseTimes.reduce((a, b) => a + b) / responseTimes.length;
    const maxResponseTime = Math.max(...responseTimes);
    const p95ResponseTime = responseTimes.sort()[Math.floor(responseTimes.length * 0.95)];
    
    // Assert performance requirements
    expect(averageResponseTime).toBeLessThan(50); // 50ms average
    expect(maxResponseTime).toBeLessThan(200); // 200ms max
    expect(p95ResponseTime).toBeLessThan(100); // 100ms p95
  });
});
\`\`\`

## Test Quality and Maintenance

### Test Coverage Requirements
Maintain comprehensive but meaningful coverage:

\`\`\`typescript
// jest.config.js - Coverage configuration
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.spec.{ts,tsx}'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 90,
      lines: 85,
      statements: 85
    },
    './src/core/': {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95
    }
  },
  coverageReporters: ['text', 'html', 'lcov'],
  // Ignore trivial code from coverage
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '\\.d\\.ts$'
  ]
};
\`\`\`

### Test Data Management
Use builders and factories for maintainable test data:

\`\`\`typescript
// Good: Test data builders
class UserBuilder {
  private userData: Partial<User> = {
    email: 'default@example.com',
    name: 'Default User',
    status: 'active',
    createdAt: new Date()
  };
  
  withEmail(email: string): UserBuilder {
    this.userData.email = email;
    return this;
  }
  
  withName(name: string): UserBuilder {
    this.userData.name = name;
    return this;
  }
  
  withStatus(status: UserStatus): UserBuilder {
    this.userData.status = status;
    return this;
  }
  
  build(): User {
    return {
      id: \`user-\${Math.random().toString(36).substr(2, 9)}\`,
      ...this.userData
    } as User;
  }
  
  buildMany(count: number): User[] {
    return Array.from({ length: count }, (_, i) => 
      new UserBuilder()
        .withEmail(\`user\${i}@example.com\`)
        .withName(\`User \${i}\`)
        .build()
    );
  }
}

// Usage in tests
describe('UserService with Builder Pattern', () => {
  it('should handle users with different statuses', async () => {
    // Arrange
    const activeUser = new UserBuilder()
      .withEmail('active@example.com')
      .withStatus('active')
      .build();
      
    const suspendedUser = new UserBuilder()
      .withEmail('suspended@example.com')
      .withStatus('suspended')
      .build();
    
    // Act & Assert
    expect(userService.canLogin(activeUser)).toBe(true);
    expect(userService.canLogin(suspendedUser)).toBe(false);
  });
  
  it('should process batch of users efficiently', async () => {
    // Arrange
    const users = new UserBuilder().buildMany(100);
    
    // Act
    const result = await userService.processBatch(users);
    
    // Assert
    expect(result.processed).toBe(100);
    expect(result.errors).toHaveLength(0);
  });
});
\`\`\`

## Test Automation and CI/CD Integration

### Continuous Testing Pipeline
Integrate testing into your CI/CD pipeline:

\`\`\`yaml
# .github/workflows/test.yml
name: Test Pipeline

on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:unit -- --coverage
      - uses: codecov/codecov-action@v1
  
  integration-tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_PASSWORD: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run test:integration
        env:
          DATABASE_URL: postgresql://postgres:test@localhost:5432/test
  
  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run build
      - run: npm run test:e2e
        env:
          CI: true
  
  mutation-tests:
    runs-on: ubuntu-latest
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run test:mutation
\`\`\`

Remember: Comprehensive testing is not about achieving 100% coverage—it's about building confidence in your code's correctness, maintainability, and resilience to change.`
};

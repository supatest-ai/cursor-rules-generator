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
description: 
globs: 
alwaysApply: true
---
## Rule Improvement Triggers

- New code patterns not covered by existing rules
- Repeated similar implementations across files
- Common error patterns that could be prevented
- New libraries or tools being used consistently
- Emerging best practices in the codebase

# Analysis Process:
- Compare new code with existing rules
- Identify patterns that should be standardized
- Look for references to external documentation
- Check for consistent error handling patterns
- Monitor test patterns and coverage

# Rule Updates:

- **Add New Rules When:**
  - A new technology/pattern is used in 3+ files
  - Common bugs could be prevented by a rule
  - Code reviews repeatedly mention the same feedback
  - New security or performance patterns emerge

- **Modify Existing Rules When:**
  - Better examples exist in the codebase
  - Additional edge cases are discovered
  - Related rules have been updated
  - Implementation details have changed

- **Example Pattern Recognition:**

  \`\`\`typescript
  // If you see repeated patterns like:
  const data = await prisma.user.findMany({
    select: { id: true, email: true },
    where: { status: 'ACTIVE' }
  });

  // Consider adding to [prisma.mdc](mdc:shipixen/.cursor/rules/prisma.mdc):
  // - Standard select fields
  // - Common where conditions
  // - Performance optimization patterns
  \`\`\`

- **Rule Quality Checks:**
- Rules should be actionable and specific
- Examples should come from actual code
- References should be up to date
- Patterns should be consistently enforced

## Continuous Improvement:
- Monitor code review comments
- Track common development questions
- Update rules after major refactors
- Add links to relevant documentation
- Cross-reference related rules

## Rule Deprecation

- Mark outdated patterns as deprecated
- Remove rules that no longer apply
- Update references to deprecated rules
- Document migration paths for old patterns

## Documentation Updates:

- Keep examples synchronized with code
- Update references to external docs
- Maintain links between related rules
- Document breaking changes

Follow [cursor-rules.mdc](mdc:.cursor/rules/cursor-rules.mdc) for proper rule formatting and structure.`
};

export const FRAMEWORK_TEMPLATES = {
  react: {
    "react-development.mdc": `---
description: React development best practices and patterns
globs: "**/*.{tsx,jsx}"
alwaysApply: false
---
# React Development Guidelines

## Component Structure
- Use functional components with hooks
- Prefer composition over inheritance
- Keep components small and focused (< 100 lines)
- Use PascalCase for component names

## State Management
- Use useState for local state
- Use useReducer for complex state logic
- Consider context for global state
- Avoid prop drilling beyond 2-3 levels

## Performance Optimization
- Use React.memo for expensive components
- Implement useMemo and useCallback when needed
- Avoid creating objects/functions in render
- Use proper dependency arrays

## Code Examples:

\`\`\`tsx
// Good: Clean functional component
const UserProfile = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  if (!user) return <LoadingSpinner />;
  
  return (
    <div className="user-profile">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};

// Bad: Complex component with mixed concerns
const BadComponent = () => {
  // Too much logic mixed together
  // Multiple responsibilities
  // Hard to test and maintain
};
\`\`\``,

    "typescript-quality.mdc": `---
description: TypeScript quality standards for React projects
globs: "**/*.{ts,tsx}"
alwaysApply: true
---
# TypeScript Quality Standards

## Type Safety
- Always use strict mode
- No \`any\` types allowed (use \`unknown\` instead)
- Define interfaces for all props and state
- Use proper type guards for runtime checks

## Interface Design
- Use descriptive interface names with \`I\` prefix or without
- Define props interfaces close to components
- Export reusable types from dedicated files
- Use generic types for reusable components

## Best Practices
- Use type assertions sparingly and safely
- Prefer union types over enums when appropriate
- Use \`readonly\` for arrays and objects that shouldn't change
- Implement proper error handling with typed errors

## Code Examples:

\`\`\`typescript
// Good: Proper interface definition
interface UserProps {
  user: User;
  onUpdate: (user: User) => void;
  isLoading?: boolean;
}

const UserComponent: React.FC<UserProps> = ({ user, onUpdate, isLoading = false }) => {
  // Implementation
};

// Good: Type guard
function isUser(obj: unknown): obj is User {
  return typeof obj === 'object' && obj !== null && 'id' in obj;
}

// Bad: Using any
const badFunction = (data: any) => {
  // No type safety
};
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
description: Bug fixing methodology and best practices
globs: 
alwaysApply: false
---
# Bug Fixing Guidelines

## Investigation Process
1. Reproduce the bug reliably
2. Identify the root cause, not just symptoms
3. Check for similar issues in the codebase
4. Consider impact on other features

## Fix Implementation
- Make minimal changes to fix the issue
- Add tests to prevent regression
- Update documentation if needed
- Consider backwards compatibility

## Verification
- Test the specific bug scenario
- Run related test suites
- Check for side effects in other areas
- Verify fix works across environments

## Code Examples:

\`\`\`typescript
// Good: Defensive programming to prevent bugs
function processUserData(data: unknown): User {
  // Validate input to prevent runtime errors
  if (!isValidUserData(data)) {
    throw new ValidationError('Invalid user data format');
  }
  
  // Handle edge cases
  const processedData = {
    ...data,
    name: data.name?.trim() || 'Unknown',
    email: data.email?.toLowerCase() || null
  };
  
  return processedData;
}
\`\`\``,

  testing: `---
description: Testing guidelines and best practices
globs: "**/*.{test,spec}.{ts,tsx,js,jsx}"
alwaysApply: false
---
# Testing Guidelines

## Test Structure
- Follow Arrange-Act-Assert pattern
- Use descriptive test names
- Group related tests with describe blocks
- Keep tests independent and isolated

## Test Types
- Unit tests for individual functions/components
- Integration tests for feature workflows
- End-to-end tests for critical user journeys
- Visual regression tests for UI components

## Best Practices
- Test behavior, not implementation
- Use proper mocking strategies
- Maintain good test coverage
- Keep tests fast and reliable

## Code Examples:

\`\`\`typescript
// Good: Well-structured test
describe('UserService', () => {
  describe('createUser', () => {
    it('should create user with valid data', async () => {
      // Arrange
      const userData = { name: 'John Doe', email: 'john@example.com' };
      const mockUser = { id: '1', ...userData };
      jest.spyOn(userRepository, 'create').mockResolvedValue(mockUser);
      
      // Act
      const result = await userService.createUser(userData);
      
      // Assert
      expect(result).toEqual(mockUser);
      expect(userRepository.create).toHaveBeenCalledWith(userData);
    });
    
    it('should throw error for duplicate email', async () => {
      // Test error scenarios
    });
  });
});
\`\`\``
};

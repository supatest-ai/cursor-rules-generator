import { WizardFormData } from "@/types/wizard";
import {
  getStaticRules,
  getFrameworkTemplates,
  getTaskTemplates,
  getTechnologies,
  getFrameworksForTechnology,
  getAllRules
} from "./rule-templates";

export function generateRules(formData: WizardFormData) {
  const rules = [];

  try {
    // Add static rules (always included)
    const staticRules = getStaticRules();
    Object.entries(staticRules).forEach(([ruleId, content]) => {
      rules.push({
        filename: `${ruleId}.mdc`,
        content,
        isStatic: true
      });
    });

    // Add framework-specific rules based on selected technologies
    const frameworkTemplates = getFrameworkTemplates();

    // Check for React
    if (formData.additionalTech.includes('react') && frameworkTemplates.react) {
      Object.entries(frameworkTemplates.react).forEach(([ruleId, content]) => {
        rules.push({
          filename: `${ruleId}.mdc`,
          content,
          isStatic: false
        });
      });
    }

    // Check for Java frameworks
    if (formData.additionalTech.includes('spring-boot') && frameworkTemplates.java) {
      Object.entries(frameworkTemplates.java).forEach(([ruleId, content]) => {
        rules.push({
          filename: `${ruleId}.mdc`,
          content,
          isStatic: false
        });
      });
    }

    // Check for Go frameworks
    if (formData.additionalTech.includes('gin') && frameworkTemplates.golang) {
      Object.entries(frameworkTemplates.golang).forEach(([ruleId, content]) => {
        rules.push({
          filename: `${ruleId}.mdc`,
          content,
          isStatic: false
        });
      });
    }

    // Check for Python frameworks
    if (formData.additionalTech.includes('fastapi') && frameworkTemplates.python) {
      Object.entries(frameworkTemplates.python).forEach(([ruleId, content]) => {
        if (ruleId === 'fastapi-development') {
          rules.push({
            filename: `${ruleId}.mdc`,
            content,
            isStatic: false
          });
        }
      });
    }

    if (formData.additionalTech.includes('django') && frameworkTemplates.python) {
      Object.entries(frameworkTemplates.python).forEach(([ruleId, content]) => {
        if (ruleId === 'django-development') {
          rules.push({
            filename: `${ruleId}.mdc`,
            content,
            isStatic: false
          });
        }
      });
    }

    if (formData.additionalTech.includes('flask') && frameworkTemplates.python) {
      Object.entries(frameworkTemplates.python).forEach(([ruleId, content]) => {
        if (ruleId === 'flask-development') {
          rules.push({
            filename: `${ruleId}.mdc`,
            content,
            isStatic: false
          });
        }
      });
    }

    // Add task-specific rules
    const taskTemplates = getTaskTemplates();

    if (formData.taskTypes.includes('features') && taskTemplates.features) {
      rules.push({
        filename: "feature-development.mdc",
        content: taskTemplates.features,
        isStatic: false
      });
    }

  } catch (error) {
    console.error('Error loading dynamic rules:', error);
    // Add fallback message if dynamic loading fails
    rules.push({
      filename: "error.mdc",
      content: `---
description: Error loading rules
---
# Error Loading Rules

There was an error loading the dynamic rule content. Please check that all rule files are properly configured.

Error: ${error instanceof Error ? error.message : 'Unknown error'}
`,
      isStatic: false
    });
  }

  // Add project structure rule (generated dynamically)
  rules.push({
    filename: "project-structure.mdc",
    content: generateProjectStructureRule(formData),
    isStatic: false
  });

  // Add development workflow rule (generated dynamically)
  rules.push({
    filename: "development-workflow.mdc",
    content: generateDevelopmentWorkflowRule(formData),
    isStatic: false
  });

  // Add code quality rule (generated dynamically)
  rules.push({
    filename: "code-quality.mdc",
    content: generateCodeQualityRule(formData),
    isStatic: false
  });

  return rules;
}

// Export the async version as the main function
export { generateRules as default };

// Keep the sync version for backward compatibility during transition
export function generateRulesSync(formData: WizardFormData) {
  console.warn('generateRulesSync is deprecated. Use the async generateRules function instead.');

  const rules = [];

  // Add project structure rule (generated dynamically)
  rules.push({
    filename: "project-structure.mdc",
    content: generateProjectStructureRule(formData),
    isStatic: false
  });

  // Add development workflow rule (generated dynamically)
  rules.push({
    filename: "development-workflow.mdc",
    content: generateDevelopmentWorkflowRule(formData),
    isStatic: false
  });

  // Add code quality rule (generated dynamically)
  rules.push({
    filename: "code-quality.mdc",
    content: generateCodeQualityRule(formData),
    isStatic: false
  });

  return rules;
}

// Helper function to get available technologies
export function getAvailableTechnologies() {
  return getTechnologies();
}

// Helper function to get frameworks for a technology
export function getAvailableFrameworks(technologyId: string) {
  return getFrameworksForTechnology(technologyId);
}

function generateDevelopmentWorkflowRule(formData: WizardFormData): string {
  const packageManager = getPackageManager(formData.additionalTech);
  const hasMonorepo = formData.projectType === 'monorepo' || formData.additionalTech.includes('turborepo') || formData.additionalTech.includes('nx');
  const hasTesting = formData.additionalTech.some(tech => ['jest', 'vitest', 'cypress', 'playwright'].includes(tech));
  const hasLinting = formData.additionalTech.some(tech => ['eslint', 'biome', 'prettier'].includes(tech));
  const buildTool = formData.additionalTech.includes('webpack') ? 'webpack' : 'vite';
  const hasTypeScript = formData.additionalTech.includes('typescript');

  // Dynamic commands based on package manager
  const installCommand = packageManager === 'npm' ? 'install' : 'add';
  const devInstallFlag = packageManager === 'npm' ? '--save-dev' :
    packageManager === 'yarn' ? '--dev' : '-D';
  const updateCommand = packageManager === 'yarn' ? 'upgrade' : 'update';
  const pruneCommand = packageManager === 'yarn' ? 'autoclean' :
    packageManager === 'bun' ? 'clean' : 'prune';

  return `---
description: Development workflow and command reference
globs: 
alwaysApply: false
---
# Development Workflow Guide

## Getting Started
1. Install dependencies: \`${packageManager} install\`
2. Start development: \`${packageManager} dev\`
3. Build project: \`${packageManager} build\`

## Core Commands
- \`${packageManager} dev\`: Start development environment
- \`${packageManager} build\`: Build for production
- \`${packageManager} preview\`: Preview production build locally${hasMonorepo ? `
- \`${packageManager} build:packages\`: Build all packages
- \`${packageManager} build:staging\`: Build for staging environment` : ''}

## Package Management
- \`${packageManager} install\`: Install dependencies
- \`${packageManager} ${installCommand} <package>\`: Add new dependency
- \`${packageManager} ${installCommand} <package> ${devInstallFlag}\`: Add dev dependency
- \`${packageManager} ${updateCommand}\`: Update all dependencies
- \`${packageManager} outdated\`: Check for outdated packages${packageManager === 'yarn' ? `
- \`${packageManager} ${pruneCommand}\`: Remove unnecessary files` : packageManager === 'bun' ? `
- \`${packageManager} ${pruneCommand}\`: Clean cache and artifacts` : `
- \`${packageManager} ${pruneCommand}\`: Remove unused dependencies`}

${hasTypeScript ? `## Type Checking
- \`${packageManager} type-check\`: Run TypeScript type checking
- \`${packageManager} type-check:watch\`: Run type checking in watch mode

` : ''}${hasLinting ? `## Code Quality
- \`${packageManager} lint\`: Run linting checks${formData.additionalTech.includes('eslint') ? `
- \`${packageManager} lint:fix\`: Fix auto-fixable lint issues` : ''}${formData.additionalTech.includes('prettier') ? `
- \`${packageManager} format\`: Format code with Prettier
- \`${packageManager} format:check\`: Check if code is formatted` : ''}${formData.additionalTech.includes('biome') ? `
- \`${packageManager} biome:check\`: Run Biome checks
- \`${packageManager} biome:fix\`: Fix issues with Biome` : ''}

` : ''}${hasTesting ? `## Testing
${formData.additionalTech.includes('jest') ? `- \`${packageManager} test\`: Run Jest tests
- \`${packageManager} test:watch\`: Run tests in watch mode
- \`${packageManager} test:coverage\`: Run tests with coverage` : ''}${formData.additionalTech.includes('vitest') ? `- \`${packageManager} test\`: Run Vitest tests
- \`${packageManager} test:ui\`: Run tests with Vitest UI
- \`${packageManager} test:coverage\`: Run tests with coverage` : ''}${formData.additionalTech.includes('cypress') ? `
- \`${packageManager} cypress:open\`: Open Cypress test runner
- \`${packageManager} cypress:run\`: Run Cypress tests headlessly` : ''}${formData.additionalTech.includes('playwright') ? `
- \`${packageManager} test:e2e\`: Run Playwright end-to-end tests
- \`${packageManager} test:e2e:ui\`: Run Playwright tests with UI` : ''}

` : ''}## Clean Commands
- \`${packageManager} clean\`: Clean all build artifacts and dependencies
- \`${packageManager} clean:build\`: Clean build artifacts only
- \`${packageManager} clean:deps\`: Clean node_modules and reinstall${hasMonorepo ? `
- \`${packageManager} clean:turbo\`: Clean Turborepo cache` : ''}
- \`${packageManager} clean:install\`: Complete clean and fresh install

${formData.additionalTech.includes('docker') ? `## Docker Commands
- \`docker-compose up -d\`: Start development services
- \`docker-compose down\`: Stop development services
- \`docker-compose logs -f\`: Follow service logs
- \`docker-compose exec <service> sh\`: Access service shell

` : ''}## Development Guidelines
1. Always run type-checking before committing${hasTypeScript ? `: \`${packageManager} type-check\`` : ''}${hasLinting ? `
2. Format code before committing: \`${packageManager} format\`
3. Fix lint issues: \`${packageManager} lint${formData.additionalTech.includes('eslint') ? ':fix' : ''}\`` : ''}${hasTesting ? `
4. Run tests before pushing: \`${packageManager} test\`` : ''}
5. Use the appropriate build command for your environment${hasMonorepo ? `
6. For monorepo changes, build affected packages only
7. Keep workspace dependencies in sync` : ''}
8. Keep the development environment up to date with \`${packageManager} clean:install\`

## Environment Setup
- Development: \`${packageManager} dev\`${formData.additionalTech.includes('vercel') ? `
- Vercel Preview: \`vercel\`
- Vercel Production: \`vercel --prod\`` : formData.additionalTech.includes('netlify') ? `
- Netlify Preview: \`netlify dev\`
- Netlify Deploy: \`netlify deploy\`
- Netlify Production: \`netlify deploy --prod\`` : ''}${formData.additionalTech.includes('docker') ? `
- Docker Development: \`docker-compose up -d && ${packageManager} dev\`` : ''}

## Troubleshooting
- If dependencies are acting up: \`${packageManager} clean:install\`
- If builds are failing: \`${packageManager} clean:build && ${packageManager} build\`${hasTypeScript ? `
- If types are incorrect: \`${packageManager} type-check\`` : ''}${hasMonorepo ? `
- If monorepo is out of sync: \`${packageManager} clean && ${packageManager} install\`` : ''}
- If ${buildTool} is acting up: Clear cache and restart dev server`;
}

function getPackageManager(additionalTech: string[]): string {
  if (additionalTech.includes('pnpm')) return 'pnpm';
  if (additionalTech.includes('yarn')) return 'yarn';
  if (additionalTech.includes('bun-pm')) return 'bun';
  return 'npm';
}

function generateProjectStructureRule(formData: WizardFormData): string {
  return `---
description: Project structure guidelines and organization
globs: 
alwaysApply: false
---
# Project Structure Guidelines

## Directory Organization
- Project Type: ${formData.projectType}
- Source Directory: ${formData.sourceDirectory}
- Component Organization: ${formData.componentOrganization}

## File Naming Conventions
- Components: ${formData.componentNaming}
- Files: ${formData.fileNaming}
- Import Style: ${formData.importStyle}

## Structure Requirements
${formData.projectType === 'monorepo' ? `
- Use monorepo structure with clear package boundaries
- Shared utilities in common packages
- Independent deployment capabilities
` : formData.projectType === 'microservices' ? `
- Service-oriented architecture
- Clear API boundaries between services
- Independent scaling and deployment
` : `
- Single application structure
- Clear separation of concerns
- Modular component organization
`}

## Best Practices
- Keep related files together
- Use consistent naming across the project
- Maintain clear import/export patterns
- Document architectural decisions

## Code Examples:

\`\`\`
${formData.sourceDirectory}
${formData.componentOrganization === 'feature-based' ? `
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│   └── dashboard/
│       ├── components/
│       ├── hooks/
│       └── services/
` : `
├── components/
├── hooks/
├── services/
├── pages/
└── utils/
`}
\`\`\``;
}

function generateCodeQualityRule(formData: WizardFormData): string {
  const hasTypeScript = formData.additionalTech.includes('typescript');
  const hasReact = formData.additionalTech.includes('react') || formData.additionalTech.includes('nextjs');
  const hasJava = formData.additionalTech.includes('java') || formData.additionalTech.includes('spring-boot');
  const hasGo = formData.additionalTech.includes('golang') || formData.additionalTech.includes('gin');
  const hasLinting = formData.additionalTech.some(tech => ['eslint', 'biome', 'prettier'].includes(tech));
  const hasTesting = formData.additionalTech.some(tech => ['jest', 'vitest', 'cypress', 'playwright'].includes(tech));

  return `---
description: Comprehensive code quality standards and best practices based on industry research
globs: 
alwaysApply: true
---
# Code Quality Excellence Framework

## Core Quality Principles

### The SOLID Foundation
Apply SOLID principles for maintainable, scalable code:

\`\`\`typescript
// Good: Single Responsibility Principle
class UserValidator {
  validate(user: UserData): ValidationResult {
    const errors: string[] = [];
    
    if (!this.isValidEmail(user.email)) {
      errors.push('Invalid email format');
    }
    
    if (!this.isValidAge(user.age)) {
      errors.push('Age must be between 13 and 120');
    }
    
    return { isValid: errors.length === 0, errors };
  }
  
  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  private isValidAge(age: number): boolean {
    return age >= 13 && age <= 120;
  }
}

// Good: Open/Closed Principle - extensible without modification
abstract class PaymentProcessor {
  abstract process(payment: Payment): Promise<PaymentResult>;
  
  protected logTransaction(payment: Payment, result: PaymentResult): void {
    this.logger.info('Payment processed', { payment, result });
  }
}

class CreditCardProcessor extends PaymentProcessor {
  async process(payment: Payment): Promise<PaymentResult> {
    const result = await this.creditCardGateway.charge(payment);
    this.logTransaction(payment, result);
    return result;
  }
}

class PayPalProcessor extends PaymentProcessor {
  async process(payment: Payment): Promise<PaymentResult> {
    const result = await this.paypalGateway.execute(payment);
    this.logTransaction(payment, result);
    return result;
  }
}
\`\`\`

### Defensive Programming
Build robust code that handles edge cases gracefully:

\`\`\`typescript
// Good: Comprehensive input validation and error handling
class UserService {
  async createUser(userData: CreateUserRequest): Promise<User> {
    // Validate preconditions
    this.validateCreateUserRequest(userData);
    
    // Normalize and sanitize input
    const normalizedData = this.normalizeUserData(userData);
    
    // Check business rules
    await this.validateBusinessRules(normalizedData);
    
    try {
      // Create user with transaction
      const user = await this.database.transaction(async (tx) => {
        const createdUser = await this.userRepository.create(normalizedData, tx);
        await this.profileRepository.createDefault(createdUser.id, tx);
        await this.auditRepository.logUserCreation(createdUser.id, tx);
        return createdUser;
      });
      
      // Send welcome email asynchronously
      this.emailService.sendWelcomeEmail(user.email)
        .catch(error => this.logger.error('Failed to send welcome email', { userId: user.id, error }));
      
      return user;
    } catch (error) {
      this.logger.error('User creation failed', { userData: normalizedData, error });
      
      if (error.code === 'UNIQUE_VIOLATION') {
        throw new ConflictError('User with this email already exists');
      }
      
      throw new InternalServerError('Failed to create user');
    }
  }
  
  private validateCreateUserRequest(data: CreateUserRequest): void {
    const schema = z.object({
      email: z.string().email('Invalid email format'),
      name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
      age: z.number().int().min(13, 'Must be 13 or older').max(120, 'Invalid age'),
      password: z.string().min(8, 'Password must be at least 8 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number')
    });
    
    const result = schema.safeParse(data);
    if (!result.success) {
      throw new ValidationError('Invalid user data', result.error.issues);
    }
  }
  
  private normalizeUserData(data: CreateUserRequest): CreateUserRequest {
    return {
      ...data,
      email: data.email.toLowerCase().trim(),
      name: data.name.trim(),
    };
  }
  
  private async validateBusinessRules(data: CreateUserRequest): Promise<void> {
    // Check for existing user
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictError('User already exists');
    }
    
    // Check against blocklist
    const isBlocked = await this.blocklistService.isEmailBlocked(data.email);
    if (isBlocked) {
      throw new ForbiddenError('Email is not allowed');
    }
  }
}
\`\`\`

## Code Organization Principles

### Clean Architecture Pattern
Organize code in layers with clear dependencies:

\`\`\`typescript
// Good: Clean architecture with dependency inversion
// Domain Layer - Business logic (no external dependencies)
export class User {
  constructor(
    public readonly id: UserId,
    public readonly email: Email,
    public readonly name: string,
    private password: HashedPassword
  ) {}
  
  changePassword(newPassword: string, passwordHasher: PasswordHasher): void {
    if (newPassword.length < 8) {
      throw new DomainError('Password must be at least 8 characters');
    }
    
    this.password = passwordHasher.hash(newPassword);
  }
  
  isPasswordValid(password: string, passwordHasher: PasswordHasher): boolean {
    return passwordHasher.verify(password, this.password);
  }
}

// Application Layer - Use cases
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private passwordHasher: PasswordHasher,
    private emailService: EmailService
  ) {}
  
  async execute(request: CreateUserRequest): Promise<User> {
    // Validate input
    if (!request.email || !request.password) {
      throw new ValidationError('Email and password are required');
    }
    
    // Check if user exists
    const existingUser = await this.userRepository.findByEmail(request.email);
    if (existingUser) {
      throw new ConflictError('User already exists');
    }
    
    // Create user
    const userId = UserId.generate();
    const user = new User(
      userId,
      new Email(request.email),
      request.name,
      this.passwordHasher.hash(request.password)
    );
    
    // Save user
    await this.userRepository.save(user);
    
    // Send welcome email
    await this.emailService.sendWelcomeEmail(user.email.value);
    
    return user;
  }
}

// Infrastructure Layer - External concerns
export class PostgresUserRepository implements UserRepository {
  constructor(private database: Database) {}
  
  async save(user: User): Promise<void> {
    await this.database.query(
      'INSERT INTO users (id, email, name, password) VALUES ($1, $2, $3, $4)',
      [user.id.value, user.email.value, user.name, user.password.value]
    );
  }
  
  async findByEmail(email: string): Promise<User | null> {
    const result = await this.database.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    return result.rows[0] ? this.mapToUser(result.rows[0]) : null;
  }
}
\`\`\`

### Function Design Excellence
Write functions that are pure, testable, and focused:

\`\`\`typescript
// Good: Pure functions with single responsibility
type ValidationRule<T> = (value: T) => string | null;

const createEmailValidator = (): ValidationRule<string> => (email: string) => {
  if (!email) return 'Email is required';
  if (!email.includes('@')) return 'Email must contain @';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format';
  return null;
};

const createPasswordValidator = (minLength: number = 8): ValidationRule<string> => (password: string) => {
  if (!password) return 'Password is required';
  if (password.length < minLength) return \`Password must be at least \${minLength} characters\`;
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return 'Password must contain uppercase, lowercase, and number';
  }
  return null;
};

// Good: Composition over inheritance
const validateUser = (user: UserInput): ValidationResult => {
  const emailError = createEmailValidator()(user.email);
  const passwordError = createPasswordValidator()(user.password);
  
  const errors = [emailError, passwordError].filter(Boolean);
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Good: Immutable data transformations
const normalizeUser = (user: UserInput): NormalizedUser => ({
  ...user,
  email: user.email.toLowerCase().trim(),
  name: user.name.trim(),
  createdAt: new Date().toISOString()
});

// Good: Error handling with Result pattern
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

const parseUser = (input: unknown): Result<User> => {
  try {
    const parsed = userSchema.parse(input);
    return { success: true, data: parsed };
  } catch (error) {
    return { success: false, error: error as Error };
  }
};

// Usage
const result = parseUser(userInput);
if (result.success) {
  console.log('User:', result.data);
} else {
  console.error('Validation failed:', result.error.message);
}
\`\`\`

## Performance and Security

### Memory Management and Performance
Write efficient code that scales:

\`\`\`typescript
// Good: Efficient data processing with streaming
import { Transform } from 'stream';

class UserProcessor extends Transform {
  constructor(private batchSize: number = 100) {
    super({ objectMode: true });
    this.batch = [];
  }
  
  private batch: User[] = [];
  
  _transform(user: User, encoding: string, callback: Function) {
    this.batch.push(user);
    
    if (this.batch.length >= this.batchSize) {
      this.processBatch()
        .then(() => callback())
        .catch(callback);
    } else {
      callback();
    }
  }
  
  _flush(callback: Function) {
    if (this.batch.length > 0) {
      this.processBatch()
        .then(() => callback())
        .catch(callback);
    } else {
      callback();
    }
  }
  
  private async processBatch(): Promise<void> {
    await this.userService.processBatch(this.batch);
    this.batch = [];
  }
}

// Good: Memoization for expensive computations
const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map();
  
  return ((...args: any[]) => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    
    return result;
  }) as T;
};

const expensiveCalculation = memoize((data: ComplexData): ProcessedData => {
  // Heavy computation here
  return processComplexData(data);
});
\`\`\`

### Security Best Practices
Build secure applications from the ground up:

\`\`\`typescript
// Good: Secure input handling and validation
import { escape } from 'html-escaper';

class SecureUserService {
  async updateUserProfile(userId: string, updates: UserProfileUpdate): Promise<User> {
    // Validate authorization
    await this.authService.requireUserAccess(userId);
    
    // Sanitize inputs
    const sanitizedUpdates = this.sanitizeUserInput(updates);
    
    // Validate business rules
    await this.validateProfileUpdates(userId, sanitizedUpdates);
    
    return await this.userRepository.update(userId, sanitizedUpdates);
  }
  
  private sanitizeUserInput(input: UserProfileUpdate): UserProfileUpdate {
    return {
      name: input.name ? escape(input.name.trim()) : undefined,
      bio: input.bio ? this.sanitizeHtml(input.bio) : undefined,
      website: input.website ? this.validateUrl(input.website) : undefined,
    };
  }
}
\`\`\`

## Applied Quality Rules
Based on your project configuration:

${formData.codeQuality.map(rule => `- ${rule}`).join('\n')}

### Documentation Level: ${formData.documentationLevel}
- Comment Styles: ${formData.commentStyle.join(', ')}
- README Requirements: ${formData.readmeRequirements.join(', ')}

Remember: Code quality is not just about following rules—it's about creating maintainable, secure, and performant software that serves users reliably.`;
}
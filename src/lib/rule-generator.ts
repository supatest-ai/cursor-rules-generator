import { WizardFormData } from "@/types/wizard";
import { STATIC_RULES, FRAMEWORK_TEMPLATES, TASK_TEMPLATES } from "./rule-templates";

export function generateRules(formData: WizardFormData) {
  const rules = [];

  // Add static rules (always included)
  Object.entries(STATIC_RULES).forEach(([filename, content]) => {
    rules.push({
      filename,
      content,
      isStatic: true
    });
  });

  // Add framework-specific rules
  const frameworkRules = FRAMEWORK_TEMPLATES[formData.framework as keyof typeof FRAMEWORK_TEMPLATES];
  if (frameworkRules) {
    Object.entries(frameworkRules).forEach(([filename, content]) => {
      rules.push({
        filename,
        content,
        isStatic: false
      });
    });
  }

  // Add project structure rule
  rules.push({
    filename: "project-structure.mdc",
    content: generateProjectStructureRule(formData),
    isStatic: false
  });

  // Add development workflow rule
  rules.push({
    filename: "development-workflow.mdc",
    content: generateDevelopmentWorkflowRule(formData),
    isStatic: false
  });

  // Add task-specific rules
  if (formData.taskTypes.includes('features')) {
    rules.push({
      filename: "feature-development.mdc",
      content: TASK_TEMPLATES.features,
      isStatic: false
    });
  }

  if (formData.taskTypes.includes('bugs')) {
    rules.push({
      filename: "bug-fixing.mdc",
      content: TASK_TEMPLATES.bugs,
      isStatic: false
    });
  }

  if (formData.taskTypes.includes('testing')) {
    rules.push({
      filename: "testing-guidelines.mdc",
      content: TASK_TEMPLATES.testing,
      isStatic: false
    });
  }

  // Add code quality rule
  rules.push({
    filename: "code-quality.mdc",
    content: generateCodeQualityRule(formData),
    isStatic: false
  });

  return rules;
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
  return `---
description: Code quality standards and best practices
globs: 
alwaysApply: true
---
# Code Quality Standards

## Code Quality Rules
${formData.codeQuality.map(rule => `- ${rule}`).join('\n')}

## Documentation Requirements
- Level: ${formData.documentationLevel}
- Comment Styles: ${formData.commentStyle.join(', ')}
- README Requirements: ${formData.readmeRequirements.join(', ')}

## Best Practices
- Write self-documenting code
- Follow consistent naming conventions
- Implement proper error handling
- Maintain test coverage
- Use proper type safety

## Code Examples:

\`\`\`typescript
// Good: Following quality standards
interface UserData {
  id: string;
  name: string;
  email: string;
}

${formData.codeQuality.includes('No `any` types allowed') ? `
// Good: Proper typing
function processUser(user: UserData): ProcessedUser {
  return {
    ...user,
    displayName: user.name.trim()
  };
}

// Bad: Using any
function badProcessUser(user: any): any {
  return user;
}
` : ''}

${formData.codeQuality.includes('Enforce error boundaries') ? `
// Good: Error boundary implementation
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
}
` : ''}
\`\`\``;
}

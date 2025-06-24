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

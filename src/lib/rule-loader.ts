// Static imports for rule content using Vite's ?raw feature
import cursorRulesContent from '../rules/static/cursor-rules.mdc?raw';
import selfImproveContent from '../rules/static/self-improve.mdc?raw';
import reactDevelopmentContent from '../rules/frameworks/react/react-development.mdc?raw';
import springBootDevelopmentContent from '../rules/frameworks/java/spring-boot-development.mdc?raw';
import ginDevelopmentContent from '../rules/frameworks/golang/gin-development.mdc?raw';
import fastapiDevelopmentContent from '../rules/frameworks/python/fastapi-development.mdc?raw';
import djangoDevelopmentContent from '../rules/frameworks/python/django-development.mdc?raw';
import flaskDevelopmentContent from '../rules/frameworks/python/flask-development.mdc?raw';
import featuresContent from '../rules/tasks/features.mdc?raw';

export interface RuleMetadata {
    id: string;
    name: string;
    description: string;
    globs?: string;
    alwaysApply: boolean;
    category: 'framework' | 'task' | 'static';
    technology?: string;
    framework?: string;
    filePath: string;
}

export interface TechnologyConfig {
    id: string;
    name: string;
    description: string;
    frameworks: FrameworkConfig[];
}

export interface FrameworkConfig {
    id: string;
    name: string;
    description: string;
    rules: string[]; // Rule IDs
}

// Static content mapping
const RULE_CONTENT_MAP: Record<string, string> = {
    'cursor-rules': cursorRulesContent,
    'self-improve': selfImproveContent,
    'react-development': reactDevelopmentContent,
    'spring-boot-development': springBootDevelopmentContent,
    'gin-development': ginDevelopmentContent,
    'fastapi-development': fastapiDevelopmentContent,
    'django-development': djangoDevelopmentContent,
    'flask-development': flaskDevelopmentContent,
    'features': featuresContent
};

// Dynamic rule loading configuration
export const RULE_METADATA: RuleMetadata[] = [
    // Static rules
    {
        id: 'cursor-rules',
        name: 'Cursor Rules Location',
        description: 'Cursor Rules Location and Structure Guidelines',
        alwaysApply: true,
        category: 'static',
        filePath: 'src/rules/static/cursor-rules.mdc'
    },
    {
        id: 'self-improve',
        name: 'Rule Improvement',
        description: 'Continuous Rule Improvement and Pattern Recognition',
        alwaysApply: true,
        category: 'static',
        filePath: 'src/rules/static/self-improve.mdc'
    },

    // React framework rules
    {
        id: 'react-development',
        name: 'React Development',
        description: 'Modern React development patterns and performance optimization',
        globs: '**/*.{tsx,jsx}',
        alwaysApply: false,
        category: 'framework',
        technology: 'react',
        framework: 'react',
        filePath: 'src/rules/frameworks/react/react-development.mdc'
    },

    // Java framework rules
    {
        id: 'spring-boot-development',
        name: 'Spring Boot Development',
        description: 'Spring Boot development best practices based on official documentation',
        globs: '**/*.java',
        alwaysApply: false,
        category: 'framework',
        technology: 'java',
        framework: 'spring-boot',
        filePath: 'src/rules/frameworks/java/spring-boot-development.mdc'
    },

    // Golang framework rules
    {
        id: 'gin-development',
        name: 'Gin Framework',
        description: 'Gin framework development best practices',
        globs: '**/*.go',
        alwaysApply: false,
        category: 'framework',
        technology: 'golang',
        framework: 'gin',
        filePath: 'src/rules/frameworks/golang/gin-development.mdc'
    },

    // Python framework rules
    {
        id: 'fastapi-development',
        name: 'FastAPI Development',
        description: 'FastAPI framework development best practices and modern patterns',
        globs: '**/*.py',
        alwaysApply: false,
        category: 'framework',
        technology: 'python',
        framework: 'fastapi',
        filePath: 'src/rules/frameworks/python/fastapi-development.mdc'
    },
    {
        id: 'django-development',
        name: 'Django Development',
        description: 'Django framework development best practices and modern patterns',
        globs: '**/*.py',
        alwaysApply: false,
        category: 'framework',
        technology: 'python',
        framework: 'django',
        filePath: 'src/rules/frameworks/python/django-development.mdc'
    },
    {
        id: 'flask-development',
        name: 'Flask Development',
        description: 'Flask framework development best practices and modern patterns',
        globs: '**/*.py',
        alwaysApply: false,
        category: 'framework',
        technology: 'python',
        framework: 'flask',
        filePath: 'src/rules/frameworks/python/flask-development.mdc'
    },

    // Task-based rules
    {
        id: 'features',
        name: 'Feature Development',
        description: 'Feature development guidelines and best practices',
        alwaysApply: false,
        category: 'task',
        filePath: 'src/rules/tasks/features.mdc'
    }
];

export const TECHNOLOGY_CONFIG: TechnologyConfig[] = [
    {
        id: 'react',
        name: 'React',
        description: 'React and TypeScript development',
        frameworks: [
            {
                id: 'react',
                name: 'React',
                description: 'Core React development with modern patterns',
                rules: ['react-development']
            }
        ]
    },
    {
        id: 'java',
        name: 'Java',
        description: 'Java backend development',
        frameworks: [
            {
                id: 'spring-boot',
                name: 'Spring Boot',
                description: 'Enterprise Java development with Spring Boot',
                rules: ['spring-boot-development']
            }
        ]
    },
    {
        id: 'golang',
        name: 'Go',
        description: 'Go backend development',
        frameworks: [
            {
                id: 'gin',
                name: 'Gin',
                description: 'Fast HTTP web framework',
                rules: ['gin-development']
            }
        ]
    },
    {
        id: 'python',
        name: 'Python',
        description: 'Python backend development',
        frameworks: [
            {
                id: 'fastapi',
                name: 'FastAPI',
                description: 'Modern, fast web framework for building APIs',
                rules: ['fastapi-development']
            },
            {
                id: 'django',
                name: 'Django',
                description: 'High-level Python web framework',
                rules: ['django-development']
            },
            {
                id: 'flask',
                name: 'Flask',
                description: 'Lightweight WSGI web application framework',
                rules: ['flask-development']
            }
        ]
    }
];

// Rule content loading functions
export function loadRuleContent(ruleId: string): string {
    const content = RULE_CONTENT_MAP[ruleId];
    if (!content) {
        throw new Error(`Rule content not found for ID: ${ruleId}. Available rules: ${Object.keys(RULE_CONTENT_MAP).join(', ')}`);
    }
    return content;
}

export function getRulesByTechnology(technologyId: string): RuleMetadata[] {
    return RULE_METADATA.filter(rule => rule.technology === technologyId);
}

export function getRulesByFramework(frameworkId: string): RuleMetadata[] {
    return RULE_METADATA.filter(rule => rule.framework === frameworkId);
}

export function getRulesByCategory(category: string): RuleMetadata[] {
    return RULE_METADATA.filter(rule => rule.category === category);
}

export function getRuleById(id: string): RuleMetadata | undefined {
    return RULE_METADATA.find(rule => rule.id === id);
} 
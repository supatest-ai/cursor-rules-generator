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
    {
        id: 'typescript-quality',
        name: 'TypeScript Quality',
        description: 'Advanced TypeScript practices for React applications',
        globs: '**/*.{ts,tsx}',
        alwaysApply: true,
        category: 'framework',
        technology: 'react',
        framework: 'react',
        filePath: 'src/rules/frameworks/react/typescript-quality.mdc'
    },

    // Java framework rules
    {
        id: 'java-development',
        name: 'Java Development',
        description: 'Modern Java development best practices and patterns',
        globs: '**/*.java',
        alwaysApply: false,
        category: 'framework',
        technology: 'java',
        filePath: 'src/rules/frameworks/java/java-development.mdc'
    },
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
    {
        id: 'quarkus-development',
        name: 'Quarkus Development',
        description: 'Quarkus cloud-native Java development best practices',
        globs: '**/*.java',
        alwaysApply: false,
        category: 'framework',
        technology: 'java',
        framework: 'quarkus',
        filePath: 'src/rules/frameworks/java/quarkus-development.mdc'
    },
    {
        id: 'micronaut-development',
        name: 'Micronaut Development',
        description: 'Micronaut framework development best practices for JVM applications',
        globs: '**/*.java',
        alwaysApply: false,
        category: 'framework',
        technology: 'java',
        framework: 'micronaut',
        filePath: 'src/rules/frameworks/java/micronaut-development.mdc'
    },
    {
        id: 'dropwizard-development',
        name: 'Dropwizard Development',
        description: 'Dropwizard framework development best practices',
        globs: '**/*.java',
        alwaysApply: false,
        category: 'framework',
        technology: 'java',
        framework: 'dropwizard',
        filePath: 'src/rules/frameworks/java/dropwizard-development.mdc'
    },

    // Golang framework rules
    {
        id: 'golang-development',
        name: 'Go Development',
        description: 'Go development best practices and patterns',
        globs: '**/*.go',
        alwaysApply: false,
        category: 'framework',
        technology: 'golang',
        filePath: 'src/rules/frameworks/golang/golang-development.mdc'
    },
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
    {
        id: 'echo-development',
        name: 'Echo Framework',
        description: 'Echo framework development best practices',
        globs: '**/*.go',
        alwaysApply: false,
        category: 'framework',
        technology: 'golang',
        framework: 'echo',
        filePath: 'src/rules/frameworks/golang/echo-development.mdc'
    },
    {
        id: 'fiber-development',
        name: 'Fiber Framework',
        description: 'Fiber framework development best practices for high-performance Go applications',
        globs: '**/*.go',
        alwaysApply: false,
        category: 'framework',
        technology: 'golang',
        framework: 'fiber',
        filePath: 'src/rules/frameworks/golang/fiber-development.mdc'
    },
    {
        id: 'gorilla-mux-development',
        name: 'Gorilla Mux',
        description: 'Gorilla Mux HTTP router development best practices',
        globs: '**/*.go',
        alwaysApply: false,
        category: 'framework',
        technology: 'golang',
        framework: 'gorilla-mux',
        filePath: 'src/rules/frameworks/golang/gorilla-mux-development.mdc'
    },

    // Vue framework rules
    {
        id: 'vue-development',
        name: 'Vue Development',
        description: 'Vue.js development best practices and patterns',
        globs: '**/*.vue',
        alwaysApply: false,
        category: 'framework',
        technology: 'vue',
        framework: 'vue',
        filePath: 'src/rules/frameworks/vue/vue-development.mdc'
    },

    // Next.js framework rules
    {
        id: 'nextjs-development',
        name: 'Next.js Development',
        description: 'Next.js development best practices and patterns',
        globs: '**/*.{tsx,jsx,ts,js}',
        alwaysApply: false,
        category: 'framework',
        technology: 'react',
        framework: 'nextjs',
        filePath: 'src/rules/frameworks/react/nextjs-development.mdc'
    },

    // Node.js framework rules
    {
        id: 'nodejs-development',
        name: 'Node.js Development',
        description: 'Node.js and Express development best practices',
        globs: '**/*.{ts,js}',
        alwaysApply: false,
        category: 'framework',
        technology: 'nodejs',
        framework: 'nodejs',
        filePath: 'src/rules/frameworks/nodejs/nodejs-development.mdc'
    },

    // Task-based rules
    {
        id: 'features',
        name: 'Feature Development',
        description: 'Feature development guidelines and best practices',
        alwaysApply: false,
        category: 'task',
        filePath: 'src/rules/tasks/features.mdc'
    },
    {
        id: 'bugs',
        name: 'Bug Fixing',
        description: 'Systematic bug fixing methodology and best practices based on industry standards',
        alwaysApply: false,
        category: 'task',
        filePath: 'src/rules/tasks/bugs.mdc'
    },
    {
        id: 'testing',
        name: 'Testing Guidelines',
        description: 'Comprehensive testing guidelines and best practices based on modern testing strategies',
        globs: '**/*.{test,spec}.{ts,tsx,js,jsx}',
        alwaysApply: false,
        category: 'task',
        filePath: 'src/rules/tasks/testing.mdc'
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
                rules: ['react-development', 'typescript-quality']
            },
            {
                id: 'nextjs',
                name: 'Next.js',
                description: 'Full-stack React framework',
                rules: ['nextjs-development', 'react-development', 'typescript-quality']
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
                rules: ['spring-boot-development', 'java-development']
            },
            {
                id: 'quarkus',
                name: 'Quarkus',
                description: 'Cloud-native Java with fast startup',
                rules: ['quarkus-development', 'java-development']
            },
            {
                id: 'micronaut',
                name: 'Micronaut',
                description: 'Reactive microservices framework',
                rules: ['micronaut-development', 'java-development']
            },
            {
                id: 'dropwizard',
                name: 'Dropwizard',
                description: 'Simple, lightweight Java framework',
                rules: ['dropwizard-development', 'java-development']
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
                rules: ['gin-development', 'golang-development']
            },
            {
                id: 'echo',
                name: 'Echo',
                description: 'High performance, extensible web framework',
                rules: ['echo-development', 'golang-development']
            },
            {
                id: 'fiber',
                name: 'Fiber',
                description: 'Express inspired web framework',
                rules: ['fiber-development', 'golang-development']
            },
            {
                id: 'gorilla-mux',
                name: 'Gorilla Mux',
                description: 'Powerful HTTP router and URL matcher',
                rules: ['gorilla-mux-development', 'golang-development']
            }
        ]
    },
    {
        id: 'vue',
        name: 'Vue',
        description: 'Vue.js development',
        frameworks: [
            {
                id: 'vue',
                name: 'Vue.js',
                description: 'Progressive JavaScript framework',
                rules: ['vue-development']
            }
        ]
    },
    {
        id: 'nodejs',
        name: 'Node.js',
        description: 'Node.js backend development',
        frameworks: [
            {
                id: 'nodejs',
                name: 'Node.js/Express',
                description: 'Node.js with Express framework',
                rules: ['nodejs-development']
            }
        ]
    }
];

// Rule content loading functions
export async function loadRuleContent(filePath: string): Promise<string> {
    try {
        // Read the file directly from the file system
        const fs = await import('fs');
        const path = await import('path');

        // Resolve the path relative to the project root
        const fullPath = path.resolve(process.cwd(), filePath);

        // Read the file content
        const content = await fs.promises.readFile(fullPath, 'utf-8');
        return content;
    } catch (error) {
        throw new Error(`Failed to load rule from ${filePath}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
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
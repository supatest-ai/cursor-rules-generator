import {
  RULE_METADATA,
  TECHNOLOGY_CONFIG,
  loadRuleContent,
  getRulesByTechnology,
  getRulesByFramework,
  getRulesByCategory,
  getRuleById,
  type RuleMetadata,
  type TechnologyConfig,
  type FrameworkConfig
} from './rule-loader';

// Legacy exports for backward compatibility - now empty by default
export const STATIC_RULES: Record<string, string> = {};
export const FRAMEWORK_TEMPLATES: Record<string, Record<string, string>> = {};
export const TASK_TEMPLATES: Record<string, string> = {};

// Dynamic rule loading functions - no fallbacks
export function getStaticRules(): Record<string, string> {
  const staticRules: Record<string, string> = {};
  const staticRuleMetadata = getRulesByCategory('static');

  for (const rule of staticRuleMetadata) {
    const content = loadRuleContent(rule.id);
    staticRules[rule.id] = content;
  }

  return staticRules;
}

export function getFrameworkTemplates(): Record<string, Record<string, string>> {
  const frameworkTemplates: Record<string, Record<string, string>> = {};

  for (const technology of TECHNOLOGY_CONFIG) {
    frameworkTemplates[technology.id] = {};

    const techRules = getRulesByTechnology(technology.id);
    for (const rule of techRules) {
      const content = loadRuleContent(rule.id);
      frameworkTemplates[technology.id][rule.id] = content;
    }
  }

  return frameworkTemplates;
}

export function getTaskTemplates(): Record<string, string> {
  const taskTemplates: Record<string, string> = {};
  const taskRules = getRulesByCategory('task');

  for (const rule of taskRules) {
    const content = loadRuleContent(rule.id);
    taskTemplates[rule.id] = content;
  }

  return taskTemplates;
}

// Utility functions for rule management
export function getTechnologies(): TechnologyConfig[] {
  return TECHNOLOGY_CONFIG;
}

export function getFrameworksForTechnology(technologyId: string): FrameworkConfig[] {
  const technology = TECHNOLOGY_CONFIG.find(tech => tech.id === technologyId);
  return technology?.frameworks || [];
}

export function getRulesForFramework(frameworkId: string): RuleMetadata[] {
  return getRulesByFramework(frameworkId);
}

export function getAllRules(): RuleMetadata[] {
  return RULE_METADATA;
}

export function searchRules(query: string): RuleMetadata[] {
  const lowercaseQuery = query.toLowerCase();
  return RULE_METADATA.filter(rule =>
    rule.name.toLowerCase().includes(lowercaseQuery) ||
    rule.description.toLowerCase().includes(lowercaseQuery) ||
    rule.technology?.toLowerCase().includes(lowercaseQuery) ||
    rule.framework?.toLowerCase().includes(lowercaseQuery)
  );
}

// Export types for external use
export type {
  RuleMetadata,
  TechnologyConfig,
  FrameworkConfig
};

// Re-export loader utilities
export {
  RULE_METADATA,
  TECHNOLOGY_CONFIG,
  loadRuleContent,
  getRulesByTechnology,
  getRulesByFramework,
  getRulesByCategory,
  getRuleById
};

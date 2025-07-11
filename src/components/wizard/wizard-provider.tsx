import { createContext, useContext, useState, ReactNode } from "react";
import { WizardContextType, WizardFormData, GeneratedRule } from "@/types/wizard";
import { generateRules } from "@/lib/rule-generator";

const WizardContext = createContext<WizardContextType | undefined>(undefined);

const initialFormData: WizardFormData = {
  framework: "react",
  additionalTech: ["tailwind", "zod", "pnpm"],
  projectType: "monorepo",
  sourceDirectory: "src/",
  componentOrganization: "feature-based",
  componentNaming: "PascalCase",
  fileNaming: "kebab-case",
  codeQuality: ["Strict TypeScript mode", "No `any` types allowed", "Enforce error boundaries"],
  importStyle: "absolute",
  taskTypes: ["features", "bugs", "testing"],
  documentationLevel: "moderate",
  commentStyle: ["JSDoc format", "Inline comments for complex logic"],
  readmeRequirements: ["Setup and installation instructions", "API documentation"]
};

export function WizardProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<WizardFormData>(initialFormData);
  const [generatedRules, setGeneratedRules] = useState<GeneratedRule[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const totalSteps = 6;

  const updateFormData = (data: Partial<WizardFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const generateRulesHandler = async () => {
    setIsGenerating(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      const rules = generateRules(formData);
      setGeneratedRules(rules);
    } catch (error) {
      console.error("Failed to generate rules:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const resetWizard = () => {
    setCurrentStep(1);
    setFormData(initialFormData);
    setGeneratedRules([]);
    setIsGenerating(false);
  };

  const value: WizardContextType = {
    currentStep,
    totalSteps,
    formData,
    generatedRules,
    isGenerating,
    updateFormData,
    nextStep,
    prevStep,
    generateRules: generateRulesHandler,
    resetWizard
  };

  return (
    <WizardContext.Provider value={value}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
}

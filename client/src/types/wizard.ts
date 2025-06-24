export interface WizardFormData {
  framework: string;
  additionalTech: string[];
  projectType: string;
  sourceDirectory: string;
  componentOrganization: string;
  componentNaming: string;
  fileNaming: string;
  codeQuality: string[];
  importStyle: string;
  taskTypes: string[];
  documentationLevel: string;
  commentStyle: string[];
  readmeRequirements: string[];
}

export interface GeneratedRule {
  filename: string;
  content: string;
  isStatic: boolean;
}

export interface WizardContextType {
  currentStep: number;
  totalSteps: number;
  formData: WizardFormData;
  generatedRules: GeneratedRule[];
  isGenerating: boolean;
  updateFormData: (data: Partial<WizardFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  generateRules: () => void;
  resetWizard: () => void;
}

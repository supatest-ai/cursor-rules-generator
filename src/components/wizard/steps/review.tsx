import { useWizard } from "../wizard-provider";
import WizardStep from "../wizard-step";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Wand2 } from "lucide-react";

export default function Review() {
  const { formData, generateRules, isGenerating } = useWizard();

  const handleGenerate = () => {
    generateRules();
  };

  return (
    <WizardStep
      stepNumber={6}
      onNext={handleGenerate}
      nextDisabled={isGenerating}
      nextLabel={isGenerating ? "Generating..." : "Generate Rules"}
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Review & Generate</h3>
      <p className="text-gray-600 mb-6">
        Review your selections and generate your custom cursor rules.
      </p>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Configuration Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Framework:</span>
            <span className="text-gray-900 font-medium capitalize">{formData.framework}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Project Type:</span>
            <span className="text-gray-900 font-medium capitalize">{formData.projectType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Code Style:</span>
            <span className="text-gray-900 font-medium">
              {formData.codeQuality.includes("Strict TypeScript mode") ? "Strict TS" : "Standard"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Task Focus:</span>
            <span className="text-gray-900 font-medium capitalize">
              {formData.taskTypes.slice(0, 3).join(", ")}
              {formData.taskTypes.length > 3 && ` +${formData.taskTypes.length - 3} more`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Documentation:</span>
            <span className="text-gray-900 font-medium capitalize">{formData.documentationLevel}</span>
          </div>
        </div>
      </div>

      <Alert className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <p className="font-medium text-amber-800">Ready to Generate</p>
          <p className="text-amber-700 mt-1">
            This will create {2 + formData.taskTypes.length + 2} cursor rule files optimized for your project configuration.
          </p>
        </AlertDescription>
      </Alert>

      {!isGenerating && (
        <Button
          onClick={handleGenerate}
          className="w-full gradient-bg text-white hover:opacity-90 flex items-center justify-center space-x-2"
        >
          <Wand2 className="w-5 h-5" />
          <span>Generate Cursor Rules</span>
        </Button>
      )}

      {isGenerating && (
        <div className="flex items-center justify-center space-x-2 text-purple-600">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-purple-600 border-t-transparent"></div>
          <span>Generating your custom rules...</span>
        </div>
      )}
    </WizardStep>
  );
}

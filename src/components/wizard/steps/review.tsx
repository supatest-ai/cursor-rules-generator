import { useWizard } from "../wizard-provider";
import WizardStep from "../wizard-step";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default function Review() {
  const { formData, generateRules, isGenerating } = useWizard();

  return (
    <WizardStep
      stepNumber={6}
      onNext={generateRules}
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

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <p className="font-medium text-amber-800">Ready to Generate</p>
          <p className="text-amber-700 mt-1">
            This will create {2 + formData.taskTypes.length + 2} cursor rule files optimized for your project configuration. Use the "Generate Rules" button below to proceed.
          </p>
        </AlertDescription>
      </Alert>
    </WizardStep>
  );
}

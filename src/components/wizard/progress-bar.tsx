import { useWizard } from "./wizard-provider";

export default function ProgressBar() {
  const { currentStep, totalSteps } = useWizard();
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Project Setup</h2>
        <span className="text-sm text-gray-500">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="gradient-bg h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

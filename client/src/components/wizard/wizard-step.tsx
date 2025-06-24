import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useWizard } from "./wizard-provider";

interface WizardStepProps {
  children: ReactNode;
  stepNumber: number;
  onNext?: () => void;
  onPrev?: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
}

export default function WizardStep({
  children,
  stepNumber,
  onNext,
  onPrev,
  nextDisabled = false,
  nextLabel = "Next Step"
}: WizardStepProps) {
  const { currentStep, nextStep, prevStep, totalSteps } = useWizard();

  if (currentStep !== stepNumber) return null;

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      nextStep();
    }
  };

  const handlePrev = () => {
    if (onPrev) {
      onPrev();
    } else {
      prevStep();
    }
  };

  return (
    <div className="wizard-step">
      <div className="p-6">{children}</div>
      
      {/* Navigation */}
      <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
        <Button
          variant="ghost"
          onClick={handlePrev}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={nextDisabled}
          className="gradient-bg text-white hover:opacity-90"
        >
          {currentStep === totalSteps ? "Generate Rules" : nextLabel}
        </Button>
      </div>
    </div>
  );
}

import { useWizard } from "../wizard-provider";
import WizardStep from "../wizard-step";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const commentStyleOptions = [
  "JSDoc format",
  "Inline comments for complex logic",
  "TODO comments for future improvements"
];

const readmeOptions = [
  "Setup and installation instructions",
  "API documentation",
  "Contributing guidelines"
];

export default function Documentation() {
  const { formData, updateFormData } = useWizard();

  const handleCommentStyleChange = (style: string, checked: boolean) => {
    const updated = checked
      ? [...formData.commentStyle, style]
      : formData.commentStyle.filter(s => s !== style);
    
    updateFormData({ commentStyle: updated });
  };

  const handleReadmeChange = (requirement: string, checked: boolean) => {
    const updated = checked
      ? [...formData.readmeRequirements, requirement]
      : formData.readmeRequirements.filter(r => r !== requirement);
    
    updateFormData({ readmeRequirements: updated });
  };

  return (
    <WizardStep stepNumber={5}>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Documentation Requirements</h3>
      <p className="text-gray-600 mb-6">
        Configure how detailed you want your generated documentation and comments.
      </p>

      <div className="space-y-6">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Documentation Level
          </Label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="doc-level"
                value="minimal"
                checked={formData.documentationLevel === "minimal"}
                onChange={(e) => updateFormData({ documentationLevel: e.target.value })}
                className="text-purple-500 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-700">Minimal - Only complex functions</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="doc-level"
                value="moderate"
                checked={formData.documentationLevel === "moderate"}
                onChange={(e) => updateFormData({ documentationLevel: e.target.value })}
                className="text-purple-500 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-700">Moderate - Public APIs and interfaces</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="doc-level"
                value="comprehensive"
                checked={formData.documentationLevel === "comprehensive"}
                onChange={(e) => updateFormData({ documentationLevel: e.target.value })}
                className="text-purple-500 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-700">Comprehensive - All functions and components</span>
            </label>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Comment Style
          </Label>
          <div className="space-y-2">
            {commentStyleOptions.map((style) => (
              <label key={style} className="flex items-center space-x-2">
                <Checkbox
                  checked={formData.commentStyle.includes(style)}
                  onCheckedChange={(checked) => handleCommentStyleChange(style, checked as boolean)}
                />
                <span className="text-sm text-gray-700">{style}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            README Requirements
          </Label>
          <div className="space-y-2">
            {readmeOptions.map((requirement) => (
              <label key={requirement} className="flex items-center space-x-2">
                <Checkbox
                  checked={formData.readmeRequirements.includes(requirement)}
                  onCheckedChange={(checked) => handleReadmeChange(requirement, checked as boolean)}
                />
                <span className="text-sm text-gray-700">{requirement}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </WizardStep>
  );
}

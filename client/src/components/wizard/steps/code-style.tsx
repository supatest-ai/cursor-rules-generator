import { useWizard } from "../wizard-provider";
import WizardStep from "../wizard-step";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const codeQualityOptions = [
  "Strict TypeScript mode",
  "No `any` types allowed",
  "Enforce error boundaries",
  "Require JSDoc comments"
];

export default function CodeStyle() {
  const { formData, updateFormData } = useWizard();

  const handleQualityChange = (option: string, checked: boolean) => {
    const updated = checked
      ? [...formData.codeQuality, option]
      : formData.codeQuality.filter(q => q !== option);
    
    updateFormData({ codeQuality: updated });
  };

  return (
    <WizardStep stepNumber={3}>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Code Style Preferences</h3>
      <p className="text-gray-600 mb-6">
        Configure your coding standards and formatting preferences.
      </p>

      <div className="space-y-6">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Naming Conventions
          </Label>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-gray-500 mb-1 block">Components</Label>
              <Select value={formData.componentNaming} onValueChange={(value) => updateFormData({ componentNaming: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PascalCase">PascalCase</SelectItem>
                  <SelectItem value="camelCase">camelCase</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-gray-500 mb-1 block">Files</Label>
              <Select value={formData.fileNaming} onValueChange={(value) => updateFormData({ fileNaming: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kebab-case">kebab-case.tsx</SelectItem>
                  <SelectItem value="PascalCase">PascalCase.tsx</SelectItem>
                  <SelectItem value="camelCase">camelCase.tsx</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Code Quality Rules
          </Label>
          <div className="space-y-2">
            {codeQualityOptions.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <Checkbox
                  checked={formData.codeQuality.includes(option)}
                  onCheckedChange={(checked) => handleQualityChange(option, checked as boolean)}
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Import Style
          </Label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="import-style"
                value="absolute"
                checked={formData.importStyle === "absolute"}
                onChange={(e) => updateFormData({ importStyle: e.target.value })}
                className="text-purple-500 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                Absolute imports (~/components/Button)
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="import-style"
                value="relative"
                checked={formData.importStyle === "relative"}
                onChange={(e) => updateFormData({ importStyle: e.target.value })}
                className="text-purple-500 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                Relative imports (./components/Button)
              </span>
            </label>
          </div>
        </div>
      </div>
    </WizardStep>
  );
}

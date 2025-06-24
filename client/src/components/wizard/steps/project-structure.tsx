import { useWizard } from "../wizard-provider";
import WizardStep from "../wizard-step";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ProjectStructure() {
  const { formData, updateFormData } = useWizard();

  return (
    <WizardStep stepNumber={2}>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Structure</h3>
      <p className="text-gray-600 mb-6">
        Define your project's directory structure and organization preferences.
      </p>

      <div className="space-y-4">
        <div>
          <Label htmlFor="projectType" className="text-sm font-medium text-gray-700 mb-2 block">
            Project Type
          </Label>
          <Select value={formData.projectType} onValueChange={(value) => updateFormData({ projectType: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monorepo">Monorepo with multiple packages</SelectItem>
              <SelectItem value="single">Single application</SelectItem>
              <SelectItem value="microservices">Microservices architecture</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="sourceDirectory" className="text-sm font-medium text-gray-700 mb-2 block">
            Source Directory
          </Label>
          <Input
            id="sourceDirectory"
            value={formData.sourceDirectory}
            onChange={(e) => updateFormData({ sourceDirectory: e.target.value })}
            placeholder="src/"
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Component Organization
          </Label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="component-org"
                value="feature-based"
                checked={formData.componentOrganization === "feature-based"}
                onChange={(e) => updateFormData({ componentOrganization: e.target.value })}
                className="text-purple-500 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                Feature-based (pages, components, hooks per feature)
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="component-org"
                value="type-based"
                checked={formData.componentOrganization === "type-based"}
                onChange={(e) => updateFormData({ componentOrganization: e.target.value })}
                className="text-purple-500 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                Type-based (all components, all hooks, all pages)
              </span>
            </label>
          </div>
        </div>
      </div>
    </WizardStep>
  );
}

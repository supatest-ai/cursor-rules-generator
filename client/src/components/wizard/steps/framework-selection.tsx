import { useWizard } from "../wizard-provider";
import WizardStep from "../wizard-step";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const frameworks = [
  {
    id: "react",
    name: "React + TypeScript",
    description: "Modern React with TypeScript",
    color: "bg-blue-500",
    letter: "R"
  },
  {
    id: "vue",
    name: "Vue.js + TypeScript",
    description: "Vue 3 with Composition API",
    color: "bg-green-500",
    letter: "V"
  },
  {
    id: "nextjs",
    name: "Next.js",
    description: "Full-stack React framework",
    color: "bg-black",
    letter: "N"
  },
  {
    id: "nodejs",
    name: "Node.js + Express",
    description: "Backend API development",
    color: "bg-green-600",
    letter: "N"
  }
];

const additionalTechnologies = [
  { id: "tailwind", label: "Tailwind CSS" },
  { id: "prisma", label: "Prisma ORM" },
  { id: "react-query", label: "React Query" },
  { id: "zod", label: "Zod Validation" }
];

export default function FrameworkSelection() {
  const { formData, updateFormData } = useWizard();

  const handleFrameworkChange = (framework: string) => {
    updateFormData({ framework });
  };

  const handleTechChange = (tech: string, checked: boolean) => {
    const updatedTech = checked
      ? [...formData.additionalTech, tech]
      : formData.additionalTech.filter(t => t !== tech);
    
    updateFormData({ additionalTech: updatedTech });
  };

  return (
    <WizardStep stepNumber={1}>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Tech Stack</h3>
      <p className="text-gray-600 mb-6">
        Select your primary programming language and framework to generate optimized rules.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {frameworks.map((framework) => (
          <label key={framework.id} className="relative cursor-pointer">
            <input
              type="radio"
              name="framework"
              value={framework.id}
              checked={formData.framework === framework.id}
              onChange={(e) => handleFrameworkChange(e.target.value)}
              className="sr-only peer"
            />
            <div className="p-4 border-2 border-gray-200 rounded-lg peer-checked:border-purple-500 peer-checked:bg-purple-50 hover:border-gray-300 transition-all">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${framework.color} rounded-lg flex items-center justify-center`}>
                  <span className="text-white font-bold">{framework.letter}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{framework.name}</h4>
                  <p className="text-sm text-gray-600">{framework.description}</p>
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>

      <div className="mb-6">
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Additional Technologies
        </Label>
        <div className="flex flex-wrap gap-4">
          {additionalTechnologies.map((tech) => (
            <label key={tech.id} className="flex items-center space-x-2">
              <Checkbox
                checked={formData.additionalTech.includes(tech.id)}
                onCheckedChange={(checked) => handleTechChange(tech.id, checked as boolean)}
              />
              <span className="text-sm text-gray-700">{tech.label}</span>
            </label>
          ))}
        </div>
      </div>
    </WizardStep>
  );
}

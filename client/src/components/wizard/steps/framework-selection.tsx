import { useWizard } from "../wizard-provider";
import WizardStep from "../wizard-step";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  SiReact, 
  SiVuedotjs, 
  SiNextdotjs, 
  SiNodedotjs,
  SiTailwindcss,
  SiPrisma,
  SiReactquery,
  SiZod
} from "react-icons/si";

const frameworks = [
  {
    id: "react",
    name: "React + TypeScript",
    description: "Modern React with TypeScript",
    icon: SiReact,
    color: "text-blue-500"
  },
  {
    id: "vue",
    name: "Vue.js + TypeScript",
    description: "Vue 3 with Composition API",
    icon: SiVuedotjs,
    color: "text-green-500"
  },
  {
    id: "nextjs",
    name: "Next.js",
    description: "Full-stack React framework",
    icon: SiNextdotjs,
    color: "text-black dark:text-white"
  },
  {
    id: "nodejs",
    name: "Node.js + Express",
    description: "Backend API development",
    icon: SiNodedotjs,
    color: "text-green-600"
  }
];

const additionalTechnologies = [
  { id: "tailwind", label: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-500" },
  { id: "prisma", label: "Prisma ORM", icon: SiPrisma, color: "text-indigo-600" },
  { id: "react-query", label: "React Query", icon: SiReactquery, color: "text-red-500" },
  { id: "zod", label: "Zod Validation", icon: SiZod, color: "text-blue-600" }
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
                <framework.icon className={`w-10 h-10 ${framework.color}`} />
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
        <div className="grid grid-cols-2 gap-3">
          {additionalTechnologies.map((tech) => (
            <label key={tech.id} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              <Checkbox
                checked={formData.additionalTech.includes(tech.id)}
                onCheckedChange={(checked) => handleTechChange(tech.id, checked as boolean)}
              />
              <tech.icon className={`w-5 h-5 ${tech.color}`} />
              <span className="text-sm text-gray-700">{tech.label}</span>
            </label>
          ))}
        </div>
      </div>
    </WizardStep>
  );
}

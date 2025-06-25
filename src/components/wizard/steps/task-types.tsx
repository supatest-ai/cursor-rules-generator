import { useWizard } from "../wizard-provider";
import WizardStep from "../wizard-step";
import { 
  SiJest,
  SiTestinglibrary,
  SiGithubactions,
  SiPostgresql,
  SiMongodb,
  SiRedis
} from "react-icons/si";
import { 
  Code, 
  Bug, 
  RotateCcw, 
  BookOpen, 
  Database,
  TestTube2
} from "lucide-react";

const taskTypes = [
  {
    id: "features",
    name: "Feature Development",
    description: "New features and components",
    icon: Code,
    color: "text-purple-500"
  },
  {
    id: "bugs",
    name: "Bug Fixing",
    description: "Debugging and issue resolution",
    icon: Bug,
    color: "text-red-500"
  },
  {
    id: "refactoring",
    name: "Refactoring",
    description: "Code optimization and cleanup",
    icon: RotateCcw,
    color: "text-orange-500"
  },
  {
    id: "testing",
    name: "Testing",
    description: "Unit and integration tests",
    icon: SiJest,
    color: "text-green-500"
  },
  {
    id: "documentation",
    name: "Documentation",
    description: "Code documentation and guides",
    icon: BookOpen,
    color: "text-blue-500"
  },
  {
    id: "database",
    name: "Database Operations",
    description: "Schema and query optimization",
    icon: SiPostgresql,
    color: "text-blue-600"
  }
];

export default function TaskTypes() {
  const { formData, updateFormData } = useWizard();

  const handleTaskTypeChange = (taskId: string, checked: boolean) => {
    const updated = checked
      ? [...formData.taskTypes, taskId]
      : formData.taskTypes.filter(t => t !== taskId);
    
    updateFormData({ taskTypes: updated });
  };

  return (
    <WizardStep stepNumber={4}>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Development Tasks</h3>
      <p className="text-gray-600 mb-6">
        Select the types of development tasks you want cursor rules optimized for.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {taskTypes.map((task) => (
          <label key={task.id} className="relative cursor-pointer">
            <input
              type="checkbox"
              checked={formData.taskTypes.includes(task.id)}
              onChange={(e) => handleTaskTypeChange(task.id, e.target.checked)}
              className="sr-only peer"
            />
            <div className="p-4 border-2 border-gray-200 rounded-lg peer-checked:border-purple-500 peer-checked:bg-purple-50 hover:border-gray-300 transition-all">
              <div className="flex items-center space-x-3">
                <task.icon className={`${task.color} text-xl`} />
                <div>
                  <h4 className="font-semibold text-gray-900">{task.name}</h4>
                  <p className="text-sm text-gray-600">{task.description}</p>
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>
    </WizardStep>
  );
}

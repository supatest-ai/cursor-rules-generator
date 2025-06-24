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
  SiZod,
  SiTypescript,
  SiJavascript,
  SiGraphql,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiSupabase,
  SiFirebase,
  SiStripe,
  SiAuth0,
  SiJest,
  SiCypress,
  SiVitest,
  SiStorybook,
  SiWebpack,
  SiVite,
  SiEslint,
  SiPrettier,
  SiDocker,
  SiVercel,
  SiNetlify,
  SiAmazon,
  SiGooglecloud,
  SiGithubactions,
  SiTrpc,
  SiSocketdotio,
  SiExpress,
  SiFastify,
  SiNestjs,
  SiSvelte,
  SiSolid,
  SiAngular,
  SiMui,
  SiChakraui,
  SiAntdesign,
  SiBootstrap,
  SiBulma,
  SiFramer,
  SiGreensock,
  SiThreedotjs,
  SiD3Dotjs,
  SiRedux
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
  // Styling & UI
  { id: "tailwind", label: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-500" },
  { id: "mui", label: "Material-UI", icon: SiMui, color: "text-blue-600" },
  { id: "chakra", label: "Chakra UI", icon: SiChakraui, color: "text-teal-500" },
  { id: "antd", label: "Ant Design", icon: SiAntdesign, color: "text-blue-500" },
  { id: "bootstrap", label: "Bootstrap", icon: SiBootstrap, color: "text-purple-600" },
  { id: "bulma", label: "Bulma", icon: SiBulma, color: "text-green-400" },
  
  // Database & ORM
  { id: "prisma", label: "Prisma ORM", icon: SiPrisma, color: "text-indigo-600" },
  { id: "mongodb", label: "MongoDB", icon: SiMongodb, color: "text-green-600" },
  { id: "postgresql", label: "PostgreSQL", icon: SiPostgresql, color: "text-blue-700" },
  { id: "redis", label: "Redis", icon: SiRedis, color: "text-red-600" },
  { id: "supabase", label: "Supabase", icon: SiSupabase, color: "text-green-500" },
  { id: "firebase", label: "Firebase", icon: SiFirebase, color: "text-orange-500" },
  
  // State Management & Data Fetching
  { id: "react-query", label: "React Query", icon: SiReactquery, color: "text-red-500" },
  { id: "redux", label: "Redux", icon: SiRedux, color: "text-purple-500" },
  { id: "graphql", label: "GraphQL", icon: SiGraphql, color: "text-pink-500" },
  { id: "trpc", label: "tRPC", icon: SiTrpc, color: "text-blue-400" },
  
  // Validation & Type Safety
  { id: "zod", label: "Zod Validation", icon: SiZod, color: "text-blue-600" },
  { id: "typescript", label: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
  { id: "javascript", label: "JavaScript", icon: SiJavascript, color: "text-yellow-500" },
  
  // Testing
  { id: "jest", label: "Jest", icon: SiJest, color: "text-red-600" },
  { id: "cypress", label: "Cypress", icon: SiCypress, color: "text-gray-700" },
  { id: "vitest", label: "Vitest", icon: SiVitest, color: "text-yellow-500" },
  { id: "storybook", label: "Storybook", icon: SiStorybook, color: "text-pink-500" },
  
  // Build Tools & Dev
  { id: "vite", label: "Vite", icon: SiVite, color: "text-purple-500" },
  { id: "webpack", label: "Webpack", icon: SiWebpack, color: "text-blue-400" },
  { id: "eslint", label: "ESLint", icon: SiEslint, color: "text-purple-600" },
  { id: "prettier", label: "Prettier", icon: SiPrettier, color: "text-gray-600" },
  
  // Backend & APIs
  { id: "express", label: "Express.js", icon: SiExpress, color: "text-gray-700" },
  { id: "fastify", label: "Fastify", icon: SiFastify, color: "text-black" },
  { id: "nestjs", label: "NestJS", icon: SiNestjs, color: "text-red-500" },
  { id: "socketio", label: "Socket.io", icon: SiSocketdotio, color: "text-gray-800" },
  
  // Auth & Payments
  { id: "auth0", label: "Auth0", icon: SiAuth0, color: "text-orange-500" },
  { id: "stripe", label: "Stripe", icon: SiStripe, color: "text-purple-500" },
  
  // Animation & Graphics
  { id: "framer", label: "Framer Motion", icon: SiFramer, color: "text-black" },
  { id: "gsap", label: "GSAP", icon: SiGreensock, color: "text-green-500" },
  { id: "threejs", label: "Three.js", icon: SiThreedotjs, color: "text-gray-700" },
  { id: "d3", label: "D3.js", icon: SiD3Dotjs, color: "text-orange-600" },
  
  // Deployment & DevOps
  { id: "docker", label: "Docker", icon: SiDocker, color: "text-blue-500" },
  { id: "vercel", label: "Vercel", icon: SiVercel, color: "text-black" },
  { id: "netlify", label: "Netlify", icon: SiNetlify, color: "text-teal-500" },
  { id: "aws", label: "AWS", icon: SiAmazon, color: "text-orange-500" },
  { id: "gcp", label: "Google Cloud", icon: SiGooglecloud, color: "text-blue-500" },
  { id: "github-actions", label: "GitHub Actions", icon: SiGithubactions, color: "text-gray-800" },
  
  // Other Frameworks
  { id: "svelte", label: "Svelte", icon: SiSvelte, color: "text-orange-500" },
  { id: "solid", label: "SolidJS", icon: SiSolid, color: "text-blue-500" },
  { id: "angular", label: "Angular", icon: SiAngular, color: "text-red-600" }
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
          Additional Technologies ({additionalTechnologies.length} available)
        </Label>
        <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-3">
          <div className="grid grid-cols-2 gap-2">
            {additionalTechnologies.map((tech) => (
              <label key={tech.id} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <Checkbox
                  checked={formData.additionalTech.includes(tech.id)}
                  onCheckedChange={(checked) => handleTechChange(tech.id, checked as boolean)}
                />
                <tech.icon className={`w-4 h-4 ${tech.color} flex-shrink-0`} />
                <span className="text-sm text-gray-700 truncate">{tech.label}</span>
              </label>
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Selected: {formData.additionalTech.length} technologies
        </p>
      </div>
    </WizardStep>
  );
}

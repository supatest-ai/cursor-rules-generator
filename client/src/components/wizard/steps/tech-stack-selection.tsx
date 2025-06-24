import { useWizard } from "../wizard-provider";
import WizardStep from "../wizard-step";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  SiPython,
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

interface Technology {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const technologies: Record<string, Technology[]> = {
  "Languages": [
    { id: "typescript", label: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
    { id: "javascript", label: "JavaScript", icon: SiJavascript, color: "text-yellow-500" },
    { id: "python", label: "Python", icon: SiPython, color: "text-blue-500" },
  ],
  
  "Frontend Frameworks": [
    { id: "react", label: "React", icon: SiReact, color: "text-blue-500" },
    { id: "nextjs", label: "Next.js", icon: SiNextdotjs, color: "text-black dark:text-white" },
    { id: "vue", label: "Vue.js", icon: SiVuedotjs, color: "text-green-500" },
    { id: "svelte", label: "Svelte", icon: SiSvelte, color: "text-orange-500" },
    { id: "angular", label: "Angular", icon: SiAngular, color: "text-red-600" },
    { id: "solid", label: "SolidJS", icon: SiSolid, color: "text-blue-500" },
  ],

  "Backend Frameworks": [
    { id: "nodejs", label: "Node.js", icon: SiNodedotjs, color: "text-green-600" },
    { id: "express", label: "Express.js", icon: SiExpress, color: "text-gray-700" },
    { id: "fastify", label: "Fastify", icon: SiFastify, color: "text-black" },
    { id: "nestjs", label: "NestJS", icon: SiNestjs, color: "text-red-500" },
  ],

  "Styling & UI": [
    { id: "tailwind", label: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-500" },
    { id: "mui", label: "Material-UI", icon: SiMui, color: "text-blue-600" },
    { id: "chakra", label: "Chakra UI", icon: SiChakraui, color: "text-teal-500" },
    { id: "antd", label: "Ant Design", icon: SiAntdesign, color: "text-blue-500" },
    { id: "bootstrap", label: "Bootstrap", icon: SiBootstrap, color: "text-purple-600" },
    { id: "bulma", label: "Bulma", icon: SiBulma, color: "text-green-400" },
  ],

  "Database & ORM": [
    { id: "prisma", label: "Prisma ORM", icon: SiPrisma, color: "text-indigo-600" },
    { id: "mongodb", label: "MongoDB", icon: SiMongodb, color: "text-green-600" },
    { id: "postgresql", label: "PostgreSQL", icon: SiPostgresql, color: "text-blue-700" },
    { id: "redis", label: "Redis", icon: SiRedis, color: "text-red-600" },
    { id: "supabase", label: "Supabase", icon: SiSupabase, color: "text-green-500" },
    { id: "firebase", label: "Firebase", icon: SiFirebase, color: "text-orange-500" },
  ],

  "State Management": [
    { id: "react-query", label: "React Query", icon: SiReactquery, color: "text-red-500" },
    { id: "redux", label: "Redux", icon: SiRedux, color: "text-purple-500" },
    { id: "graphql", label: "GraphQL", icon: SiGraphql, color: "text-pink-500" },
    { id: "trpc", label: "tRPC", icon: SiTrpc, color: "text-blue-400" },
  ],



  "Build Tools": [
    { id: "vite", label: "Vite", icon: SiVite, color: "text-purple-500" },
    { id: "webpack", label: "Webpack", icon: SiWebpack, color: "text-blue-400" },
  ],

  "Testing": [
    { id: "jest", label: "Jest", icon: SiJest, color: "text-red-600" },
    { id: "cypress", label: "Cypress", icon: SiCypress, color: "text-gray-700" },
    { id: "vitest", label: "Vitest", icon: SiVitest, color: "text-yellow-500" },
    { id: "storybook", label: "Storybook", icon: SiStorybook, color: "text-pink-500" },
  ],

  "Code Quality": [
    { id: "eslint", label: "ESLint", icon: SiEslint, color: "text-purple-600" },
    { id: "prettier", label: "Prettier", icon: SiPrettier, color: "text-gray-600" },
    { id: "zod", label: "Zod Validation", icon: SiZod, color: "text-blue-600" },
  ],

  "Auth & Payments": [
    { id: "auth0", label: "Auth0", icon: SiAuth0, color: "text-orange-500" },
    { id: "stripe", label: "Stripe", icon: SiStripe, color: "text-purple-500" },
  ],

  "Animation": [
    { id: "framer", label: "Framer Motion", icon: SiFramer, color: "text-black" },
    { id: "gsap", label: "GSAP", icon: SiGreensock, color: "text-green-500" },
    { id: "threejs", label: "Three.js", icon: SiThreedotjs, color: "text-gray-700" },
    { id: "d3", label: "D3.js", icon: SiD3Dotjs, color: "text-orange-600" },
  ],

  "Deployment": [
    { id: "docker", label: "Docker", icon: SiDocker, color: "text-blue-500" },
    { id: "vercel", label: "Vercel", icon: SiVercel, color: "text-black" },
    { id: "netlify", label: "Netlify", icon: SiNetlify, color: "text-teal-500" },
    { id: "aws", label: "AWS", icon: SiAmazon, color: "text-orange-500" },
    { id: "gcp", label: "Google Cloud", icon: SiGooglecloud, color: "text-blue-500" },
    { id: "github-actions", label: "GitHub Actions", icon: SiGithubactions, color: "text-gray-800" },
  ],

  "Real-time": [
    { id: "socketio", label: "Socket.io", icon: SiSocketdotio, color: "text-gray-800" },
  ]
};

const presets = {
  "Modern Full-Stack": [
    "typescript", "react", "nextjs", "tailwind", "prisma", "postgresql", 
    "react-query", "zod", "eslint", "prettier", "jest", "vercel"
  ],
  "MERN Stack": [
    "javascript", "react", "nodejs", "express", "mongodb", "redux", 
    "jest", "eslint", "prettier", "docker"
  ],
  "Vue.js Ecosystem": [
    "typescript", "vue", "nodejs", "tailwind", "postgresql", "prisma",
    "vitest", "eslint", "prettier", "netlify"
  ],
  "Enterprise TypeScript": [
    "typescript", "react", "nextjs", "mui", "nestjs", "postgresql", 
    "prisma", "graphql", "jest", "storybook", "docker", "aws"
  ]
};

export default function TechStackSelection() {
  const { formData, updateFormData } = useWizard();

  const handleTechChange = (techId: string, checked: boolean) => {
    const updatedTech = checked
      ? [...formData.additionalTech, techId]
      : formData.additionalTech.filter(t => t !== techId);
    
    updateFormData({ additionalTech: updatedTech });
  };

  const applyPreset = (presetTechs: string[]) => {
    updateFormData({ additionalTech: presetTechs });
  };

  const clearAll = () => {
    updateFormData({ additionalTech: [] });
  };

  const isSelected = (techId: string) => formData.additionalTech.includes(techId);

  return (
    <WizardStep stepNumber={1}>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Your Tech Stack</h3>
          <p className="text-gray-600">
            Select technologies to generate optimized cursor rules. Start with a preset or build your own.
          </p>
        </div>

        {/* Presets */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">
            Popular Presets
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {Object.entries(presets).map(([name, techs]) => (
              <Button
                key={name}
                variant="outline"
                onClick={() => applyPreset(techs)}
                className="justify-start text-left h-auto p-3"
              >
                <div>
                  <div className="font-medium">{name}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {techs.length} technologies
                  </div>
                </div>
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-xs">
              {formData.additionalTech.length} selected
            </Badge>
            <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs h-6">
              Clear all
            </Button>
          </div>
        </div>

        {/* Technology Categories */}
        <div className="space-y-6">
          {Object.entries(technologies).map(([category, techs]) => (
            <div key={category}>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                {category}
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {techs.map((tech) => (
                  <label 
                    key={tech.id} 
                    className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-all ${
                      isSelected(tech.id)
                        ? 'border-purple-300 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Checkbox
                      checked={isSelected(tech.id)}
                      onCheckedChange={(checked) => handleTechChange(tech.id, checked as boolean)}
                    />
                    <tech.icon className={`w-4 h-4 ${tech.color} flex-shrink-0`} />
                    <span className="text-sm text-gray-700 truncate">{tech.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </WizardStep>
  );
}
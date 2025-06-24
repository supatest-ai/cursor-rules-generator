import Header from "@/components/header";
import { WizardProvider } from "@/components/wizard/wizard-provider";
import ProgressBar from "@/components/wizard/progress-bar";
import TechStackSelection from "@/components/wizard/steps/tech-stack-selection";
import ProjectStructure from "@/components/wizard/steps/project-structure";
import CodeStyle from "@/components/wizard/steps/code-style";
import TaskTypes from "@/components/wizard/steps/task-types";
import Documentation from "@/components/wizard/steps/documentation";
import Review from "@/components/wizard/steps/review";
import GeneratedRulesPanel from "@/components/generated-rules-panel";

import { Folder } from "lucide-react";
import { 
  SiReact, 
  SiVuedotjs, 
  SiNextdotjs, 
  SiNodedotjs,
  SiTypescript,
  SiTailwindcss
} from "react-icons/si";

export default function Home() {
  return (
    <WizardProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Create customized cursor rules for your project in minutes. Get AI-powered development assistance tailored to your codebase, framework, and coding style.
            </p>
            
            {/* Technology Icons */}
            <div className="flex justify-center items-center space-x-6 mb-8">
              <SiReact className="w-8 h-8 text-blue-500" />
              <SiVuedotjs className="w-8 h-8 text-green-500" />
              <SiNextdotjs className="w-8 h-8 text-black dark:text-white" />
              <SiNodedotjs className="w-8 h-8 text-green-600" />
              <SiTypescript className="w-8 h-8 text-blue-600" />
              <SiTailwindcss className="w-8 h-8 text-cyan-500" />
            </div>
            
            <div className="flex justify-center">
              <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <Folder className="text-purple-500 text-xl" />
                  <span className="font-medium text-gray-900">Generated files go to:</span>
                </div>
                <code className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg block">
                  PROJECT_ROOT/.cursor/rules/*.mdc
                </code>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Wizard Panel */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg">
                <ProgressBar />
                
                <TechStackSelection />
                <ProjectStructure />
                <CodeStyle />
                <TaskTypes />
                <Documentation />
                <Review />
              </div>
            </div>

            {/* Generated Rules Panel */}
            <div className="lg:col-span-1">
              <GeneratedRulesPanel />
            </div>
          </div>
        </div>
      </div>
    </WizardProvider>
  );
}

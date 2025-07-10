import Header from "@/components/header";
import Footer from "@/components/footer";
import { WizardProvider } from "@/components/wizard/wizard-provider";
import ProgressBar from "@/components/wizard/progress-bar";
import TechStackSelection from "@/components/wizard/steps/tech-stack-selection";
import ProjectStructure from "@/components/wizard/steps/project-structure";
import CodeStyle from "@/components/wizard/steps/code-style";
import TaskTypes from "@/components/wizard/steps/task-types";
import Documentation from "@/components/wizard/steps/documentation";
import Review from "@/components/wizard/steps/review";
import GeneratedRulesPanel from "@/components/generated-rules-panel";



export default function Home() {
  return (
    <WizardProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        <Footer />
      </div>
    </WizardProvider>
  );
}

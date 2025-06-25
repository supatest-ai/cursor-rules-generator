import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useToast } from "@/hooks/use-toast";
import { useWizard } from "./wizard/wizard-provider";
import { CheckCircle, Clock, Copy, Download } from "lucide-react";
import { downloadAllRulesAsFiles } from "@/lib/download-utils";
import RulesPreviewModal from "./rules-preview-modal";

export default function GeneratedRulesPanel() {
  const { generatedRules } = useWizard();
  const { copyToClipboard, isCopying } = useCopyToClipboard();
  const { toast } = useToast();
  const [selectedRule, setSelectedRule] = useState<string | null>(null);

  const staticRules = generatedRules.filter(rule => rule.isStatic);
  const dynamicRules = generatedRules.filter(rule => !rule.isStatic);

  const handleCopyRule = (rule: { filename: string; content: string }) => {
    copyToClipboard(rule.content, `${rule.filename} copied to clipboard`);
  };

  const handleCopyAll = () => {
    const allRulesContent = generatedRules
      .map(rule => `# ${rule.filename}\n\n${rule.content}`)
      .join('\n\n---\n\n');
    
    copyToClipboard(allRulesContent, "All rules copied to clipboard");
  };

  const handleDownloadAll = () => {
    downloadAllRulesAsFiles(generatedRules, () => {
      toast({
        title: "Download Complete",
        description: `${generatedRules.length} rule files and installation guide downloaded successfully`,
      });
    });
  };

  const hasGeneratedRules = generatedRules.length > 0;

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg h-fit sticky top-24">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Generated Rules</h3>
          <p className="text-sm text-gray-600">
            {hasGeneratedRules 
              ? "Your custom cursor rules are ready" 
              : "Your custom cursor rules will appear here"
            }
          </p>
        </div>

        <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
          {/* Static Rules */}
          {staticRules.map((rule) => (
            <div key={rule.filename} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <button
                  onClick={() => setSelectedRule(rule.filename)}
                  className="text-sm font-medium text-green-800 hover:text-green-900"
                >
                  {rule.filename}
                </button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyRule(rule)}
                disabled={isCopying}
                className="text-green-600 hover:text-green-700"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {/* Dynamic Rules */}
          {dynamicRules.length > 0 ? (
            dynamicRules.map((rule) => (
              <div key={rule.filename} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <button
                    onClick={() => setSelectedRule(rule.filename)}
                    className="text-sm font-medium text-green-800 hover:text-green-900"
                  >
                    {rule.filename}
                  </button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopyRule(rule)}
                  disabled={isCopying}
                  className="text-green-600 hover:text-green-700"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            // Placeholder rules when not generated yet
            <>
              <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg opacity-50">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">react-development.mdc</span>
                </div>
                <Button variant="ghost" size="sm" disabled className="text-gray-400 cursor-not-allowed">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg opacity-50">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">typescript-quality.mdc</span>
                </div>
                <Button variant="ghost" size="sm" disabled className="text-gray-400 cursor-not-allowed">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg opacity-50">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">project-structure.mdc</span>
                </div>
                <Button variant="ghost" size="sm" disabled className="text-gray-400 cursor-not-allowed">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg opacity-50">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">development-workflow.mdc</span>
                </div>
                <Button variant="ghost" size="sm" disabled className="text-gray-400 cursor-not-allowed">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg opacity-50">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">testing-guidelines.mdc</span>
                </div>
                <Button variant="ghost" size="sm" disabled className="text-gray-400 cursor-not-allowed">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg opacity-50">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">feature-development.mdc</span>
                </div>
                <Button variant="ghost" size="sm" disabled className="text-gray-400 cursor-not-allowed">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={handleCopyAll}
              disabled={!hasGeneratedRules || isCopying}
              variant={hasGeneratedRules ? "default" : "secondary"}
              size="sm"
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy All
            </Button>
            <Button
              onClick={handleDownloadAll}
              disabled={!hasGeneratedRules}
              variant="outline"
              size="sm"
              className="gradient-bg text-white hover:opacity-90 border-0"
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
          <p className="text-xs text-gray-500 text-center">
            {hasGeneratedRules 
              ? "Place files in .cursor/rules/ directory" 
              : "Complete the wizard to enable downloading"
            }
          </p>
        </div>
      </div>

      {selectedRule && (
        <RulesPreviewModal
          ruleFilename={selectedRule}
          isOpen={!!selectedRule}
          onClose={() => setSelectedRule(null)}
        />
      )}
    </>
  );
}

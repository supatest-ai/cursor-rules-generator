import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useToast } from "@/hooks/use-toast";
import { useWizard } from "./wizard/wizard-provider";
import { CheckCircle, Clock, Copy, Download, ChevronDown } from "lucide-react";
import { downloadAllRulesAsFiles } from "@/lib/download-utils";
import RulesPreviewModal from "./rules-preview-modal";
import CTACard from "./cta-card";
import CTABadge from "./cta-badge";

export default function GeneratedRulesPanel() {
  const { generatedRules } = useWizard();
  const { copyToClipboard, isCopying } = useCopyToClipboard();
  const { toast } = useToast();
  const [selectedRule, setSelectedRule] = useState<string | null>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const staticRules = generatedRules.filter(rule => rule.isStatic);
  const dynamicRules = generatedRules.filter(rule => !rule.isStatic);

  // Combine all rules and limit to 4 for display
  const allRules = [...staticRules, ...dynamicRules];
  const displayedRules = allRules.slice(0, 4);
  const hasMoreRules = allRules.length > 4;

  // Placeholder rules for when nothing is generated
  const placeholderRules = [
    "react-development.mdc",
    "typescript-quality.mdc",
    "project-structure.mdc",
    "development-workflow.mdc"
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setShowScrollIndicator(hasMoreRules && !isAtBottom);
    };

    setShowScrollIndicator(hasMoreRules);
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [hasMoreRules, allRules.length]);

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

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="p-4 space-y-3 max-h-80 overflow-y-auto"
          >
            {allRules.length > 0 ? (
              // Show actual generated rules (limited to 4 visible)
              allRules.map((rule) => (
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
              // Show placeholder rules when not generated yet
              placeholderRules.map((filename) => (
                <div key={filename} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg opacity-50">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">{filename}</span>
                  </div>
                  <Button variant="ghost" size="sm" disabled className="text-gray-400 cursor-not-allowed">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>

          {/* Scroll Down Indicator */}
          {showScrollIndicator && (
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent flex items-end justify-center pb-2">
              <div className="bg-gray-100 rounded-full p-1 shadow-sm animate-bounce">
                <ChevronDown className="h-3 w-3 text-gray-600" />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={handleCopyAll}
              disabled={!hasGeneratedRules || isCopying}
              variant="outline"
              size="sm"
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy All
            </Button>
            <Button
              onClick={handleDownloadAll}
              disabled={!hasGeneratedRules}
              variant="default"
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

          {hasGeneratedRules && (
            <CTACard />
          )}
        </div>
      </div>

      {/* Show smart badge when no rules generated */}
      {!hasGeneratedRules && (
        <CTABadge />
      )}

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

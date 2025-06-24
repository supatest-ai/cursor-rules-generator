import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useWizard } from "./wizard/wizard-provider";
import { downloadTextFile } from "@/lib/download-utils";
import { Copy, Download, X } from "lucide-react";

interface RulesPreviewModalProps {
  ruleFilename: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function RulesPreviewModal({
  ruleFilename,
  isOpen,
  onClose
}: RulesPreviewModalProps) {
  const { generatedRules } = useWizard();
  const { copyToClipboard, isCopying } = useCopyToClipboard();
  const [selectedRuleFile, setSelectedRuleFile] = useState(ruleFilename);

  const selectedRule = generatedRules.find(rule => rule.filename === selectedRuleFile);

  const handleCopyRule = () => {
    if (selectedRule) {
      copyToClipboard(selectedRule.content, `${selectedRule.filename} copied to clipboard`);
    }
  };

  const handleDownloadRule = () => {
    if (selectedRule) {
      downloadTextFile(selectedRule.content, selectedRule.filename);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Generated Rules Preview
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex h-[70vh]">
          {/* Rule Files List */}
          <div className="w-1/3 border-r border-gray-200 bg-gray-50">
            <div className="p-4">
              <h4 className="font-medium text-gray-900 mb-3">Rule Files</h4>
              <div className="space-y-1">
                {generatedRules.map((rule) => (
                  <button
                    key={rule.filename}
                    onClick={() => setSelectedRuleFile(rule.filename)}
                    className={`w-full text-left p-2 text-sm rounded-lg transition-colors ${
                      selectedRuleFile === rule.filename
                        ? "bg-purple-100 text-purple-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {rule.filename}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Rule Content */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <h5 className="font-medium text-gray-900">{selectedRuleFile}</h5>
              <div className="flex space-x-2">
                <Button
                  onClick={handleCopyRule}
                  disabled={isCopying}
                  size="sm"
                  variant="outline"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
                <Button
                  onClick={handleDownloadRule}
                  size="sm"
                  className="gradient-bg text-white hover:opacity-90"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
            
            <ScrollArea className="flex-1">
              <pre className="p-4 text-sm font-mono text-gray-800 leading-relaxed whitespace-pre-wrap">
                {selectedRule?.content || "Rule content not found"}
              </pre>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

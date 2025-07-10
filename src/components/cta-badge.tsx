import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTABadgeProps {
    onClose?: () => void;
    className?: string;
}

export default function CTABadge({ onClose, className }: CTABadgeProps) {
    const [isDismissed, setIsDismissed] = useState(false);

    const handleDismiss = () => {
        setIsDismissed(true);
        onClose?.();
    };

    if (isDismissed) return null;

    return (
        <div className={cn("fixed bottom-6 right-6 z-50 max-w-xs", className)}>
            <div className="bg-white rounded-full shadow-xl border border-gray-200 p-2 pl-4 pr-2 flex items-center gap-3 group hover:shadow-2xl transition-all duration-200 relative">
                <div className="flex items-center gap-2 flex-1">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Rocket className="h-4 w-4 text-white" />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-gray-900">Ready to test?</p>
                        <p className="text-xs text-gray-500">Try Supatest AI</p>
                    </div>
                </div>
                <Button
                    size="sm"
                    onClick={() => window.open('https://supatest.ai', '_blank')}
                    className="rounded-full bg-gray-900 text-white hover:bg-gray-800 h-8 w-8 p-0"
                >
                    <ArrowRight className="h-4 w-4" />
                </Button>
                <button
                    onClick={handleDismiss}
                    className="absolute -top-2 -right-2 text-gray-400 hover:text-gray-600 w-5 h-5 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors bg-white border border-gray-200 shadow-sm"
                >
                    <X className="h-3 w-3" />
                </button>
            </div>
        </div>
    );
} 
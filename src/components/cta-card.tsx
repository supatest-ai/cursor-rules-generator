import { Button } from "@/components/ui/button";
import { Sparkles, Rocket } from "lucide-react";

export default function CTACard() {
    return (
        <div className="relative rounded-xl shadow-2xl border border-gray-100 p-6 mt-4 bg-white">
            <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <Rocket className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Next Step: Testing</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                    Test your product with AI agents 10x faster.
                </p>
            </div>

            <div className="space-y-2">
                <Button
                    onClick={() => window.open('https://supatest.ai', '_blank')}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:opacity-90"
                    size="sm"
                >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Start Testing with Supatest AI
                </Button>
                <Button
                    onClick={() => window.open('https://docs.supatest.ai', '_blank')}
                    variant="ghost"
                    size="sm"
                    className="w-full text-gray-600 hover:text-gray-900"
                >
                    Learn More
                </Button>
            </div>
        </div>
    );
} 
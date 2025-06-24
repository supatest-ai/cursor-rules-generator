import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">ST</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Supatest AI</span>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              Rules Generator
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
            </Button>
            <Button className="gradient-bg text-white hover:opacity-90">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

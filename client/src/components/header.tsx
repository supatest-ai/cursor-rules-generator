import { Button } from "@/components/ui/button";
import { HelpCircle, MousePointer2 } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Cursor Rules Generator
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <img 
              src="https://supatest.ai/logo.png" 
              alt="Supatest AI" 
              className="h-8 w-8"
            />
            <span className="text-lg font-semibold text-gray-900">
              Supatest AI
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle, MousePointer2, Code2, Zap } from "lucide-react";

export default function Header() {
  const [imageError, setImageError] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a
            href="/"
            className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Code2 className="text-white w-5 h-5" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Zap className="text-white w-2.5 h-2.5" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Cursor Rules Generator
            </h1>
          </a>
          <a
            href="https://supatest.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            {!imageError ? (
              <img
                src="https://supatest.ai/logo.png"
                alt="Supatest AI"
                className="h-8 w-8 rounded-xl object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="h-8 w-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
                <Code2 className="text-white h-4 w-4" />
              </div>
            )}
            <span className="text-lg font-semibold text-gray-900">
              Supatest AI
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}

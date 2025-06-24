import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Made with <Heart className="inline w-4 h-4 text-red-500 mx-1" fill="currentColor" /> by{" "}
            <a 
              href="https://supatest.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
            >
              Supatest AI
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Twitter, Youtube, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Tweet {
  id: string;
  text: string;
  author: string;
  username: string;
  date: string;
  url: string;
}

interface Video {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
  duration: string;
  views: string;
  date: string;
  url: string;
}

// Sample data - in a real app, this would come from APIs
const sampleTweets: Tweet[] = [
  {
    id: "1",
    text: "Just shipped a new feature for cursor rules generation! 🚀 The AI-powered code assistance is getting smarter every day. #CursorIDE #AI #Development",
    author: "Tech Innovator",
    username: "techinnovator",
    date: "2h ago",
    url: "https://twitter.com/techinnovator/status/1"
  },
  {
    id: "2", 
    text: "Pro tip: Custom cursor rules can increase your coding productivity by 40%. Here's how to set them up properly for your React projects.",
    author: "Dev Mentor",
    username: "devmentor",
    date: "4h ago",
    url: "https://twitter.com/devmentor/status/2"
  },
  {
    id: "3",
    text: "The future of IDE assistance is here! Cursor's AI-powered suggestions are revolutionizing how we write code. What's your experience?",
    author: "Code Master",
    username: "codemaster",
    date: "6h ago", 
    url: "https://twitter.com/codemaster/status/3"
  }
];

const sampleVideos: Video[] = [
  {
    id: "1",
    title: "Cursor IDE: Complete Guide to AI-Powered Development",
    channel: "DevTube Pro",
    thumbnail: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=225&fit=crop",
    duration: "12:34",
    views: "45K",
    date: "1 day ago",
    url: "https://youtube.com/watch?v=1"
  },
  {
    id: "2",
    title: "Building Custom Rules for Cursor - Advanced Tips & Tricks",
    channel: "Code Academy",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop",
    duration: "18:42",
    views: "23K",
    date: "2 days ago",
    url: "https://youtube.com/watch?v=2"
  },
  {
    id: "3",
    title: "AI-Powered Code Generation: The Future is Now",
    channel: "Future Tech",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=225&fit=crop",
    duration: "15:20",
    views: "67K",
    date: "3 days ago",
    url: "https://youtube.com/watch?v=3"
  }
];

export default function SocialSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<'tweets' | 'videos'>('tweets');
  const [isPlaying, setIsPlaying] = useState(true);

  const currentData = activeTab === 'tweets' ? sampleTweets : sampleVideos;
  const totalSlides = currentData.length;

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, totalSlides]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const toggleAutoplay = () => {
    setIsPlaying(!isPlaying);
  };

  const switchTab = (tab: 'tweets' | 'videos') => {
    setActiveTab(tab);
    setCurrentSlide(0);
  };

  return (
    <div className="w-full bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Latest Updates
          </h2>
          
          {/* Tab Switcher */}
          <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
            <button
              onClick={() => switchTab('tweets')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === 'tweets'
                  ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Twitter className="w-4 h-4" />
              <span className="font-medium">Tweets</span>
            </button>
            <button
              onClick={() => switchTab('videos')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === 'videos'
                  ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Youtube className="w-4 h-4" />
              <span className="font-medium">Videos</span>
            </button>
          </div>
        </div>

        {/* Slideshow Container */}
        <div className="relative">
          <Card className="overflow-hidden shadow-lg">
            <CardContent className="p-0">
              <div className="relative h-80 flex items-center">
                {/* Tweet Slide */}
                {activeTab === 'tweets' && (
                  <div className="w-full p-8 flex items-center justify-center">
                    <div className="max-w-2xl">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                          <Twitter className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {(sampleTweets[currentSlide] as Tweet).author}
                            </h3>
                            <span className="text-gray-500 dark:text-gray-400">
                              @{(sampleTweets[currentSlide] as Tweet).username}
                            </span>
                            <span className="text-gray-400 dark:text-gray-500">•</span>
                            <span className="text-gray-500 dark:text-gray-400">
                              {(sampleTweets[currentSlide] as Tweet).date}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
                            {(sampleTweets[currentSlide] as Tweet).text}
                          </p>
                          <a
                            href={(sampleTweets[currentSlide] as Tweet).url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                          >
                            <span>View on Twitter</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Video Slide */}
                {activeTab === 'videos' && (
                  <div className="w-full p-8">
                    <div className="flex items-center space-x-6">
                      <div className="relative flex-shrink-0">
                        <img
                          src={(sampleVideos[currentSlide] as Video).thumbnail}
                          alt={(sampleVideos[currentSlide] as Video).title}
                          className="w-48 h-28 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                          <Youtube className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                          {(sampleVideos[currentSlide] as Video).duration}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-2">
                          {(sampleVideos[currentSlide] as Video).title}
                        </h3>
                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-2">
                          <span>{(sampleVideos[currentSlide] as Video).channel}</span>
                          <span>•</span>
                          <span>{(sampleVideos[currentSlide] as Video).views} views</span>
                          <span>•</span>
                          <span>{(sampleVideos[currentSlide] as Video).date}</span>
                        </div>
                        <a
                          href={(sampleVideos[currentSlide] as Video).url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          <Youtube className="w-4 h-4" />
                          <span>Watch on YouTube</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Arrows */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 shadow-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {currentData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide
                    ? 'bg-purple-600 dark:bg-purple-400'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-center mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleAutoplay}
              className="flex items-center space-x-2"
            >
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
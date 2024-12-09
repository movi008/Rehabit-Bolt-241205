import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  Clock, 
  Heart, 
  Moon, 
  Sun, 
  Wind,
  ChevronRight,
  Timer,
  Sparkles,
  Music,
  Flame,
  CheckCircle2,
  MessageSquare,
  BarChart2,
  PenTool,
  ListChecks,
  ThumbsUp,
  Smile,
  Brain,
  ChevronLeft
} from 'lucide-react';

export function Home() {
  const navigate = useNavigate();
  const [timeOfDay] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  });

  const meditationSuggestions = [
    {
      id: '1',
      title: 'Morning Mindfulness',
      duration: '10 min',
      image: 'https://images.unsplash.com/photo-1506252374453-ef5237291d83?auto=format&fit=crop&w=800&q=80',
      category: 'Morning',
      icon: Sun,
      description: 'Start your day with clarity and purpose'
    },
    {
      id: '2',
      title: 'Stress Relief',
      duration: '15 min',
      image: 'https://images.unsplash.com/photo-1528319725582-ddc096101511?auto=format&fit=crop&w=800&q=80',
      category: 'Wellness',
      icon: Wind,
      description: 'Release tension and find calm'
    },
    {
      id: '3',
      title: 'Deep Sleep',
      duration: '20 min',
      image: 'https://images.unsplash.com/photo-1511295742362-92c96b1cf484?auto=format&fit=crop&w=800&q=80',
      category: 'Sleep',
      icon: Moon,
      description: 'Drift into peaceful sleep'
    },
    {
      id: '4',
      title: 'Energy Boost',
      duration: '8 min',
      image: 'https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?auto=format&fit=crop&w=800&q=80',
      category: 'Energy',
      icon: Sparkles,
      description: 'Revitalize your mind and body'
    }
  ];

  const quickPicks = [
    { id: '1', title: 'Anxiety Relief', icon: Wind, color: 'bg-blue-500' },
    { id: '2', title: 'Better Sleep', icon: Moon, color: 'bg-indigo-500' },
    { id: '3', title: 'Self-Love', icon: Heart, color: 'bg-pink-500' },
    { id: '4', title: 'Productivity', icon: Timer, color: 'bg-green-500' }
  ];

  const dailyRecommendations = [
    {
      id: '1',
      title: 'Morning Meditation',
      duration: '10 min',
      category: 'Mindfulness',
      icon: Sun,
      color: 'bg-amber-500'
    },
    {
      id: '2',
      title: 'Focus Flow',
      duration: '15 min',
      category: 'Productivity',
      icon: Flame,
      color: 'bg-red-500'
    },
    {
      id: '3',
      title: 'Calming Music',
      duration: '30 min',
      category: 'Sound',
      icon: Music,
      color: 'bg-purple-500'
    }
  ];

  const dailyPrompts = [
    {
      id: '1',
      title: 'Morning Reflection',
      description: 'What are you grateful for today?',
      icon: PenTool,
      color: 'bg-teal-500'
    },
    {
      id: '2',
      title: 'Mindset Check',
      description: 'How are you approaching challenges?',
      icon: Brain,
      color: 'bg-purple-500'
    }
  ];

  const todayTasks = [
    {
      id: '1',
      title: 'Daily Meditation',
      description: 'Complete your morning session',
      icon: Brain,
      completed: true,
      color: 'bg-blue-500'
    },
    {
      id: '2',
      title: 'Gratitude Journal',
      description: "Write three things you're grateful for",
      icon: PenTool,
      completed: false,
      color: 'bg-green-500'
    },
    {
      id: '3',
      title: 'Evening Reflection',
      description: 'Review your daily achievements',
      icon: Moon,
      completed: false,
      color: 'bg-indigo-500'
    }
  ];

  const recentMeditations = [
    {
      id: '1',
      title: 'Daily Calm',
      duration: '10 min',
      image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
      category: 'Featured',
      icon: Sparkles
    },
    {
      id: '2',
      title: 'Sleep Stories',
      duration: '20 min',
      image: 'https://images.unsplash.com/photo-1511295742362-92c96b1cf484?auto=format&fit=crop&w=800&q=80',
      category: 'Sleep',
      icon: Moon
    },
    {
      id: '3',
      title: 'Morning Light',
      duration: '5 min',
      image: 'https://images.unsplash.com/photo-1506252374453-ef5237291d83?auto=format&fit=crop&w=800&q=80',
      category: 'Morning',
      icon: Sun
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev === meditationSuggestions.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? meditationSuggestions.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Good {timeOfDay}
          </h1>
          <p className="mt-2 text-gray-600">
            What would you like to focus on today?
          </p>
        </div>

        {/* Meditation Suggestions Slider */}
        <div className="mb-8">
          <div className="relative">
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {meditationSuggestions.map((meditation) => (
                  <div key={meditation.id} className="w-full flex-shrink-0">
                    <div className="relative aspect-[2/1]">
                      <img
                        src={meditation.image}
                        alt={meditation.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center space-x-2 text-white/80 text-sm mb-2">
                          <Clock className="w-4 h-4" />
                          <span>{meditation.duration}</span>
                          <span>•</span>
                          <span>{meditation.category}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">{meditation.title}</h2>
                        <p className="text-white/90 mb-4">{meditation.description}</p>
                        <button 
                          onClick={() => navigate('/create/meditation')}
                          className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Play className="w-5 h-5" />
                          <span>Begin Session</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-4 space-x-2">
              {meditationSuggestions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-[#007dff]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Today */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Today</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {todayTasks.map((task) => (
              <button
                key={task.id}
                className="flex flex-col p-4 bg-white rounded-xl border border-gray-200 hover:border-[#007dff] transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 ${task.color} rounded-lg text-white`}>
                    <task.icon className="w-5 h-5" />
                  </div>
                  {task.completed && (
                    <div className="flex items-center text-green-500 text-sm">
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      <span>Done</span>
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-gray-900">{task.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{task.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Picks */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Quick Picks</h2>
            <button className="text-[#007dff] hover:text-[#0066cc] flex items-center space-x-1">
              <span>See All</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {quickPicks.map((pick) => (
              <button
                key={pick.id}
                className="flex flex-col items-center p-4 rounded-xl bg-white border border-gray-200 hover:border-[#007dff] transition-colors"
              >
                <div className={`p-3 ${pick.color} rounded-full text-white mb-3`}>
                  <pick.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-gray-900">{pick.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Daily Recommendations */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended for You</h2>
          <div className="space-y-3">
            {dailyRecommendations.map((item) => (
              <button
                key={item.id}
                className="w-full flex items-center p-4 bg-white rounded-xl border border-gray-200 hover:border-[#007dff] transition-colors"
              >
                <div className={`p-3 ${item.color} rounded-full text-white mr-4`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{item.duration}</span>
                    <span>•</span>
                    <span>{item.category}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Recent Meditations */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Meditations</h2>
            <button className="text-[#007dff] hover:text-[#0066cc] flex items-center space-x-1">
              <span>View History</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recentMeditations.map((session) => (
              <button
                key={session.id}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden"
              >
                <img
                  src={session.image}
                  alt={session.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center space-x-2 text-white/80 text-sm mb-1">
                    <Clock className="w-4 h-4" />
                    <span>{session.duration}</span>
                  </div>
                  <h3 className="text-lg font-medium text-white">{session.title}</h3>
                </div>
                <div className="absolute inset-0 bg-[#007dff]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
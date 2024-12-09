import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Users, 
  LayoutGrid, 
  List as ListIcon,
  MoreVertical,
  CheckCircle,
  Calendar,
  Clock,
  UserPlus,
  X,
  ChevronDown,
  Star,
  Settings,
  Share2,
  Camera,
  Image as ImageIcon,
  MessageSquare,
  Smile
} from 'lucide-react';

interface Habit {
  id: string;
  title: string;
  description: string;
  type: 'public' | 'private';
  category: string;
  frequency: string;
  members: number;
  checkins: number;
  streak: number;
  lastActive: string;
  thumbnail: string;
  isJoined: boolean;
  isOrganizer: boolean;
}

export function Habits() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<'all' | 'my'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showCheckinModal, setShowCheckinModal] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [sortBy, setSortBy] = useState('checkins');
  const [checkinNote, setCheckinNote] = useState('');
  const [checkinImage, setCheckinImage] = useState<string | null>(null);
  const [checkinMood, setCheckinMood] = useState<string>('great');

  const habits: Habit[] = [
    {
      id: '1',
      title: 'Morning Meditation',
      description: 'Start your day with 10 minutes of mindfulness',
      type: 'public',
      category: 'Wellness',
      frequency: 'Daily',
      members: 128,
      checkins: 1420,
      streak: 14,
      lastActive: '2 hours ago',
      thumbnail: 'https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=800&q=80',
      isJoined: true,
      isOrganizer: false
    },
    {
      id: '2',
      title: 'Evening Reading',
      description: 'Read for 30 minutes before bed',
      type: 'public',
      category: 'Learning',
      frequency: 'Daily',
      members: 85,
      checkins: 960,
      streak: 7,
      lastActive: '1 day ago',
      thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      isJoined: false,
      isOrganizer: false
    }
  ];

  const handleCheckin = (habit: Habit) => {
    setSelectedHabit(habit);
    setShowCheckinModal(true);
  };

  const handleSubmitCheckin = () => {
    // Handle checkin submission
    console.log({
      habit: selectedHabit?.id,
      note: checkinNote,
      image: checkinImage,
      mood: checkinMood
    });
    setShowCheckinModal(false);
    setCheckinNote('');
    setCheckinImage(null);
    setCheckinMood('great');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCheckinImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredHabits = habits.filter(habit => {
    if (activeTab === 'my' && !habit.isJoined) return false;
    if (searchQuery) {
      return habit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             habit.description.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Habits</h1>
          <p className="mt-2 text-gray-600">Build and track your daily habits with others</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search habits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent"
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
                showFilters ? 'bg-[#007dff] text-white border-[#007dff]' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
            <div className="bg-white border border-gray-200 rounded-lg flex">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'text-[#007dff]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'text-[#007dff]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <ListIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs and Sort */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'all'
                  ? 'bg-[#007dff] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Habits
              <span className="ml-2 text-sm bg-white/20 px-2 py-0.5 rounded-full">
                {habits.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('my')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'my'
                  ? 'bg-[#007dff] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              My Habits
              <span className="ml-2 text-sm bg-white/20 px-2 py-0.5 rounded-full">
                {habits.filter(h => h.isJoined).length}
              </span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
            >
              <option value="checkins">Most Check-ins</option>
              <option value="members">Most Members</option>
              <option value="recent">Recently Active</option>
              <option value="streak">Longest Streak</option>
            </select>
            <button
              onClick={() => navigate('/create-habit')}
              className="flex items-center space-x-2 px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc]"
            >
              <Plus className="w-5 h-5" />
              <span>Create Habit</span>
            </button>
          </div>
        </div>

        {/* Habits Grid */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredHabits.map((habit) => (
            viewMode === 'grid' ? (
              <div
                key={habit.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-video">
                  <img
                    src={habit.thumbnail}
                    alt={habit.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-semibold text-white">{habit.title}</h3>
                    <p className="text-sm text-gray-200 mt-1">{habit.description}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">{habit.members} members</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">{habit.checkins} check-ins</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    {habit.isJoined ? (
                      <button
                        onClick={() => handleCheckin(habit)}
                        className="flex-1 mr-2 px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc]"
                      >
                        Check-in
                      </button>
                    ) : (
                      <button
                        onClick={() => {/* Handle join */}}
                        className="flex-1 mr-2 px-4 py-2 border border-[#007dff] text-[#007dff] rounded-lg hover:bg-[#007dff]/5"
                      >
                        Join Habit
                      </button>
                    )}
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={habit.id}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={habit.thumbnail}
                      alt={habit.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900">{habit.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{habit.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{habit.members}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{habit.checkins}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{habit.frequency}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {habit.isJoined ? (
                      <button
                        onClick={() => handleCheckin(habit)}
                        className="px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc]"
                      >
                        Check-in
                      </button>
                    ) : (
                      <button
                        onClick={() => {/* Handle join */}}
                        className="px-4 py-2 border border-[#007dff] text-[#007dff] rounded-lg hover:bg-[#007dff]/5"
                      >
                        Join
                      </button>
                    )}
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Check-in Modal */}
      {showCheckinModal && selectedHabit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Check-in to {selectedHabit.title}</h3>
              <button
                onClick={() => setShowCheckinModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Mood Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How are you feeling?
                </label>
                <div className="flex space-x-4">
                  {['great', 'good', 'okay', 'bad'].map((mood) => (
                    <button
                      key={mood}
                      onClick={() => setCheckinMood(mood)}
                      className={`flex-1 py-2 rounded-lg border-2 transition-colors ${
                        checkinMood === mood
                          ? 'border-[#007dff] bg-[#007dff]/5'
                          : 'border-gray-200 hover:border-[#007dff]'
                      }`}
                    >
                      <Smile className="w-5 h-5 mx-auto" />
                      <span className="text-sm mt-1 block capitalize">{mood}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Note Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add a note
                </label>
                <textarea
                  value={checkinNote}
                  onChange={(e) => setCheckinNote(e.target.value)}
                  placeholder="How did it go?"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add a photo
                </label>
                {checkinImage ? (
                  <div className="relative">
                    <img
                      src={checkinImage}
                      alt="Check-in"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setCheckinImage(null)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-48 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-sm text-gray-500">Click to upload</span>
                    </label>
                  </div>
                )}
              </div>

              <button
                onClick={handleSubmitCheckin}
                className="w-full px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc]"
              >
                Complete Check-in
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
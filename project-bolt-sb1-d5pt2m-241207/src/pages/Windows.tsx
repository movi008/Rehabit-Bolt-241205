import React, { useState } from 'react';
import { 
  Clock, 
  Plus, 
  Sun, 
  Coffee, 
  Briefcase, 
  Moon,
  ChevronLeft,
  Save,
  Calendar,
  Timer,
  ListTodo,
  Settings,
  Repeat,
  AlertCircle
} from 'lucide-react';

type TimeWindow = 'morning' | 'midday' | 'afternoon' | 'evening';
type SubWindow = 'first' | 'second' | 'third' | 'fourth';

interface Practice {
  id: string;
  name: string;
  duration: number;
  type: 'meditation' | 'exercise' | 'reading' | 'writing' | 'other';
  description?: string;
}

interface TimeBlock {
  window: TimeWindow;
  subWindow: SubWindow;
  startTime: string;
  endTime: string;
}

export function Windows() {
  const [selectedWindow, setSelectedWindow] = useState<TimeWindow | null>(null);
  const [selectedSubWindow, setSelectedSubWindow] = useState<SubWindow | null>(null);
  const [showPracticeForm, setShowPracticeForm] = useState(false);
  const [practices, setPractices] = useState<Practice[]>([]);

  const timeWindows: Record<TimeWindow, { icon: React.ElementType; label: string; color: string }> = {
    morning: { icon: Sun, label: 'Morning (5am-9am)', color: 'bg-yellow-100 text-yellow-800' },
    midday: { icon: Coffee, label: 'Midday (9am-1pm)', color: 'bg-blue-100 text-blue-800' },
    afternoon: { icon: Briefcase, label: 'Afternoon (1pm-5pm)', color: 'bg-green-100 text-green-800' },
    evening: { icon: Moon, label: 'Evening (5pm-9pm)', color: 'bg-purple-100 text-purple-800' }
  };

  const subWindows: Record<SubWindow, { label: string }> = {
    first: { label: 'First Hour' },
    second: { label: 'Second Hour' },
    third: { label: 'Third Hour' },
    fourth: { label: 'Fourth Hour' }
  };

  const handleWindowSelect = (window: TimeWindow) => {
    setSelectedWindow(window);
    setSelectedSubWindow(null);
  };

  const handleSubWindowSelect = (subWindow: SubWindow) => {
    setSelectedSubWindow(subWindow);
    setShowPracticeForm(true);
  };

  const handleAddPractice = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const newPractice: Practice = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      duration: Number(formData.get('duration')),
      type: formData.get('type') as Practice['type'],
      description: formData.get('description') as string
    };

    setPractices([...practices, newPractice]);
    setShowPracticeForm(false);
  };

  const renderWindowHeader = () => {
    if (!selectedWindow) return null;
    const window = timeWindows[selectedWindow];
    const Icon = window.icon;

    return (
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={() => setSelectedWindow(null)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full ${window.color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-xl font-semibold text-gray-900">
            {window.label}
            {selectedSubWindow && ` • ${subWindows[selectedSubWindow].label}`}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Time Windows</h1>
          <p className="mt-2 text-gray-600">Build your daily routines by selecting time windows</p>
        </div>

        {/* Time Window Grid */}
        {!selectedWindow ? (
          <div className="grid grid-cols-2 gap-6">
            {Object.entries(timeWindows).map(([key, { icon: Icon, label, color }]) => (
              <button
                key={key}
                onClick={() => handleWindowSelect(key as TimeWindow)}
                className="aspect-square bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-[#007dff] transition-colors"
              >
                <div className="h-full flex flex-col items-center justify-center space-y-4">
                  <div className={`p-4 rounded-full ${color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <span className="text-lg font-medium text-gray-900">{label}</span>
                </div>
              </button>
            ))}
          </div>
        ) : !selectedSubWindow ? (
          <div>
            {renderWindowHeader()}
            <div className="grid grid-cols-2 gap-6">
              {Object.entries(subWindows).map(([key, { label }]) => (
                <button
                  key={key}
                  onClick={() => handleSubWindowSelect(key as SubWindow)}
                  className="aspect-square bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-[#007dff] transition-colors"
                >
                  <div className="h-full flex flex-col items-center justify-center space-y-4">
                    <div className="p-4 rounded-full bg-gray-100">
                      <Clock className="w-8 h-8 text-gray-600" />
                    </div>
                    <span className="text-lg font-medium text-gray-900">{label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {renderWindowHeader()}

            {/* Practice Form */}
            {showPracticeForm ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Add New Practice</h2>
                  <form onSubmit={handleAddPractice} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Practice Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Duration (minutes)
                        </label>
                        <input
                          type="number"
                          name="duration"
                          min="1"
                          max="240"
                          required
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Type
                        </label>
                        <select
                          name="type"
                          required
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent"
                        >
                          <option value="meditation">Meditation</option>
                          <option value="exercise">Exercise</option>
                          <option value="reading">Reading</option>
                          <option value="writing">Writing</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description (optional)
                      </label>
                      <textarea
                        name="description"
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent resize-none"
                      />
                    </div>

                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setShowPracticeForm(false)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-900"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc]"
                      >
                        Add Practice
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Practice List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold text-gray-900">Practices</h2>
                      <button
                        onClick={() => setShowPracticeForm(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc]"
                      >
                        <Plus className="w-5 h-5" />
                        <span>Add Practice</span>
                      </button>
                    </div>

                    {practices.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="flex justify-center mb-4">
                          <AlertCircle className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No practices yet</h3>
                        <p className="text-gray-500">
                          Add your first practice to start building your routine
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {practices.map((practice) => (
                          <div
                            key={practice.id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="p-2 bg-white rounded-lg">
                                <Timer className="w-5 h-5 text-gray-600" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">{practice.name}</h3>
                                <p className="text-sm text-gray-500">
                                  {practice.duration} minutes • {practice.type}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-gray-400 hover:text-gray-600">
                                <Settings className="w-5 h-5" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-gray-600">
                                <Repeat className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Schedule Overview */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Schedule Overview</h2>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Calendar className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="text-sm text-gray-500">Total Duration</p>
                          <p className="font-medium text-gray-900">
                            {practices.reduce((acc, p) => acc + p.duration, 0)} minutes
                          </p>
                        </div>
                      </div>
                      <button className="px-4 py-2 text-[#007dff] hover:bg-[#007dff]/5 rounded-lg transition-colors">
                        View Calendar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { ChevronRight, Edit2, Check, X, Sparkles, Loader2 } from 'lucide-react';
import { VisionData } from '../../types/vision';

interface StepTwoProps {
  visionData: VisionData;
  onComplete: (updatedData: Partial<VisionData>) => void;
}

export function StepTwo({ visionData, onComplete }: StepTwoProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [title, setTitle] = useState(visionData.title);
  const [description, setDescription] = useState(visionData.description);
  const [selectedTimeSpace, setSelectedTimeSpace] = useState<string[]>(visionData.timeSpace);
  const [timeZoneYears, setTimeZoneYears] = useState('25');
  const [timeZoneRange, setTimeZoneRange] = useState('5');
  const [useTimeZoneRange, setUseTimeZoneRange] = useState(true);
  const [selectedRealm, setSelectedRealm] = useState<string[]>(visionData.realm);
  const [selectedWorld, setSelectedWorld] = useState<string[]>(visionData.world);
  const [selectedEnergy, setSelectedEnergy] = useState<string[]>(visionData.energy.emotions.slice(0, 6));
  const [isGeneratingEnergy, setIsGeneratingEnergy] = useState(false);

  const timeSpaceOptions = ['Past', 'Present', 'Future'];
  const realmOptions = ['Health', 'Wealth', 'Relationships'];
  const worldOptions = ['Self', 'Family', 'Community', 'Planet'];

  // Initial energy options
  const [energyOptions, setEnergyOptions] = useState([
    'Confidence',
    'Abundance',
    'Harmony',
    'Growth',
    'Peace',
    'Connection'
  ]);

  const handleComplete = () => {
    const timeZoneValue = useTimeZoneRange 
      ? [`${timeZoneYears - Number(timeZoneRange)}-${Number(timeZoneYears) + Number(timeZoneRange)} years`]
      : [`${timeZoneYears} years`];

    onComplete({
      title,
      description,
      timeSpace: selectedTimeSpace,
      timeZone: timeZoneValue,
      realm: selectedRealm,
      world: selectedWorld,
      energy: {
        chakra: '',
        emotions: selectedEnergy
      }
    });
  };

  const toggleSelection = (
    current: string[],
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (current.includes(value)) {
      setter(current.filter(item => item !== value));
    } else {
      setter([...current, value]);
    }
  };

  const generateMoreEnergyOptions = async () => {
    setIsGeneratingEnergy(true);
    
    // Simulate AI analysis of the vision description to generate contextual energy options
    const visionKeywords = description.toLowerCase();
    
    // Define emotion sets based on common vision themes
    const emotionSets = {
      innovation: ['Innovative', 'Creative', 'Pioneering', 'Visionary', 'Inspired', 'Progressive'],
      sustainability: ['Balanced', 'Harmonious', 'Sustainable', 'Nurturing', 'Responsible', 'Connected'],
      success: ['Ambitious', 'Determined', 'Focused', 'Empowered', 'Accomplished', 'Confident'],
      wellbeing: ['Peaceful', 'Serene', 'Vibrant', 'Energized', 'Balanced', 'Mindful'],
      community: ['United', 'Collaborative', 'Supportive', 'Inclusive', 'Connected', 'Empathetic'],
      personal: ['Authentic', 'Resilient', 'Grateful', 'Joyful', 'Present', 'Aligned']
    };

    // Select emotion set based on vision description keywords
    let newEmotions: string[] = [];
    
    if (visionKeywords.includes('technolog') || visionKeywords.includes('innovat')) {
      newEmotions = [...emotionSets.innovation];
    } else if (visionKeywords.includes('environment') || visionKeywords.includes('sustain')) {
      newEmotions = [...emotionSets.sustainability];
    } else if (visionKeywords.includes('success') || visionKeywords.includes('achieve')) {
      newEmotions = [...emotionSets.success];
    } else if (visionKeywords.includes('health') || visionKeywords.includes('wellbeing')) {
      newEmotions = [...emotionSets.wellbeing];
    } else if (visionKeywords.includes('community') || visionKeywords.includes('together')) {
      newEmotions = [...emotionSets.community];
    } else {
      newEmotions = [...emotionSets.personal];
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setEnergyOptions(newEmotions);
    setSelectedEnergy([]); // Reset selection for new options
    setIsGeneratingEnergy(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          {/* Vision Title */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vision Title
            </label>
            {isEditingTitle ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="flex-1 text-2xl font-bold text-gray-900 bg-gray-50 px-3 py-2 rounded-lg border-2 border-[#007dff] focus:outline-none"
                  placeholder="Enter vision title..."
                  autoFocus
                />
                <button
                  onClick={() => setIsEditingTitle(false)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                >
                  <Check className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    setTitle(visionData.title);
                    setIsEditingTitle(false);
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                <button
                  onClick={() => setIsEditingTitle(true)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Vision Description */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vision Description
            </label>
            <div className="relative p-4 bg-gray-50 rounded-lg border border-gray-200">
              {isEditingDescription ? (
                <div className="space-y-2">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-32 px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent resize-none"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setIsEditingDescription(false)}
                      className="px-3 py-1 text-green-600 hover:bg-green-50 rounded-lg"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setDescription(visionData.description);
                        setIsEditingDescription(false);
                      }}
                      className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-gray-600 pr-8">{description}</p>
                  <button
                    onClick={() => setIsEditingDescription(true)}
                    className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="space-y-8">
            {/* Time Space */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Time Space
              </label>
              <div className="flex flex-wrap gap-2">
                {timeSpaceOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => toggleSelection(selectedTimeSpace, option, setSelectedTimeSpace)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedTimeSpace.includes(option)
                        ? 'bg-[#007dff] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Zone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Time Zone
              </label>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    value={timeZoneYears}
                    onChange={(e) => setTimeZoneYears(e.target.value)}
                    className="w-24 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent"
                    min="1"
                    max="100"
                  />
                  <span className="text-gray-600">years</span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="useRange"
                    checked={useTimeZoneRange}
                    onChange={(e) => setUseTimeZoneRange(e.target.checked)}
                    className="rounded border-gray-300 text-[#007dff] focus:ring-[#007dff]"
                  />
                  <label htmlFor="useRange" className="text-sm text-gray-600">
                    Add range (±)
                  </label>
                  {useTimeZoneRange && (
                    <input
                      type="number"
                      value={timeZoneRange}
                      onChange={(e) => setTimeZoneRange(e.target.value)}
                      className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent"
                      min="1"
                      max="50"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Realm */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Realm
              </label>
              <div className="flex flex-wrap gap-2">
                {realmOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => toggleSelection(selectedRealm, option, setSelectedRealm)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedRealm.includes(option)
                        ? 'bg-[#007dff] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* World */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                World
              </label>
              <div className="flex flex-wrap gap-2">
                {worldOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => toggleSelection(selectedWorld, option, setSelectedWorld)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedWorld.includes(option)
                        ? 'bg-[#007dff] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Energy */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">
                  Energy
                </label>
                <button
                  onClick={generateMoreEnergyOptions}
                  disabled={isGeneratingEnergy}
                  className="flex items-center space-x-1 text-sm text-[#007dff] hover:text-[#0066cc] disabled:opacity-50"
                >
                  {isGeneratingEnergy ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate More Options</span>
                    </>
                  )}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {energyOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => toggleSelection(selectedEnergy, option, setSelectedEnergy)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedEnergy.includes(option)
                        ? 'bg-[#007dff] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              All fields are multi-select where applicable
            </div>
            <button
              onClick={handleComplete}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc] transition-colors"
            >
              <span>Continue</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
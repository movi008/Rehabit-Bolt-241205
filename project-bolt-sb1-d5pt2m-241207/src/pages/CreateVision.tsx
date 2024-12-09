import React, { useState, useEffect } from 'react';
import { StepOne } from '../components/vision/StepOne';
import { StepTwo } from '../components/vision/StepTwo';
import { StepThree } from '../components/vision/StepThree';
import { StepIndicator } from '../components/vision/StepIndicator';
import { ViewTypeSelector } from '../components/vision/ViewTypeSelector';
import { VisionData } from '../types/vision';
import { ViewType } from '../types';
import { ChevronLeft, HelpCircle, X, Play } from 'lucide-react';
import { VideoPlayer } from '../components/VideoPlayer';

export function CreateVision() {
  const [currentStep, setCurrentStep] = useState(1);
  const [viewType, setViewType] = useState<ViewType>('classic');
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [hasShownExitModal, setHasShownExitModal] = useState(false);
  const [visionData, setVisionData] = useState<VisionData>({
    description: '',
    title: '',
    timeSpace: [],
    timeZone: [],
    realm: [],
    world: [],
    energy: {
      chakra: '',
      emotions: []
    }
  });

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (
        e.clientY <= 0 && // User's mouse has moved above the top of the viewport
        !hasShownExitModal && // Modal hasn't been shown yet
        !showHelpModal // Modal is not currently showing
      ) {
        setShowHelpModal(true);
        setHasShownExitModal(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShownExitModal, showHelpModal]);

  const handleStepOneComplete = async (description: string) => {
    try {
      setVisionData(prev => ({
        ...prev,
        description
      }));

      const lines = description.split('\n').filter(line => line.trim());
      let title = '';
      let timeSpace: string[] = [];
      let realm: string[] = [];
      let emotions: string[] = [];

      lines.forEach(line => {
        if (line.toLowerCase().includes('title:')) {
          title = line.split(':')[1].trim().replace(/['"]+/g, '');
        } else if (line.toLowerCase().includes('time frame:')) {
          timeSpace = line.split(':')[1].trim().split(',').map(t => t.trim());
        } else if (line.toLowerCase().includes('realms:')) {
          realm = line.split(':')[1].trim().split(',').map(r => r.trim());
        } else if (line.toLowerCase().includes('emotions:')) {
          emotions = line.split(':')[1].trim().split(',').map(e => e.trim());
        }
      });

      setVisionData(prev => ({
        ...prev,
        title: title || 'My Vision',
        timeSpace,
        realm,
        energy: {
          ...prev.energy,
          emotions
        }
      }));
      setCurrentStep(2);
    } catch (error) {
      console.error('Error processing vision data:', error);
      setVisionData(prev => ({
        ...prev,
        description
      }));
      setCurrentStep(2);
    }
  };

  const handleStepTwoComplete = (updatedData: Partial<VisionData>) => {
    setVisionData(prev => ({ ...prev, ...updatedData }));
    setCurrentStep(3);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
              )}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {visionData.title || 'Create Your Vision'}
                </h1>
                <p className="mt-2 text-gray-600">
                  Define and manifest your vision of the future through our guided process.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowHelpModal(true)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <HelpCircle className="w-6 h-6" />
            </button>
          </div>
        </div>

        <StepIndicator 
          currentStep={currentStep} 
          steps={[
            'Describe Your Vision',
            'Clarify Your Vision',
            'Realize Your Vision'
          ]} 
          onStepClick={setCurrentStep}
        />

        {currentStep === 1 && (
          <div className="mt-8 mb-6">
            <ViewTypeSelector 
              viewType={viewType} 
              onChange={setViewType} 
            />
          </div>
        )}

        <div className="mt-8">
          {currentStep === 1 && (
            <StepOne 
              onComplete={handleStepOneComplete} 
              viewType={viewType}
              initialValue={visionData.description}
            />
          )}
          {currentStep === 2 && (
            <StepTwo 
              visionData={visionData} 
              onComplete={handleStepTwoComplete}
            />
          )}
          {currentStep === 3 && (
            <StepThree visionData={visionData} />
          )}
        </div>
      </div>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full overflow-hidden">
            <div className="relative">
              <button
                onClick={() => setShowHelpModal(false)}
                className="absolute top-4 right-4 p-2 text-white bg-black/50 hover:bg-black/70 rounded-full transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="aspect-video bg-black relative">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80"
                  alt="Team collaboration"
                  className="w-full h-full object-cover opacity-75"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center transition-colors">
                    <Play className="w-8 h-8 text-[#007dff] ml-1" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Your Perfect Vision</h2>
              <p className="text-gray-600 mb-6">
                Learn how to craft a compelling vision that aligns with your deepest aspirations and goals. 
                Our expert coaches will guide you through the process of turning your dreams into reality.
              </p>
              
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setShowHelpModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Continue on my own
                </button>
                <button
                  onClick={() => {
                    // Handle coaching signup
                    console.log('Get coaching clicked');
                  }}
                  className="flex items-center space-x-2 px-6 py-3 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc] transition-colors"
                >
                  <Play className="w-5 h-5" />
                  <span>Get Coaching</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
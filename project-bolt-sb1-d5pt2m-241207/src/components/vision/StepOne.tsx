import React, { useState } from 'react';
import { ViewType } from '../../types';
import { ClassicInput } from './inputs/ClassicInput';
import { ChatInput } from './inputs/ChatInput';
import { RealtimeInput } from './inputs/RealtimeInput';
import { aiService } from '../../lib/ai';

interface ProcessingStep {
  label: string;
  status: 'pending' | 'processing' | 'completed';
}

interface StepOneProps {
  onComplete: (description: string) => void;
  viewType: ViewType;
  initialValue: string;
}

export function StepOne({ onComplete, viewType, initialValue }: StepOneProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([
    { label: 'Analyzing vision description', status: 'pending' },
    { label: 'Generating vision title', status: 'pending' },
    { label: 'Generating clarification points', status: 'pending' },
    { label: 'Preparing user prompts', status: 'pending' }
  ]);

  const updateStepStatus = (index: number, status: ProcessingStep['status']) => {
    setProcessingSteps(prev => prev.map((step, i) => 
      i === index ? { ...step, status } : step
    ));
  };

  const handleSubmit = async (text: string) => {
    if (!text.trim() || isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      setError(null);

      // Step 1: Analyzing
      updateStepStatus(0, 'processing');
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateStepStatus(0, 'completed');

      // Step 2: Generating Title
      updateStepStatus(1, 'processing');
      await new Promise(resolve => setTimeout(resolve, 1500));
      updateStepStatus(1, 'completed');

      // Step 3: Generating Clarification
      updateStepStatus(2, 'processing');
      await new Promise(resolve => setTimeout(resolve, 2000));
      updateStepStatus(2, 'completed');

      // Step 4: Preparing Prompts
      updateStepStatus(3, 'processing');
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateStepStatus(3, 'completed');

      // Generate vision content using OpenAI
      const scriptResult = await aiService.generateScript(`
        Create a detailed vision based on the following description. Include:
        1. A compelling title
        2. A refined description
        3. Time frame and scope
        4. Key realms of impact
        5. Core emotions and energy
        
        User's vision: ${text}
      `);

      // Pass the enhanced vision description to the next step
      await onComplete(scriptResult.script);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to process vision';
      setError(errorMessage);
      console.error('Vision processing error:', errorMessage);
    } finally {
      setIsSubmitting(false);
      // Reset processing steps for next submission
      setProcessingSteps(prev => prev.map(step => ({ ...step, status: 'pending' })));
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 border shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Describe Your Vision
      </h2>
      <p className="text-gray-600 mb-6">
        Share your vision of the future in detail. What does it look like? 
        How does it feel? What has changed?
      </p>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {viewType === 'classic' && (
        <ClassicInput
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          initialValue={initialValue}
        />
      )}

      {viewType === 'chat' && (
        <ChatInput
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          initialValue={initialValue}
        />
      )}

      {viewType === 'realtime' && (
        <RealtimeInput
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          initialValue={initialValue}
        />
      )}

      {/* Processing Steps */}
      {isSubmitting && (
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <div className="space-y-3">
            {processingSteps.map((step, index) => (
              <div key={index} className="flex items-center space-x-3">
                {step.status === 'processing' ? (
                  <Loader2 className="w-5 h-5 text-[#007dff] animate-spin" />
                ) : step.status === 'completed' ? (
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                )}
                <span className={`text-sm ${
                  step.status === 'processing' ? 'text-[#007dff] font-medium' :
                  step.status === 'completed' ? 'text-green-600' :
                  'text-gray-500'
                }`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
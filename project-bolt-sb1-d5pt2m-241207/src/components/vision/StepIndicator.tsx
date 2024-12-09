import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
  onStepClick: (step: number) => void;
}

export function StepIndicator({ currentStep, steps, onStepClick }: StepIndicatorProps) {
  return (
    <div className="relative">
      <div className="absolute top-5 left-6 right-6 h-0.5 bg-gray-200">
        <div
          className="h-full bg-[#007dff] transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>
      
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > index + 1;
          const isCurrent = currentStep === index + 1;
          const isClickable = index + 1 <= Math.max(currentStep, 1);
          
          return (
            <div key={step} className="flex flex-col items-center">
              <button
                onClick={() => isClickable && onStepClick(index + 1)}
                disabled={!isClickable}
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                  isCompleted
                    ? 'bg-[#007dff] border-[#007dff] cursor-pointer'
                    : isCurrent
                    ? 'border-[#007dff] bg-white cursor-default'
                    : isClickable
                    ? 'border-gray-200 bg-white hover:border-[#007dff] cursor-pointer'
                    : 'border-gray-200 bg-white cursor-not-allowed opacity-50'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-6 h-6 text-white" />
                ) : (
                  <span className={isCurrent ? 'text-[#007dff]' : 'text-gray-400'}>
                    {index + 1}
                  </span>
                )}
              </button>
              <span className={`mt-2 text-sm font-medium ${
                isCurrent ? 'text-[#007dff]' : 'text-gray-500'
              }`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
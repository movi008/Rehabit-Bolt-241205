import React from 'react';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

interface AIProcessingStepsProps {
  status: {
    script: boolean;
    voiceover: boolean;
    images: boolean;
    video: boolean;
  };
}

export function AIProcessingSteps({ status }: AIProcessingStepsProps) {
  const steps = [
    { label: 'Generating Script (OpenAI)', done: status.script },
    { label: 'Creating Voiceover (ElevenLabs)', done: status.voiceover },
    { label: 'Generating Visuals (RunwayML)', done: status.images },
    { label: 'Compositing Video (Luma Labs)', done: status.video },
  ];

  return (
    <div className="bg-white rounded-lg p-6 border shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">AI Processing</h2>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center space-x-3">
            {step.done ? (
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            ) : (
              status[Object.keys(status)[index] as keyof typeof status] ? (
                <Loader2 className="w-6 h-6 text-[#007dff] animate-spin" />
              ) : (
                <Circle className="w-6 h-6 text-gray-300" />
              )
            )}
            <span className={step.done ? 'text-green-600' : 'text-gray-600'}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
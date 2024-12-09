import React, { useState, useEffect } from 'react';
import { Mic, Square, Loader2, AlertCircle } from 'lucide-react';
import { AudioVisualizer } from './AudioVisualizer';

interface RealtimeInputProps {
  onSubmit: (text: string) => Promise<void>;
  isSubmitting: boolean;
  initialValue: string;
}

export function RealtimeInput({ onSubmit, isSubmitting, initialValue }: RealtimeInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState(initialValue);
  const [tempTranscript, setTempTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isRecording) {
      // Simulate real-time transcription
      const interval = setInterval(() => {
        setTempTranscript(prev => prev + '.');
      }, 500);

      // Simulate stopping after 5 seconds
      setTimeout(() => {
        setIsRecording(false);
        setTempTranscript('');
        setTranscript(
          "In my vision of the future, cities are transformed into sustainable ecosystems where nature and technology coexist harmoniously. Buildings are covered in vertical gardens, and renewable energy powers everything. Communities are more connected, both digitally and personally, creating a balance between technological advancement and human connection."
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isRecording]);

  const handleToggleRecording = async () => {
    setError(null);
    if (isRecording) {
      setIsRecording(false);
      setTempTranscript('');
    } else {
      setTranscript('');
      setIsRecording(true);
    }
  };

  const handleSubmit = async () => {
    if (!transcript.trim() || isSubmitting) return;
    await onSubmit(transcript);
  };

  const handleVisualizerError = (errorMessage: string) => {
    setError(errorMessage);
    setIsRecording(false);
    setTempTranscript('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={handleToggleRecording}
          disabled={isSubmitting}
          className={`p-6 rounded-full transition-all ${
            isRecording 
              ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
              : 'bg-[#007dff] hover:bg-[#0066cc]'
          }`}
        >
          {isRecording ? (
            <Square className="w-8 h-8 text-white" />
          ) : (
            <Mic className="w-8 h-8 text-white" />
          )}
        </button>
        <p className="text-center text-gray-500">
          {isRecording ? 'Recording... Click to stop' : 'Start your session'}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {isRecording && !error && (
        <div className="flex justify-center">
          <AudioVisualizer isRecording={isRecording} onError={handleVisualizerError} />
        </div>
      )}

      <div className="bg-gray-50 rounded-lg p-4 min-h-[12rem]">
        {tempTranscript && (
          <div className="flex items-center space-x-2 text-gray-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{tempTranscript}</span>
          </div>
        )}
        {transcript && <p className="text-gray-900">{transcript}</p>}
      </div>

      {transcript && (
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <span>Submit Vision</span>
          )}
        </button>
      )}
    </div>
  );
}
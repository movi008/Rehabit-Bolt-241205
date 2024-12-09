import React from 'react';
import { Mic, StopCircle, MessageSquare } from 'lucide-react';

interface VoiceInputProps {
  isRecording: boolean;
  setIsRecording: (recording: boolean) => void;
  onVoiceInput: (transcript: string) => void;
  inputMode: 'voice' | 'text';
  setInputMode: (mode: 'voice' | 'text') => void;
}

export function VoiceInput({ 
  isRecording, 
  setIsRecording, 
  onVoiceInput,
  inputMode,
  setInputMode 
}: VoiceInputProps) {
  const handleToggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        onVoiceInput("Create a video about artificial intelligence and its impact on creative industries");
      }, 3000);
    } else {
      setIsRecording(false);
    }
  };

  const handleTextSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const prompt = formData.get('prompt') as string;
    if (prompt.trim()) {
      onVoiceInput(prompt);
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 border shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Input Method</h2>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setInputMode('voice')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-colors ${
              inputMode === 'voice'
                ? 'bg-[#007dff] text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>Voice</span>
          </button>
          <button
            onClick={() => setInputMode('text')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-colors ${
              inputMode === 'text'
                ? 'bg-[#007dff] text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Text</span>
          </button>
        </div>
      </div>

      {inputMode === 'voice' ? (
        <div className="flex flex-col items-center">
          <button
            onClick={handleToggleRecording}
            className={`p-6 rounded-full transition-all ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-[#007dff] hover:bg-[#0066cc]'
            }`}
          >
            {isRecording ? (
              <StopCircle className="w-8 h-8 text-white" />
            ) : (
              <Mic className="w-8 h-8 text-white" />
            )}
          </button>
          <p className="text-center mt-4 text-gray-500">
            {isRecording ? 'Recording... Click to stop' : 'Click to start recording'}
          </p>
        </div>
      ) : (
        <form onSubmit={handleTextSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              name="prompt"
              placeholder="Describe your video idea..."
              className="w-full h-24 px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#007dff] focus:ring-1 focus:ring-[#007dff] resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#007dff] hover:bg-[#0066cc] text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Generate Video</span>
          </button>
        </form>
      )}
    </div>
  );
}
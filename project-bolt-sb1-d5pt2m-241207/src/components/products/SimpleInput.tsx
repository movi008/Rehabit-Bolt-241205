import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface SimpleInputProps {
  placeholder: string;
  onSubmit: (text: string) => Promise<void>;
  isSubmitting: boolean;
  initialValue?: string;
  minRows?: number;
}

export function SimpleInput({ 
  placeholder, 
  onSubmit, 
  isSubmitting, 
  initialValue = '', 
  minRows = 3 
}: SimpleInputProps) {
  const [text, setText] = useState(initialValue);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isSubmitting) return;
    await onSubmit(text);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        rows={minRows}
        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent resize-none"
        disabled={isSubmitting}
      />

      <button
        type="submit"
        disabled={!text.trim() || isSubmitting}
        className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Generate</span>
          </>
        )}
      </button>
    </form>
  );
}
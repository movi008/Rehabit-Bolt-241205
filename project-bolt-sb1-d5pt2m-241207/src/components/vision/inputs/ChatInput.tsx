import React, { useState, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  type: 'user' | 'bot';
  content: string;
}

interface ChatInputProps {
  onSubmit: (text: string) => Promise<void>;
  isSubmitting: boolean;
  initialValue: string;
}

export function ChatInput({ onSubmit, isSubmitting, initialValue }: ChatInputProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: "Hello! I'm here to help you describe your vision of the future. What does your ideal future look like?"
    }
  ]);
  const [input, setInput] = useState('');

  // Initialize with initial value if provided
  useEffect(() => {
    if (initialValue) {
      setMessages(prev => [
        ...prev,
        { type: 'user', content: initialValue }
      ]);
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isSubmitting) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);

    // Simulate bot responses
    const botResponses = [
      "That's interesting! Can you tell me more about how this future impacts people's daily lives?",
      "I see. And what role does technology play in this vision?",
      "One final question: How does this future make you feel emotionally?"
    ];

    if (messages.length < 6) {
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', content: botResponses[Math.floor(messages.length / 2 - 1)] }]);
      }, 1000);
    } else {
      // Compile all user messages and submit
      const description = messages
        .filter(m => m.type === 'user')
        .map(m => m.content)
        .join('\n\n');
      await onSubmit(description);
    }
  };

  return (
    <div className="space-y-4">
      <div className="h-96 overflow-y-auto border border-gray-200 rounded-lg p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start space-x-3 ${
              message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.type === 'user' 
                  ? 'bg-[#007dff]' 
                  : 'bg-gray-100'
              }`}
            >
              {message.type === 'user' ? (
                <User className="w-5 h-5 text-white" />
              ) : (
                <Bot className="w-5 h-5 text-gray-600" />
              )}
            </div>
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.type === 'user'
                  ? 'bg-[#007dff] text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <div className="flex space-x-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent"
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          disabled={isSubmitting}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isSubmitting}
          className="px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
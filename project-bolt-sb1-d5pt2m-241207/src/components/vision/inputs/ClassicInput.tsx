import React, { useState } from 'react';
import { 
  Send, 
  Loader2, 
  Mic, 
  Video, 
  Image as ImageIcon, 
  Link, 
  File, 
  Camera,
  Upload,
  X
} from 'lucide-react';

interface ClassicInputProps {
  onSubmit: (text: string) => Promise<void>;
  isSubmitting: boolean;
  initialValue: string;
}

export function ClassicInput({ onSubmit, isSubmitting, initialValue }: ClassicInputProps) {
  const [text, setText] = useState(initialValue);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isSubmitting) return;
    
    try {
      await onSubmit(text);
    } catch (error) {
      // Log error but don't pass the error object directly
      console.error('Error submitting input:', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files]);

    const newPreviewUrls = files.map(file => {
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        return URL.createObjectURL(file);
      }
      return '';
    });
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
    if (previewUrls[index]) {
      URL.revokeObjectURL(previewUrls[index]);
    }
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="In my vision of the future..."
          className="w-full h-48 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent resize-none"
          disabled={isSubmitting}
        />

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <File className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <ImageIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => videoInputRef.current?.click()}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <Video className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => {
              const url = prompt('Enter URL:');
              if (url) setText(prev => prev + `\n${url}`);
            }}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <Link className="w-5 h-5" />
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {attachments.map((file, index) => (
              <div key={index} className="relative group">
                {file.type.startsWith('video/') ? (
                  <video
                    src={previewUrls[index]}
                    className="w-40 h-40 object-cover rounded-lg border border-gray-200"
                  />
                ) : previewUrls[index] ? (
                  <img
                    src={previewUrls[index]}
                    alt={`Attachment ${index + 1}`}
                    className="w-40 h-40 object-cover rounded-lg border border-gray-200"
                  />
                ) : (
                  <div className="w-40 h-40 flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200">
                    <File className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <button
                  onClick={() => removeAttachment(index)}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

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
              <span>Submit Vision</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Download, 
  Share2, 
  X, 
  Check, 
  Video, 
  FileText, 
  Music, 
  Image as ImageIcon,
  Youtube,
  Instagram,
  Music2,
  Link,
  Mail,
  Globe,
  Tv,
  Copy,
  Save,
  Loader2
} from 'lucide-react';
import { VideoPlayer } from '../components/VideoPlayer';
import { PersonaGraph } from '../components/editor/PersonaGraph';

interface Project {
  id: string;
  title: string;
  type: 'affirmation' | 'meditation' | 'mantra' | 'visualization';
}

interface EditorSettings {
  music: {
    volume: number;
    type: string;
  };
  voiceover: {
    volume: number;
    voice: string;
    speed: number;
  };
  video: {
    style: string;
    tone: string;
    transitions: string;
  };
  avatar: {
    style: string;
    emotion: string;
    presence: 'full' | 'partial' | 'none';
  };
}

export function Editor() {
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState<EditorSettings>({
    music: {
      volume: 80,
      type: 'ambient'
    },
    voiceover: {
      volume: 100,
      voice: 'natural',
      speed: 1
    },
    video: {
      style: 'cinematic',
      tone: 'inspiring',
      transitions: 'smooth'
    },
    avatar: {
      style: 'professional',
      emotion: 'confident',
      presence: 'partial'
    }
  });

  const projects: Project[] = [
    { id: '1', title: 'Morning Motivation', type: 'affirmation' },
    { id: '2', title: 'Evening Calm', type: 'meditation' },
    { id: '3', title: 'Success Mindset', type: 'mantra' },
    { id: '4', title: 'Future Vision', type: 'visualization' }
  ];

  const products = [
    { id: 'affirmation', name: 'Affirmation' },
    { id: 'meditation', name: 'Meditation' },
    { id: 'mantra', name: 'Mantra' },
    { id: 'visualization', name: 'Visualization' },
    { id: 'persona-graph', name: 'Persona Graph' }
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate saving
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSaving(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Content Editor</h1>
          <p className="mt-2 text-gray-600">Edit and customize your vision content</p>
        </div>

        {/* Project and Product Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Project
            </label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg"
            >
              <option value="">Choose a project...</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Product
            </label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg"
            >
              <option value="">Choose a product...</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Editor Interface */}
        {selectedProduct && (
          <div className="space-y-6">
            {selectedProduct === 'persona-graph' ? (
              <PersonaGraph />
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Editor</h2>
                  <VideoPlayer />
                  
                  {/* Settings */}
                  <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Audio Settings */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-4">Audio Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-2">Background Music</label>
                          <select
                            value={settings.music.type}
                            onChange={(e) => setSettings({
                              ...settings,
                              music: { ...settings.music, type: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                          >
                            <option value="ambient">Ambient</option>
                            <option value="meditation">Meditation</option>
                            <option value="nature">Nature Sounds</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-2">Music Volume</label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={settings.music.volume}
                            onChange={(e) => setSettings({
                              ...settings,
                              music: { ...settings.music, volume: Number(e.target.value) }
                            })}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Visual Settings */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-4">Visual Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-2">Style</label>
                          <select
                            value={settings.video.style}
                            onChange={(e) => setSettings({
                              ...settings,
                              video: { ...settings.video, style: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                          >
                            <option value="cinematic">Cinematic</option>
                            <option value="minimal">Minimal</option>
                            <option value="nature">Nature</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-2">Transitions</label>
                          <select
                            value={settings.video.transitions}
                            onChange={(e) => setSettings({
                              ...settings,
                              video: { ...settings.video, transitions: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                          >
                            <option value="smooth">Smooth</option>
                            <option value="fade">Fade</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc] disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
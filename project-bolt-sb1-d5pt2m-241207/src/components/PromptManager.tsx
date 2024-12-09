import React, { useState } from 'react';
import { Edit2, Save, Plus, Trash2 } from 'lucide-react';
import { PromptTemplate, getPromptsByCategory } from '../lib/prompts';

interface PromptManagerProps {
  category: PromptTemplate['category'];
  onClose: () => void;
}

export function PromptManager({ category, onClose }: PromptManagerProps) {
  const [templates, setTemplates] = useState(getPromptsByCategory(category));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTemplate, setEditedTemplate] = useState<Partial<PromptTemplate>>({});

  const handleEdit = (template: PromptTemplate) => {
    setEditingId(template.id);
    setEditedTemplate(template);
  };

  const handleSave = () => {
    // In a real app, this would update the backend
    setTemplates(prev =>
      prev.map(t => t.id === editingId ? { ...t, ...editedTemplate } : t)
    );
    setEditingId(null);
    setEditedTemplate({});
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Manage {category.charAt(0).toUpperCase() + category.slice(1)} Prompts
          </h2>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-6">
            {templates.map(template => (
              <div key={template.id} className="border rounded-lg p-4">
                {editingId === template.id ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={editedTemplate.name || ''}
                        onChange={e => setEditedTemplate(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#007dff]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Template
                      </label>
                      <textarea
                        value={editedTemplate.template || ''}
                        onChange={e => setEditedTemplate(prev => ({ ...prev, template: e.target.value }))}
                        rows={3}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#007dff]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        value={editedTemplate.description || ''}
                        onChange={e => setEditedTemplate(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#007dff]"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-900"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc]"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{template.name}</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(template)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-red-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                    <pre className="text-sm bg-gray-50 p-3 rounded-lg overflow-x-auto">
                      {template.template}
                    </pre>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {template.variables.map(variable => (
                        <span
                          key={variable}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                        >
                          {variable}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-between">
            <button
              className="flex items-center space-x-2 px-4 py-2 text-[#007dff] hover:bg-[#007dff]/5 rounded-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Add Template</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc]"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
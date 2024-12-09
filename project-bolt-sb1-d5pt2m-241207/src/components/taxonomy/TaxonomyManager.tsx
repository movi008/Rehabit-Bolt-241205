import React, { useState } from 'react';
import { Plus, X, Edit2, Trash2, Save, Tag as TagIcon, FolderTree, Globe } from 'lucide-react';
import { Category, Tag, ProjectTaxonomy } from '../../types/taxonomy';

interface TaxonomyManagerProps {
  taxonomy: ProjectTaxonomy;
  onUpdate: (taxonomy: ProjectTaxonomy) => void;
}

export function TaxonomyManager({ taxonomy, onUpdate }: TaxonomyManagerProps) {
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [newItemType, setNewItemType] = useState<'category' | 'space' | 'tag' | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');

  const handleAddItem = () => {
    if (!newItemType || !newItemName.trim()) return;

    const newItem = {
      id: Date.now().toString(),
      name: newItemName,
      slug: newItemName.toLowerCase().replace(/\s+/g, '-'),
      description: newItemDescription,
      type: newItemType,
      count: 0
    };

    const updatedTaxonomy = { ...taxonomy };
    if (newItemType === 'tag') {
      updatedTaxonomy.tags = [...taxonomy.tags, newItem as Tag];
    } else if (newItemType === 'space') {
      updatedTaxonomy.spaces = [...taxonomy.spaces, newItem as Category];
    } else {
      updatedTaxonomy.categories = [...taxonomy.categories, newItem as Category];
    }

    onUpdate(updatedTaxonomy);
    setNewItemType(null);
    setNewItemName('');
    setNewItemDescription('');
  };

  const handleDelete = (type: 'category' | 'space' | 'tag', id: string) => {
    const updatedTaxonomy = { ...taxonomy };
    if (type === 'tag') {
      updatedTaxonomy.tags = taxonomy.tags.filter(tag => tag.id !== id);
    } else if (type === 'space') {
      updatedTaxonomy.spaces = taxonomy.spaces.filter(space => space.id !== id);
    } else {
      updatedTaxonomy.categories = taxonomy.categories.filter(cat => cat.id !== id);
    }
    onUpdate(updatedTaxonomy);
  };

  const handleUpdate = (type: 'category' | 'space' | 'tag', id: string, name: string, description: string) => {
    const updatedTaxonomy = { ...taxonomy };
    if (type === 'tag') {
      updatedTaxonomy.tags = taxonomy.tags.map(tag =>
        tag.id === id ? { ...tag, name, description } : tag
      );
    } else if (type === 'space') {
      updatedTaxonomy.spaces = taxonomy.spaces.map(space =>
        space.id === id ? { ...space, name, description } : space
      );
    } else {
      updatedTaxonomy.categories = taxonomy.categories.map(cat =>
        cat.id === id ? { ...cat, name, description } : cat
      );
    }
    onUpdate(updatedTaxonomy);
    setEditingItem(null);
  };

  const renderTaxonomyList = (items: (Category | Tag)[], type: 'category' | 'space' | 'tag') => (
    <div className="space-y-2">
      {items.map(item => (
        <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
          {editingItem === item.id ? (
            <div className="flex-1 flex items-center space-x-2">
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleUpdate(type, item.id, e.target.value, item.description || '')}
                className="flex-1 px-2 py-1 border rounded"
              />
              <button
                onClick={() => setEditingItem(null)}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <Save className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <span className="text-sm text-gray-900">{item.name}</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setEditingItem(item.id)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(type, item.id)}
                  className="p-1 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Taxonomy</h2>
        
        <div className="space-y-6">
          {/* Categories */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <FolderTree className="w-5 h-5 text-gray-400" />
                <h3 className="text-sm font-medium text-gray-700">Categories</h3>
              </div>
              <button
                onClick={() => setNewItemType('category')}
                className="p-1 text-[#007dff] hover:bg-[#007dff]/5 rounded"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {renderTaxonomyList(taxonomy.categories, 'category')}
          </div>

          {/* Spaces */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-gray-400" />
                <h3 className="text-sm font-medium text-gray-700">Spaces</h3>
              </div>
              <button
                onClick={() => setNewItemType('space')}
                className="p-1 text-[#007dff] hover:bg-[#007dff]/5 rounded"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {renderTaxonomyList(taxonomy.spaces, 'space')}
          </div>

          {/* Tags */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <TagIcon className="w-5 h-5 text-gray-400" />
                <h3 className="text-sm font-medium text-gray-700">Tags</h3>
              </div>
              <button
                onClick={() => setNewItemType('tag')}
                className="p-1 text-[#007dff] hover:bg-[#007dff]/5 rounded"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {renderTaxonomyList(taxonomy.tags, 'tag')}
          </div>
        </div>

        {/* Add New Item Form */}
        {newItemType && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-900">
                Add New {newItemType.charAt(0).toUpperCase() + newItemType.slice(1)}
              </h4>
              <button
                onClick={() => setNewItemType(null)}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={newItemDescription}
                  onChange={(e) => setNewItemDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent"
                />
              </div>
              <button
                onClick={handleAddItem}
                className="w-full px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc]"
              >
                Add {newItemType.charAt(0).toUpperCase() + newItemType.slice(1)}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
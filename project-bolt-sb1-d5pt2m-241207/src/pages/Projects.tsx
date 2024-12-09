import React, { useState, useMemo } from 'react';
import { Search, Filter as FilterIcon, LayoutGrid, List, Table as TableIcon, Calendar, Clock, Tag as TagIcon, FolderTree, Plus } from 'lucide-react';
import { Project, ViewMode } from '../types';
import { ProjectGrid } from '../components/ProjectGrid';
import { ProjectList } from '../components/ProjectList';
import { ProjectTable } from '../components/ProjectTable';
import { useNavigate } from 'react-router-dom';

const SAMPLE_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'AI in Creative Industries',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    status: 'completed',
    date: '2024-03-10',
    duration: '2:15',
    tags: ['AI', 'Creative', 'Technology'],
    category: 'Technology'
  },
  {
    id: '2',
    title: 'Future of Technology',
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    status: 'processing',
    date: '2024-03-09',
    duration: '3:45',
    tags: ['Future', 'Tech', 'Innovation'],
    category: 'Technology'
  },
  {
    id: '3',
    title: 'Sustainable Living Guide',
    thumbnail: 'https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?auto=format&fit=crop&w=800&q=80',
    status: 'draft',
    date: '2024-03-08',
    duration: '1:30',
    tags: ['Sustainability', 'Lifestyle', 'Environment'],
    category: 'Lifestyle'
  }
];

const ALL_TAGS = Array.from(new Set(SAMPLE_PROJECTS.flatMap(p => p.tags)));
const ALL_CATEGORIES = Array.from(new Set(SAMPLE_PROJECTS.map(p => p.category)));
const DATE_RANGES = ['Today', 'This Week', 'This Month', 'This Year', 'All Time'];
const DURATIONS = ['< 5 min', '5-15 min', '15-30 min', '> 30 min'];
const STATUSES = ['All', 'Completed', 'Processing', 'Draft'];

export function Projects() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<string>('All Time');
  const [selectedDuration, setSelectedDuration] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = SAMPLE_PROJECTS;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Tags filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(project =>
        selectedTags.some(tag => project.tags.includes(tag))
      );
    }

    // Categories filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(project =>
        selectedCategories.includes(project.category)
      );
    }

    // Status filter
    if (selectedStatus !== 'All') {
      filtered = filtered.filter(project =>
        project.status.toLowerCase() === selectedStatus.toLowerCase()
      );
    }

    // Sort
    return filtered.sort((a, b) => {
      const aValue = sortBy === 'date' ? a.date : a.title;
      const bValue = sortBy === 'date' ? b.date : b.title;
      const comparison = aValue.localeCompare(bValue);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [searchQuery, selectedTags, selectedCategories, selectedStatus, sortBy, sortOrder]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleDuration = (duration: string) => {
    setSelectedDuration(prev =>
      prev.includes(duration) ? prev.filter(d => d !== duration) : [...prev, duration]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
            <button
              onClick={() => navigate('/create')}
              className="flex items-center space-x-2 px-4 py-2 bg-[#007dff] text-white rounded-lg hover:bg-[#0066cc] transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Create New</span>
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
                  showFilters ? 'bg-[#007dff] text-white border-[#007dff]' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FilterIcon className="w-5 h-5" />
                <span>Filters</span>
              </button>
              <div className="bg-white border border-gray-200 rounded-lg flex">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'text-[#007dff]' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'text-[#007dff]' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 ${viewMode === 'table' ? 'text-[#007dff]' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <TableIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 p-6 bg-white border border-gray-200 rounded-lg space-y-6">
              {/* Categories */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <FolderTree className="w-5 h-5 text-gray-400" />
                  <h3 className="text-sm font-medium text-gray-700">Categories</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ALL_CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        selectedCategories.includes(category)
                          ? 'bg-[#007dff] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <TagIcon className="w-5 h-5 text-gray-400" />
                  <h3 className="text-sm font-medium text-gray-700">Tags</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ALL_TAGS.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        selectedTags.includes(tag)
                          ? 'bg-[#007dff] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <h3 className="text-sm font-medium text-gray-700">Date Range</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {DATE_RANGES.map((range) => (
                    <button
                      key={range}
                      onClick={() => setSelectedDateRange(range)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        selectedDateRange === range
                          ? 'bg-[#007dff] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <h3 className="text-sm font-medium text-gray-700">Duration</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {DURATIONS.map((duration) => (
                    <button
                      key={duration}
                      onClick={() => toggleDuration(duration)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        selectedDuration.includes(duration)
                          ? 'bg-[#007dff] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {duration}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <FilterIcon className="w-5 h-5 text-gray-400" />
                  <h3 className="text-sm font-medium text-gray-700">Status</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {STATUSES.map((status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        selectedStatus === status
                          ? 'bg-[#007dff] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
                    className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="title">Sort by Title</option>
                  </select>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                    className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
                  >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                  </select>
                </div>
                <button
                  onClick={() => {
                    setSelectedTags([]);
                    setSelectedCategories([]);
                    setSelectedDateRange('All Time');
                    setSelectedDuration([]);
                    setSelectedStatus('All');
                    setSortBy('date');
                    setSortOrder('desc');
                  }}
                  className="text-sm text-[#007dff] hover:text-[#0066cc]"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6">
          {viewMode === 'grid' && (
            <ProjectGrid
              projects={filteredAndSortedProjects}
              onProjectClick={() => {}}
              onMenuClick={() => {}}
            />
          )}
          {viewMode === 'list' && (
            <ProjectList
              projects={filteredAndSortedProjects}
              onProjectClick={() => {}}
              onMenuClick={() => {}}
            />
          )}
          {viewMode === 'table' && (
            <ProjectTable
              projects={filteredAndSortedProjects}
              onProjectClick={() => {}}
              onMenuClick={() => {}}
            />
          )}
        </div>
      </div>
    </div>
  );
}
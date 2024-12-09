import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, 
  User, 
  UserCircle, 
  MessageSquare, 
  Sparkles, 
  Brain,
  Music,
  Scroll,
  Film,
  Camera,
  Video,
  PlaySquare,
  Search,
  Calendar,
  LayoutGrid
} from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  image: string;
  category: 'vision' | 'identity' | 'mindset' | 'content' | 'program';
  route: string;
}

const products: Product[] = [
  {
    id: 'vision',
    title: 'Vision',
    description: 'Create a compelling vision of your future',
    icon: Eye,
    image: 'https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?auto=format&fit=crop&w=800&q=80',
    category: 'vision',
    route: '/create/vision'
  },
  {
    id: 'avatar',
    title: 'Avatar',
    description: 'Design your digital representation',
    icon: User,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    category: 'identity',
    route: '/create/avatar'
  },
  {
    id: 'persona',
    title: 'Persona',
    description: 'Develop your ideal personality traits',
    icon: UserCircle,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    category: 'identity',
    route: '/create/persona'
  },
  {
    id: 'affirmation',
    title: 'Affirmation',
    description: 'Create powerful positive statements',
    icon: MessageSquare,
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
    category: 'mindset',
    route: '/create/affirmation'
  },
  {
    id: 'visualization',
    title: 'Visualization',
    description: 'Generate vivid mental imagery',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
    category: 'mindset',
    route: '/create/visualization'
  },
  {
    id: 'meditation',
    title: 'Meditation',
    description: 'Design guided meditation experiences',
    icon: Brain,
    image: 'https://images.unsplash.com/photo-1528319725582-ddc096101511?auto=format&fit=crop&w=800&q=80',
    category: 'mindset',
    route: '/create/meditation'
  },
  {
    id: 'mantra',
    title: 'Mantra',
    description: 'Craft your personal power phrases',
    icon: Music,
    image: 'https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?auto=format&fit=crop&w=800&q=80',
    category: 'mindset',
    route: '/create/mantra'
  },
  {
    id: 'manifesto',
    title: 'Manifesto',
    description: 'Write your declaration of purpose',
    icon: Scroll,
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    category: 'content',
    route: '/create/manifesto'
  },
  {
    id: 'scenes',
    title: 'Scenes',
    description: 'Create immersive story sequences',
    icon: Film,
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
    category: 'content',
    route: '/create/scenes'
  },
  {
    id: 'shot',
    title: 'Shot',
    description: 'Capture perfect visual moments',
    icon: Camera,
    image: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=800&q=80',
    category: 'content',
    route: '/create/shot'
  },
  {
    id: 'clip',
    title: 'Clip',
    description: 'Create short video segments',
    icon: Video,
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
    category: 'content',
    route: '/create/clip'
  },
  {
    id: 'trailer',
    title: 'Trailer',
    description: 'Build compelling video previews',
    icon: PlaySquare,
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
    category: 'content',
    route: '/create/trailer'
  },
  {
    id: 'board',
    title: 'Board',
    description: 'Design visual boards for your vision',
    icon: LayoutGrid,
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    category: 'content',
    route: '/create/board'
  },
  {
    id: 'session',
    title: 'Session',
    description: 'Design interactive coaching sessions',
    icon: Calendar,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    category: 'program',
    route: '/create/session'
  }
];

export function Start() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'vision', label: 'Vision' },
    { id: 'identity', label: 'Identity' },
    { id: 'mindset', label: 'Mindset' },
    { id: 'content', label: 'Content' },
    { id: 'program', label: 'Program' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Create Something Amazing</h1>
          <p className="text-xl text-gray-600">Choose a product to start manifesting your vision</p>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007dff] focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-[#007dff] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(product.route)}
              className="group relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-2 text-white">
                    <product.icon className="w-5 h-5" />
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                  </div>
                  <p className="text-sm text-gray-200 mt-1">
                    {product.description}
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 bg-[#007dff]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
import { 
  Home,
  Calendar,
  FolderOpen,
  ListTodo,
  Users,
  FileText,
  Music,
  Image as ImageIcon,
  Video,
  Library,
  Wrench
} from 'lucide-react';

export const menuGroups = [
  {
    title: '',
    items: [
      { name: 'Home', icon: Home, path: '/' }
    ]
  },
  {
    title: 'Journey',
    items: [
      { name: 'Sessions', icon: Calendar, path: '/sessions' },
      { name: 'Projects', icon: FolderOpen, path: '/projects' },
      { name: 'Surveys', icon: ListTodo, path: '/surveys' },
      { name: 'Teams', icon: Users, path: '/teams' },
      { name: 'Journal', icon: FileText, path: '/journal' },
      { name: 'Habits', icon: ListTodo, path: '/habits' },
      { name: 'Windows', icon: Calendar, path: '/windows' }
    ]
  },
  {
    title: 'Assets',
    items: [
      { name: 'Images', icon: ImageIcon, path: '/media/images' },
      { name: 'Documents', icon: FileText, path: '/media/documents' },
      { name: 'Audio', icon: Music, path: '/media/audio' },
      { name: 'Videos', icon: Video, path: '/media/videos' },
      { name: 'Library', icon: Library, path: '/media/library' }
    ]
  },
  {
    title: 'Tools',
    items: [
      { name: 'Editor', icon: Wrench, path: '/editor' }
    ]
  }
];
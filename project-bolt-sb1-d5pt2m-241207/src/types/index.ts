export type Project = {
  id: string;
  title: string;
  thumbnail: string;
  status: 'completed' | 'processing' | 'draft';
  date: string;
  duration: string;
  tags: string[];
  category: string;
};

export type ViewMode = 'grid' | 'list' | 'table';

export type ViewType = 'classic' | 'chat' | 'realtime';

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  hairColor: string;
  eyeColor: string;
  preferredClothing: string;
  mood: string;
}
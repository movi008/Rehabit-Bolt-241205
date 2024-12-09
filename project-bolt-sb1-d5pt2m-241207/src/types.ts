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
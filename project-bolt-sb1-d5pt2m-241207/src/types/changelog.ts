export interface BoltChangeEntry {
  id: string;
  date: string;
  userRequest: string;
  changes: {
    type: 'added' | 'changed' | 'fixed' | 'updated';
    items: string[];
  }[];
}
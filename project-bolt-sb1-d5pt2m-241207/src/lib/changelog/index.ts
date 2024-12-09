import { BoltChangeEntry } from '../../types/changelog';

let changelogEntries: BoltChangeEntry[] = [];

export const changelogTracker = {
  addEntry(entry: Omit<BoltChangeEntry, 'id' | 'date'>) {
    const newEntry: BoltChangeEntry = {
      id: (changelogEntries.length + 1).toString(),
      date: new Date().toISOString().split('T')[0],
      ...entry
    };
    changelogEntries = [newEntry, ...changelogEntries];
    return newEntry;
  },

  getEntries() {
    return [...changelogEntries];
  },

  clear() {
    changelogEntries = [];
  }
};
import { create } from 'zustand';
import { Note, Category } from '../types';

interface Store {
  notes: Note[];
  categories: Category[];
  isRecording: boolean;
  setNotes: (notes: Note[]) => void;
  setCategories: (categories: Category[]) => void;
  setIsRecording: (isRecording: boolean) => void;
  addNote: (note: Note) => void;
  addCategory: (category: Category) => void;
}

export const useStore = create<Store>((set) => ({
  notes: [],
  categories: [],
  isRecording: false,
  setNotes: (notes) => set({ notes }),
  setCategories: (categories) => set({ categories }),
  setIsRecording: (isRecording) => set({ isRecording }),
  addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
  addCategory: (category) => set((state) => ({ categories: [...state.categories, category] })),
}));
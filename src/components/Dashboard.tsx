import React from 'react';
import { FolderOpen } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Dashboard = () => {
  const { notes, categories } = useStore();

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center space-x-2 mb-4">
              <FolderOpen className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-semibold">{category.name}</h2>
            </div>
            <div className="space-y-2">
              {notes
                .filter((note) => note.category === category.id)
                .map((note) => (
                  <div
                    key={note.id}
                    className="p-3 bg-gray-50 rounded-md"
                  >
                    {note.content}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
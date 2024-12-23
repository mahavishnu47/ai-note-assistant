import React from 'react';
import { Brain } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="w-8 h-8" />
          <h1 className="text-2xl font-bold">AI Assistant</h1>
        </div>
      </div>
    </header>
  );
};
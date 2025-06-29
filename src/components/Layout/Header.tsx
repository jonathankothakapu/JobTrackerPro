import React from 'react';
import { Briefcase, Plus } from 'lucide-react';

interface HeaderProps {
  onAddApplication: () => void;
}

export function Header({ onAddApplication }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">JobTracker Pro</h1>
            <p className="text-sm text-gray-500">Manage your job applications with ease</p>
          </div>
        </div>
        
        <button
          onClick={onAddApplication}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add Application</span>
        </button>
      </div>
    </header>
  );
}
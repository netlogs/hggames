import React from 'react';
import { type Tribute } from '../../types/simulator';

interface TributeListProps {
  tributes: Tribute[];
  onRemoveTribute: (id: string) => void;
}

export default function TributeList({ tributes, onRemoveTribute }: TributeListProps) {
  if (tributes.length === 0) {
    return (
      <div className="text-center text-white/60 py-8">
        No tributes added yet. Add between 5 and 24 tributes to begin.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tributes.map(tribute => (
        <div 
          key={tribute.id}
          className="bg-secondary-light p-4 rounded-lg flex items-center justify-between"
        >
          <span>{tribute.name}</span>
          <button
            onClick={() => onRemoveTribute(tribute.id)}
            className="text-white/60 hover:text-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
import React, { useState } from 'react';
import { type Tribute } from '../../types/simulator';

interface TributeFormProps {
  onAddTribute: (tribute: Tribute) => void;
}

export default function TributeForm({ onAddTribute }: TributeFormProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const tribute: Tribute = {
      id: crypto.randomUUID(),
      name: name.trim(),
      isAlive: true,
      kills: 0,
      events: []
    };

    onAddTribute(tribute);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-secondary-light p-6 rounded-xl">
      <div className="flex gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter tribute name"
          className="flex-grow px-4 py-2 rounded-lg bg-secondary border border-white/10 focus:border-primary/50 outline-none"
        />
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          Add Tribute
        </button>
      </div>
    </form>
  );
}
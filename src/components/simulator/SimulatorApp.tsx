import React, { useState } from 'react';
import TributeForm from './TributeForm';
import TributeList from './TributeList';
import SimulationControls from './SimulationControls';
import { type Tribute } from '../../types/simulator';

export default function SimulatorApp() {
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleAddTribute = (tribute: Tribute) => {
    if (tributes.length >= 24) {
      alert('Maximum number of tributes (24) reached');
      return;
    }
    setTributes([...tributes, tribute]);
  };

  const handleRemoveTribute = (id: string) => {
    setTributes(tributes.filter(t => t.id !== id));
  };

  const handleStartSimulation = () => {
    if (tributes.length < 5) {
      alert('Minimum of 5 tributes required to start simulation');
      return;
    }
    setIsSimulating(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-display font-bold mb-8 text-center">
        Hunger Games Simulator
      </h1>

      {!isSimulating ? (
        <div className="space-y-8">
          <TributeForm onAddTribute={handleAddTribute} />
          <TributeList 
            tributes={tributes} 
            onRemoveTribute={handleRemoveTribute}
          />
          <div className="text-center">
            <button
              onClick={handleStartSimulation}
              disabled={tributes.length < 5}
              className="bg-primary hover:bg-primary-dark px-8 py-3 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Start Simulation
            </button>
          </div>
        </div>
      ) : (
        <SimulationControls tributes={tributes} />
      )}
    </div>
  );
}
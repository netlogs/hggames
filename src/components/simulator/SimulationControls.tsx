import React, { useState, useEffect } from 'react';
import { type Tribute, type Event } from '../../types/simulator';
import { generateEvent } from '../../utils/simulator';

interface SimulationControlsProps {
  tributes: Tribute[];
}

export default function SimulationControls({ tributes: initialTributes }: SimulationControlsProps) {
  const [tributes, setTributes] = useState(initialTributes);
  const [events, setEvents] = useState<Event[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [speed, setSpeed] = useState(1000); // milliseconds between events

  useEffect(() => {
    if (isComplete) return;

    const aliveTributes = tributes.filter(t => t.isAlive);
    if (aliveTributes.length <= 1) {
      setIsComplete(true);
      return;
    }

    const timer = setTimeout(() => {
      const event = generateEvent(tributes);
      if (event) {
        setEvents(prev => [...prev, event]);
        setTributes(event.updatedTributes);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [tributes, events, isComplete, speed]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          Tributes Remaining: {tributes.filter(t => t.isAlive).length}
        </h2>
        <select
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="bg-secondary-light px-4 py-2 rounded-lg"
        >
          <option value={2000}>Slow</option>
          <option value={1000}>Normal</option>
          <option value={500}>Fast</option>
        </select>
      </div>

      <div className="space-y-4">
        {events.map((event, index) => (
          <div 
            key={index}
            className="bg-secondary-light p-4 rounded-lg"
          >
            <p>{event.description}</p>
          </div>
        ))}
      </div>

      {isComplete && (
        <div className="bg-primary/10 border border-primary p-6 rounded-lg text-center">
          <h3 className="text-2xl font-display font-bold mb-2">
            Winner: {tributes.find(t => t.isAlive)?.name}
          </h3>
          <p className="text-white/80">
            Victory has been claimed in the Hunger Games!
          </p>
        </div>
      )}
    </div>
  );
}
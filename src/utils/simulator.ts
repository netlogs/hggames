import { type Tribute, type Event } from '../types/simulator';
import { eventGenerators } from './events/generators';

export function generateEvent(tributes: Tribute[]): Event | null {
  const aliveTributes = tributes.filter(t => t.isAlive);
  if (aliveTributes.length <= 1) return null;

  // Weighted probabilities for different event types
  const weights = {
    kill: 0.3,
    wound: 0.15,
    resource: 0.2,
    hazard: 0.15,
    alliance: 0.1,
    betrayal: 0.1
  };

  const random = Math.random();
  let sum = 0;
  let selectedType = '';

  for (const [type, weight] of Object.entries(weights)) {
    sum += weight;
    if (random <= sum) {
      selectedType = type;
      break;
    }
  }

  const generator = eventGenerators.find(g => g.type === selectedType);
  return generator ? generator.generate(tributes) : null;
}
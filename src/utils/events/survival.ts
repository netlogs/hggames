import { type EventTemplate } from './types';

export const survivalEvents: EventTemplate[] = [
  {
    type: 'resource',
    templates: [
      "{tribute} finds a hidden cache of supplies",
      "{tribute} discovers a water source",
      "{tribute} successfully hunts for food",
      "{tribute} creates a safe shelter",
      "{tribute} receives a sponsor gift"
    ]
  },
  {
    type: 'hazard',
    templates: [
      "{tribute} narrowly escapes a forest fire",
      "{tribute} gets caught in acid rain",
      "{tribute} falls into a trap but survives",
      "{tribute} suffers from dehydration",
      "{tribute} gets chased by mutant creatures"
    ]
  }
];
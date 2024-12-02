import { type EventTemplate } from './types';

export const socialEvents: EventTemplate[] = [
  {
    type: 'alliance',
    templates: [
      "{tribute1} and {tribute2} form an alliance",
      "{tribute1} shares supplies with {tribute2}",
      "{tribute1} helps {tribute2} hide from other tributes",
      "{tribute1} and {tribute2} agree to watch each other's backs",
      "{tribute1} saves {tribute2} from another tribute"
    ]
  },
  {
    type: 'betrayal',
    templates: [
      "{tribute1} betrays their alliance with {tribute2}",
      "{tribute1} steals supplies from {tribute2} during the night",
      "{tribute1} abandons {tribute2} during a dangerous situation",
      "{tribute1} reveals {tribute2}'s location to other tributes"
    ]
  }
];
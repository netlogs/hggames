import { type EventTemplate } from './types';

export const combatEvents: EventTemplate[] = [
  {
    type: 'kill',
    templates: [
      "{killer} kills {victim} with a throwing knife",
      "{killer} shoots an arrow through {victim}'s heart",
      "{killer} snaps {victim}'s neck",
      "{killer} pushes {victim} off a cliff",
      "{killer} sets a trap that kills {victim}",
      "{killer} poisons {victim}'s water supply",
      "{killer} ambushes {victim} during the night",
      "{killer} defeats {victim} in hand-to-hand combat",
      "{killer} uses a mace to eliminate {victim}",
      "{killer} throws a spear through {victim}"
    ]
  },
  {
    type: 'wound',
    templates: [
      "{attacker} injures {victim} but they manage to escape",
      "{attacker} and {victim} fight, both sustaining injuries",
      "{victim} barely survives an attack from {attacker}",
      "{attacker} leaves {victim} with a serious wound"
    ]
  }
];
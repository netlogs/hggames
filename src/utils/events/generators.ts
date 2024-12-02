import { type Tribute } from '../../types/simulator';
import { type EventGenerator, type EventResult } from './types';
import { combatEvents } from './combat';
import { survivalEvents } from './survival';
import { socialEvents } from './social';

function selectRandomTemplate(templates: string[]): string {
  return templates[Math.floor(Math.random() * templates.length)];
}

function selectRandomTribute(tributes: Tribute[]): Tribute {
  return tributes[Math.floor(Math.random() * tributes.length)];
}

export const eventGenerators: EventGenerator[] = [
  {
    type: 'kill',
    generate: (tributes: Tribute[]): EventResult | null => {
      const aliveTributes = tributes.filter(t => t.isAlive);
      if (aliveTributes.length <= 1) return null;

      const killer = selectRandomTribute(aliveTributes);
      const victim = selectRandomTribute(
        aliveTributes.filter(t => t.id !== killer.id)
      );

      const template = selectRandomTemplate(
        combatEvents.find(e => e.type === 'kill')?.templates || []
      );

      return {
        description: template
          .replace('{killer}', killer.name)
          .replace('{victim}', victim.name),
        updatedTributes: tributes.map(t => {
          if (t.id === victim.id) return { ...t, isAlive: false };
          if (t.id === killer.id) return { ...t, kills: t.kills + 1 };
          return t;
        })
      };
    }
  },
  {
    type: 'wound',
    generate: (tributes: Tribute[]): EventResult | null => {
      const aliveTributes = tributes.filter(t => t.isAlive);
      if (aliveTributes.length <= 1) return null;

      const attacker = selectRandomTribute(aliveTributes);
      const victim = selectRandomTribute(
        aliveTributes.filter(t => t.id !== attacker.id)
      );

      const template = selectRandomTemplate(
        combatEvents.find(e => e.type === 'wound')?.templates || []
      );

      return {
        description: template
          .replace('{attacker}', attacker.name)
          .replace('{victim}', victim.name),
        updatedTributes: tributes
      };
    }
  },
  {
    type: 'resource',
    generate: (tributes: Tribute[]): EventResult | null => {
      const aliveTributes = tributes.filter(t => t.isAlive);
      if (aliveTributes.length === 0) return null;

      const tribute = selectRandomTribute(aliveTributes);
      const template = selectRandomTemplate(
        survivalEvents.find(e => e.type === 'resource')?.templates || []
      );

      return {
        description: template.replace('{tribute}', tribute.name),
        updatedTributes: tributes
      };
    }
  },
  {
    type: 'hazard',
    generate: (tributes: Tribute[]): EventResult | null => {
      const aliveTributes = tributes.filter(t => t.isAlive);
      if (aliveTributes.length === 0) return null;

      const tribute = selectRandomTribute(aliveTributes);
      const template = selectRandomTemplate(
        survivalEvents.find(e => e.type === 'hazard')?.templates || []
      );

      return {
        description: template.replace('{tribute}', tribute.name),
        updatedTributes: tributes
      };
    }
  },
  {
    type: 'alliance',
    generate: (tributes: Tribute[]): EventResult | null => {
      const aliveTributes = tributes.filter(t => t.isAlive);
      if (aliveTributes.length <= 1) return null;

      const tribute1 = selectRandomTribute(aliveTributes);
      const tribute2 = selectRandomTribute(
        aliveTributes.filter(t => t.id !== tribute1.id)
      );

      const template = selectRandomTemplate(
        socialEvents.find(e => e.type === 'alliance')?.templates || []
      );

      return {
        description: template
          .replace('{tribute1}', tribute1.name)
          .replace('{tribute2}', tribute2.name),
        updatedTributes: tributes
      };
    }
  },
  {
    type: 'betrayal',
    generate: (tributes: Tribute[]): EventResult | null => {
      const aliveTributes = tributes.filter(t => t.isAlive);
      if (aliveTributes.length <= 1) return null;

      const tribute1 = selectRandomTribute(aliveTributes);
      const tribute2 = selectRandomTribute(
        aliveTributes.filter(t => t.id !== tribute1.id)
      );

      const template = selectRandomTemplate(
        socialEvents.find(e => e.type === 'betrayal')?.templates || []
      );

      return {
        description: template
          .replace('{tribute1}', tribute1.name)
          .replace('{tribute2}', tribute2.name),
        updatedTributes: tributes
      };
    }
  }
];
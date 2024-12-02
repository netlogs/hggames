import { type Tribute } from '../../types/simulator';

export interface EventTemplate {
  type: string;
  templates: string[];
}

export interface EventGenerator {
  type: string;
  generate: (tributes: Tribute[]) => EventResult | null;
}

export interface EventResult {
  description: string;
  updatedTributes: Tribute[];
}
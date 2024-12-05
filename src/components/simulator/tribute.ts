export interface Tribute {
    name: string;
    gender: string;
    isAlive: boolean;
    kills: number;
    events: string[];
    items: string[];
    weapons: string[];
    hasActed?: boolean;
    avatarUrl?: string;
  }
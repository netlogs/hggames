export interface Tribute {
  name: string;
  status: 'alive' | 'dead' | 'injuries';
  killnum: number;
  weapons: string[];
  items: string[];
  avatar: string;
  gender: 'Male' | 'Female';
  hasActed: boolean;
} 
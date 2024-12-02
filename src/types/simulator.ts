export interface Tribute {
  id: string;
  name: string;
  isAlive: boolean;
  kills: number;
  events: string[];
}

export interface Event {
  description: string;
  updatedTributes: Tribute[];
}
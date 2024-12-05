interface Tribute {
  name: string;
  gender: string;
  isAlive: boolean;
  kills: number;
  events: string[];
  items: string[];
  weapons: string[];
  hasActed?: boolean;
  avatar?: string; // Base64 string or URL
}

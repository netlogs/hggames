export interface GameEvent {
  text: string;
  tributes: {
    name: string;
    avatar: string;
  }[];
}

export interface Events {
  [key: string]: GameEvent[];
} 
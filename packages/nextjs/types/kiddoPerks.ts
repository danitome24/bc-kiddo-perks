export type Child = {
  id: number;
  name: string;
  avatar: string;
  tokens: number;
  progress?: { completed: number; total: number };
};

export type Perk = {
  id: number;
  name: string;
  cost: number;
  redeemedBy?: string[];
};

export type Task = {
  id: number;
  description: string;
  status?: string;
};

export type Activity = {
  id: number;
  description: string;
};

export type Child = {
  id: number;
  name: string;
  address: `0x${string}`;
  avatar: string;
  tokens: number;
  progress?: { completed: number; total: number };
};

export type Perk = {
  id: number;
  title: string;
  tokensRequired: bigint;
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

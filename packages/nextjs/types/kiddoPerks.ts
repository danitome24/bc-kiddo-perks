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
  title: string;
  tokensReward: bigint;
  status?: string;
};

export type Activity = {
  id: number;
  title: string;
};

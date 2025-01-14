export type Child = {
  id: number;
  name: string;
  address: `0x${string}`;
  removed: boolean;
  avatar: string;
};

export type Perk = {
  id: number;
  title: string;
  tokensRequired: bigint;
  removed: boolean;
  isRedeemed: boolean;
};

export type Task = {
  id: number;
  title: string;
  tokensReward: bigint;
  removed: boolean;
  status?: string;
};

export type Activity = {
  id: string;
  title: string;
  blockNumber: number;
  // timestamp: string;
};

export type CompletedTaskEvent = {
  by: string;
  completedTasksNumber: number;
  pendingTasksNumber: number;
};

export interface NftItem {
  id: string;
  image: string;
  name: string;
  description: string;
  isMinted: boolean;
  canBeMinted: boolean;
}

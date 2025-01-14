import { ContentHeader, PerksListGrid, TasksList, TasksProgress, TokensBalance } from ".";
import FiveTaskAchievedNFT from "../../../foundry/nfts/5TasksAchieved.svg";
import TenTaskAchievedNFT from "../../../foundry/nfts/10TasksAchieved.svg";
import TwentyTaskAchievedNFT from "../../../foundry/nfts/20TasksAchieved.svg";
import FiftyTaskAchievedNFT from "../../../foundry/nfts/50TasksAchieved.svg";
import HundredTaskAchievedNFT from "../../../foundry/nfts/100TasksAchieved.svg";
import { NftList } from "./ChildDashboard/NftList";
import { useAccount } from "wagmi";
import { useTaskManager, useTokenBalance } from "~~/hooks/kiddo-perks";

export const ChildDashboard = () => {
  const account = useAccount();
  const { fetchTasksBy } = useTaskManager();
  const { rawTokenBalance, formattedTokenBalance } = useTokenBalance(account.address || "");
  const { uniqueCompletedTasksNumber, totalCompletedTasks, pendingTasksNumber } = fetchTasksBy(account.address || "");

  return (
    <div className="p-6 min-h-screen">
      <ContentHeader
        title="Welcome, Sofia!"
        subtitle={
          <>
            You have <span className="text-secondary font-semibold text-2xl">{formattedTokenBalance} KDO</span> to
            spend!
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TasksProgress completed={uniqueCompletedTasksNumber} pending={pendingTasksNumber} />
        <TokensBalance balanceOf={account?.address || ""} />
      </div>
      <TasksList />
      <PerksListGrid childTokens={rawTokenBalance} />
      <NftList
        availableNfts={[
          {
            id: "1",
            image: FiveTaskAchievedNFT,
            name: "Shiny Star Badge",
            description: "You're a shining star! Earned by completing 5 tasks. Keep glowing!",
            isMinted: false,
            canBeMinted: totalCompletedTasks >= 5,
          },
          {
            id: "2",
            image: TenTaskAchievedNFT,
            name: "Task Hero Medal",
            description: "Wow! You're a true hero for finishing 10 tasks. Keep saving the day!",
            isMinted: false,
            canBeMinted: totalCompletedTasks >= 10,
          },
          {
            id: "3",
            image: TwentyTaskAchievedNFT,
            name: "Super Helper Trophy",
            description: "For helping out 20 times! You're officially a super helper. Great job!",
            isMinted: false,
            canBeMinted: totalCompletedTasks >= 20,
          },
          {
            id: "4",
            image: FiftyTaskAchievedNFT,
            name: "Legendary Champion Crown",
            description: "You’re unstoppable! Earned by completing 50 tasks. All hail the champion!",
            isMinted: false,
            canBeMinted: totalCompletedTasks >= 50,
          },
          {
            id: "5",
            image: HundredTaskAchievedNFT,
            name: "Ultimate Helper Cape",
            description: "100 tasks completed?! You're now the ultimate helper! Time to fly high!",
            isMinted: false,
            canBeMinted: totalCompletedTasks >= 100,
          },
        ]}
        onMint={nftId => {
          console.log(`Minting NFT with ID: ${nftId}`);
        }}
      />
    </div>
  );
};

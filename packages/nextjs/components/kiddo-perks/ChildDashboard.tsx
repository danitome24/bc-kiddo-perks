import { ContentHeader, PerksListGrid, TasksList, TasksProgress, TokensBalance } from ".";
import { NftList } from "./ChildDashboard/NftList";
import { useAccount } from "wagmi";
import { useTaskManager, useTokenBalance } from "~~/hooks/kiddo-perks";

export const ChildDashboard = () => {
  const account = useAccount();
  const { fetchTasksBy } = useTaskManager();
  const { rawTokenBalance, formattedTokenBalance } = useTokenBalance(account.address || "");
  const { completedTasksNumber, pendingTasksNumber } = fetchTasksBy(account.address || "");

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
        <TasksProgress completed={completedTasksNumber} pending={pendingTasksNumber} />
        <TokensBalance balanceOf={account?.address || ""} />
      </div>
      <TasksList />
      <PerksListGrid childTokens={rawTokenBalance} />
      <NftList
        availableNfts={[
          {
            id: "1",
            image: "/images/nft1.png",
            name: "Super Star NFT",
            description: "A special NFT for completing 5 tasks.",
            cost: 10,
            isMinted: false,
            canBeMinted: true,
          },
          {
            id: "2",
            image: "/images/nft2.png",
            name: "Task Master",
            description: "Awarded for completing all tasks this week.",
            cost: 20,
            isMinted: false,
            canBeMinted: false,
          },
          {
            id: "3",
            image: "/images/nft3.png",
            name: "Legendary Helper",
            description: "Given to children who help every day for a month.",
            cost: 50,
            isMinted: true,
            canBeMinted: false,
          },
        ]}
        onMint={nftId => {
          console.log(`Minting NFT with ID: ${nftId}`);
        }}
      />
    </div>
  );
};

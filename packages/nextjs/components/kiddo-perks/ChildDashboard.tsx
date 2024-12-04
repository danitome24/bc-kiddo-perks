import { ContentHeader, PerksListGrid, TasksList, TasksProgress, TokensBalance } from ".";
import { useAccount } from "wagmi";
import { useTokenBalance } from "~~/hooks/kiddo-perks";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export const ChildDashboard = () => {
  const account = useAccount();
  const { rawTokenBalance, formattedTokenBalance } = useTokenBalance(account.address || "");

  const { data: taskNextId } = useScaffoldReadContract({
    contractName: "KiddoPerks",
    functionName: "s_taskNextId",
  });

  const completedTasks = 1; //TODO temporary number.
  const totalTasks = taskNextId ? Number(taskNextId) : 0;
  const pendingTasks = totalTasks - completedTasks;

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
        <TasksProgress completed={completedTasks} pending={pendingTasks} />

        <TokensBalance />
      </div>

      <TasksList />

      <PerksListGrid childTokens={rawTokenBalance} />
    </div>
  );
};

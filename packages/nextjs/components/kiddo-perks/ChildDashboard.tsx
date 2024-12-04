import { ContentHeader, PerksListGrid, TasksList, TasksProgress, TokensBalance } from ".";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export const ChildDashboard = () => {
  const account = useAccount();
  const { data: tokensBalance } = useScaffoldReadContract({
    contractName: "KDOToken",
    functionName: "balanceOf",
    args: [account.address],
  });
  const childTokens = Number(tokensBalance) ?? 0;

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
            You have <span className="text-secondary font-semibold text-2xl">{childTokens / 10 ** 18} tokens</span> to
            spend!
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TasksProgress completed={completedTasks} pending={pendingTasks} />

        <TokensBalance />
      </div>

      <TasksList />

      <PerksListGrid childTokens={childTokens} />
    </div>
  );
};

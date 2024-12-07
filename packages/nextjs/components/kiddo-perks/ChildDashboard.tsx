import { ContentHeader, PerksListGrid, TasksList, TasksProgress, TokensBalance } from ".";
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
    </div>
  );
};

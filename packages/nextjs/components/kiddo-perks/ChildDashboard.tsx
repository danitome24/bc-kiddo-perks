import { ContentHeader, PerksListGrid, TasksList, TasksProgress, TokensBalance } from ".";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export const ChildDashboard = () => {
  const currentTokens = 120 * 10 ** 18;
  const completedTasks = 1;

  const { data: totalTasks } = useScaffoldReadContract({
    contractName: "KiddoPerks",
    functionName: "tasksLength",
  });

  const pendingTasks = Number(totalTasks) - completedTasks;

  return (
    <div className="p-6 min-h-screen">
      <ContentHeader
        title="Welcome, Sofia!"
        subtitle={
          <>
            You have <span className="text-secondary font-semibold text-2xl">{currentTokens / 10 ** 18} tokens</span> to
            spend!
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TasksProgress completed={completedTasks} pending={pendingTasks} />

        <TokensBalance tokens={currentTokens} />
      </div>

      <TasksList />

      <PerksListGrid childTokens={currentTokens} />
    </div>
  );
};

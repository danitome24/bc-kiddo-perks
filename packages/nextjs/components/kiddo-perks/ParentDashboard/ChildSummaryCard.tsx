import Image from "next/image";
import { useTaskManager, useTokenBalance } from "~~/hooks/kiddo-perks";
import { Child } from "~~/types/kiddoPerks";

type ChildSummaryCardProps = {
  child: Child;
  totalTasks: number;
};

export const ChildSummaryCard = ({ child, totalTasks }: ChildSummaryCardProps) => {
  const { formattedTokenBalance } = useTokenBalance(child.address);
  const { fetchTasksBy } = useTaskManager();
  const taskByChild = fetchTasksBy(child.address);

  return (
    <div className="card bg-primary shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <Image className="w-16 h-16 rounded-full" width={90} height={90} src="/childAvatar.png" alt={child.name} />
          {child.name}
        </h2>
        <p className="text-lg text-right m-0">{formattedTokenBalance} KDO</p>
        <p className="m-0">
          Tasks completed: {taskByChild.completedTasksNumber}/{totalTasks?.toString()}
        </p>

        <div className="card-actions justify-end">
          <button className="btn btn-secondary btn-sm">See child</button>
        </div>
      </div>
    </div>
  );
};

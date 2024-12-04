import Image from "next/image";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { Child } from "~~/types/kiddoPerks";

type ChildSummaryCardProps = {
  child: Child;
};

export const ChildSummaryCard = ({ child }: ChildSummaryCardProps) => {
  const completedTasks = child.progress ? child.progress?.completed : 0;
  const { data: taskNextId } = useScaffoldReadContract({
    contractName: "KiddoPerks",
    functionName: "s_taskNextId",
  });

  const totalTasks = Number(taskNextId) - 1;

  return (
    <div className="card bg-primary shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <Image className="w-16 h-16 rounded-full" width={90} height={90} src="/childAvatar.png" alt={child.name} />
          {child.name}
        </h2>
        <p className="text-lg text-right m-0">{child.tokens ?? "-"} KDO</p>
        <p className="m-0">
          Tasks completed: {completedTasks}/{totalTasks?.toString()}
        </p>

        <div className="card-actions justify-end">
          <button className="btn btn-secondary btn-sm">See child</button>
        </div>
      </div>
    </div>
  );
};

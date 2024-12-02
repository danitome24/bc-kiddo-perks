import Image from "next/image";
import { Child } from "~~/types/kiddoPerks";

type ChildSummaryCardProps = {
  child: Child;
};

export const ChildSummaryCard = ({ child }: ChildSummaryCardProps) => {
  const completedTasks = child.progress ? child.progress?.completed : 0;
  const totalTasks = child.progress ? child.progress?.completed : 0;

  return (
    <div className="card bg-primary shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <Image className="w-16 h-16 rounded-full" width={90} height={90} src="/childAvatar.png" alt={child.name} />
          {child.name}
        </h2>
        <p className="text-lg text-right m-0">{child.tokens ?? "-"} KDO</p>
        <p className="m-0">
          Tasks completed: {completedTasks}/{totalTasks}
        </p>

        <div className="card-actions justify-end">
          <button className="btn btn-secondary btn-sm">See child</button>
        </div>
      </div>
    </div>
  );
};

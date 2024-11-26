import Image from "next/image";
import { Child } from "~~/types/kiddoPerks";

type ChildSummaryCardProps = {
  child: Child;
};

export const ChildSummaryCard = ({ child }: ChildSummaryCardProps) => {
  return (
    <div className="card bg-primary w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <Image className="w-16 h-16 rounded-full" width={90} height={90} src={child.avatar} alt={child.name} />
          {child.name}
        </h2>
        <p className="text-lg text-right m-0">{child.tokens} KDO</p>
        <progress
          className="progress progress-neutral"
          value={child.progress?.completed}
          max={child.progress?.total}
        ></progress>
        <div className="card-actions justify-end">
          <button className="btn btn-secondary btn-sm">See child</button>
        </div>
      </div>
    </div>
  );
};

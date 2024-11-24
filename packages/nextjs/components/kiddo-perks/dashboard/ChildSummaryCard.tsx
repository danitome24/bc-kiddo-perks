import Image from "next/image";
import { Child } from "~~/types/kiddoPerks";

type ChildSummaryCardProps = {
  child: Child;
};

export const ChildSummaryCard = ({ child }: ChildSummaryCardProps) => {
  return (
    <div key={child.id} className="bg-secondary shadow-md rounded-lg p-4">
      <div className="flex items-center gap-4">
        <Image className="w-16 h-16 rounded-full" width={90} height={90} src={child.avatar} alt={child.name} />
        <div>
          <h3 className="text-lg font-bold ">{child.name}</h3>
          <p className="text-sm ">{child.tokens} KDO</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center w-36">
          <progress
            className="progress progress-primary"
            value={child.progress?.completed}
            max={child.progress?.total}
          ></progress>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button className="btn btn-primary btn-sm">See details</button>
      </div>
    </div>
  );
};

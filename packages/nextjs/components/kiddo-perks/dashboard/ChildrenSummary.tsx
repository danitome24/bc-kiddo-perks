import { ChildSummaryCard } from "./ChildSummaryCard";
import { Child } from "~~/types/kiddoPerks";

type ChildrenSummaryProps = {
  childrenData: Child[];
};

export const ChildrenSummary = ({ childrenData }: ChildrenSummaryProps) => {
  return (
    <section className="">
      <h2 className="text-lg font-semibold text-primary-content mb-4">Children Status</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {childrenData.map(child => (
          <ChildSummaryCard key={child.id} child={child} />
        ))}
      </div>
    </section>
  );
};

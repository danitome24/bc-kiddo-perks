import { ChildSummaryCard } from "./ChildSummaryCard";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { Child } from "~~/types/kiddoPerks";

export const ChildrenSummary = () => {
  const { data: childrenData } = useScaffoldReadContract({
    contractName: "KiddoPerks",
    functionName: "getAllChildren",
  }) as { data: Child[] | undefined };

  if (childrenData == undefined) {
    return <section>Loading...</section>;
  }

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

import { ChildrenSummary, ContentHeader, PerksSummary, RecentActivitySummary } from "./";
import { Child, Perk, Task } from "~~/types/kiddoPerks";

type DashboardProps = {
  childrenData: Child[];
  perks: Perk[];
  activities: Task[];
};

export const ParentDashboard = ({ childrenData, perks, activities }: DashboardProps) => {
  return (
    <div className="px-8 py-16">
      <ContentHeader
        title="Welcome daddy/mommy 👋"
        subtitle="Track your child's progress, manage tasks, and approve rewards with ease."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChildrenSummary childrenData={childrenData} />
        <PerksSummary perks={perks} />
      </div>

      <RecentActivitySummary activities={activities} />
    </div>
  );
};

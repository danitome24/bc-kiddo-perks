import { ChildrenSummary, DashboardBanner, PerksSummary, TasksSummary } from "./";
import { Child, Perk, Task } from "~~/types/kiddoPerks";

type DashboardProps = {
  childrenData: Child[];
  perks: Perk[];
  activities: Task[];
};

export const ParentDashboard = ({ childrenData, perks, activities }: DashboardProps) => {
  return (
    <div className="px-8 py-16">
      <DashboardBanner childrenLength={childrenData.length} tasksLength={activities.length} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChildrenSummary childrenData={childrenData} />
        <PerksSummary perks={perks} />
      </div>

      <TasksSummary tasks={activities} />
    </div>
  );
};

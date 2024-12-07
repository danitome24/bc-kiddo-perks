import Link from "next/link";
import { ChildSummaryCard } from "./ChildSummaryCard";
import { useChildManager, useTaskManager } from "~~/hooks/kiddo-perks";

export const ChildrenSummary = () => {
  const { children } = useChildManager();
  const { tasks } = useTaskManager();

  const totalTasks = tasks?.filter(tasks => tasks.removed == false).length as number;

  if (children == undefined) {
    return <section>Loading...</section>;
  }

  if (children.length === 0) {
    return (
      <section>
        <h2 className="text-lg font-semibold text-primary-content mb-4">Children Status</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col justify-center items-center bg-primary rounded-xl py-4 px-8">
            <p className="text-center  w-full h-full">Add a child</p>
            <Link className="btn-sm btn btn-success" href="/children">
              Go
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-lg font-semibold text-primary-content mb-4">Children Status</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children.map(child => (
          <ChildSummaryCard key={child.id} child={child} totalTasks={totalTasks} />
        ))}
      </div>
    </section>
  );
};

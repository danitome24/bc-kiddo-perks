import { useTaskManager } from "~~/hooks/kiddo-perks/useTasksManager";

export const TasksList = () => {
  const { tasks } = useTaskManager();

  if (tasks.length === 0) {
    return (
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
        <div className="bg-primary shadow-md rounded-lg divide-y divide-base">
          <p className="py-8 px-4 text-center">No tasks to be done</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
      <div className="bg-primary shadow-md rounded-lg divide-y divide-base">
        {tasks.map(task => (
          <div key={task.id} className="p-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">{task.title}</h3>
              <p className="text-sm font-semibold text-warning">Pending</p>
            </div>
            <button className="btn btn-success text-sm text-success-content hover:underline">Mark as Done</button>
          </div>
        ))}
      </div>
    </section>
  );
};

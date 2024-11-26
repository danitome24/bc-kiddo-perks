import { Task } from "~~/types/kiddoPerks";

type TasksListProps = {
  tasks: Task[];
};

export const TasksList = ({ tasks }: TasksListProps) => {
  return (
    <section className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
      <div className="bg-primary shadow-md rounded-lg divide-y divide-base">
        {tasks.map(task => (
          <div key={task.id} className="p-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">{task.description}</h3>
              <p className={`text-sm font-semibold ${task.status === "Pending" ? "text-warning" : "text-success"}`}>
                {task.status}
              </p>
            </div>
            {task.status === "Pending" && (
              <button className="btn btn-success text-sm text-success-content hover:underline">Mark as Done</button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

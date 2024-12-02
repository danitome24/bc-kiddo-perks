type TasksProgressProps = {
  completed: number;
  pending: number;
};

export const TasksProgress = ({ completed, pending }: TasksProgressProps) => {
  const progressInPercentage = (completed / (completed + pending)) * 100;

  return (
    <section className="bg-primary shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Your Progress</h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm ">Tasks Completed</p>
          <p className="text-xl font-bold text-success">{completed}</p>
        </div>
        <div>
          <p className="text-sm ">Tasks Pending</p>
          <p className="text-xl font-bold text-warning">{pending}</p>
        </div>
      </div>
      <div className="mt-4 bg-gray-100 rounded-full h-4">
        <div className="bg-green-500 h-4 rounded-full" style={{ width: progressInPercentage + "%" }}></div>
      </div>
    </section>
  );
};

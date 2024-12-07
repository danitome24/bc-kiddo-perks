import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { Task } from "~~/types/kiddoPerks";

type TaskCardProps = {
  task: Task;
};

export const TaskCard = ({ task }: TaskCardProps) => {
  const account = useAccount();

  const { data: isTaskCompleted } = useScaffoldReadContract({
    contractName: "KiddoPerks",
    functionName: "s_completedTasksByUser",
    args: [account.address, BigInt(task.id)],
  });

  return (
    <div key={task.id} className="p-4 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-medium">{task.title}</h3>
        <p className={`text-sm font-semibold ${isTaskCompleted ? "text-success" : "text-warning"}`}>
          {isTaskCompleted ? "Completed" : "Pending"}{" "}
        </p>
      </div>
      {/* <button className="btn btn-success text-sm text-success-content hover:underline">Mark as Done</button> */}
    </div>
  );
};

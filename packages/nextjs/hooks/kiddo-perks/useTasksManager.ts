import { useEffect, useState } from "react";
import { useScaffoldEventHistory, useScaffoldReadContract, useScaffoldWriteContract } from "../scaffold-eth";
import { Child, CompletedTaskEvent, Task } from "~~/types/kiddoPerks";
import { notification } from "~~/utils/scaffold-eth";

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const { data: currentTasks } = useScaffoldReadContract({
    contractName: "KiddoPerks",
    functionName: "getAllTasks",
  });
  const { writeContractAsync: writeKiddoPerksContract } = useScaffoldWriteContract("KiddoPerks");

  useEffect(() => {
    if (currentTasks) {
      const formattedTasks = currentTasks
        .filter(task => !task.removed)
        .map(task => ({
          id: Number(task.id),
          title: task.title,
          removed: task.removed,
          tokensReward: task.tokensReward,
        }));
      setTasks(formattedTasks);
    }
  }, [currentTasks]);

  const addTask = async (title: string, tokensReward: bigint) => {
    await writeKiddoPerksContract({
      functionName: "createTask",
      args: [title, tokensReward],
    });
    setTasks([...tasks, { id: tasks.length + 1, title, removed: false, tokensReward }]);
  };

  const removeTask = async (id: number) => {
    await writeKiddoPerksContract({
      functionName: "removeTask",
      args: [BigInt(id)],
    });
    setTasks(tasks.filter(task => task.id !== id));
  };

  const completeTaskBy = async (taskId: number, by: Child) => {
    await writeKiddoPerksContract({
      functionName: "completeTask",
      args: [BigInt(taskId), by.address],
    });
    notification.success(`Task completed by: ${by.name}`);
  };

  const fetchTasksBy = (by: string): CompletedTaskEvent => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: events } = useScaffoldEventHistory({
      contractName: "KiddoPerks",
      eventName: "TaskCompleted",
      fromBlock: 0n,
      watch: true,
      filters: { by: by },
    }); // TODO: solve lint error, cannot use custom hook here!

    const uniqueCompletedTaskIds = new Set<number>(events?.map((event: any) => Number(event.args.taskId)) || []);
    const uniqueCompletedTasks = tasks.filter(task => uniqueCompletedTaskIds.has(task.id));
    const pendingTasks = tasks.filter(task => !uniqueCompletedTaskIds.has(task.id));

    const totalCompletedTasks = events?.length || 0;

    const completedTasksEvent: CompletedTaskEvent = {
      by,
      uniqueCompletedTasksNumber: uniqueCompletedTasks.length,
      pendingTasksNumber: pendingTasks.length,
      totalCompletedTasks,
    };

    return completedTasksEvent;
  };

  return { tasks, addTask, removeTask, completeTaskBy, fetchTasksBy };
};

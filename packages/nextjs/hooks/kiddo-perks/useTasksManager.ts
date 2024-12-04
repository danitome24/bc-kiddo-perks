import { useEffect, useState } from "react";
import { useScaffoldReadContract, useScaffoldWriteContract } from "../scaffold-eth";
import { Child, Task } from "~~/types/kiddoPerks";
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

  return { tasks, addTask, removeTask, completeTaskBy };
};

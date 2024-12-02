"use client";

import { useEffect, useState } from "react";
import { NextPage } from "next";
import { CrossButton } from "~~/components/kiddo-perks";
import { IntegerInput } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { Child, Task } from "~~/types/kiddoPerks";

const TasksPage: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: "", tokensReward: BigInt(0) });

  const { writeContractAsync: writeKiddoPerksContract } = useScaffoldWriteContract("KiddoPerks");

  const { data: children } = useScaffoldReadContract({
    contractName: "KiddoPerks",
    functionName: "getAllChildren",
  }) as { data: Child[] | undefined };

  const { data: currentTasks } = useScaffoldReadContract({
    contractName: "KiddoPerks",
    functionName: "getAllTasks",
  });

  useEffect(() => {
    if (currentTasks != undefined) {
      const formattedTasks = currentTasks.map((task, i) => {
        return {
          id: i,
          title: task.title,
          tokensReward: task.tokensReward,
        };
      });

      setTasks([...formattedTasks]);
    }
  }, [currentTasks]);

  const handleAddTask = async () => {
    if (!newTask.title) return;
    try {
      await writeKiddoPerksContract({
        functionName: "createTask",
        args: [newTask.title, newTask.tokensReward],
      });
      setTasks([...tasks, { id: tasks.length + 1, title: newTask.title, tokensReward: newTask.tokensReward }]);
      setNewTask({ title: "", tokensReward: BigInt(0) });
    } catch (e) {
      console.error("Error on adding new task:", e);
    }
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="px-8 py-16 bg-primary-300 flex justify-center">
      <div className="items-center">
        <div className="flex flex-col justify-center items-center mb-5">
          <h1 className="text-2xl font-bold text-primary-content">Welcome, Mommy/Daddy! 👋</h1>
          <p className="justify-center">Tasks Management</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Current Tasks</h2>
            {tasks.length == 0 && (
              <div className="grid grid-cols-1">
                <div className="bg-secondary shadow-md rounded-lg text-center p-4">
                  <p>Add your first task!</p>
                </div>
              </div>
            )}
            {tasks.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tasks.map(task => (
                  <div
                    key={task.id}
                    className="flex flex-col bg-secondary shadow-md rounded-lg p-4 gap-4 justify-between"
                  >
                    <div className="flex flex-row justify-between">
                      <h3 className="text-normal font-medium content-center">{task.title}</h3>
                      <CrossButton onClickEvent={() => handleDeleteTask(task.id)} />
                    </div>
                    <div className="flex flex-row">
                      <p className="text-sm m-0">
                        Tokens reward: <span className="font-bold text-lg">{Number(task.tokensReward) / 10 ** 18}</span>{" "}
                        KDO
                      </p>
                    </div>
                    <div className="">
                      <label className="form-control w-full max-w-xs">
                        <div className="label">
                          <span className="label-text">Who completed the task?</span>
                        </div>
                        <select className="bg-secondary select select-bordered">
                          <option disabled selected>
                            Pick one
                          </option>
                          {children && children.map(child => <option key={child.id}>{child.name}</option>)}
                        </select>
                      </label>
                      <div className="mt-5">
                        <button className="btn btn-primary">Completed by</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
          <section>
            <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
            <div className="grid gap-4 bg-secondary rounded-lg shadow-md p-4">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">New Task Name?</span>
                </div>
                <input
                  type="text"
                  placeholder="Task description"
                  value={newTask.title}
                  onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                  className="input input-bordered w-full max-w-xs bg-transparent"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Tokens reward</span>
                </div>
                <IntegerInput
                  value={newTask.tokensReward}
                  onChange={newTokensReward => setNewTask({ ...newTask, tokensReward: BigInt(newTokensReward) })}
                />
              </label>
              <button onClick={handleAddTask} className="btn btn-success">
                Add Task
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;

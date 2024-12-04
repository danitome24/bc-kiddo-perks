"use client";

import { useState } from "react";
import { NextPage } from "next";
import { TaskCard } from "~~/components/kiddo-perks/TaskCard";
import { IntegerInput } from "~~/components/scaffold-eth";
import { useChildManager } from "~~/hooks/kiddo-perks/useChildManager";
import { useTaskManager } from "~~/hooks/kiddo-perks/useTasksManager";
import { Child } from "~~/types/kiddoPerks";

const TasksPage: NextPage = () => {
  const [newTask, setNewTask] = useState({ title: "", tokensReward: BigInt(0) });

  const { children } = useChildManager();
  const { tasks, addTask, removeTask, completeTaskBy } = useTaskManager();

  const handleAddTask = async () => {
    if (!newTask.title) return;
    try {
      addTask(newTask.title, newTask.tokensReward);
      setNewTask({ title: "", tokensReward: BigInt(0) });
    } catch (e) {
      console.error("Error on adding new task:", e);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      removeTask(id);
    } catch (e) {
      console.error("Error on removing task:", e);
    }
  };

  const handleCompleteTaskBy = async (taskId: number, by: Child) => {
    try {
      completeTaskBy(taskId, by);
    } catch (e) {
      console.error("Error on completing task: ", e);
    }
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
                  <TaskCard
                    key={task.id}
                    task={task}
                    childrenData={children}
                    onDelete={handleDeleteTask}
                    onCompleteBy={handleCompleteTaskBy}
                  />
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

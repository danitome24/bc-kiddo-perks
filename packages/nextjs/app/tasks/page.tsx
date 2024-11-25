"use client";

import { useState } from "react";
import { mockChildrenData, mockTasks } from "../data/mockData";
import { NextPage } from "next";
import { CrossButton } from "~~/components/kiddo-perks";
import { Task } from "~~/types/kiddoPerks";

const TasksPage: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const [newTask, setNewTask] = useState({ description: "" });

  const handleAddTask = () => {
    if (!newTask.description) return;
    setTasks([...tasks, { id: tasks.length + 1, description: newTask.description }]);
    setNewTask({ description: "" });
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks.map(task => (
                <div
                  key={task.id}
                  className="flex flex-col bg-secondary shadow-md rounded-lg p-4 gap-4 justify-between"
                >
                  <div className="flex flex-row justify-between">
                    <h3 className="text-normal font-medium content-center">{task.description}</h3>
                    <CrossButton onClickEvent={() => handleDeleteTask(task.id)} />
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
                        {mockChildrenData.map(child => (
                          <option key={child.id}>{child.name}</option>
                        ))}
                      </select>
                    </label>
                    <div className="mt-5">
                      <button className="btn btn-primary">Complete by</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
                  value={newTask.description}
                  onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                  className="input input-bordered w-full max-w-xs bg-transparent"
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

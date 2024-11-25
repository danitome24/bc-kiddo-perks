"use client";

import { useState } from "react";
import Image from "next/image";
import { mockChildrenData } from "../data/mockData";
import { NextPage } from "next";
import { CrossButton } from "~~/components/kiddo-perks";
import { Child } from "~~/types/kiddoPerks";

const ChildPage: NextPage = () => {
  const [children, setChildren] = useState<Child[]>(mockChildrenData);

  const [newChild, setNewChild] = useState<Child>({
    id: 0,
    name: "",
    avatar: "",
    tokens: 0,
  });

  const handleAddChild = () => {
    if (!newChild.name) return;
    setChildren([...children, { ...newChild, id: children.length + 1, tokens: 0 }]);
    setNewChild({ id: 0, name: "", avatar: "", tokens: 0 });
  };

  const handleDeleteChild = (id: number) => {
    setChildren(children.filter(child => child.id !== id));
  };

  return (
    <div className="px-8 py-16 flex justify-center">
      <div className=" items-center">
        <div className="flex flex-col justify-center items-center mb-5">
          <h1 className="text-2xl font-bold text-primary-content">Welcome, Mommy/Daddy! 👋</h1>
          <p className="justify-center">Add, edit, or delete child profiles and track their progress.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Current Children</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {children.map(child => (
                <div key={child.id} className="bg-secondary shadow-md rounded-lg p-4 flex items-start gap-4">
                  <Image
                    className="w-16 h-16 rounded-full"
                    width={36}
                    height={36}
                    src={"/childAvatar.png"}
                    alt={child.name}
                  />
                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold ">{child.name}</h3>
                    <p className="text-sm ">KDP: {child.tokens}</p>
                  </div>
                  <div className="ml-auto">
                    <CrossButton onClickEvent={() => handleDeleteChild(child.id)}></CrossButton>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">Add New Child</h2>
            <form
              className="bg-secondary shadow-md rounded-lg p-4 flex flex-col gap-4"
              onSubmit={e => {
                e.preventDefault();
                handleAddChild();
              }}
            >
              <div>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">New Child Name?</span>
                  </div>
                  <input
                    type="text"
                    id="name"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs bg-transparent"
                    value={newChild.name}
                    onChange={e => setNewChild({ ...newChild, name: e.target.value })}
                  />
                </label>
              </div>
              <button type="submit" className="btn btn-success">
                Add Child
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ChildPage;

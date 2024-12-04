"use client";

import { useEffect, useState } from "react";
import { NextPage } from "next";
import { ChildCard } from "~~/components/kiddo-perks/ChildCard";
import { AddressInput } from "~~/components/scaffold-eth";
import { useFetchChildren } from "~~/hooks/kiddo-perks/useFetchChildren";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { Child } from "~~/types/kiddoPerks";

const ChildPage: NextPage = () => {
  const { writeContractAsync: writeKiddoPerksContract } = useScaffoldWriteContract("KiddoPerks");

  const [children, setChildren] = useState<Child[]>([]);

  const [newChild, setNewChild] = useState<Child>({
    id: 0,
    name: "",
    address: "0x0",
    removed: false,
    avatar: "",
  });

  const childrenData = useFetchChildren();

  useEffect(() => {
    setChildren([...childrenData]);
  }, [childrenData]);

  const handleAddChild = async () => {
    if (!newChild.name) return;
    try {
      await writeKiddoPerksContract({
        functionName: "addChild",
        args: [newChild.name, newChild.address as `0x${string}`],
      });

      setChildren([...children, { ...newChild, id: children.length + 1 }]);
      setNewChild({ id: 0, name: "", address: "0x0", removed: false, avatar: "" });
    } catch (e) {
      console.error("Error adding new child: ", e);
    }
  };

  const handleDeleteChild = async (id: number) => {
    try {
      await writeKiddoPerksContract({
        functionName: "removeChild",
        args: [BigInt(id)],
      });
      setChildren(children.filter(child => child.id !== id));
    } catch (e) {
      console.error("Error removing a child: ", e);
    }
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
            {children.length === 0 && (
              <div className="grid grid-cols-1">
                <div className="bg-secondary shadow-md rounded-lg p-4 text-center gap-4">Add your first child</div>
              </div>
            )}
            {children.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                {children.map(child => (
                  <ChildCard key={child.id} child={child} handleDeleteChild={handleDeleteChild} />
                ))}
              </div>
            )}
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
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Child address</span>
                  </div>
                  <AddressInput
                    value={newChild.address}
                    onChange={newValue => setNewChild({ ...newChild, address: newValue as `0x${string}` })}
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

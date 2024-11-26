"use client";

import { useState } from "react";
import { mockPerks } from "../data/mockData";
import { NextPage } from "next";
import { PerkCard } from "~~/components/kiddo-perks";
import { Perk } from "~~/types/kiddoPerks";

const PerksPage: NextPage = () => {
  const [perks, setPerks] = useState<Perk[]>(mockPerks);

  const [newPerk, setNewPerk] = useState({ name: "", cost: 0 });

  const handleAddPerk = () => {
    if (!newPerk.name || newPerk.cost <= 0) return;
    setPerks([...perks, { id: perks.length + 1, name: newPerk.name, cost: newPerk.cost }]);
    setNewPerk({ name: "", cost: 0 });
  };

  const handleDeletePerk = (id: number) => {
    setPerks(perks.filter(perk => perk.id !== id));
  };

  return (
    <div className="px-8 py-16 flex justify-center items-center">
      <div className="items-center">
        <div className="flex flex-col justify-center items-center mb-5">
          <h1 className="text-2xl font-bold text-primary-content">Welcome, Mommy/Daddy! 👋</h1>
          <p className="justify-center">Perks Management</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Current Perks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {perks.map(perk => (
                <PerkCard key={perk.id} onDelete={handleDeletePerk} perk={perk} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">Add New Perk</h2>
            <div className="grid gap-4 bg-secondary rounded-lg shadow-md p-4">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">New Perk Name?</span>
                </div>
                <input
                  type="text"
                  placeholder="Perk description"
                  value={newPerk.name}
                  onChange={e => setNewPerk({ ...newPerk, name: e.target.value })}
                  className="input input-bordered w-full max-w-xs bg-transparent"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Cost</span>
                </div>

                <input
                  type="number"
                  placeholder="KDP tokens required"
                  value={newPerk.cost}
                  onChange={e => setNewPerk({ ...newPerk, cost: Number(e.target.value) })}
                  className="input input-bordered w-full max-w-xs bg-transparent"
                />
              </label>
              <button onClick={handleAddPerk} className="btn btn-success">
                Add Perk
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PerksPage;

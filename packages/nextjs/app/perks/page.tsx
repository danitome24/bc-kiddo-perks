"use client";

import { useState } from "react";
import { NextPage } from "next";
import { PerkCard } from "~~/components/kiddo-perks";
import { IntegerInput } from "~~/components/scaffold-eth";
import { usePerksManager } from "~~/hooks/kiddo-perks";

const PerksPage: NextPage = () => {
  const [newPerk, setNewPerk] = useState({ title: "", tokensRequired: BigInt(0) });

  const { perks, addPerk, removePerk } = usePerksManager();

  const handleAddPerk = async () => {
    if (!newPerk.title || newPerk.tokensRequired <= 0) return;
    try {
      await addPerk(newPerk.title, newPerk.tokensRequired);
      setNewPerk({ title: "", tokensRequired: BigInt(0) });
    } catch (e) {
      console.error("Error creating new Perk");
    }
  };

  const handleRemovePerk = async (id: number) => {
    try {
      await removePerk(id);
    } catch (e) {
      console.error("Error on remove Perks:", e);
    }
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
            {perks.length == 0 && (
              <div className="grid grid-cols-1 bg-secondary rounded-lg p-4 text-center">
                <p>Add your first perk!</p>
              </div>
            )}

            {perks.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {perks.map(perk => (
                  <PerkCard key={perk.id} onDelete={handleRemovePerk} perk={perk} />
                ))}
              </div>
            )}
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
                  value={newPerk.title}
                  onChange={e => setNewPerk({ ...newPerk, title: e.target.value })}
                  className="input input-bordered w-full max-w-xs bg-transparent"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Cost (Pay attention at decimals)</span>
                </div>

                <IntegerInput
                  value={BigInt(newPerk.tokensRequired)}
                  onChange={updatedCost => setNewPerk({ ...newPerk, tokensRequired: BigInt(updatedCost) })}
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

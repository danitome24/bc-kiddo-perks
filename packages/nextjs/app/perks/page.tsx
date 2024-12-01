"use client";

import { useEffect, useState } from "react";
import { NextPage } from "next";
import { PerkCard } from "~~/components/kiddo-perks";
import { IntegerInput } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { Perk } from "~~/types/kiddoPerks";

const PerksPage: NextPage = () => {
  const { writeContractAsync: writeKiddoPerksContract } = useScaffoldWriteContract("KiddoPerks");
  const [perks, setPerks] = useState<Perk[]>([]);
  const [newPerk, setNewPerk] = useState({ title: "", tokensRequired: BigInt(0) });

  // Data Fetching
  const { data: currentPerks } = useScaffoldReadContract({
    contractName: "KiddoPerks",
    functionName: "getAllPerks",
  });

  useEffect(() => {
    if (currentPerks != undefined) {
      const fetchedPerks = currentPerks.map((perk, i) => {
        return {
          id: i, // Provisional
          title: perk.title,
          tokensRequired: perk.tokensRequired,
        } as Perk;
      });
      setPerks([...fetchedPerks]);
    }
  }, [currentPerks]);

  // Handle data
  const handleAddPerk = async () => {
    if (!newPerk.title || newPerk.tokensRequired <= 0) return;
    try {
      await writeKiddoPerksContract({
        functionName: "createPerk",
        args: [newPerk.title, BigInt(newPerk.tokensRequired)],
      });
      setPerks([
        ...perks,
        { id: perks.length + 1, title: newPerk.title, tokensRequired: BigInt(newPerk.tokensRequired) },
      ]);
      setNewPerk({ title: "", tokensRequired: BigInt(0) });
    } catch (e) {
      console.error("Error creating new Perk");
    }
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

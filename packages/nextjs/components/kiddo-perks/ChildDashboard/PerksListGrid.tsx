import { useEffect, useState } from "react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { Perk } from "~~/types/kiddoPerks";

type PerksListGridProps = {
  childTokens: number;
};

export const PerksListGrid = ({ childTokens }: PerksListGridProps) => {
  const [perks, setPerks] = useState<Perk[]>([]);

  const { data: currentPerks } = useScaffoldReadContract({
    contractName: "KiddoPerks",
    functionName: "getAllPerks",
  });

  useEffect(() => {
    if (currentPerks != undefined) {
      const perks = currentPerks
        .filter(perk => perk.removed == false)
        .map((perk, i) => {
          return {
            id: i,
            title: perk.title,
            removed: perk.removed,
            tokensRequired: BigInt(perk.tokensRequired),
          };
        });
      setPerks([...perks]);
    }
  }, [currentPerks]);

  if (perks.length === 0) {
    return (
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Available Perks</h2>
        <div className="bg-secondary shadow-md rounded-lg divide-y divide-base">
          <p className="py-8 px-4 text-center">No perks available yet</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Available Perks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {perks.map(perk => (
          <div key={perk.id} className="bg-secondary shadow-md rounded-lg p-4 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium ">{perk.title}</h3>
              <p className="text-xs text-gray-600">Cost: {Number(perk.tokensRequired) / 10 ** 18} KDO</p>
            </div>
            {perk.redeemedBy ? (
              <span className="text-xs bg-base px-2 py-1 rounded-full">Redeemed</span>
            ) : childTokens >= Number(perk.tokensRequired) ? (
              <button className="btn btn-primary">Redeem</button>
            ) : (
              <span className="text-xs bg-accent text-accent-content px-2 py-1 rounded-full">Not Enough Points</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

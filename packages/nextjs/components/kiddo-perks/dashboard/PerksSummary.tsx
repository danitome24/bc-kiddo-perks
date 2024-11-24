import { Perk } from "~~/types/kiddoPerks";

type PerksSummaryProps = {
  perks: Perk[];
};

export const PerksSummary = ({ perks }: PerksSummaryProps) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Available perks</h2>
      <div className="bg-secondary rounded-xl py-4 px-8 grid grid-cols-1 gap-4">
        {perks.map(perk => (
          <div key={perk.id} className="text-center px-4 py-2 border-solid border-2 border-primary rounded-xl">
            <h3 className="text-lg font-bold">{perk.name}</h3>
            <p className="text-sm">Cost: {perk.cost} KDO</p>
          </div>
        ))}
      </div>
    </div>
  );
};

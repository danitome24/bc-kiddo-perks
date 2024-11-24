import { Perk } from "~~/types/kiddoPerks";

type PerksSummaryProps = {
  perks: Perk[];
};

export const PerksSummary = ({ perks }: PerksSummaryProps) => {
  return (
    <section className="bg-secondary rounded-xl py-6 px-12">
      <h2 className="text-lg font-semibold mb-4">Available perks</h2>
      <div className="grid grid-cols-1 gap-4">
        {perks.map(perk => (
          <div key={perk.id} className="p-4 border-solid border-2 border-primary rounded-xl">
            <h3 className="text-lg font-bold">{perk.name}</h3>
            <p className="text-sm">
              Cost: <strong>{perk.cost} KDO</strong>
            </p>
            <button className="btn btn-success">Redeem now</button>
          </div>
        ))}
      </div>
    </section>
  );
};

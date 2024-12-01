import { Perk } from "~~/types/kiddoPerks";

type PerksListGridProps = {
  perks: Perk[];
  childTokens: number;
};

export const PerksListGrid = ({ perks, childTokens }: PerksListGridProps) => {
  return (
    <section className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Available Perks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {perks.map(perk => (
          <div key={perk.id} className="bg-secondary shadow-md rounded-lg p-4 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-gray-800">{perk.title}</h3>
              <p className="text-xs text-gray-600">Cost: {Number(perk.tokensRequired) / 10 ** 18} KDO</p>
            </div>
            {perk.redeemedBy ? (
              <span className="text-xs bg-base text-gray-800 px-2 py-1 rounded-full">Redeemed</span>
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

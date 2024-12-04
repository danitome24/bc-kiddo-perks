import Link from "next/link";
import { usePerksManager } from "~~/hooks/kiddo-perks";

export const PerksSummary = () => {
  const { perks } = usePerksManager();

  if (perks == undefined) {
    return <section>Loading...</section>;
  }

  if (perks.length === 0) {
    return (
      <div>
        <h2 className="text-lg font-semibold mb-4">Available perks</h2>
        <div className="flex flex-col justify-center items-center bg-secondary rounded-xl py-4 px-8">
          <p className="text-center  w-full h-full">Add a perk</p>
          <Link className="btn-sm btn btn-success" href="/perks">
            Go
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Available perks</h2>
      <div className="bg-secondary rounded-xl py-4 px-8 grid grid-cols-1 gap-4">
        {perks
          .filter(perk => perk.removed == false)
          .map(perk => (
            <div key={perk.id} className="text-center px-4 py-2 border-solid border-2 border-primary rounded-xl">
              <h3 className="text-lg font-bold">{perk.title}</h3>
              <p className="text-sm">Cost: {Number(perk.tokensRequired) / 10 ** 18} KDO</p>
            </div>
          ))}
      </div>
    </div>
  );
};

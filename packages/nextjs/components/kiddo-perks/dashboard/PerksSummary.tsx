import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { Perk } from "~~/types/kiddoPerks";

export const PerksSummary = () => {
  const { data: perks } = useScaffoldReadContract({
    contractName: "KiddoPerks",
    functionName: "getAllPerks",
  }) as { data: Perk[] | undefined };

  if (perks == undefined) {
    return <section>Loading...</section>;
  }
  console.log(perks);
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Available perks</h2>
      <div className="bg-secondary rounded-xl py-4 px-8 grid grid-cols-1 gap-4">
        {perks.map(perk => (
          <div key={perk.id} className="text-center px-4 py-2 border-solid border-2 border-primary rounded-xl">
            <h3 className="text-lg font-bold">{perk.title}</h3>
            <p className="text-sm">Cost: {Number(perk.tokensRequired) / 10 ** 18} KDO</p>
          </div>
        ))}
      </div>
    </div>
  );
};

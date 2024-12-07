import { PerkRedeemCard } from "./PerkRedeemCard";
import { usePerksManager } from "~~/hooks/kiddo-perks";
import { useDeployedContractInfo, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { Perk } from "~~/types/kiddoPerks";

type PerksListGridProps = {
  childTokens: number;
};

export const PerksListGrid = ({ childTokens }: PerksListGridProps) => {
  const { writeContractAsync: writeTokenContractAsync } = useScaffoldWriteContract("KDOToken");
  const { data: kiddoPerksContractInfo } = useDeployedContractInfo("KiddoPerks");

  const { perks, redeemPerk } = usePerksManager();

  const handleRedeemPerk = async (perk: Perk) => {
    await writeTokenContractAsync({
      functionName: "approve",
      args: [kiddoPerksContractInfo?.address, BigInt(perk.tokensRequired)],
    });
    await redeemPerk(perk.id);
  };

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {perks.map(perk => (
          <PerkRedeemCard key={perk.id} perk={perk} childTokens={childTokens} handleRedeemPerk={handleRedeemPerk} />
        ))}
      </div>
    </section>
  );
};

import { useEffect, useState } from "react";
import { useScaffoldReadContract, useScaffoldWriteContract } from "../scaffold-eth";
import { Perk } from "~~/types/kiddoPerks";

export const usePerksManager = () => {
  const [perks, setPerks] = useState<Perk[]>([]);
  const { writeContractAsync: writeKiddoPerksContract } = useScaffoldWriteContract("KiddoPerks");

  const { data: currentPerks } = useScaffoldReadContract({
    contractName: "KiddoPerks",
    functionName: "getAllPerks",
  });

  useEffect(() => {
    if (currentPerks) {
      const parsedPerks = currentPerks
        .filter(perk => perk.removed == false)
        .map(
          perk =>
            ({
              id: Number(perk.id),
              title: perk.title,
              removed: perk.removed,
              tokensRequired: perk.tokensRequired,
            } as Perk),
        );

      setPerks([...parsedPerks]);
    }
  }, [currentPerks]);

  const addPerk = async (title: string, tokensRequired: bigint) => {
    await writeKiddoPerksContract({
      functionName: "createPerk",
      args: [title, BigInt(tokensRequired)],
    });
    setPerks([...perks, { id: perks.length + 1, title, removed: false, tokensRequired }]);
  };

  const removePerk = async (perkId: number) => {
    await writeKiddoPerksContract({
      functionName: "removePerk",
      args: [BigInt(perkId)],
    });
    setPerks(perks.filter(perk => perk.id !== perkId));
  };

  return { perks, addPerk, removePerk };
};

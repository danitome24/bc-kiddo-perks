import { useEffect, useState } from "react";
import { ContentHeader, PerksListGrid, TasksList, TasksProgress, TokensBalance } from ".";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { Perk } from "~~/types/kiddoPerks";

export const ChildDashboard = () => {
  const currentTokens = 120 * 10 ** 18;
  const [perks, setPerks] = useState<Perk[]>([]);

  const { data: currentPerks } = useScaffoldReadContract({
    contractName: "KiddoPerks",
    functionName: "getAllPerks",
  });

  useEffect(() => {
    if (currentPerks != undefined) {
      const perks = currentPerks.map((perk, i) => {
        return {
          id: i,
          title: perk.title,
          tokensRequired: BigInt(perk.tokensRequired),
        };
      });
      setPerks([...perks]);
    }
  }, [currentPerks]);

  return (
    <div className="p-6 min-h-screen">
      <ContentHeader
        title="Welcome, Sofia!"
        subtitle={
          <>
            You have <span className="text-secondary font-semibold text-2xl">{currentTokens / 10 ** 18} tokens</span> to
            spend!
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TasksProgress completed={5} pending={3} />

        <TokensBalance tokens={currentTokens} />
      </div>

      <TasksList />

      <PerksListGrid perks={perks} childTokens={currentTokens} />
    </div>
  );
};

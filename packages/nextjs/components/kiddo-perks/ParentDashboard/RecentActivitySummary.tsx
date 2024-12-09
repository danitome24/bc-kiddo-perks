import { useEffect, useState } from "react";
import Image from "next/image";
import { useChildManager, usePerksManager } from "~~/hooks/kiddo-perks";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";
import { Activity } from "~~/types/kiddoPerks";

export const RecentActivitySummary = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  const { perks } = usePerksManager();
  const { children } = useChildManager();

  const { data: perkRedeemedEvents } = useScaffoldEventHistory({
    contractName: "KiddoPerks",
    eventName: "PerkRedeemed",
    fromBlock: 0n,
    watch: true,
    blockData: true,
    transactionData: true,
    receiptData: true,
  });

  const { data: tokenMintedEvents } = useScaffoldEventHistory({
    contractName: "KiddoPerks",
    eventName: "TaskCompleted",
    fromBlock: 0n,
    watch: true,
    blockData: true,
    transactionData: true,
    receiptData: true,
  });

  useEffect(() => {
    const perkRedeemedActivities = (perkRedeemedEvents || []).map(event => ({
      id: event.transaction?.transactionHash,
      title: `Perk ${perks.find(perk => perk.id === Number(event.args.perkId))?.title} redeemed by ${
        children.find(child => child.address === event.args.by)?.name
      }`,
      // @ts-ignore
      blockNumber: Number(event.blockNumber),
    }));

    const tokenMintedActivities = (tokenMintedEvents || []).map(event => ({
      id: event.transaction?.transactionHash, // Si tienes un identificador único en el evento, úsalo aquí
      title: `Task ${event.args.title} was completed by ${
        children.find(child => child.address === event.args.by)?.name
      }`,
      // @ts-ignore
      blockNumber: Number(event.blockNumber),
    }));

    setActivities([...perkRedeemedActivities, ...tokenMintedActivities].sort((a, b) => a.blockNumber + b.blockNumber));
  }, [perkRedeemedEvents, tokenMintedEvents, children, perks]);

  return (
    <section className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Recent Activity Summary</h2>
      {activities.length == 0 && (
        <div className="bg-secondary shadow-md rounded-lg divide-y divide-gray-200">
          <p className="p-4 text-center">No activity yet</p>
        </div>
      )}

      {activities.length > 0 && (
        <ul className="bg-secondary shadow-md rounded-lg divide-y divide-gray-200">
          {activities.map(activity => (
            <li key={activity.id} className="flex items-start p-4">
              <Image
                className="w-16 h-16 rounded-full"
                width={90}
                height={90}
                src={"/childAvatar.png"}
                alt="Child image"
              />

              <div className="ml-4">
                <p className="text-sm ">{activity.title}</p>
                <p>{activity.blockNumber}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { Perk } from "~~/types/kiddoPerks";

type PerkRedeemCardProps = {
  perk: Perk;
  childTokens: number;
  handleRedeemPerk: (perk: Perk) => void;
};

export const PerkRedeemCard = ({ perk, childTokens, handleRedeemPerk }: PerkRedeemCardProps) => {
  const account = useAccount();
  const { data: isRedeemed } = useScaffoldReadContract({
    contractName: "KiddoPerks",
    functionName: "s_perksRedeemedBy",
    args: [BigInt(perk.id), account.address],
  });

  return (
    <div key={perk.id} className="bg-secondary shadow-md rounded-lg p-4 flex justify-between items-center">
      <div>
        <h3 className="text-sm font-medium ">{perk.title}</h3>
        <p className="text-xs text-gray-600">Cost: {Number(perk.tokensRequired) / 10 ** 18} KDO</p>
      </div>
      {isRedeemed ? (
        <span className="text-xs bg-base px-2 py-1 rounded-full">Redeemed</span>
      ) : childTokens >= Number(perk.tokensRequired) ? (
        <button onClick={() => handleRedeemPerk(perk)} className="btn btn-primary">
          Redeem
        </button>
      ) : (
        <span className="text-xs bg-accent text-accent-content px-2 py-1 rounded-full">Not Enough Points</span>
      )}
    </div>
  );
};

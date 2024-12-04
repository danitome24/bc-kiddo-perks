import { useAccount } from "wagmi";
import { useTokenBalance } from "~~/hooks/kiddo-perks/useTokenBalance";

export const TokensBalance = () => {
  const account = useAccount();
  const { formattedTokenBalance } = useTokenBalance(account.address || "");
  return (
    <section className="bg-secondary shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Your Tokens</h2>
      <div className="text-center">
        <p className="text-3xl font-bold text-primary">{formattedTokenBalance}</p>
        <p className="text-sm ">Current Tokens</p>
      </div>
    </section>
  );
};

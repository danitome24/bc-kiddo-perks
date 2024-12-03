import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export const TokensBalance = () => {
  const account = useAccount();
  const { data: userTokenBalance } = useScaffoldReadContract({
    contractName: "KDOToken",
    functionName: "balanceOf",
    args: [account.address],
  });

  let tokensBalance = 0;
  if (userTokenBalance != undefined) {
    tokensBalance = Number(userTokenBalance) / 10 ** 18;
  }

  return (
    <section className="bg-secondary shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Your Tokens</h2>
      <div className="text-center">
        <p className="text-3xl font-bold text-primary">{tokensBalance}</p>
        <p className="text-sm ">Current Tokens</p>
      </div>
    </section>
  );
};

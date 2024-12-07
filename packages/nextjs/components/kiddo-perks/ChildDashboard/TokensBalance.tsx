import { useTokenBalance } from "~~/hooks/kiddo-perks/useTokenBalance";

type TokensBalanceProps = {
  balanceOf: string;
};

export const TokensBalance = ({ balanceOf }: TokensBalanceProps) => {
  const { formattedTokenBalance } = useTokenBalance(balanceOf);
  return (
    <section className="bg-secondary shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Your Tokens</h2>
      <div className="text-center">
        <p className="text-3xl font-bold text-primary">{formattedTokenBalance}</p>
        <p className="text-sm ">KDO</p>
      </div>
    </section>
  );
};

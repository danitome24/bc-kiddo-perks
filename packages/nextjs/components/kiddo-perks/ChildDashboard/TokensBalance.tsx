type TokensBalanceProps = {
  tokens: number;
};

export const TokensBalance = ({ tokens }: TokensBalanceProps) => {
  const tokensBalance = tokens / 10 ** 18;
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

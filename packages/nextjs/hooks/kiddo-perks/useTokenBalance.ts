import { useScaffoldReadContract } from "../scaffold-eth";
import { Address } from "abitype";

export const useTokenBalance = (address: Address) => {
  const { data: userTokenBalance } = useScaffoldReadContract({
    contractName: "KDOToken",
    functionName: "balanceOf",
    args: [address],
  });

  const rawTokenBalance = Number(userTokenBalance);
  const formattedTokenBalance = Number(userTokenBalance) / 10 ** 18;

  return { rawTokenBalance, formattedTokenBalance };
};

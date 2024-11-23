import { useMemo } from "react";
import { useScaffoldReadContract } from "../scaffold-eth";
import { useAccount } from "wagmi";

export const useIsParent = () => {
  const { address: connectedAddress } = useAccount();
  const { data: parentAddress } = useScaffoldReadContract({
    contractName: "KiddoPerks",
    functionName: "parent",
  });

  const isParent = useMemo(
    () => parentAddress && parentAddress === connectedAddress,
    [parentAddress, connectedAddress],
  );

  return isParent;
};

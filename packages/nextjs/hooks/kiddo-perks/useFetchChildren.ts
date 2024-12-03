import { useScaffoldReadContract } from "../scaffold-eth";
import { Child } from "~~/types/kiddoPerks";

export const useFetchChildren = (): Child[] => {
  const { data: children } = useScaffoldReadContract({
    contractName: "KiddoPerks",
    functionName: "getAllChildren",
  });

  if (children == undefined) {
    return [];
  }

  return children.map((child, i) => {
    return {
      id: i,
      name: child.name,
      address: child.childAddr,
      avatar: "childAvatar.png",
      tokens: BigInt(0),
    } as Child;
  });
};

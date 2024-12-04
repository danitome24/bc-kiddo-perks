import { useMemo } from "react";
import { useScaffoldReadContract } from "../scaffold-eth";
import { Child } from "~~/types/kiddoPerks";

export const useFetchChildren = (): Child[] => {
  const { data: children } = useScaffoldReadContract({
    contractName: "KiddoPerks",
    functionName: "getAllChildren",
  });

  const processedChildren = useMemo(() => {
    if (!children) return [];

    return children
      .filter(child => child.removed === false)
      .map(
        (child, i) =>
          ({
            id: i,
            name: child.name,
            address: child.childAddr,
            avatar: "childAvatar.png",
          } as Child),
      );
  }, [children]);

  return processedChildren;
};

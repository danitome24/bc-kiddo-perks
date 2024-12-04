import { useEffect, useState } from "react";
import { useScaffoldReadContract, useScaffoldWriteContract } from "../scaffold-eth";
import { Child } from "~~/types/kiddoPerks";

export const useChildManager = () => {
  const [children, setChildren] = useState<Child[]>([]);
  const { writeContractAsync: writeKiddoPerksContract } = useScaffoldWriteContract("KiddoPerks");

  const { data: childrenData } = useScaffoldReadContract({
    contractName: "KiddoPerks",
    functionName: "getAllChildren",
  });

  useEffect(() => {
    if (childrenData) {
      const parsedChildren = childrenData
        .filter(child => child.removed == false)
        .map(
          child =>
            ({
              id: Number(child.id),
              name: child.name,
              address: child.childAddr,
              avatar: "childAvatar.png",
              removed: false,
            } as Child),
        );

      setChildren([...parsedChildren]);
    }
  }, [childrenData]);

  const addChild = async (name: string, address: `0x${string}`) => {
    await writeKiddoPerksContract({
      functionName: "addChild",
      args: [name, address],
    });

    setChildren([...children, { id: children.length + 1, name, address, avatar: "childAvatar.png", removed: false }]);
  };

  const removeChild = async (childId: number) => {
    await writeKiddoPerksContract({
      functionName: "removeChild",
      args: [BigInt(childId)],
    });
    setChildren(children.filter(child => child.id !== childId));
  };

  return { children, addChild, removeChild };
};

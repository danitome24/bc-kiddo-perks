import Image from "next/image";
import { Address } from "../scaffold-eth";
import { CrossButton } from "./CrossButton";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { Child } from "~~/types/kiddoPerks";

type ChildCardProps = {
  child: Child;
  handleDeleteChild: (id: number) => void;
};

export const ChildCard = ({ child, handleDeleteChild }: ChildCardProps) => {
  const { data: currentTokenBalance } = useScaffoldReadContract({
    contractName: "KDOToken",
    functionName: "balanceOf",
    args: [child.address],
  });

  const normalizedTokenBalance = Number(currentTokenBalance) / 10 ** 18;

  return (
    <div key={child.id} className="bg-secondary shadow-md rounded-lg p-4 flex items-start gap-4">
      <Image className="w-16 h-16 rounded-full" width={36} height={36} src={"/childAvatar.png"} alt={child.name} />
      <div className="flex flex-col">
        <h3 className="text-lg font-bold ">{child.name}</h3>
        <p className="text-sm m-0">KDP: {normalizedTokenBalance}</p>
        <Address format="short" size="xs" address={child.address}></Address>
      </div>
      <div className="ml-auto">
        <CrossButton onClickEvent={() => handleDeleteChild(child.id)}></CrossButton>
      </div>
    </div>
  );
};

import Image from "next/image";
import { Address } from "../scaffold-eth";
import { CrossButton } from "./CrossButton";
import { useTokenBalance } from "~~/hooks/kiddo-perks";
import { Child } from "~~/types/kiddoPerks";

type ChildCardProps = {
  child: Child;
  handleDeleteChild: (id: number) => void;
};

export const ChildCard = ({ child, handleDeleteChild }: ChildCardProps) => {
  const { formattedTokenBalance } = useTokenBalance(child.address);

  return (
    <div key={child.id} className="bg-secondary shadow-md rounded-lg p-4 flex items-start gap-4">
      <Image className="w-16 h-16 rounded-full" width={36} height={36} src={"/childAvatar.png"} alt={child.name} />
      <div className="flex flex-col">
        <h3 className="text-lg font-bold ">{child.name}</h3>
        <p className="text-sm m-0">KDP: {formattedTokenBalance}</p>
        <Address format="short" size="xs" address={child.address}></Address>
      </div>
      <div className="ml-auto">
        <CrossButton onClickEvent={() => handleDeleteChild(child.id)}></CrossButton>
      </div>
    </div>
  );
};

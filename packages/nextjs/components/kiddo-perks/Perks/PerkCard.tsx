import { CrossButton } from "../CrossButton";
import { Perk } from "~~/types/kiddoPerks";

type PerkCardProps = {
  perk: Perk;
  onDelete: (id: number) => void;
};

export const PerkCard = ({ perk, onDelete }: PerkCardProps) => {
  const cost = Number(perk.tokensRequired) / 1000000000000000000;
  return (
    <div className="card bg-secondary w-96 shadow-xl">
      <div className="card-body">
        <div className="card-actions justify-end">
          <CrossButton onClickEvent={() => onDelete(perk.id)}></CrossButton>
        </div>
        <h3 className="text-lg font-medium">{perk.title}</h3>
        <p className="text-sm m-0">Cost: {cost.toString()} KDO</p>
      </div>
    </div>
  );
};

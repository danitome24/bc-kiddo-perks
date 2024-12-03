import { useState } from "react";
import { CrossButton } from "./CrossButton";
import { Child, Task } from "~~/types/kiddoPerks";
import { notification } from "~~/utils/scaffold-eth";

type TaskCardProps = {
  task: Task;
  childrenData: Child[];
  onDelete: (id: number) => void;
  onCompleteBy: (taskId: number, by: Child) => void;
};

export const TaskCard = ({ task, childrenData, onDelete, onCompleteBy }: TaskCardProps) => {
  const [completedBy, setCompletedBy] = useState<Child | undefined>();

  const handleOnCompleteBy = () => {
    if (completedBy == undefined) {
      notification.error("Select one child");
    } else {
      onCompleteBy(task.id, completedBy);
    }
  };

  return (
    <div key={task.id} className="flex flex-col bg-secondary shadow-md rounded-lg p-4 gap-4 justify-between">
      <div className="flex flex-row justify-between">
        <h3 className="text-normal font-medium content-center">{task.title}</h3>
        <CrossButton onClickEvent={() => onDelete(task.id)} />
      </div>
      <div className="flex flex-row">
        <p className="text-sm m-0">
          Tokens reward: <span className="font-bold text-lg">{Number(task.tokensReward) / 10 ** 18}</span> KDO
        </p>
      </div>
      <div className="">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Who completed the task?</span>
          </div>
          <select
            className="bg-secondary select select-bordered"
            onChange={e => setCompletedBy(childrenData.find(child => child.id == Number(e.target.value)))}
          >
            <option disabled selected>
              Pick one
            </option>
            {childrenData &&
              childrenData.map(child => (
                <option key={child.id} value={child.id}>
                  {child.name}
                </option>
              ))}
          </select>
        </label>
        <div className="mt-5">
          <button className="btn btn-primary" onClick={handleOnCompleteBy}>
            Completed by
          </button>
        </div>
      </div>
    </div>
  );
};

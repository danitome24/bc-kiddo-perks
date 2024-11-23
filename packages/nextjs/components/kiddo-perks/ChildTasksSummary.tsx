import Image from "next/image";

export const ChildTasksSummary = () => {
  return (
    <div className="flex flex-col gap-4 border-solid border-2 border-black rounded-md bg-secondary p-4">
      <div className="flex flex-row justify-center items-center">
        <Image src="/childAvatar.png" width={64} height={64} alt="Child picture" className="w-16 h-16 rounded-full" />
        <h4 className="px-4 font-semibold">Anna</h4>
      </div>
      <div className="flex flex-col px-8">
        <p className="my-1 text-lg font-semibold">
          Tokens: <span className="text-base font-normal">1220</span>
        </p>
        <p className="my-1 text-lg font-semibold">
          Tasks completed: <span className="text-base font-normal">1/10</span>
        </p>
        <p className="my-1 text-lg font-semibold">
          Perks redeemed: <span className="text-base font-normal">4/10</span>
        </p>
        <button className="btn btn-success btn-sm font-normal gap-1 mt-7">See child</button>
      </div>
    </div>
  );
};

"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const { data: parentAddress } = useScaffoldReadContract({
    contractName: "KiddoPerks",
    functionName: "parent",
  });

  const isParent = parentAddress != undefined && parentAddress == connectedAddress;

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">KiddoPerks</span>
          </h1>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            {isParent && <p>Hey Daddy!</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

"use client";

import { useMemo } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { ChildDashboard, ParentDashboard, Section, SectionGrow } from "~~/components/kiddo-perks/";
import { HeroBanner } from "~~/components/kiddo-perks/HeroBanner";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const { data: parentAddress } = useScaffoldReadContract({
    contractName: "KiddoPerks",
    functionName: "parent",
  });

  const isParent = useMemo(
    () => parentAddress && parentAddress === connectedAddress,
    [parentAddress, connectedAddress],
  );

  const dashboardToDisplay = isParent ? <ParentDashboard /> : <ChildDashboard />;

  if (parentAddress === undefined) {
    return (
      <>
        <Section>
          <HeroBanner title="KiddoPerks" subtitle="Welcome to" />
        </Section>
        <SectionGrow>Loading...</SectionGrow>
      </>
    );
  }

  return (
    <>
      <Section>
        <HeroBanner title="KiddoPerks" subtitle="Welcome to" />
      </Section>
      <SectionGrow>{dashboardToDisplay}</SectionGrow>
    </>
  );
};

export default Home;

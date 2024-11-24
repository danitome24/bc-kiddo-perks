"use client";

import { mockChildrenData, mockPerks, mockTasks } from "./data/mockData";
import type { NextPage } from "next";
import { ChildDashboard, ParentDashboard, Section, SectionGrow } from "~~/components/kiddo-perks/";
import { HeroBanner } from "~~/components/kiddo-perks/HeroBanner";
import { useIsParent } from "~~/hooks/kiddo-perks";

const Home: NextPage = () => {
  const isParent = useIsParent();

  const dashboardToDisplay = isParent ? (
    <ParentDashboard childrenData={mockChildrenData} perks={mockPerks} activities={mockTasks} />
  ) : (
    <ChildDashboard />
  );

  if (isParent === undefined) {
    return (
      <>
        <Section>
          <HeroBanner title="KiddoPerks" subtitle="" />
        </Section>
        <SectionGrow>Loading...</SectionGrow>
      </>
    );
  }

  return <SectionGrow>{dashboardToDisplay}</SectionGrow>;
};

export default Home;

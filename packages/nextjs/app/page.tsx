"use client";

import { mockPerks, mockTasksHistory } from "./data/mockData";
import type { NextPage } from "next";
import { ChildDashboard, ParentDashboard, SectionGrow } from "~~/components/kiddo-perks/";
import { useIsParent } from "~~/hooks/kiddo-perks";

const Home: NextPage = () => {
  const isParent = useIsParent();

  const dashboardToDisplay = isParent ? (
    <ParentDashboard perks={mockPerks} activities={mockTasksHistory} />
  ) : (
    <ChildDashboard />
  );

  if (isParent === undefined) {
    return (
      <>
        <SectionGrow>Loading...</SectionGrow>
      </>
    );
  }

  return <SectionGrow>{dashboardToDisplay}</SectionGrow>;
};

export default Home;

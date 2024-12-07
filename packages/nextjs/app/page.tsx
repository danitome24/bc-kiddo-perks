"use client";

import type { NextPage } from "next";
import { ChildDashboard, ParentDashboard, SectionGrow } from "~~/components/kiddo-perks/";
import { useIsParent } from "~~/hooks/kiddo-perks";

const Home: NextPage = () => {
  const isParent = useIsParent();

  const dashboardToDisplay = isParent ? <ParentDashboard /> : <ChildDashboard />;

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

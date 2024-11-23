"use client";

import type { NextPage } from "next";
import { ChildDashboard, ParentDashboard, Section, SectionGrow } from "~~/components/kiddo-perks/";
import { HeroBanner } from "~~/components/kiddo-perks/HeroBanner";
import { useIsParent } from "~~/hooks/kiddo-perks";

const Home: NextPage = () => {
  const isParent = useIsParent();

  const welcomeSubtitle = isParent ? "Hey daddy/mommy!" : "Yo buddy";

  const dashboardToDisplay = isParent ? <ParentDashboard /> : <ChildDashboard />;

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

  return (
    <>
      <Section>
        <HeroBanner title="KiddoPerks" subtitle={welcomeSubtitle} />
      </Section>
      <SectionGrow>{dashboardToDisplay}</SectionGrow>
    </>
  );
};

export default Home;

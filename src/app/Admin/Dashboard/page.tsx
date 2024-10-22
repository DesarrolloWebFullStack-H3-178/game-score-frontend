'use client';

import React from "react";
import LeaderboardPage from "game-score-frontend/app/Users/Scores/page";
import Section1 from "game-score-frontend/Components/Molecules/Sections/Section1";
import Section2 from "game-score-frontend/Components/Molecules/Sections/Section2";
import Section3 from "game-score-frontend/Components/Molecules/Sections/Section3";
import Section4 from "game-score-frontend/Components/Molecules/Sections/Section4";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-wrap">
        <Section1 />
        <Section2 />
      </div>
      <div className="flex flex-wrap mt-4">
        <Section3 />
        <Section4 />
      </div>
      <LeaderboardPage />
    </>
  );
}

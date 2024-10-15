'use client';

import React from "react";
import LeaderboardPage from "game-score-frontend/app/Users/Scores/page";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 min-h-5">
          {/* <CardLineChart /> */}
          Section 1 tables
        </div>
        <div className="w-full xl:w-4/12 px-4 min-h-5">
          {/* <CardBarChart /> */}
          Section 2 Line Charts
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 min-h-5">
          {/* <CardPageVisits /> */}
          Section 3 Bar Charts
        </div>
        <div className="w-full xl:w-4/12 px-4 min-h-5">
          {/* <CardSocialTraffic /> */}
          Section 4 High Scores
        </div>
      </div>
      <LeaderboardPage />
    </>
  );
}

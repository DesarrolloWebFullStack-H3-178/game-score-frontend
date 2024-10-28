'use client';

import FooterAdmin from 'game-score-frontend/Components/Footers/FooterAdmin';
import HeaderStats from 'game-score-frontend/Components/Headers/HeaderStats';
import AdminNavbar from 'game-score-frontend/Components/Organisms/Navbars/AdminNavbar';
import Sidebar from 'game-score-frontend/Components/Organisms/Navbars/SidebarAdminComponentOrganism';
/* import Section1 from "game-score-frontend/Components/Molecules/Sections/Section1";
import Section2 from "game-score-frontend/Components/Molecules/Sections/Section2";
import Section3 from "game-score-frontend/Components/Molecules/Sections/Section3";
import Section4 from "game-score-frontend/Components/Molecules/Sections/Section4"; */
import React from 'react';

export default function DashboardComponentTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {/* <div className="flex flex-wrap">
            <Section1 />
            <Section2 />
          </div> */}
          {/* <div className="flex flex-wrap mt-4">
            <Section3 />
            <Section4 />
          </div> */}
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}

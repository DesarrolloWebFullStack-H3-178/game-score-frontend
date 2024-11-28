'use client';

import FooterAdmin from 'game-score-frontend/Components/Footers/FooterAdmin';
import HeaderStats from 'game-score-frontend/Components/Headers/HeaderStats';
import AdminNavbar from 'game-score-frontend/Components/Organisms/Navbars/AdminNavbar';
import Sidebar from 'game-score-frontend/Components/Organisms/Navbars/SidebarAdminComponentOrganism';
import React from 'react';
/* import Section1 from "game-score-frontend/Components/Molecules/Sections/Section1";
import Section2 from "game-score-frontend/Components/Molecules/Sections/Section2";
import Section3 from "game-score-frontend/Components/Molecules/Sections/Section3";
import Section4 from "game-score-frontend/Components/Molecules/Sections/Section4"; */

export default function DashboardComponentTemplate({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <div
        className="absolute top-0 w-full min-h-screen bg-gray-800"
        style={{
          backgroundImage: "url('../../../img/register_bg_2.png')",
          backgroundSize: "cover",
          backgroundAttachment: "fixed", // Esto mantiene el fondo fijo
        }}
      >
        <div className="relative md:ml-64">
          <AdminNavbar />
          <HeaderStats />
          <div className="px-4 md:px-10 mx-auto w-full">
            {children}
            <FooterAdmin />
          </div>
        </div>
      </div>
    </>
  );
}

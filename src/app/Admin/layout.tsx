'use client';

import FooterAdmin from 'game-score-frontend/Components/Footers/FooterAdmin';
import HeaderStats from 'game-score-frontend/Components/Headers/HeaderStats';
import AdminNavbar from 'game-score-frontend/Components/Navbars/AdminNavbar';
import Sidebar from 'game-score-frontend/Components/Navbars/Sidebar';
import React from 'react';

// Definir tu layout
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}

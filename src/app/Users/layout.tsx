'use client';

import DashboardComponentTemplate from 'game-score-frontend/Components/Templates/Dashboard/DashboardComponentTemplate';
import React from 'react';

export default function DashboardLayout({ children }: { children?: React.ReactNode }) {
  return (
    <>
          <DashboardComponentTemplate>
          {children}
          </DashboardComponentTemplate>
    </>
  );
}

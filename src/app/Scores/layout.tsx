'use client';

import DashboardComponentTemplate from 'game-score-frontend/Components/Templates/Dashboard/DashboardComponentTemplate';
import React, { ReactNode } from 'react';
import withAuth from 'game-score-frontend/HOC/AuthValidate';

interface DashboardLayoutProps {
  children?: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <DashboardComponentTemplate>
      {children}
    </DashboardComponentTemplate>
  );
}

export default withAuth(DashboardLayout);
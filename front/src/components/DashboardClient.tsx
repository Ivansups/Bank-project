'use client';

import { ReactNode } from 'react';
import { signOut } from '@/lib/auth-client';
import { DashboardLayout } from '@/components/layout';

interface DashboardClientProps {
  children: ReactNode;
  user?: {
    name?: string;
    isAdmin?: boolean;
  };
  showSidebar?: boolean;
  sidebarItems?: Array<{
    label: string;
    href: string;
    icon?: ReactNode;
    active?: boolean;
  }>;
}

export default function DashboardClient({
  children,
  user,
  showSidebar = false,
  sidebarItems = []
}: DashboardClientProps) {
  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <DashboardLayout
      user={user}
      onSignOut={handleSignOut}
      showSidebar={showSidebar}
      sidebarItems={sidebarItems}
    >
      {children}
    </DashboardLayout>
  );
}


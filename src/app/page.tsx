import { MainLayout } from '@/components/main-layout';
import { PageHeader } from '@/components/page-header';
import { DashboardClient } from '@/components/dashboard-client';

export default function Dashboard() {
  return (
    <MainLayout>
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's a summary of today's health activities."
      />
      <DashboardClient />
    </MainLayout>
  );
}

import { MainLayout } from '@/components/main-layout';
import { PageHeader } from '@/components/page-header';
import { DashboardClient } from '@/components/dashboard-client';

export default function Dashboard() {
  return (
    <MainLayout>
      <PageHeader
        title="Dasbor"
        description="Selamat datang kembali! Berikut adalah ringkasan aktivitas kesehatan hari ini."
      />
      <DashboardClient />
    </MainLayout>
  );
}

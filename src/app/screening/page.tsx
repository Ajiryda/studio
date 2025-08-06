import { MainLayout } from '@/components/main-layout';
import { PageHeader } from '@/components/page-header';
import { ScreeningClient } from '@/components/screening-client';

export default function ScreeningPage() {
  return (
    <MainLayout>
      <PageHeader
        title="Student Health Screening"
        description="Record a new health screening for a student."
      />
      <ScreeningClient />
    </MainLayout>
  );
}

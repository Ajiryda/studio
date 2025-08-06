import { MainLayout } from '@/components/main-layout';
import { PageHeader } from '@/components/page-header';
import { ScreeningClient } from '@/components/screening-client';

export default function ScreeningPage() {
  return (
    <MainLayout>
      <PageHeader
        title="Skrining Kesehatan Siswa"
        description="Catat skrining kesehatan baru untuk siswa."
      />
      <ScreeningClient />
    </MainLayout>
  );
}

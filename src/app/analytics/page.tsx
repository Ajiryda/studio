import { MainLayout } from '@/components/main-layout';
import { PageHeader } from '@/components/page-header';
import { AnalyticsClient } from '@/components/analytics-client';

export default function AnalyticsPage() {
  return (
    <MainLayout>
      <PageHeader
        title="Analisis Tren Kesehatan"
        description="Menggunakan AI untuk menganalisis data kesehatan dan memberikan wawasan yang dapat ditindaklanjuti."
      />
      <AnalyticsClient />
    </MainLayout>
  );
}

import { MainLayout } from '@/components/main-layout';
import { PageHeader } from '@/components/page-header';
import { AnalyticsClient } from '@/components/analytics-client';

export default function AnalyticsPage() {
  return (
    <MainLayout>
      <PageHeader
        title="Health Trend Analysis"
        description="Using AI to analyze health data and provide actionable insights."
      />
      <AnalyticsClient />
    </MainLayout>
  );
}

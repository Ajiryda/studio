import { MainLayout } from '@/components/main-layout';
import { PageHeader } from '@/components/page-header';
import { ScreeningForm } from '@/components/screening-form';
import { Card, CardContent } from '@/components/ui/card';

export default function ScreeningPage() {
  return (
    <MainLayout>
      <PageHeader
        title="Student Health Screening"
        description="Record a new health screening for a student."
      />
      <Card>
        <CardContent className="p-6">
          <ScreeningForm />
        </CardContent>
      </Card>
    </MainLayout>
  );
}

import { MainLayout } from '@/components/main-layout';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { UksTrafficClient } from '@/components/uks-traffic-client';

export default function UksTrafficPage() {
  return (
    <MainLayout>
      <PageHeader
        title="UKS Traffic Management"
        description="Log and monitor student entry and exit from the school health unit."
      />
      <Card>
        <CardContent className="p-6">
            <UksTrafficClient />
        </CardContent>
      </Card>
    </MainLayout>
  );
}

import { MainLayout } from '@/components/main-layout';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { UksTrafficClient } from '@/components/uks-traffic-client';

export default function UksTrafficPage() {
  return (
    <MainLayout>
      <PageHeader
        title="Manajemen Kunjungan UKS"
        description="Catat dan pantau kunjungan siswa di unit kesehatan sekolah."
      />
      <Card>
        <CardContent className="p-6">
            <UksTrafficClient />
        </CardContent>
      </Card>
    </MainLayout>
  );
}

import { MainLayout } from '@/components/main-layout';
import { PageHeader } from '@/components/page-header';
import { MedicationClient } from '@/components/medication-client';

export default function MedicationPage() {
  return (
    <MainLayout>
      <PageHeader
        title="Manajemen Persediaan Obat"
        description="Pantau dan kelola stok obat-obatan di UKS."
      />
      <MedicationClient />
    </MainLayout>
  );
}

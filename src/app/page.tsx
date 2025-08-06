'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { MainLayout } from '@/components/main-layout';
import { PageHeader } from '@/components/page-header';
import { DashboardClient } from '@/components/dashboard-client';
import { StudentDashboard } from '@/components/student-dashboard'; 

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  if (!user) {
    return null; // Or a redirect component
  }

  const renderDashboard = () => {
    switch(user.role) {
      case 'admin':
      case 'guru':
        return <DashboardClient />;
      case 'siswa':
        return <StudentDashboard />;
      default:
        return null;
    }
  }

  return (
    <MainLayout>
      <PageHeader
        title="Dasbor"
        description="Selamat datang kembali! Berikut adalah ringkasan aktivitas kesehatan hari ini."
      />
      {renderDashboard()}
    </MainLayout>
  );
}

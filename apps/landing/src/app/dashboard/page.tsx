import ServiceList from './ui/service-list';
import DashboardHeader from './ui/dashboard-header';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <ServiceList />
    </main>
  );
}


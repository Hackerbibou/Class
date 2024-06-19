// PROJECT IMPORTS
import DashboardLayout from 'layout/MainLayout';
// import AuthGuard from 'utils/route-guard/AuthGuard';

// ==============================|| DASHBOARD LAYOUT ||============================== //

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
     <DashboardLayout>{children}</DashboardLayout>
     
  );
}

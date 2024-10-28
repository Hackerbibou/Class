// PROJECT IMPORTS
import DashboardLayout from 'layout/MainLayout';

// ================================|| dahsboard LAYOUT ||================================ //

export default function Layout({ children }: { children: React.ReactNode }) {
    return <DashboardLayout>
        {children}
        </DashboardLayout>
}

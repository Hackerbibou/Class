// project import
import MinimalLayout from 'layout/MinimalLayout';
import DashboardLayout from 'layout/MainLayout';
import Product from 'views/apps/e-commerce/products'

// ==============================|| HOME PAGE ||============================== //

export default function HomePage() {
  return (
    <MinimalLayout>
      {/* <Landing /> */}
      <DashboardLayout>
        <Product/>
      </DashboardLayout>

    </MinimalLayout>
  );
}

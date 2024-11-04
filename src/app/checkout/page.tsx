// project import
"use client"
import {  Box } from '@mui/material';
// import Header from 'layout/MainLayout/Header/index';
import Loader from 'ui-component/Loader';
// import { ReactNode } from 'react';

// // material-ui
// import { useTheme } from '@mui/material/styles';

// import useMediaQuery from '@mui/material/useMediaQuery';

// // project imports
// import useConfig from 'hooks/useConfig';

import { useGetMenuMaster } from 'api/menu';

// types
// import { MenuOrientation } from 'types/config';
// import MinimalLayout from 'layout/MinimalLayout';
import Cart from 'views/apps/e-commerce/cart';
// interface Props {
//   children: ReactNode;
// }

// ==============================|| HOME PAGE ||============================== //

export default function HomePage() {
  const { menuMaster, menuMasterLoading } = useGetMenuMaster();

  // horizontal menu-list bar : drawer
    console.log(menuMaster)
  if (menuMasterLoading) return <Loader />;
  return (
        <Box>
         <Cart/>
        </Box>
  );
}

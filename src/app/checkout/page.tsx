// project import
"use client"
import { AppBar, Box, Container, Toolbar } from '@mui/material';
import Header from 'layout/MainLayout/Header/index';
import Loader from 'ui-component/Loader';
import { useEffect, useMemo, FC, ReactNode } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import useConfig from 'hooks/useConfig';

import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';

// types
import { MenuOrientation } from 'types/config';
import MinimalLayout from 'layout/MinimalLayout';
import Cart from 'views/apps/e-commerce/cart';
interface Props {
  children: ReactNode;
}

// ==============================|| HOME PAGE ||============================== //

export default function HomePage() {
  const { menuMaster, menuMasterLoading } = useGetMenuMaster();

  // horizontal menu-list bar : drawer
    console.log(menuMaster)
  if (menuMasterLoading) return <Loader />;
  return (
    <MinimalLayout>
        <AppBar enableColorOnDark position="fixed" color="inherit" elevation={0} sx={{ bgcolor: 'background.default' }}>
        <Toolbar>
          <Header />
        </Toolbar>
      </AppBar>
     <Box sx={{height:'100px'}}/>
      
        <Container>
   
         <Cart/>
        </Container>
  
    </MinimalLayout>
  );
}

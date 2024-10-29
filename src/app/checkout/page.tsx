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
        <Container sx={{pt:4}}>
         <Cart/>
        </Container>
  );
}

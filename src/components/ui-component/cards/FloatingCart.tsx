import Link from 'next/link';

// material-ui
import { useTheme } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';

// third-party
import { sum } from 'lodash-es';

// project import
import { useSelector } from 'store';

// assets
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';

// types
import { ThemeMode } from 'types/config';
import { DefaultRootStateProps } from 'types';
import { CartProductStateProps } from 'types/cart';
import { useEffect, useState } from 'react';
import util from 'api/checkout'

// ==============================|| CART ITEMS - FLOATING BUTTON ||============================== //

const FloatingCart = () => {
  const theme = useTheme();
  let cart = useSelector((state: DefaultRootStateProps) => state.cart);
  const [totalQuantity, setTotal]=useState(0)
  useEffect(()=>{
    (async()=>{
      const cart:any= await util.readCart();
      setTotal(cart.length)
    })()
  })

  return (
    <Fab
      component={Link}
      href="/checkout"
      size="large"
      sx={{
        top: '50%',
        position: 'fixed',
        right: 0,
        zIndex: 1200,
        boxShadow: theme.customShadows.warning,
        bgcolor: 'warning.dark',
        color: 'warning.light',
        borderRadius: '8px',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        '&:hover': {
          bgcolor: 'warning.dark',
          color: 'warning.light'
        }
      }}
    >
      <IconButton disableRipple aria-label="cart" sx={{ '&:hover': { bgcolor: 'transparent' } }} size="large">
        <Badge
          showZero
          badgeContent={totalQuantity}
          color="error"
          sx={{ '& .MuiBadge-badge': { right: 0, top: 3, border: '2px solid', borderColor: 'background.paper', px: 0.5 } }}
        >
          <ShoppingCartTwoToneIcon sx={{ color: theme.palette.mode === ThemeMode.DARK ? 'background.paper' : 'text.primary' }} />
        </Badge>
      </IconButton>
    </Fab>
  );
};

export default FloatingCart;

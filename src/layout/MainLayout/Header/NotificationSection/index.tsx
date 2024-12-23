import { useEffect, useRef, useState } from 'react';
// import Link from 'next/link';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import CardActions from '@mui/material/CardActions';
// import Chip from '@mui/material/Chip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
// import Divider from '@mui/material/Divider';
// import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
// import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// third-party
// import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
// import NotificationList from './NotificationList';

// assets
// import { IconBell } from '@tabler/icons-react';

// types
import { ThemeMode } from 'types/config';
import { ShoppingBasketOutlined } from '@mui/icons-material';
import Carts from 'views/apps/e-commerce/cart';
// import Cart from 'components/application/e-commerce/Checkout/Cart';
// import OrderSummary from 'components/application/e-commerce/Checkout/OrderSummary';

// notification status options
// const status = [
//   {
//     value: 'all',
//     label: 'All Notification'
//   },
//   {
//     value: 'new',
//     label: 'New'
//   },
//   {
//     value: 'unread',
//     label: 'Unread'
//   },
//   {
//     value: 'other',
//     label: 'Other'
//   }
// ];

// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = () => {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState(false);
  // const [value, setValue] = useState('');
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef<any>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<HTMLDivElement> | MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  // const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
  //   if (event?.target.value) setValue(event?.target.value);
  // };

  return (
    <>
      <Box
        sx={{
          ml: 2,
          [theme.breakpoints.down('lg')]: {
            mr: 2
          }
        }}
      >
        <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
            transition: 'all .2s ease-in-out',
            bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'secondary.light',
            color: theme.palette.mode === ThemeMode.DARK ? 'warning.dark' : 'secondary.dark',
            '&[aria-controls="menu-list-grow"],&:hover': {
              bgcolor: theme.palette.mode === ThemeMode.DARK ? 'warning.dark' : 'secondary.dark',
              color: theme.palette.mode === ThemeMode.DARK ? 'grey.800' : 'secondary.light'
            }
          }}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          color="inherit"
        >
          <ShoppingBasketOutlined height="20px" />
        </Avatar>
      </Box>

      <Popper
        placement={downMD ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [downMD ? 5 : 0, 20]
            }
          }
        ]}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Transitions position={downMD ? 'top' : 'top-right'} in={open} {...TransitionProps}>
              <Paper>
                {open && (
                  <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                   <Box sx={{width:'400px'}}>                    
                    <Carts/>
                   </Box>
                  </MainCard>
                )}
              </Paper>
            </Transitions>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
};

export default NotificationSection;

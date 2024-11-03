// material-ui
'use client'
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import React,{ useEffect} from 'react'
// project imports
import useConfig from 'hooks/useConfig';
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
// import MobileSection from './MobileSection';
import ProfileSection from './ProfileSection';
// import FullScreenSection from './FullScreenSection';
// import LocalizationSection from './LocalizationSection';
// import MegaMenuSection from './MegaMenuSection';
import NotificationSection from './NotificationSection';
import util from 'api/clientuser'
import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';

// assets
import { IconMenu2 } from '@tabler/icons-react';

// types
import { MenuOrientation, ThemeMode } from 'types/config';
import { Button} from '@mui/material';
// import { CheckOutlined, SpaceBar } from '@mui/icons-material';
import Link from 'next/link';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = () => {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const { menuOrientation } = useConfig();
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downMD;
  const [user, setUser] = React.useState<any>(null)
  useEffect(()=>{
    (async ()=>{
      const userr:any=await util.Getuser();
      setUser(userr)
    })()
    
  },[])
  return (
    <>
      {/* logo & toggler button */}
      <Box sx={{ width: downMD ? 'auto' : 228, display: 'flex' }}>
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <LogoSection />
        </Box>
        {!isHorizontal && (
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              overflow: 'hidden',
              transition: 'all .2s ease-in-out',
              bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'secondary.light',
              color: theme.palette.mode === ThemeMode.DARK ? 'secondary.main' : 'secondary.dark',
              '&:hover': {
                bgcolor: theme.palette.mode === ThemeMode.DARK ? 'secondary.main' : 'secondary.dark',
                color: theme.palette.mode === ThemeMode.DARK ? 'secondary.light' : 'secondary.light'
              }
            }}
            onClick={() => handlerDrawerOpen(!drawerOpen)}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="20px" />
          </Avatar>
        )}
      </Box>

      {/* header search */}
      <SearchSection />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* mega-menu */}
      {/* <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <MegaMenuSection />
      </Box> */}

      {/* live customization & localization */}
      {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <LocalizationSection />
      </Box> */}

      {/* notification */}
      <NotificationSection />

      {/* full sceen toggler */}
      {/* <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
        <FullScreenSection />
      </Box> */}
      {user?.role!='authenticated'?(<><Box sx={{width:'10px'}}/>
<Link href='/login'><Box sx={{ display:'block' }}>
     <Button>Compte</Button>
      </Box></Link></>):(<><Box sx={{width:'10px'}}/><ProfileSection user={user} /></>)}
      
      {/* profile */}
      {/*  */}

      {/* mobile header */}
      {/* <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <MobileSection />
      </Box> */}
    </>
  );
};

export default Header;

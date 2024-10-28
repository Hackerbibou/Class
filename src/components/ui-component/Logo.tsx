// material-ui
import { useTheme } from '@mui/material/styles';

// types
import { ThemeMode } from 'types/config';

import Loo from '../../../public/favicon.ico'
import Image from 'next/image';
/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //
type pprop={
  w?:number
}
const Logo = (props?:pprop) => {
  const theme = useTheme();

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={theme.palette.mode === ThemeMode.DARK ? logoDark : logo} alt="Berry" width="100" />
     *
     */
    
<Image src={Loo} width={props && props.w?props.w:105} alt='logo'/>
  );
};

export default Logo;

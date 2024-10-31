import React, { ReactNode, Ref, forwardRef, useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar1,{ AvatarProps } from '@mui/material/Avatar';
import Avatar from 'ui-component/extended/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Popper from '@mui/material/Popper';

// third-party
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';
import util from 'api/menproduct'
// project imports
import Transitions from 'ui-component/extended/Transitions';

// assets
import { IconAdjustmentsHorizontal, IconSearch, IconX } from '@tabler/icons-react';
import { dispatch, useSelector } from 'store';
import { getProducts } from 'store/slices/product';
// types
import { ThemeMode } from 'types/config';
import { IconButton, Menu, MenuItem, TableCell, TableRow, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { Products } from 'types/e-commerce';
import { ArrangementOrder, GetComparator, HeadCell, EnhancedTableHeadProps, EnhancedTableToolbarProps, KeyedObject } from 'types';
import Link from 'next/link';
interface HeaderAvatarProps extends AvatarProps {
  children: ReactNode;
}

const HeaderAvatar = forwardRef(({ children, ...others }: HeaderAvatarProps, ref: Ref<HTMLDivElement>) => {
  const theme = useTheme();
 
  return (
    <Avatar1
      ref={ref}
      variant="rounded"
      sx={{
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'secondary.light',
        color: theme.palette.mode === ThemeMode.DARK ? 'secondary.main' : 'secondary.dark',
        '&:hover': {
          bgcolor: theme.palette.mode === ThemeMode.DARK ? 'secondary.main' : 'secondary.dark',
          color: theme.palette.mode === ThemeMode.DARK ? 'secondary.light' : 'secondary.light'
        }
      }}
      {...others}
    >
      {children}
    </Avatar1>
  );
});

interface Props {
  value: string;
  setValue: (value: string) => void;
  popupState: any;
}

// ==============================|| SEARCH INPUT - MOBILE||============================== //

const MobileSearch = ({ value, setValue, popupState }: Props) => {
  const theme = useTheme();

  return (
    <OutlinedInput
      id="input-search-header"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search"
      startAdornment={
        <InputAdornment position="start">
          <IconSearch stroke={1.5} size="16px" color={theme.palette.grey[500]} />
        </InputAdornment>
      }
      // endAdornment={
      //   <InputAdornment position="end">
      //     <HeaderAvatar variant="rounded">
      //       <IconAdjustmentsHorizontal stroke={1.5} size="20px" />
      //     </HeaderAvatar>
      //     <Box sx={{ ml: 2 }}>
      //       <Avatar
      //         variant="rounded"
      //         sx={{
      //           ...theme.typography.commonAvatar,
      //           ...theme.typography.mediumAvatar,
      //           bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'orange.light',
      //           color: 'orange.dark',
      //           '&:hover': { bgcolor: 'orange.dark', color: 'orange.light' }
      //         }}
      //         {...bindToggle(popupState)}
      //       >
      //         <IconX stroke={1.5} size="20px" />
      //       </Avatar>
      //     </Box>
      //   </InputAdornment>
      // }
      aria-describedby="search-helper-text"
      inputProps={{ 'aria-label': 'weight', sx: { bgcolor: 'transparent', pl: 0.5 } }}
      sx={{ width: '100%', ml: 0.5, px: 2, bgcolor: 'background.paper' }}
    />
  );
};

// ==============================|| SEARCH INPUT ||============================== //

const SearchSection = () => {
  const theme = useTheme();
  const [value, setValue] = useState('');
  // const router = useRouter();
  const [order, setOrder] = React.useState<ArrangementOrder>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('calories');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [search, setSearch] = React.useState<string>('');
  const [rows, setRows] = React.useState<Products[]>([]);
  const [products, SetProduct] = useState([])
  const [user, setUser] = useState(null)
  useEffect(() => {
    (async ()=> {
      const prod : any = await util.searchAllProducts(value);
      SetProduct(prod);
    })()
  },[value])

  const [anchorEl, setAnchorEl] = React.useState<Element | (() => Element) | null | undefined>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    setRows(products);
  }, [products]);

  React.useEffect(() => {
    dispatch(getProducts());
  }, []);
  function descendingComparator(a: KeyedObject, b: KeyedObject, orderBy: string) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  const getComparator: GetComparator = (order, orderBy) =>
    order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
  
  function stableSort(array: Products[], comparator: (a: Products, b: Products) => number) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0] as Products, b[0] as Products);
      if (order !== 0) return order;
      return (a[1] as number) - (b[1] as number);
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleRequestSort = (event: React.SyntheticEvent<Element, Event>, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelectedId = rows?.map((n) => n.name);
      setSelected(newSelectedId!);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<HTMLTableCellElement, MouseEvent>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    if (event?.target.value) setRowsPerPage(parseInt(event?.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <PopupState variant="popper" popupId="demo-popup-popper">
          {(popupState) => (
            <>
              <Box sx={{ ml: 2 }}>
                <HeaderAvatar variant="rounded" {...bindToggle(popupState)}>
                  <IconSearch stroke={1.5} size="19px" />
                </HeaderAvatar>
              </Box>
              <Popper
                {...bindPopper(popupState)}
                transition
                sx={{ zIndex: 1100, width: '99%', top: '-55px !important', px: { xs: 1.25, sm: 1.5 } }}
              >
                {({ TransitionProps }) => (
                  <>
                    <Transitions type="zoom" {...TransitionProps} sx={{ transformOrigin: 'center left' }}>
                      <Card
                        sx={{
                          background: theme.palette.mode === ThemeMode.DARK ? theme.palette.dark[900] : '#fff',
                          [theme.breakpoints.down('sm')]: {
                            border: 0,
                            boxShadow: 'none'
                          }
                        }}
                      >
                        <Box sx={{ p: 2, position:'relative', height:'auto', display: 'flex', flexDirection:'column', gap:2,alignItems:'center' }}>
                          <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item xs>
                              <MobileSearch value={value} setValue={setValue} popupState={popupState} />
                            </Grid>
                          </Grid>
                           {value.length ? (<Box sx={{ width: '100%', background:'#f8fafc', border: '2px solid lightgrey', overflowY:'scroll', height:'400px', borderRadius:'12px', padding:2, display:'flex', flexDirection:'column' }}>
                            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                if (typeof row === 'number') return null;
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow sx={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center'}} hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={index} selected={isItemSelected}>
                   
                    <TableCell
                      align="center"
                      component="th"
                      id={labelId}
                      scope="row"
                      onClick={(event) => handleClick(event, row.name)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <Avatar src={row.image} size="md" variant="rounded" alt="product images" />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" sx={{ cursor: 'pointer' }}>
                      <Typography
                        component={Link}
                        href={`/categories/${row.table}/${row.id}`}
                        variant="subtitle1"
                        sx={{ textDecoration: 'none' }}
                      >
                        {row.name}
                      </Typography>
                    </TableCell>
                    {/* <TableCell>{format(new Date(row.created), 'E, MMM d yyyy')}</TableCell> */}
                    <TableCell>${row.offerPrice}</TableCell>
    
                  </TableRow>
                );
              })}
                          </Box>):<></>}
                        </Box>
                      </Card>
                    </Transitions>
                  </>
                )}
              </Popper>
            </>
          )}
          
        </PopupState>
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'block' }, position:'relative' }}>
        <OutlinedInput
          id="input-search-header"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <IconSearch stroke={1.5} size="16px" color={theme.palette.grey[500]} />
            </InputAdornment>
          }
          // endAdornment={
          //   <InputAdornment position="end">
          //     <HeaderAvatar variant="rounded">
          //       <IconAdjustmentsHorizontal stroke={1.5} size="20px" />
          //     </HeaderAvatar>
          //   </InputAdornment>
          // }
          aria-describedby="search-helper-text"
          inputProps={{ 'aria-label': 'weight', sx: { bgcolor: 'transparent', pl: 0.5 } }}
          sx={{ width: { md: 250, lg: 434 }, ml: 2, px: 2 }}
        />
         {value.length ? (<Box sx={{ width: { xs: '100%', md: '150%' }, position:'absolute',  background:'#f8fafc', border: '2px solid lightgrey', overflowY:'scroll', height:'400px', borderRadius:'12px', padding:2,mt:2, zIndex:3 }}>
          {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                if (typeof row === 'number') return null;
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow sx={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center'}} hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={index} selected={isItemSelected}>
                   
                    <TableCell
                      align="center"
                      component="th"
                      id={labelId}
                      scope="row"
                      onClick={(event) => handleClick(event, row.name)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <Avatar src={row.image} size="md" variant="rounded" alt="product images" />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" sx={{ cursor: 'pointer' }}>
                      <Typography
                        component={Link}
                        href={`/categories/${row.table}/${row.id}`}
                        variant="subtitle1"
                        sx={{ textDecoration: 'none' }}
                      >
                        {row.name}
                      </Typography>
                    </TableCell>
                    {/* <TableCell>{format(new Date(row.created), 'E, MMM d yyyy')}</TableCell> */}
                    <TableCell>${row.offerPrice}</TableCell>
    
                  </TableRow>
                );
              })}
      </Box>):<></>}
      </Box>
    </>
  );
};

export default SearchSection;

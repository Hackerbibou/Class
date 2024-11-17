'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import util from 'api/checkout'
import userUtil from 'api/clientuser'
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// material-ui
// import { useTheme } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
// import Checkbox from '@mui/material/Checkbox';
// import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
// import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import empty from '../../../../public/assets/images/e-commerce/empty.svg'
// third-party
// import { format } from 'date-fns';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Avatar from 'ui-component/extended/Avatar';
// import Chip from 'ui-component/extended/Chip';
import { dispatch} from 'store';
import { getProducts } from 'store/slices/product';

// types
import { Products } from 'types/e-commerce';
import { ArrangementOrder, HeadCell, EnhancedTableHeadProps, EnhancedTableToolbarProps } from 'types';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
// import PrintIcon from '@mui/icons-material/PrintTwoTone';
// import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
// import SearchIcon from '@mui/icons-material/Search';
// import AddIcon from '@mui/icons-material/AddTwoTone';
// import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { Box, Button, Stack } from '@mui/material';
// import CartDiscount from 'components/application/e-commerce/Checkout/CartDiscount';
import { useRouter } from 'next/navigation';
// import { setNextStep } from 'store/slices/cart';
// import { ShoppingCartCheckout } from '@mui/icons-material';
import Image from 'next/image';
import { setStep } from 'store/slices/cart';

// const prodImage = '/assets/images/e-commerce';

// table sort
// function descendingComparator(a: KeyedObject, b: KeyedObject, orderBy: string) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// const getComparator: GetComparator = (order, orderBy) =>
//   order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

// function stableSort(array: Products[], comparator: (a: Products, b: Products) => number) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0] as Products, b[0] as Products);
//     if (order !== 0) return order;
//     return (a[1] as number) - (b[1] as number);
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// table header options
const headCells: HeadCell[] = [

  {
    id: 'name',
    numeric: false,
    label: 'Name',
    align: 'left'
  },
 

  {
    id: 'sale-price',
    numeric: true,
    label: 'Price',
    align: 'right'
  },
  {
    id: 'quantity',
    numeric: true,
    label: 'Quantity',
    align: 'left'
  },
];

// ==============================|| TABLE HEADER TOOLBAR ||============================== //

const EnhancedTableToolbar = ({ numSelected }: EnhancedTableToolbarProps) => (
  <Toolbar
    sx={{
      p: 0,
      pl: 2,
      pr: 1,
      color: numSelected > 0 ? 'secondary.main' : 'inherit'
    }}
  >
    {numSelected > 0 ? (
      <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="h4">
        {numSelected} Selected
      </Typography>
    ) : (
      <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle">
        Nutrition
      </Typography>
    )}

    {numSelected > 0 && (
      <Tooltip title="Delete">
        <IconButton size="large">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    )}
  </Toolbar>
);

// ==============================|| TABLE HEADER ||============================== //

interface ProEnhancedTableHeadProps extends EnhancedTableHeadProps {
  selected: string[];
}

function EnhancedTableHead({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  selected
}: ProEnhancedTableHeadProps) {
  const createSortHandler = (property: string) => (event: React.SyntheticEvent<Element, Event>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" >
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          /> */}
         
         <TableCell  align="left">
            Product
          </TableCell>
          
        </TableCell>
        {numSelected > 0 && (
          <TableCell padding="none" colSpan={7}>
            <EnhancedTableToolbar numSelected={selected.length} />
          </TableCell>
        )}
        {numSelected <= 0 &&
          headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                
              </TableSortLabel>
            </TableCell>
          ))}
        
      </TableRow>
    </TableHead>
  );
}




const ProductList = () => {
  // const theme = useTheme();
  const router = useRouter();
  const [order, setOrder] = React.useState<ArrangementOrder>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('calories');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  // const [search, setSearch] = React.useState<string>('');
  const [rows, setRows] = React.useState<Products[]>([]);
  
  const [products, SetProduct] = useState([])
  const [user, setUser] = useState(null)
  // const [editCheck,setCheck] = useState(false)
  useEffect(() => {
    (async ()=> {
      const prod : any = await util.readCart();
      const userInfo : any = await userUtil.Getuser();
      setUser(userInfo);
      if(prod)SetProduct(prod);
    })()
  },[])
// const [editQuantity,setQuantity]=useState(1)


  React.useEffect(() => {
    
    let newprod:any=products.map((elem:{}, ind)=>{
      return {index:ind,...elem}
    });
    
    setRows(newprod);
  }, [products]);
console.log(rows)
  React.useEffect(() => {
    dispatch(getProducts());
  }, []);

  // const handleSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
  //   const newString = event?.target.value;
  //   setSearch(newString || '');

  //   if (newString) {
  //     const newRows = rows?.filter((row: KeyedObject) => {
  //       let matches = true;

  //       const properties = ['name', 'description', 'rating', 'salePrice', 'offerPrice', 'gender'];
  //       let containsQuery = false;

  //       properties.forEach((property) => {
  //         if (row[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
  //           containsQuery = true;
  //         }
  //       });

  //       if (!containsQuery) {
  //         matches = false;
  //       }
  //       return matches;
  //     });
  //     setRows(newRows);
  //   } else {
  //     getProducts();
  //   }
  // };

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
  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <MainCard content={false}>
        <CardContent>
            Cart
       
      </CardContent> 

      {/* table */}
      <TableContainer>
        <Table sx={{ width:'100%' }} aria-labelledby="tableTitle">
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            selected={selected}
          />
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                if (typeof row === 'number') return null;
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={index} selected={isItemSelected}>
                   
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
                        href={`/categories/productdetail/${row.table}/${row.id}`}
                        variant="subtitle1"
                        sx={{ textDecoration: 'none' }}
                      >
                        {row.name}
                      </Typography>
                    </TableCell>
                    {/* <TableCell>{format(new Date(row.created), 'E, MMM d yyyy')}</TableCell> */}
                    <TableCell align="left">${row.offerPrice}</TableCell>
                    <TableCell align="left" >
                        
                        <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <>{row.quantity}</> 
                      
                     
                      </Box>
                      
            
                    </TableCell>
                  </TableRow>
                );
              })}
            
          </TableBody>
        </Table>
      </TableContainer>
{products.length == 0 && (

                <Box sx={{display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center', pt:4}} >
                  <Image src={empty} alt='empty cart'  height={200}/>
                  <Typography>{user?<>Cart is empty</>:<>Login to add to cart</>}</Typography>
              </Box>
            )}
      {/* table pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Grid item xs={12} md={5} lg={4}>
            <Stack spacing={'9'}>
              {user?<Button variant="contained" fullWidth onClick={()=>{dispatch(setStep(1));router.push('/pay');}}>
                Check Out
              </Button>:<Button color='error' variant="contained" fullWidth onClick={()=>{router.push('/login');}}>
                Login to shop
              </Button>}
            </Stack>
          </Grid>
    </MainCard>
  );
};

export default ProductList;

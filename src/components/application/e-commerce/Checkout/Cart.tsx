'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import util from 'api/checkout'
// material-ui
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// third-party
import { sum } from 'lodash-es';
// import currency from 'currency.js';

// project imports
// import CartDiscount from './CartDiscount';
// import ColorOptions from '../ColorOptions';
import OrderSummary from './OrderSummary';
import Avatar from 'ui-component/extended/Avatar';
import { gridSpacing } from 'store/constant';

// types
import { CartCheckoutStateProps, CartProductStateProps } from 'types/cart';

// assets
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { dispatch } from 'store';
// import { dispatch } from 'store';
// import { setStep } from 'store/slices/cart';

// const prodImage = '/assets/images/e-commerce';

// product color select
// function getColor(color: string) {
//   return ColorOptions.filter((item) => item.value === color);
// }

// ==============================|| CART - INCREMENT QUANTITY ||============================== //

interface IncrementProps {
  itemId: string | number | undefined;
  quantity: number;
  updateQuantity: (id: string | number | undefined, quantity: number) => void;
}
const Increment = ({ itemId, quantity, updateQuantity }: IncrementProps) => {
  const [value, setValue] = useState(quantity);

  const incrementHandler = () => {
    setValue(value - 1);
    updateQuantity(itemId, value - 1);
  };

  const decrementHandler = () => {
    setValue(value + 1);
    updateQuantity(itemId, value + 1);
  };

  return (
    <ButtonGroup size="large" variant="text" color="inherit" sx={{ border: '1px solid', borderColor: 'divider' }}>
      <Button
        key="three"
        aria-label="increase"
        disabled={value <= 1}
        onClick={incrementHandler}
        sx={{ pr: 0.75, pl: 0.75, minWidth: '0px !important' }}
      >
        <RemoveIcon fontSize="inherit" />
      </Button>
      <Button key="two" sx={{ pl: 0.5, pr: 0.5 }}>
        {value} 
      </Button>
      <Button key="one" aria-label="decrease" onClick={decrementHandler} sx={{ pl: 0.75, pr: 0.75, minWidth: '0px !important' }}>
        <AddIcon fontSize="inherit" />
      </Button>
    </ButtonGroup>
  );
};

// ==============================|| CART - MAIN ||============================== //

interface CartProps {
  products:any;
  quantity:number;
  setProducts:any;
  checkout: CartCheckoutStateProps;
  onNext: () => void;
  removeProduct: (id: string | number | undefined) => void;
  updateQuantity: (id: string | number | undefined, quantity: number) => void;
}

const Cart = ({quantity, setProducts, products, checkout, onNext, removeProduct, updateQuantity }: CartProps) => {
  const totalQuantity = sum(products.map((item:any) => quantity));
  const [rows, setRows] = useState(products);
  useEffect(() => {
    setRows(products);
  }, [products]);

  const handleClose = (e:any,type:string,id:number) => {
    e.preventDefault();

    if(type=='delete'){
      
      let fil = products.filter((elem:any, ind:any)=>ind!=id);
     
      setProducts(fil);
      setRows(fil);
      (async()=>{
        await util.deleteFromCart(fil);
      })();
    }

  };
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="subtitle1">Cart Item</Typography>
          <Typography variant="caption" sx={{ fontSize: '0.875rem' }}>
            ({totalQuantity})
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: CartProductStateProps, index: number) => {
                const colorsData = row.color;
                return (
                  <TableRow key={index} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                          <Avatar size="md" alt="product images" variant="rounded" src={row.image ? `https://olrfgwsbgyajiicxsnhz.supabase.co/storage/v1/object/public/productimages/${row.image}` : ''} />
                        </Grid>
                        <Grid item>
                          <Stack spacing={0}>
                            <Typography variant="subtitle1">{row.name}</Typography>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                                Size:{' '}
                                <Typography variant="caption" component="span">
                                  {row.size}
                                </Typography>
                              </Typography>
                              <Typography variant="caption" sx={{ fontSize: '1rem' }}>
                                |
                              </Typography>

                              <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                                Color:{' '}
                                <Typography variant="caption" component="span">
                                  {colorsData ? colorsData: 'Multicolor'}
                                </Typography>
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align="right">
                      <Stack>
                        {row.offerPrice && <Typography variant="subtitle1">{row.offerPrice} CFA</Typography>}
                        {row.salePrice && (
                          <Typography variant="caption" sx={{ textDecoration: 'line-through' }}>
                            {row.salePrice}
                          </Typography>
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      <Increment quantity={row.quantity} itemId={index} updateQuantity={updateQuantity} />
                    </TableCell>
                    <TableCell align="right">
                      {row.offerPrice && row.quantity && (
                        <Typography variant="subtitle1">{row.offerPrice * row.quantity} CFA</Typography>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={(e) => handleClose(e,'delete',index)} size="large" aria-label="product delete">
                        <DeleteTwoToneIcon sx={{ color: 'grey.500' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12}>
        <OrderSummary product={rows} checkout={checkout} />
      </Grid>
      <Grid item xs={12}>
        <Grid container direction={{ xs: 'column-reverse', lg: 'row' }} spacing={3} alignItems={{ xs: 'flex-start', lg: 'center' }}>
          <Grid item xs={12} md={7} lg={8}>
            <Button component={Link} href="/categories/mensShirts" variant="text" startIcon={<KeyboardBackspaceIcon />}>
              Continue Shopping
            </Button>
          </Grid>
          <Grid item xs={12} md={5} lg={4}>
            <Stack spacing={gridSpacing}>
              {/* <CartDiscount /> */}
              <Button variant="contained" fullWidth onClick={()=>dispatch(onNext)}>
                Check Out
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Cart;

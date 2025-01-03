'use client';

import { useEffect, useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// third-party
import currency from 'currency.js';

// project imports
import OrderSummary from './OrderSummary';
import AddressCard from './AddressCard';
import PaymentSelect from './PaymentSelect';
// import ColorOptions from '../ColorOptions';
import PaymentOptions from './PaymentOptions';
// import PaymentCard from './PaymentCard';
// import AddPaymentCard from './AddPaymentCard';
import OrderComplete from './OrderComplete';
import SubCard from 'ui-component/cards/SubCard';
import Avatar from 'ui-component/extended/Avatar';

import { dispatch } from 'store';
import { gridSpacing } from 'store/constant';
import { openSnackbar } from 'store/slices/snackbar';
import { setStep } from 'store/slices/cart';
// types
import { CartCheckoutStateProps } from 'types/cart';
import { PaymentOptionsProps } from 'types/e-commerce';

// assets
// import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { setPaymentMethod } from 'store/slices/cart';
import util from 'api/checkout'
import { useRouter } from 'next/navigation';
// const prodImage = '/assets/images/e-commerce';

// product color select
// function getColor(color: string) {
//   return ColorOptions.filter((item) => item.value === color);
// }

// ==============================|| CHECKOUT PAYMENT - MAIN ||============================== //

interface PaymentProps {
  user?:any;
  address?:any;
  products?:any;
  checkout: CartCheckoutStateProps;
  onBack: () => void;
  onNext: () => void;
  handleShippingCharge: (type: string) => void;
}

const Payment = ({user, address, products, checkout, onBack, onNext, handleShippingCharge }: PaymentProps) => {
  const [type, setType] = useState(checkout.payment.type);
  const [payment, setPayment] = useState(checkout.payment.method);
  const [rows, setRows] = useState(products?products:[]);
  const cards=checkout.payment.card

  // const [open, setOpen] = useState(false);
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setRows(products);
  }, [products]);

  // const cardHandler = (card: string) => {
  //   if (payment === 'card') {
  //     setCards(card);
  //     dispatch(setPaymentCard(card));
  //   }
  // };

  const handlePaymentMethod = (value: string) => {
    setPayment(value);
    dispatch(setPaymentMethod(value));
  };
  const router=useRouter();
  const completeHandler = () => {
    if (payment === 'card' && (cards === '' || cards === null)) {
      dispatch(
        openSnackbar({
          open: true,
          message: 'Select Payment Card',
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
    }else if(products.length==0){
      dispatch(setStep(0));
    } else if(!address){
    dispatch(setStep(1));
    }else {
      //Submit order here
      // onNext();
      
      setComplete(true);
      setTimeout(()=>{
        setComplete(false);
        (async()=>{
          console.log(products)
          await util.addOrders(products,address.name, user.email, user.phone, address, payment)
          await util.clearCart()
          router.push('/pastorders');
          dispatch(setStep(0));
      })()
      },2000);
      
      
      
    }
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} md={6} lg={6} xl={6}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} lg={12} xl={12}  >
            <Stack>
              <Typography variant="subtitle1">Delivery Options</Typography>
              <FormControl>
                <RadioGroup
                  row
                  aria-label="delivery-options"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                    handleShippingCharge(e.target.value);
                  }}
                  name="delivery-options"
                >
                  <Grid container spacing={gridSpacing} alignItems="center" sx={{ pt: 2 }}>
                    <Grid item xs={12} lg={12} xl={10} >
                      <SubCard content={false}>
                        <Box sx={{ p: 2 }}>
                          <FormControlLabel
                            value="free"
                            control={<Radio />}
                            label={
                              <Stack spacing={0.25}>
                                <Typography variant="subtitle1">Standard Delivery (5000 cfa)</Typography>
                                <Typography variant="caption">Recevez votre commande cette semaine</Typography>
                              </Stack>
                            }
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 32 } }}
                          />
                        </Box>
                      </SubCard>
                    </Grid>
                    {/* <Grid item xs={12} sm={6} md={12} lg={6}>
                      <SubCard content={false}>
                        <Box sx={{ p: 2 }}>
                          <FormControlLabel
                            value="fast"
                            control={<Radio />}
                            label={
                              <Stack spacing={0.25}>
                                <Typography variant="subtitle1">Fast Delivery ($5.00)</Typography>
                                <Typography variant="caption">Delivered on Friday 5 Jun</Typography>
                              </Stack>
                            }
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 32 } }}
                          />
                        </Box>
                      </SubCard>
                    </Grid> */}
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Payment Options</Typography>
          </Grid>
          <Grid item xs={12} lg={12} xl={12}>
            <FormControl>
              <RadioGroup
                aria-label="delivery-options"
                value={payment}
                onChange={(e) => handlePaymentMethod(e.target.value)}
                name="delivery-options"
              >
                <Grid container spacing={gridSpacing} alignItems="center">
                  {PaymentOptions.map((item: PaymentOptionsProps, index) => (
                    <Grid item xs={12} key={index}>
                      <PaymentSelect item={item} />
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
            </FormControl>
          </Grid>
          {/* <Grid item xs={12} lg={6} sx={{ opacity: payment === 'card' ? 1 : 0.4 }}>
            <SubCard
              title="Add Your Card"
              secondary={
                <Button variant="contained" size="small" startIcon={<AddTwoToneIcon />} onClick={handleClickOpen}>
                  Add Card
                </Button>
              }
            >
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} xl={6}>
                  <PaymentCard type="mastercard" cards={cards} cardHandler={cardHandler} />
                </Grid>
                <Grid item xs={12} xl={6}>
                  <PaymentCard type="visa" cards={cards} cardHandler={cardHandler} />
                </Grid>
              </Grid>
              <AddPaymentCard open={open} handleClose={handleClose} />
            </SubCard>
          </Grid> */}
          <Grid item xs={12}>
            <Grid container spacing={3} alignItems="center" justifyContent="space-between">
              <Grid item>
                <Button variant="text" startIcon={<KeyboardBackspaceIcon />} onClick={onBack}>
                  Back
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={completeHandler}>
                  Complete Order
                </Button>
                <OrderComplete open={complete} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={6} xl={6}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Stack>
              <Typography variant="subtitle1" sx={{ pb: 2 }}>
                Cart Items
              </Typography>
              <TableContainer>
                <Table sx={{ minWidth: 280 }} aria-label="simple table">
                  <TableBody>
                    {rows.map((row:any, index:number) => {
                      const colorsData = row.color ? row.color : false;
                      return (
                        <TableRow key={index} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                          <TableCell component="th" scope="row">
                            <Grid container alignItems="center" spacing={2}>
                              <Grid item>
                                <Avatar
                                  size="md"
                                  variant="rounded"
                                  alt="product images"
                                  src={row.image ? `https://olrfgwsbgyajiicxsnhz.supabase.co/storage/v1/object/public/productimages/${row.image}` : ''}
                                />
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
                                        {colorsData ? colorsData[0].label : 'Multicolor'}
                                      </Typography>
                                    </Typography>
                                  </Stack>
                                </Stack>
                              </Grid>
                            </Grid>
                          </TableCell>
                          <TableCell align="right">
                            {row.offerPrice && row.quantity && (
                              <Typography variant="subtitle1">{currency(row.offerPrice * row.quantity).format()}</Typography>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <OrderSummary product={products} checkout={checkout} />
          </Grid>
          <Grid item xs={12}>
            <AddressCard single change address={address} onBack={onBack} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Payment;

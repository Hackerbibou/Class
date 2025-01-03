'use client';

import { useEffect, useState, ReactElement } from 'react';
import util from 'api/checkout'
// material-ui
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

// project imports
import useConfig from 'hooks/useConfig';
import MainCard from 'ui-component/cards/MainCard';
import Cart from 'components/application/e-commerce/Checkout/Cart';
import Payment from 'components/application/e-commerce/Checkout/Payment';
import CartEmpty from 'components/application/e-commerce/Checkout/CartEmpty';
import BillingAddress from 'components/application/e-commerce/Checkout/BillingAddress';

import { gridSpacing } from 'store/constant';
import { dispatch, useSelector } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { getAddresses, editAddress, addAddress } from 'store/slices/product';
import { removeProduct, setBackStep, setBillingAddress, setNextStep, setShippingCharge, setStep, updateProduct } from 'store/slices/cart';

// types
import { TabsProps } from 'types';
import { ThemeMode } from 'types/config';
import { Address } from 'types/e-commerce';

// assets
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CreditCardTwoToneIcon from '@mui/icons-material/CreditCardTwoTone';

interface TabOptionProps {
  label: string;
  icon: ReactElement;
  caption: string;
}

// tabs option
const tabsOption: TabOptionProps[] = [
  {
    label: 'User Profile',
    icon: <ShoppingCartTwoToneIcon />,
    caption: 'Product Added'
  },
  {
    label: 'Billing Address',
    icon: <ApartmentIcon />,
    caption: 'Billing Information'
  },
  {
    label: 'Payment',
    icon: <CreditCardTwoToneIcon />,
    caption: 'Add & Update Card'
  }
];

// tabs
function TabPanel({ children, value, index, ...other }: TabsProps) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

// ==============================|| PRODUCT - CHECKOUT MAIN ||============================== //

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const { mode, borderRadius } = useConfig();
    const [Products,setProducts] = useState([])
    useEffect(()=>{
        (async()=>{
            const car:any= await util.readCart();
            setProducts(car)
        })()
    },[])
  const isCart = Products && Products.length > 0;

  const [value, setValue] = useState(cart.checkout.step > 2 ? 2 : cart.checkout.step);
  const [billing, setBilling] = useState(cart.checkout.billing);
  const [address, setAddress] = useState<Address[]>([]);
  const { addresses } = useSelector((state) => state.product);

  useEffect(() => {
    setAddress(addresses);
  }, [addresses]);

  useEffect(() => {
    dispatch(getAddresses());
  }, []);

  const addBillingAddress = (addressNew: Address) => {
    dispatch(addAddress(addressNew));
  };

  const editBillingAddress = (addressEdit: Address) => {
    dispatch(editAddress(addressEdit));
  };

  const handleChange = (newValue: number) => {
    setValue(newValue);
    dispatch(setStep(newValue));
  };

  useEffect(() => {
    setValue(cart.checkout.step > 2 ? 2 : cart.checkout.step);
  }, [cart.checkout.step]);

  const removeCartProduct = (id: string | number | undefined) => {
    dispatch(removeProduct(id, Products));
    dispatch(
      openSnackbar({
        open: true,
        message: 'Update Cart Success',
        variant: 'alert',
        alert: {
          color: 'success'
        },
        close: false
      })
    );
  };

  const updateQuantity = (id: string | number | undefined, quantity: number) => {
      let v:any=Products.map((elem:{}, index)=>{
        if(index==id){
          return {...elem,quantity:quantity}
        }
      })
      setProducts(v);
    dispatch(updateProduct(id, quantity, Products));
  };
console.log(Products);
  const onNext = () => {
    dispatch(setNextStep());
  };

  const onBack = () => {
    dispatch(setBackStep());
  };

  const billingAddressHandler = (addressBilling: Address | null) => {
    if (billing !== null || addressBilling !== null) {
      if (addressBilling !== null) {
        setBilling(addressBilling);
      }

      dispatch(setBillingAddress(addressBilling !== null ? addressBilling : billing));
      onNext();
    } else {
      dispatch(
        openSnackbar({
          open: true,
          message: 'Please select delivery address',
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
    }
  };

  const handleShippingCharge = (type: string) => {
    dispatch(setShippingCharge(type, cart.checkout.shipping));
  };

  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Tabs
            value={value}
            onChange={(e, newValue) => handleChange(newValue)}
            aria-label="icon label tabs example"
            variant="scrollable"
            sx={{
              '& .MuiTabs-flexContainer': {
                borderBottom: 'none'
              },
              '& .MuiTabs-indicator': {
                display: 'none'
              },
              '& .MuiButtonBase-root + .MuiButtonBase-root': {
                position: 'relative',
                overflow: 'visible',
                ml: 2,
                '&:after': {
                  content: '""',
                  bgcolor: '#ccc',
                  width: 1,
                  height: 'calc(100% - 16px)',
                  position: 'absolute',
                  top: 8,
                  left: -8
                }
              }
            }}
          >
            {tabsOption.map((tab, index) => (
              <Tab
                value={index}
                disabled={index > cart.checkout.step}
                key={index}
                icon={tab.icon}
                label={
                  <Grid container direction="column">
                    <Typography variant="subtitle1" color="inherit">
                      {tab.label}
                    </Typography>
                    <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
                      {tab.caption}
                    </Typography>
                  </Grid>
                }
                sx={{
                  color: cart.checkout.step >= value ? 'success.dark' : 'grey.900',
                  minHeight: 'auto',
                  minWidth: { xs: '100%', md: 250 },
                  padding: 2,
                  borderRadius: `${borderRadius}px`,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  textAlign: 'left',
                  justifyContent: 'flex-start',
                  '&:after': {
                    bgcolor: 'transparent !important'
                  },
                  '&.Mui-selected': {
                    color: 'primary.main',
                    bgcolor: mode === ThemeMode.DARK ? 'dark.main' : 'grey.50'
                  },
                  '& > svg': {
                    marginBottom: '0px !important',
                    mr: 1.25,
                    mt: 0.25,
                    height: 20,
                    width: 20
                  }
                }}
              />
            ))}
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          <TabPanel value={value} index={0}>
            {isCart && <Cart quantity={1} setProducts={setProducts} products={Products} checkout={cart.checkout} onNext={onNext} removeProduct={removeCartProduct} updateQuantity={updateQuantity} />}
            {!isCart && <CartEmpty />}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <BillingAddress
              products={Products}
              checkout={cart.checkout}
              onBack={onBack}
              billingAddressHandler={billingAddressHandler}
              address={address}
              addAddress={addBillingAddress}
              editAddress={editBillingAddress}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Payment checkout={cart.checkout} onBack={onBack} onNext={onNext} handleShippingCharge={handleShippingCharge} />
          </TabPanel>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Checkout;

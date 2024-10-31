// material-ui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// third-party
import currency from 'currency.js';

// project imports
import SubCard from 'ui-component/cards/SubCard';

// types
// import { CartCheckoutStateProps } from 'types/cart';
import { useEffect, useState } from 'react';
import util from 'api/checkout'
// ==============================|| CHECKOUT CART - ORDER SUMMARY ||============================== //

const OrderSummary = ({checkout }: { checkout: any }) => {
  const [total,setTotal]=useState(0)
  const [subtotal,setSubtotal]=useState(0)
  const shipping=5000
  const discount=0.00
  useEffect(()=>{
    (async()=>{
      const products:any=await util.readCart();
          let t=products.reduce((acc:any,el:any)=>acc+el.offerPrice,0)
          setSubtotal(t)
          setTotal(t+discount+shipping)
    })()
    

  },[])
  
  return (
  <SubCard>
    <TableContainer>
      <Table sx={{ minWidth: 'auto' }} size="small" aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle1">Order Summary</Typography>
            </TableCell>
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell>Sub Total</TableCell>
            <TableCell align="right">
              {subtotal && <Typography variant="subtitle1">{currency(subtotal).format()}</Typography>}
            </TableCell>
          </TableRow>
          {/* <TableRow>
            <TableCell>Coupon Discount</TableCell>
            <TableCell align="right">
              {discount && (
                <Typography variant="subtitle1">{discount <= 0 ? '-' : currency(discount).format()}</Typography>
              )}
            </TableCell>
          </TableRow> */}
          <TableRow>
            <TableCell>Shipping Charges</TableCell>
            <TableCell align="right">
              {shipping && (
                <Typography variant="subtitle1">{shipping <= 0 ? '-' : currency(shipping).format()}</Typography>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ borderBottom: 'none' }}>
              <Typography variant="subtitle1">Total</Typography>
            </TableCell>
            <TableCell align="right" sx={{ borderBottom: 'none' }}>
              {total && <Typography variant="subtitle1">{currency(total).format()}</Typography>}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </SubCard>
);
}

export default OrderSummary;

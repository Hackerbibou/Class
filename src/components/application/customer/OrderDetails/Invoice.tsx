'use client'
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// material-ui
import { useTheme } from '@mui/material/styles';
// import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import util from 'api/checkout'
// third-party
// import ReactToPrint from 'react-to-print';

// project imports
// import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
// import Chip from 'ui-component/extended/Chip';
import Logo from 'ui-component/Logo';
import { gridSpacing } from 'store/constant';

// types
import { ThemeMode } from 'types/config';
import CircularLoader from 'ui-component/CircularLoader';
import { useParams } from 'next/navigation';
import Image from 'next/image';

// table data
// function createData(product: string, description: string, quantity: string, amount: string, total: string) {
//   return { product, description, quantity, amount, total };
// }

// const rows = [
//   createData('Logo Design', 'lorem ipsum dolor sit amat, connecter adieu siccing eliot', '6', '$200.00', '$1200.00'),
//   createData('Landing Page', 'lorem ipsum dolor sit amat, connecter adieu siccing eliot', '7', '$100.00', '$700.00'),
//   createData('Admin Template', 'lorem ipsum dolor sit amat, connecter adieu siccing eliot', '5', '$150.00', '$750.00')
// ];
type cart ={
  image:string,
  name:string,
  quantity:number,
  offerPrice:number
}
interface Detail{
  name:string;
  cart:cart[];
  address:{
    phone:string;
    destination:string;
    name:string;
    building:string;
    street:string;
    city:string;
    state:string;
    country:string;
    post:string;
  };
  email:string;
  payment:string;
  total:string;
  date:string;

}
const Invoice = () => {
  const theme = useTheme();
  const componentRef: React.Ref<HTMLDivElement> = useRef(null);
  const params = useParams();
  const [detail, setDetail]=useState<Detail|null>(null);
  useEffect(()=>{
   
    (async()=>{
      const details:any=await util.readPastorder();
      if(details){
        const detail:any=details.reverse().find((el:any,ind:any)=>ind==params.index)
      setDetail(detail)
      }
      
    })()
    
  },[]);
  return detail==null? (<CircularLoader/>)  :(
    <Grid container justifyContent="center" spacing={gridSpacing}>
      <Grid item xs={12} md={10} lg={8} ref={componentRef}>
        <SubCard darkTitle title={`Invoice #${params.index}`} secondary={<Logo />}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Keur Sokhna Diarra</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">Marché HLM 5 Super-marché</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">Mame Diarra en face Police HLM</Typography>
                </Grid>
                {/* <Grid item xs={12}>
                  <Typography component={Link} href="#" variant="body2" color="primary">
                    demo@company.com
                  </Typography>
                </Grid> */}
                <Grid item xs={12}>
                  <Typography variant="body2">77 511 02 00</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item sm={5}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Typography variant="h5">Customer :</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={0}>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1">{detail.name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2">{detail.address.building+' '+detail.address.street}, {detail.address.city+' '+detail.address.state},</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2">{detail.address.country+' '+detail.address.post}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2">{detail.address.phone}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography component={Link} href="#" variant="body2" color="primary">
                           {detail.email}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sm={4}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Typography variant="h5">Order Details :</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={0}>
                        <Grid item xs={3}>
                          <Typography variant="body2">Date :</Typography>
                        </Grid>
                        <Grid item xs={9}>
                        <Typography variant="body2">{new Date(detail.date).toDateString()+' à '+new Date(detail.date).toLocaleTimeString() }</Typography>
                        </Grid>
                        {/* <Grid item xs={4} sx={{ my: 0.5 }}>
                          <Typography variant="body2">Status :</Typography>
                        </Grid>
                        <Grid item xs={8} sx={{ my: 0.5 }}>
                          <Chip label="Pending" variant="outlined" size="small" chipcolor="warning" />
                        </Grid> */}
                        <Grid item xs={4}>
                          <Typography variant="body2">Order Id :</Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant="body2">
                            {params.index}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TableContainer>
                <Table
                  sx={{
                    '& tr:last-of-type td': {
                      borderBottom: 'none'
                    },
                    '& thead tr th': {
                      borderBottom: 'none'
                    },
                    '& th:first-of-type, & td:first-of-type': {
                      pl: { xs: 2.5, md: 5 }
                    },
                    '& th:last-of-type, & td:last-of-type': {
                      pr: { xs: 6.25, md: 8.75 }
                    }
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ pl: 3 }}>DESCRIPTION</TableCell>
                      <TableCell align="right">QUANTITY</TableCell>
                      <TableCell align="right">AMOUNT</TableCell>
                      <TableCell align="right" sx={{ pr: 3 }}>
                        TOTAL
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {detail.cart.map((row:any, index:any) => (
                      <TableRow key={index}>
                        <TableCell sx={{ pl: 3, display:'flex', alignItems:'center', gap:2 }}>
                        <Image src={`https://olrfgwsbgyajiicxsnhz.supabase.co/storage/v1/object/public/productimages/${row.image}`} alt={row.name} width={52} height={52}/>
                          <Typography variant="body2">{row.name}</Typography>
                        </TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        <TableCell align="right">{row.offerPrice} cfa</TableCell>
                        <TableCell align="right" sx={{ pr: 3 }}>
                          {row.offerPrice*row.quantity} cfa
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
              <SubCard sx={{ bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'primary.light' }}>
                <Grid container justifyContent="flex-end" spacing={gridSpacing}>
                  <Grid item sm={6} md={4}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <Typography align="right" variant="subtitle1">
                              Sub Total :
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography align="right" variant="body2">
                              {detail.total} cfa
                            </Typography>
                          </Grid>
                         
                          
                          <Grid item xs={6}>
                            <Typography align="right" variant="subtitle1">
                              Shipping (5000 cfa) :
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography align="right" variant="body2">
                              5000 cfa
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <Typography align="right" color="primary" variant="subtitle1">
                              Total :
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography align="right" color="primary" variant="subtitle1">
                              {parseInt(detail.total)+5000} cfa
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </SubCard>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6">Terms and Condition :</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    Pour toute information veillez contacter 77 511 02 00
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
      <Grid item xs={12} md={10} lg={8}>
        <Grid
          container
          spacing={1}
          justifyContent="center"
          sx={{
            maxWidth: 850,
            mx: 'auto',
            mt: 0,
            mb: 2.5,
            '& > .MuiCardContent-root': {
              py: { xs: 3.75, md: 5.5 },
              px: { xs: 2.5, md: 5 }
            }
          }}
        >
          {/* <Grid item>
            <AnimateButton>
              <ReactToPrint trigger={() => <Button variant="contained">Print</Button>} content={() => componentRef.current} />
            </AnimateButton>
          </Grid> */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Invoice;

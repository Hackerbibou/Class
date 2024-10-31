// material-ui
'use client'
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
// import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import {useState,useEffect} from 'react'
// project imports
import SubCard from 'ui-component/cards/SubCard';
// import Chip from 'ui-component/extended/Chip';
import { gridSpacing } from 'store/constant';
import util from 'api/checkout'
// assets
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
// import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import PhoneAndroidTwoToneIcon from '@mui/icons-material/PhoneAndroidTwoTone';
import Loader from 'components/ui-component/CircularLoader'
// types
import { ThemeMode } from 'types/config';
import { useParams } from 'next/navigation';
import Image from 'next/image';

const detailsIconSX = {
  width: 15,
  height: 15,
  verticalAlign: 'text-top',
  mr: 0.5,
  mt: 0.25
};

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
const Details = () => {
  const theme = useTheme();
  const params= useParams();
  const [detail, setDetail]=useState<Detail|null>(null);
  useEffect(()=>{
   
    (async()=>{
      const details:any=await util.readPastorder();
      const detail:any=details.find((el:any,ind:any)=>ind==params.index)
      console.log(detail)
      setDetail(detail)
    })()
    
  },[]);
  return  detail==null? (<Loader/>)  :(<Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <SubCard title="Customer" secondary={<Typography variant="subtitle1">Placed on {new Date(detail.date).toDateString()}</Typography>}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item>
                  <Typography variant="body2">
                    <CalendarTodayTwoToneIcon sx={detailsIconSX} /> {detail.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    <PhoneAndroidTwoToneIcon sx={detailsIconSX} /> {detail.address.phone}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    <EmailTwoToneIcon sx={detailsIconSX} /> {detail.email}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={6} md={4}>
                  <Stack spacing={2}>
                    <Typography variant="h4">Payment method</Typography>
                    <Stack spacing={0}>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {detail.payment}
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle1">Transaction ID :</Typography>
                        <Typography variant="body2">000001-TXT</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle1">Amount :</Typography>
                        <Typography variant="body2">{detail.total}</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Stack spacing={2}>
                    <Typography variant="h4">Shipping method</Typography>
                    <Stack spacing={0}>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        Carrier
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle1">Tracking Code :</Typography>
                        <Typography variant="body2">FX-012345-6</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle1">Date :</Typography>
                        <Typography variant="body2">{new Date(detail.date).toDateString()+' à '+new Date(detail.date).toLocaleTimeString() }</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid>
                {/* <Grid item xs={12} sm={6} md={4}>
                  <Stack spacing={0} sx={{ mt: { xs: 0, md: 3 } }}>
                    <Stack direction="row" spacing={1}>
                      <Typography variant="subtitle1">Fulfillment status :</Typography>
                      <Typography variant="body2">Delivered</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Typography variant="subtitle1">Payment status :</Typography>
                      <Chip label="Paid" variant="outlined" size="small" chipcolor="success" />
                    </Stack>
                  </Stack>
                </Grid> */}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={gridSpacing}>
    
                <Grid item sm={6} md={4}>
                  <Stack spacing={2}>
                    <Typography variant="h4">Shipping address</Typography>
                    <Stack>
                      <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle1">Name :</Typography>
                        <Typography variant="body2">{detail.name}</Typography>
                      </Stack>
                     
                    </Stack>
                    <Stack>
                      <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle1">Address :</Typography>
                        <Typography variant="body2">{detail.address.building+' '+detail.address.street}</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle1">City :</Typography>
                        <Typography variant="body2">{detail.address.city}</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle1">Country :</Typography>
                        <Typography variant="body2">{detail.address.country}</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle1">State :</Typography>
                        <Typography variant="body2">{detail.address.state}</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle1">Zip code :</Typography>
                        <Typography variant="body2">{detail.address.post}</Typography>
                      </Stack>
                    </Stack>
                    <Stack>
                      <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle1">Phone :</Typography>
                        <Typography variant="body2">{detail.address.phone}</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
      <Grid item xs={12}>
        <SubCard title="Products" content={false}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ pl: 3 }}>Description</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Total</TableCell>
                      <TableCell align="right" sx={{ pr: 3 }} />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {detail.cart.map((row:cart, index:number) => (
                      <TableRow key={index}>
                        <TableCell sx={{ pl: 3, display:'flex', alignItems:'center', gap:2 }}>
                          <Image src={row.image} alt={row.name} width={52} height={52}/>
                          <Typography variant="body2">{row.name}</Typography>
                        </TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        <TableCell align="right">{row.offerPrice} cfa</TableCell>
                        <TableCell align="right">{row.offerPrice*row.quantity} cfa</TableCell>
                        {/* <TableCell sx={{ pr: 3 }} align="right">
                          <IconButton color="primary" size="large">
                            <DeleteTwoToneIcon />
                          </IconButton>
                        </TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
              <SubCard sx={{ mx: 3, mb: 3, bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'primary.light' }}>
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
                              {parseInt(detail.total)-5000} cfa
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography align="right" variant="subtitle1">
                              Livraison :
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography align="right" variant="body2">
                              5000 cfa
                            </Typography>
                          </Grid>
                          {/* <Grid item xs={6}>
                            <Typography align="right" variant="subtitle1">
                              Discount (5%) :
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography align="right" variant="body2">
                              $45.00
                            </Typography>
                          </Grid> */}
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ bgcolor: 'dark.main' }} />
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
                              {detail.total} cfa
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </SubCard>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
    </Grid>
  )
};

export default Details;

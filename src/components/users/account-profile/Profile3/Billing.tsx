'use client'
// import Link from 'next/link';
import util from 'api/checkout'
// material-ui
// import Button from '@mui/material/Button';
// import CardMedia from '@mui/material/CardMedia';
// import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
// import MuiLink from '@mui/material/Link';
// import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Typography from '@mui/material/Typography';

// // project imports
// import BillCard from 'ui-component/cards/BillCard';
import SubCard from 'ui-component/cards/SubCard';
// import AnimateButton from 'ui-component/extended/AnimateButton';
// import Chip from 'ui-component/extended/Chip';
import { gridSpacing } from 'store/constant';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

// assets
// const imageDiscover = '/assets/images/pages/card-discover.png';
// const imageMasterCard = '/assets/images/pages/card-master.png';
// const imageVisa = '/assets/images/pages/card-visa.png';

// table data
// function createData(tid: string, date: string, amount: string, badgeText: string, badgeType: string) {
//   return { tid, date, amount, badgeText, badgeType };
// }

// const rows = [
//   createData('12877227695', '26 Feb 2021 9:16 am', '$56.32', 'Awaiting', 'warning'),
//   createData('12901477937', '30 Jan 2021 2:54 pm', '$75.56', 'Paid', 'success'),
//   createData('12767886919', '22 Jan 2021 12:01 pm', '$34.23', 'Paid', 'success')
// ];

// ==============================|| PROFILE 3 - BILLING ||============================== //

const Billing = () => {
  const [history,setHistory]=useState([]);
  useEffect(()=>{
  (async()=>{
    const orders:any=await util.readPastorder()
    setHistory(orders)
  })()
},[])
  return (
    <Grid container spacing={gridSpacing}>
      {/* <Grid item xs={12} sm={6} md={4}>
        <BillCard primary="Bill Due" secondary="$150.00" link="Pay Now" color="orange.dark" bg="orange.light" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <BillCard primary="Total Credits" secondary="1570 GB" link="Full Report" color="warning.dark" bg="warning.light" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <BillCard primary="Plan" secondary="Basic" link="Upgrade?" color="success.dark" bg="success.light" />
      </Grid> */}
      {/* <Grid item xs={12}>
        <SubCard
          title="Payment Methods"
          secondary={
            <AnimateButton>
              <Button variant="contained" size="small">
                Add New Method
              </Button>
            </AnimateButton>
          }
        >
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                    <CardMedia component="img" image={imageVisa} title="payment" sx={{ width: 65 }} />
                    <Stack>
                      <Typography variant="subtitle1">Visa card</Typography>
                      <Typography variant="subtitle2">Ending in 5269 07XX XXXX 8110</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item>
                  <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                    <Chip label="Default" size="small" />
                    <Typography variant="caption" sx={{ color: 'grey.300' }}>
                      |
                    </Typography>
                    <MuiLink component={Link} href="#" underline="hover">
                      Edit
                    </MuiLink>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                    <CardMedia component="img" image={imageDiscover} title="payment" sx={{ width: 65 }} />
                    <Stack>
                      <Typography variant="subtitle1">Discover</Typography>
                      <Typography variant="subtitle2">Ending in 6109 07XX XXXX 8020</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item>
                  <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                    <MuiLink component={Link} href="#" color="secondary" underline="hover">
                      Make Default
                    </MuiLink>
                    <Typography variant="caption" sx={{ color: 'grey.300' }}>
                      |
                    </Typography>
                    <MuiLink component={Link} href="#" underline="hover">
                      Edit
                    </MuiLink>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                    <CardMedia component="img" image={imageMasterCard} title="payment" sx={{ width: 65 }} />
                    <Stack>
                      <Typography variant="subtitle1">Mastercard</Typography>
                      <Typography variant="subtitle2">Ending in 7278 07XX XXXX 4290</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item>
                  <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                    <MuiLink component={Link} href="#" color="secondary" underline="hover">
                      Make Default
                    </MuiLink>
                    <Typography variant="caption" sx={{ color: 'grey.300' }}>
                      |
                    </Typography>
                    <MuiLink component={Link} href="#" underline="hover">
                      Edit
                    </MuiLink>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </SubCard>
      </Grid> */}
      <Grid item xs={12}>
        <SubCard sx={{ overflowX: 'auto' }} title="Billing History" content={false}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ pl: 3 }}>Order No.</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Price</TableCell>
                  {/* <TableCell sx={{ pr: 3 }}>Status</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {history.length?history.map((row:any, index:number) => (
                  <TableRow hover key={index}>
                    <TableCell sx={{ pl: 3 }}>{index}</TableCell>
                    <TableCell>{new Date(row.date).toDateString()+' à '+new Date(row.date).toLocaleTimeString() }</TableCell>
                    <TableCell>{row.total} cfa</TableCell>
                    {/* <TableCell sx={{ pr: 3 }}>
                      <Chip chipcolor={row.badgeType} label={row.badgeText} size="small" />
                    </TableCell> */}
                  </TableRow>
                )):<Box sx={{ p: 3, display:'flex',justifyContent:'center', alignItems:'center', width:'100%' }}>No orders yet</Box>}
              </TableBody>
            </Table>
          </TableContainer>
        </SubCard>
      </Grid>
    </Grid>
  );
};

export default Billing;

// material-ui
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import util from 'api/checkout'
// project imports
import SubCard from 'ui-component/cards/SubCard';
import Chip from 'ui-component/extended/Chip';

// types
import { Address } from 'types/e-commerce';

// assets
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

// ==============================|| CHECKOUT BILLING ADDRESS - ADDRESS CARD ||============================== //

interface AddressCardProps {
  setAddid?:any;
  setEdit?:any;
  index?:number;
  address: Address | null;
  single?: boolean;
  change?: boolean;
  onBack?: () => void;
  handleClickOpen?: (billingAddress: Address) => void;
  billingAddressHandler?: (billingAddress: Address) => void;
}

const AddressCard = ({setAddid,setEdit,index, address, single, change, handleClickOpen, billingAddressHandler, onBack }: AddressCardProps) => {

  
return (
  <SubCard sx={{ height: single ? 'auto' : '100%' }}>
    {address && (
      <Grid container spacing={2}>
        {single && (
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant={change ? 'h3' : 'h3'}>Shipping Address</Typography>
              {change && (
                <Button variant="contained" size="small" color="primary" startIcon={<EditTwoToneIcon />} onClick={onBack}>
                  Change
                </Button>
              )}
            </Stack>
          </Grid>
        )}
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography variant="subtitle1">{address.name}</Typography>
              <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
                ({address.destination})
              </Typography>
            </Stack>
            {address.isDefault && <Chip chipcolor="primary" label="Default" size="small" />}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={0.5}>
            <Typography variant="body2">
              {`${address.building}, ${address.street}, ${address.city}, ${address.state}, ${address.country} - ${address.post}`}
            </Typography>
            <Typography variant="caption" color="secondary">
              {address.phone}
            </Typography>
          </Stack>
        </Grid>
        {!single && (
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              {billingAddressHandler && (
                <Button variant="outlined" onClick={() => billingAddressHandler(address)}>
                  Deliver to this Address
                </Button>
              )}
              <Stack direction="row" alignItems="center" spacing={0}>
                {handleClickOpen && (
                  <IconButton size="small" onClick={() => {handleClickOpen(address);setEdit(true);setAddid(index)}} aria-label="Edit Address">
                    <EditTwoToneIcon fontSize="small" />
                  </IconButton>
                )}
                <IconButton size="small" aria-label="Delete Address" onClick={async()=> await util.removeAddress(index)}>
                  <DeleteTwoToneIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
          </Grid>
        )}
      </Grid>
    )}
  </SubCard>
);
}

export default AddressCard;

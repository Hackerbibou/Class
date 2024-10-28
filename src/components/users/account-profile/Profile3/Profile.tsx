// material-ui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// project imports
import useAuth from 'hooks/useAuth';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import Logo from 'ui-component/Logo';

// assets
const Avatar1 = '/assets/images/logo.svg';

// ==============================|| PROFILE 3 - PROFILE ||============================== //

const Profile = () => {
  const { user } = useAuth();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item sm={6} md={4}>
        <SubCard title="Keur Sokhna Diarra" contentSX={{ textAlign: 'center' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Logo w={140}/>
            </Grid>
          
            <Grid item xs={12}>
              <Typography variant="subtitle2" align="center">
                Merci d'étre membre de notre communauté
              </Typography>
            </Grid>
            {/* <Grid item xs={12}>
              <AnimateButton>
                <Button variant="contained" size="small">
                  Upload Avatar
                </Button>
              </AnimateButton>
            </Grid> */}
          </Grid>
        </SubCard>
      </Grid>
      <Grid item sm={6} md={8}>
        <SubCard title="Edit Account Details">
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <TextField id="outlined-basic1" fullWidth label="Name" defaultValue={user?.name} helperText="Helper text" />
            </Grid>
            <Grid item xs={12}>
              <TextField id="outlined-basic6" fullWidth label="Email address" defaultValue="name@example.com" />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField id="outlined-basic4" fullWidth label="Company" defaultValue="Materially Inc." />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField id="outlined-basic5" fullWidth label="Country" defaultValue="USA" />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField id="outlined-basic7" fullWidth label="Phone number" defaultValue="4578-420-410 " />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField id="outlined-basic8" fullWidth label="Birthday" defaultValue="31/01/2001" />
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row">
                <AnimateButton>
                  <Button variant="contained">Change Details</Button>
                </AnimateButton>
              </Stack>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
    </Grid>
  );
};

export default Profile;

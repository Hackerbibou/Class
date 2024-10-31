// material-ui
"use client"
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import util from 'api/clientuser'
// project imports
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import { useState } from 'react';
import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';

// ==============================|| PROFILE 3 - SECURITY ||============================== //

const Security = () => {
  const [password,setPassword]=useState('');
  const [confirmPassword,setConfirmPassword]=useState('');
  function handleChange(e:any,temp:string){
    e.preventDefault();
    if(temp=='password'){
      setPassword(e.target.value);
    }else{
      setConfirmPassword(e.target.value);
    }
  }
  function handleSubmit(e:any){
    e.preventDefault();
    if(password!=confirmPassword){
      dispatch(
        openSnackbar({
          open: true,
          message: "Password didn't match",
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
    }else{
      (async()=>{
        await util.EditPassword(password);
      })();
    }
  }
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item sm={12} md={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <SubCard title="Change Password">
              <Grid container spacing={gridSpacing}>
                {/* <Grid item xs={12}>
                  <TextField type="password" id="outlined-basic9" fullWidth label="Current password" />
                </Grid> */}
                <Grid item xs={6}>
                  <TextField type="password" onChange={(e)=>handleChange(e,'password')} id="outlined-basic10" value={password} fullWidth label="New Password" />
                </Grid>
                <Grid item xs={6}>
                  <TextField type="password" onChange={(e)=>handleChange(e,'confirmPassword')} id="outlined-basic11" value={confirmPassword}  fullWidth label="Re-enter New Password" />
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row">
                    <AnimateButton>
                      <Button onClick={handleSubmit} variant="contained">Changé de Mot de passe</Button>
                    </AnimateButton>
                  </Stack>
                </Grid>
              </Grid>
            </SubCard>
          </Grid>
        </Grid>
      </Grid>
      
      
    </Grid>
  );
};

export default Security;

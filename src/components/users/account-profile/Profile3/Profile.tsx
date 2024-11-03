// material-ui
'use client'
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import util from 'api/clientuser';
// project imports
// import useAuth from 'hooks/useAuth';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import Logo from 'ui-component/Logo';
import { useEffect, useState } from 'react';

// assets
// const Avatar1 = '/assets/images/logo.svg';

// ==============================|| PROFILE 3 - PROFILE ||============================== //
interface User{
  email:string;
  phone:string;
  user_metadata:{
    last_name:string,
    first_name:string,
    phone:string
  };
}
const Profile = () => {
  
  const [temp, setTemp]= useState<User>({
    email:'Email',
    phone:'Phone',
    user_metadata:{
    last_name:'Last name',
    first_name:'First name',
    phone:'phone'
  }
  })
  // const [user, setUser]= useState<User>({
  //   email:'Email',
  //   phone:'Phone',
  //   user_metadata:{
  //   last_name:'Last name',
  //   first_name:'First name',
  //   phone:'phone'
  // }
  // })
  useEffect(()=>{
    (async()=>{
      const use :any=await util.Getuser();
      if(use){
        setTemp({
        email: use.email,
        phone: use.phone,
        user_metadata:{
        last_name: use.user_metadata.last_name,
        first_name: use.user_metadata.first_name,
        phone: use.user_metadata.phone
      }
      })
      }
      
      // setUser(use);
    })();
  },[])
  function handleChange(e:any,item:string){
    e.preventDefault();
    if(item=='email'){
      setTemp({...temp,email:e.target.value})
    } else if(item=='phone'){
      setTemp({...temp,phone:e.target.value})
    } else if(item=='lastname'){
      setTemp({...temp,user_metadata:{
        ...temp.user_metadata,last_name:e.target.value
      }})
    } else if(item=='firstname'){
      setTemp({...temp,user_metadata:{
        ...temp.user_metadata,first_name:e.target.value
      }})
    }


  }
  function handleSubmit(e:any){
    e.preventDefault();
    (async()=>{
      await util.EditUser(temp);
    })()
  }

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
          <Grid item md={6} xs={12}>
              <TextField id="outlined-basic1" fullWidth label="First name" onChange={(e)=>handleChange(e,'firstname')} value={temp.user_metadata.first_name} />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField id="outlined-basic2" fullWidth label="Last name" onChange={(e)=>handleChange(e,'lastname')} value={temp.user_metadata.last_name} />
            </Grid>
            <Grid item xs={12}>
              <TextField id="outlined-basic3" fullWidth label="Email address" onChange={(e)=>handleChange(e,'email')} value={temp.email}/>
            </Grid>
            {/* <Grid item md={6} xs={12}>
              <TextField id="outlined-basic4" fullWidth label="Company" value="Materially Inc." />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField id="outlined-basic5" fullWidth label="Country" value="USA" />
            </Grid> */}
            <Grid item md={6} xs={12}>
              <TextField id="outlined-basic7" fullWidth label="Phone number" onChange={(e)=>handleChange(e,'phone')} value={temp.user_metadata.phone} />
            </Grid>
          
            <Grid item xs={12}>
              <Stack direction="row">
                <AnimateButton>
                  <Button onClick={handleSubmit} variant="contained">Change Details</Button>
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

import React from 'react';
import '../src/App.css';
import {Grid,Button} from '@mui/material';

export default function Login() {
  return (

<Grid class="login-box">

    <form>
      <Grid class="user-box">
        <input type="email"/>
        <label>Email</label>
      </Grid>
      <Grid class="user-box">
        <input type="password"/>
        <label>password</label>
      </Grid>
      <center>
      <Button style={{fontWeight:600,fontSize:"16px",}} >
        
        Login
      </Button></center>
    </form>
  </Grid>
  )
}

import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import {signUp, chat, useStyles} from '../App';
import Cookies from 'js-cookie';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<string>>
}

export default function SignIn({setPage}: Props) {
  const classes = useStyles();

  const [login, setLogin] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const signUpRequest = (): void => {
    const uri = `http://localhost:5000/signin?login=${login}&password=${password}`
    fetch(uri, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(json => {
        json.access_token && Cookies.set("token", json.access_token)
        json.access_token && setPage(chat)
        Cookies.set("userLogin", login)
      })
  } 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target
    name === "login" && setLogin(value)
    name === "password" && setPassword(value)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {"Sign in"}
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="login"
                label="Login"
                name="login"
                autoComplete="login"
                value={login}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signUpRequest}
          >
            {"Sign In"}
          </Button>
          <Grid item>
              <Link
                variant="body2" 
                onClick={(): void => setPage(signUp)} 
                style={{cursor: "pointer"}}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
        </form>
      </div>
    </Container>
  );
}
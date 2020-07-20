import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Cookies from 'js-cookie';

import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import {signIn, chat, useStyles} from '../App';
import { url } from '../config/index';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<string>>
}

export default function SignUp({setPage}: Props) {
  const classes = useStyles();

  const [login, setLogin] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [repeatPassword, setRepeatPassword] = useState<string>("")

  const signUpRequest = (): void => {
    if (password === repeatPassword) {
      const uri = `${url}signup?login=${login}&password=${password}`
      fetch(uri, {
        method: 'POST',
      })
        .then(response => response.json())
        .then(json => { 
          json.access_token && Cookies.set("token", json.access_token)
          json.access_token && setPage(chat)
          Cookies.set("userLogin", login)
        });
      }
  } 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target
    name === "login" && setLogin(value)
    name === "password" && setPassword(value)
    name === "repeat password" && setRepeatPassword(value)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {"Sign up"}
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
                autoComplete="username"
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
                autoComplete="new-password"
                value={password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="repeat password"
                label="Repeat password"
                type="password"
                id="repeat password"
                autoComplete="new-password"
                value={repeatPassword}
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
            {"Sign Up"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link 
                variant="body2" 
                onClick={(): void => setPage(signIn)} 
                style={{cursor: "pointer"}}
              >
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
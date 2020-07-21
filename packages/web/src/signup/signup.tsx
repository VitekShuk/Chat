import React, { useState, ReactElement } from "react"
import Avatar from "@material-ui/core/Avatar"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"

import Container from "@material-ui/core/Container"
import Link from "@material-ui/core/Link"
import { PagesEnum } from "../enums/pages.enum"
import { url, signup } from "../config/config"
import { signStyles } from "../styles/styles"
import { pageProps } from "../types/api"
import { request } from "../common/common"
import { ButtonBase } from "../ui/button-base"

export const SignUp = ({setPage}: pageProps): ReactElement => {
  const classes = signStyles()
  const [login, setLogin] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [repeatPassword, setRepeatPassword] = useState<string>("")
  const uri = `${url}${signup}?login=${login}&password=${password}`

  const signUpRequest = (): void => {
    request({uri, login, setPage})
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
          <ButtonBase 
            buttonText={"Sign Up"}
            handleClick={signUpRequest}
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Link 
                variant="body2" 
                onClick={(): void => setPage(PagesEnum.SIGNIN)} 
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
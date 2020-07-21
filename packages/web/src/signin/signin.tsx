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
import { url, signin } from "../config/config"
import { signStyles } from "../styles/styles"
import { pageProps } from "../types/api"
import { request } from "../common/common"
import { ButtonBase } from "../ui/button-base"

export const SignIn = ({setPage}: pageProps): ReactElement => {
  const classes = signStyles();
  const [login, setLogin] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const uri = `${url}${signin}?login=${login}&password=${password}`

  const signInRequest = (): void => {
    request({uri, login, setPage})
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
          <ButtonBase 
            buttonText={"Sign In"}
            handleClick={signInRequest}
          />
          <Grid item>
              <Link
                variant="body2" 
                onClick={(): void => setPage(PagesEnum.SIGNUP)} 
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
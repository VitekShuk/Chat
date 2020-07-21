import React, { useEffect, useState, ReactElement } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import socketIOClient from "socket.io-client"

import ChatIcon from "@material-ui/icons/Chat"
import Cookies from "js-cookie"
import { PagesEnum } from "../enums/pages.enum"
import { Box } from "@material-ui/core"
import { url } from "../config/config"
import { chatStyles } from "../styles/styles"
import { pageProps, messageProps } from "../types/api"
import { ButtonBase } from "../ui/button-base"
import { MessageBox } from "../ui/message-box"

const socket = socketIOClient(url);
socket.disconnect()

export const Chat = ({setPage}: pageProps): ReactElement => {
  const classes = chatStyles();
  const [massage, setMessage] = useState<string>("")
  const [messagesList, setMessagesList] = useState<messageProps[]>([])
  const userLogin = Cookies.get("userLogin")

  socket.connect()

  const handleOut = (): void => {
    Cookies.set("token", "")
    Cookies.set("userLogin", "")
    setPage(PagesEnum.SIGNIN)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target
    name === "message" && setMessage(value)
  }

  const sendMessage = (): void => {
    socket.emit("events", JSON.stringify({ 
      command: "createMessage", 
      data: {
        text: massage,
      }
    }))
    setMessage("")
  }

  useEffect((): (() => void) => {
    socket.emit("messages", 
      JSON.stringify({ command: "getAllMessages" }), 
      (data: any) => {
        setMessagesList(data)
      }
    );
    socket.on("messages", (data: any) => {
      setMessagesList(data)
    })

    return (): void => {socket.disconnect()};
  }, []);
  
  return (
    <Container
      component="main" 
      maxWidth="sm"
    >
      <Button 
        variant="outlined" 
        size="small"
        className={classes.buttonOut}
        onClick={handleOut}
        >
          {"Out"}
      </Button>
      <CssBaseline />
      <div className={classes.paper}>
        <Box className={classes.userLogin}>
          {userLogin}
        </Box>
        <Avatar className={classes.avatar}>
          <ChatIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {"Bla-bla-chat"}
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                height="500px"
                component="div" 
                border="1px solid"
                borderRadius="4px"
                borderColor="rgba(0, 0, 0, 0.23)"
                padding="10px"
                className={classes.messageBox}
              >
                {messagesList.map((item: any): ReactElement => 
                  <MessageBox 
                    key={item.id} 
                    login={item.login} 
                    text={item.text} 
                    createdAt={item.createdAt} 
                  />)}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="message"
                label="Message"
                type="message"
                id="message"
                multiline
                value={massage}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <ButtonBase 
            buttonText={"Send"}
            handleClick={sendMessage}
          />
        </form>
      </div>
    </Container>
  );
}

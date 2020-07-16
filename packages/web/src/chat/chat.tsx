import React, { useEffect, useState, ReactElement, EffectCallback } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import socketIOClient from 'socket.io-client';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';
import parseISO from 'date-fns/parseISO';

import ChatIcon from '@material-ui/icons/Chat';
import Cookies from 'js-cookie';
import {signIn} from '../App';
import { Box } from '@material-ui/core';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<string>>
}

interface messageProps {
  login: string
  text: string
  createdAt: string
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: "288px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonOut: {
    position: 'absolute',
  },
  messageInfo: {
    color: "rgba(0, 0, 0, 0.5)",
  },
  messageBox: {
    overflowX: "hidden",
    overflowY: "auto",
  },
  message: {
    marginBottom: "14px",
    marginLeft: "10px",
    marginRight: "10px",
    maxWidth: "458px",
    wordWrap: "break-word",
  },
  userLogin: {
    marginLeft: "auto",
    marginRight: 0,
    fontSize: 16,
  },
}));

const ENDPOINT = "http://localhost:5000";
const socket = socketIOClient(ENDPOINT);
socket.disconnect()

export default function Chat({setPage}: Props) {
  const classes = useStyles();

  socket.connect()

  const [massage, setMessage] = useState<string>('')
  const [messagesList, setMessagesList] = useState<messageProps[]>([])
  const userLogin = Cookies.get("userLogin")

  const handleOut = (): void => {
    Cookies.set("token", "")
    Cookies.set("userLogin", "")
    setPage(signIn)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target
    name === "message" && setMessage(value)
  }

  const sendMessage = (): void => {
    socket.emit('events', JSON.stringify({ 
      command: "createMessage", 
      data: {
        text: massage,
      }
    }))
    setMessage("")
  }

  useEffect((): (() => void) => {
    socket.emit('messages', 
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

  const MessageBox = ({login, text, createdAt}: messageProps): ReactElement => {
    const date = format(parseISO(createdAt), "Pp", {
      locale: ru,
    })

    return (
      <>
        <Box className={classes.messageInfo}>
          {`${date}, ${login}: `}
        </Box>
        <Box className={classes.message}>
          {text}
        </Box>
      </>
    )
  }
  

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
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={sendMessage}
          >
            {"Send"}
          </Button>
        </form>
      </div>
    </Container>
  );
}
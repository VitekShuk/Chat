import React, { useState, useEffect } from 'react';
import SignUp from './signup/signup';
import SignIn from './signin/signin';
import Chat from './chat/chat';
import { makeStyles } from '@material-ui/core';
import Cookies from 'js-cookie';

export const signIn = "signIn"
export const signUp = "signUp"
export const chat = "chat"

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
}));

function App() {
  const [page, setPage] = useState<string>(signIn)
  
  useEffect((): void => {
    const token = Cookies.get('token')
    token && setPage(chat)
  }, [])

  return (
    <>
      {page === signUp && <SignUp setPage={setPage} />}
      {page === signIn && <SignIn setPage={setPage} />}
      {page === chat && <Chat setPage={setPage} />}
    </>
  );
}

export default App;

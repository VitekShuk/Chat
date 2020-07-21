import React, { useState, useEffect } from "react"
import { SignUp } from "./signup/signup"
import { SignIn } from "./signin/signin"
import { Chat } from "./chat/chat"
import Cookies from "js-cookie"
import { PagesEnum } from "./enums/pages.enum"

function App() {
  const [page, setPage] = useState<string>(PagesEnum.SIGNIN)
  
  useEffect((): void => {
    const token = Cookies.get("token")
    token && setPage(PagesEnum.CHAT)
  }, [])

  return (
    <>
      {page === PagesEnum.SIGNUP && <SignUp setPage={setPage} />}
      {page === PagesEnum.SIGNIN && <SignIn setPage={setPage} />}
      {page === PagesEnum.CHAT && <Chat setPage={setPage} />}
    </>
  );
}

export default App;

import Cookies from "js-cookie"
import { PagesEnum } from "../enums/pages.enum"
import { requestProps } from "../types/api"

export const request = ({uri, login, setPage, method}: requestProps): void => {
  fetch(uri, {
    method: method || "POST",
  })
    .then(response => response.json())
    .then(json => {
      json.access_token && Cookies.set("token", json.access_token)
      json.access_token && setPage(PagesEnum.CHAT)
      Cookies.set("userLogin", login)
    })
}
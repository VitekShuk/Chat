export interface pageProps {
  setPage: React.Dispatch<React.SetStateAction<string>>
}

export interface messageProps {
  login: string
  text: string
  createdAt: string
}

export interface requestProps {
  uri: string
  login: string
  setPage: React.Dispatch<React.SetStateAction<string>>
  method?: string
}

export interface buttonProps {
  buttonText:string
  handleClick: () => void
}
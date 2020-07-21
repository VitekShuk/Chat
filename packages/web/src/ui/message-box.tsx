
import React, { ReactElement } from "react"
import { format } from "date-fns"
import ru from "date-fns/locale/ru"
import parseISO from "date-fns/parseISO"
import { Box } from "@material-ui/core"
import { chatStyles } from "../styles/styles"
import { messageProps } from "../types/api"

export const MessageBox = ({login, text, createdAt}: messageProps): ReactElement => {
  const classes = chatStyles();
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

import React, { ReactElement } from "react"
import Button from "@material-ui/core/Button"
import { signStyles } from "../styles/styles"
import { buttonProps } from "../types/api"

export const ButtonBase = ({buttonText, handleClick}: buttonProps): ReactElement => {
  const classes = signStyles()

  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
      onClick={handleClick}
    >
      {buttonText}
    </Button>
  )
}
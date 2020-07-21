import { makeStyles } from "@material-ui/core"

export const signStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const chatStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: "288px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonOut: {
    position: "absolute",
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
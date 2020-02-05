export default {
  palette: {
    primary: {
      light: "#87E1FF",
      main: "#f50057",
      dark: "#00A2D8",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff80ab",
      main: "#043F66",
      dark: "#00BDFF",
      contrastText: "fff"
    }
  },
  spreadTheme: {
    form: {
      textAlign: "center"
    },
    avatar: {
      width: 80,
      height: 80
    },
    image: {
      margin: "5px auto 5px auto",
      maxHeight: 180,
      maxWidth: 180
    },
    textField: {
      margin: "10px auto 10px auto"
    },
    button: {
      margin: "10px",
      boxShadow: "none !important",
      position: "relative",
      color: "white"
    },
    credentialError: {
      color: "red",
      fontSize: "0.8rem"
    },
    progress: {
      position: "absolute"
    },
    formContainer: {
      paddingLeft: "20px",
      paddingRight: "20px"
    },
    formLink: {
      paddingTop: "10px",
      paddingBottom: "10px"
    },
    paper: {
      padding: 10,
      boxShadow: "none !important",
      borderStyle: "solid",
      borderWidth: "2px",
      borderColor: "#E6ECF0"
    },
    profileAvatar: {
      textAlign: "center",
      width: "80",
      height: "80"
    },
    profile: {
      "& .image-wrapper": {
        width: 80,
        height: 80,
        textAlign: "center",
        position: "relative",
        "& button": {
          position: "absolute",
          top: "80%",
          left: "70%"
        }
      },
      "& .profile-image": {
        width: 200,
        height: 200,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%"
      },
      "& .profile-details": {
        textAlign: "center",
        "& span, svg": {
          verticalAlign: "middle"
        }
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0"
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer"
        }
      }
    },
    buttons: {
      textAlign: "center",
      boxShadow: "none !important",
      "& a": {
        margin: "20px 10px",
        boxShadow: "none !important"
      }
    }
  }
};

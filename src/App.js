import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
//PAGES
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
//COMPONENTS
import Navbar from "./components/Navbar";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#87E1FF",
      main: "#00BFFE",
      dark: "#00A2D8",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff80ab",
      main: "#ff4081",
      dark: "#f50057",
      contrastText: "fff"
    }
  },
  spreadTheme: {
    form: {
      textAlign: "center"
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
      position: "relative"
    },
    credentialError: {
      color: "red",
      fontSize: "0.8rem"
    },
    progress: {
      position: "absolute"
    }
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div
          className="App"
          style={{ backgroundColor: "#fff", borderRadius: "15px" }}
        >
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
            </Switch>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

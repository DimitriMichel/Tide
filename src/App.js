import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeConfig from "./util/theme";
import decoder from "jwt-decode";

//PAGES
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";

//COMPONENTS
import Navbar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute"

const theme = createMuiTheme(themeConfig);

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = decoder(token);
  console.log(decodedToken);
  // Set Token Expiry Window
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}
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
              <AuthRoute exact path="/login" component={login} authenticated={authenticated} />
              <AuthRoute exact path="/signup" component={signup} authenticated={authenticated}/>
            </Switch>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

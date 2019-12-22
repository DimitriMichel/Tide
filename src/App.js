import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeConfig from "./util/theme";
import jwtDecode from "jwt-decode";

//REDUX
import { Provider } from "react-redux";
import store from "./redux/store"
//PAGES
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";

//COMPONENTS
import Navbar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute";

const theme = createMuiTheme(themeConfig);

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  // Set Token Expiry Window
  if (decodedToken.exp * 1001 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
    console.log(authenticated);
  } else {
    authenticated = true;
    console.log(authenticated);
  }
}
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <div
            className="App"
            style={{ backgroundColor: "#fff", borderRadius: "5px" }}
          >
            <Router>
              <Navbar />
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute
                  exact
                  path="/login"
                  authenticated={authenticated}
                  component={login}
                />
                <AuthRoute
                  exact
                  path="/signup"
                  authenticated={authenticated}
                  component={signup}
                />
              </Switch>
            </Router>
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;

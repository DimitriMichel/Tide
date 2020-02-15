import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeConfig from "./util/theme";
import jwtDecode from "jwt-decode";
import axios from "axios";

//REDUX
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

//PAGES
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user";
import news from "./pages/news";

//COMPONENTS
import Navbar from "./components/Structure/Navbar";
import AuthRoute from "./util/AuthRoute";

const theme = createMuiTheme(themeConfig);
axios.defaults.baseURL =
  "https://us-central1-theory-35917.cloudfunctions.net/api";
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  // Set Token Expiry Window
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    logoutUser();
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <div className="App">
            <Router>
              <Navbar />
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
                <Route exact path="/user/:handle" component={user} />
                <Route
                  exact
                  path="/user/:handle/wave/:waveID"
                  component={user}
                />
                <Route exact path="/news" component={news} />
              </Switch>
            </Router>
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;

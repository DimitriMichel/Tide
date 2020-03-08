import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AppButton from "../../util/AppButton";
import PostWave from "../Wave/PostWave";
import Notifications from "./Notifications";

//Icons
import { TiHome } from "react-icons/ti";
import { IoMdLogIn } from "react-icons/io";
import { TiUserAdd } from "react-icons/ti";
import { TiRss } from "react-icons/ti";

//MATERIAL UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (

        <AppBar className="app-bar"  position="sticky">
          <Toolbar className="nav-container">
            {authenticated ? (
              <Fragment>
                <Link to="/">
                  <AppButton tip="Home">
                    <TiHome size={32} style={{ color: "#043F66" }} />
                  </AppButton>
                </Link>
                <PostWave color="secondary" />
                <Notifications color="secondary" />
                <Link to="/news">
                  <AppButton tip="News">
                    <TiRss style={{ color: "#043F66" }} size={32} />
                  </AppButton>
                </Link>
              </Fragment>
            ) : (
              <Fragment>
                <span className="parent-span">
                  <Button component={Link} to="/login">
                    <IoMdLogIn
                      size={30}
                      style={{ paddingRight: 2, color: "#043F66" }}
                    />
                    Login
                  </Button>
                </span>
                <span className="parent-span">
                  <Button component={Link} to="/">
                    <TiHome
                      size={30}
                      style={{ paddingRight: 2, color: "#043F66" }}
                    />
                    Home
                  </Button>
                </span>
                <span className="parent-span">
                  <Button component={Link} to="/signup">
                    <TiUserAdd
                      size={32.5}
                      style={{
                        paddingRight: 2,
                        paddingTop: 3,
                        color: "#043F66"
                      }}
                    />
                    Sign Up
                  </Button>
                </span>
              </Fragment>
            )}
          </Toolbar>
        </AppBar>
    );
  }
}
Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);

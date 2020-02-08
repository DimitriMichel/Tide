import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AppButton from "../../util/AppButton";
import PostWave from "../Wave/PostWave";
//MATERIAL UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import AssignmentRoundedIcon from "@material-ui/icons/AssignmentRounded";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";
import RssFeedIcon from "@material-ui/icons/RssFeed";
//REDUX
class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar className="app-bar" position="sticky">
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              <Link to="/">
                <AppButton tip="Home">
                  <HomeIcon color="secondary" />
                </AppButton>
              </Link>
              <PostWave />
              <AppButton tip="Notifications">
                <Notifications color="secondary" />
              </AppButton>
              <Link to="/">
                <AppButton tip="News">
                  <RssFeedIcon color="secondary" />
                </AppButton>
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <span className="parent-span">
                <Button component={Link} to="/login">
                  <ExitToAppRoundedIcon
                    style={{ paddingRight: 2, color: "#043F66" }}
                  />
                  Login
                </Button>
              </span>
              <span className="parent-span">
                <Button component={Link} to="/">
                  <HomeRoundedIcon
                    style={{ paddingRight: 2, color: "#043F66" }}
                  />
                  Home
                </Button>
              </span>
              <span className="parent-span">
                <Button component={Link} to="/signup">
                  <AssignmentRoundedIcon
                    style={{ paddingRight: 2, color: "#043F66" }}
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

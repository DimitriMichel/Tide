import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AppButton from "../../util/AppButton";
import PostWave from "../Wave/PostWave";
import Notifications from "./Notifications"

//Icons
import { AiOutlineLogin } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";


//MATERIAL UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import RssFeedIcon from "@material-ui/icons/RssFeed";



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
                  <AiFillHome style={{color: "#043F66"}} />
                </AppButton>
              </Link>
              <PostWave />
                <Notifications color="secondary" />
              <Link to="/news">
                <AppButton tip="News">
                  <RssFeedIcon color="secondary" />
                </AppButton>
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <span className="parent-span">
                <Button component={Link} to="/login">
                  <AiOutlineLogin size={30}
                    style={{ paddingRight: 2, color: "#043F66" }}
                  />
                  Login
                </Button>
              </span>
              <span className="parent-span">
                <Button component={Link} to="/">
                  <AiOutlineHome size={30}
                    style={{ paddingRight: 2, color: "#043F66" }}
                  />
                  Home
                </Button>
              </span>
              <span className="parent-span">
                <Button component={Link} to="/signup">
                  <AiOutlineUserAdd size={30}
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

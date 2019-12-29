import React, { Component } from "react";
import { connect } from 'react-redux';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import AssignmentRoundedIcon from "@material-ui/icons/AssignmentRounded";
import PropTypes from "prop-types";

class Navbar extends Component {
  render() {
    return (
      <AppBar
        position="sticky"
        style={{
          background: "#FFF",
          boxShadow: "none",
          borderBottomColor: "#E6ECF0",
          borderBottom: "2px solid #E6ECF0",
          borderRadius: "15px 15px 0 0"
        }}
      >
        <Toolbar>
          <span className="parent-span">
            <Button component={Link} to="/login">
              <ExitToAppRoundedIcon style={{ paddingRight: 2, color:"#043F66" }} />
              Login
            </Button>
          </span>
            <span className="parent-span">
            <Button component={Link} to="/">
              <HomeRoundedIcon style={{ paddingRight: 2, color:"#043F66" }} />
              Home
            </Button>
            </span>
            <span className="parent-span">
            <Button component={Link} to="/signup">
              <AssignmentRoundedIcon style={{ paddingRight: 2, color:"#043F66" }} />
              Sign Up
            </Button>
            </span>

        </Toolbar>
      </AppBar>
    );
  }
}
Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);


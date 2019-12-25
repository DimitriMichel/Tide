import React, { Component } from "react";
import PropTypes from "prop-types";

//MATERIAL UI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

//REDUX
import { connect } from "react-redux";

class Profile extends Component {
  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt },
        loading
      }
    } = this.props;
    return <div></div>;
  }
}
const mapStateToProps = state => ({
  user: state.user
});

Profile.protoTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Profile));

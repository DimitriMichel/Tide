import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Link from "react-router-dom/Link";
import dayjs from "dayjs";
import Avatar from "@material-ui/core/Avatar";

//MATERIAL UI
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import EditDetails from "../components/EditDetails";
//REDUX
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../redux/actions/userActions";

const styles = theme => ({
  ...theme.spreadTheme
});

class Profile extends Component {
  //(event.target.files) files when selected are in an array. input only needs one so files[0] is used.
  handleImageChange = event => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };

  handleChangePicture = () => {
    const fileInput = document.getElementById("profileImageUpload");
    fileInput.click();
  };

  handleLogout = () => {
    this.props.logoutUser();
  };
  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, website, bio, location },
        loading,
        authenticated
      }
    } = this.props;
    let profileMarkup = !loading ? (
      // eslint-disable-next-line no-undef
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <input
              type="file"
              id="profileImageUpload"
              onChange={this.handleImageChange}
              hidden="hidden"
            />
            <Tooltip title="Change Profile Picture" placement="bottom">
              <IconButton
                onClick={this.handleChangePicture}
                className="button"
                style={{
                  left: "92%",
                  padding: 5
                }}
              >
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>
            <br />
            <Avatar
              className={classes.avatar}
              src={imageUrl}
              alt="profile"
              component={Link}
              style={{ marginLeft: "auto", marginRight: "auto" }}
            />
            <br />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`users/${handle}`}
                color="primary"
                variant="h5"
              >
                @{handle}
              </MuiLink>
              <br />
              {bio && <Typography variant="body2">{bio}</Typography>}
              <br />
              <div
                style={{
                  backgroundColor: "#E6ECF0",
                  padding: "5px",
                  borderRadius: "4px"
                }}
              >
                {location && (
                  <Fragment style={{ whiteSpace: "pre-line" }}>
                    <LocationOn
                      color="primary"
                      style={{ whiteSpace: "pre-line" }}
                    />{" "}
                    <span>{location}</span>
                  </Fragment>
                )}
                <br />
                {website && (
                  <Fragment>
                    <LinkIcon color="primary" />
                    <a href={website} target="_blank" rel="noopener noreferrer">
                      {" "}
                      {website}
                    </a>
                  </Fragment>
                )}
                <br />
                <CalendarToday color="primary" />{" "}
                <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
              </div>
              <div className="profile-buttons-container">
                <Tooltip title="Logout" placement="top">
                  <IconButton onClick={this.handleLogout} color="primary">
                    <KeyboardReturn color="primary" />
                  </IconButton>
                </Tooltip>
                <EditDetails />
              </div>
            </div>
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            (Profile not found! Please log in again.)
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/signup"
            >
              Signup
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <p>Loading...</p>
    );
    return profileMarkup;
  }
}

// Connect to Redux Store For User State (called every time the store state changes.)
const mapStateToProps = state => ({
  user: state.user
});
const mapActionsToProps = { logoutUser, uploadImage };
Profile.protoTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));

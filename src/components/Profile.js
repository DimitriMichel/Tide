import React, { Component } from "react";
import PropTypes from "prop-types";

//MATERIAL UI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography";
//REDUX
import { connect } from "react-redux";


const styles = {
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: theme.palette.primary.main
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  }
};

class Profile extends Component {
  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl },
        loading
      }
    } = this.props;
    let profileMarkup = !loading ? (authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="profile-image">
              <img src={imageUrl} alt="profile-image"/>
            </div>
            <hr/>
            <div className="profile-details">
              <MuiLink component={Link} to={`users/${handle}`} color="primary" variant="h5">
                @{handle}
              </MuiLink>
            </div>
          </div>
        </Paper>
    ): ()) : (<p>Loading...</p>);
    return profileMarkup;
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

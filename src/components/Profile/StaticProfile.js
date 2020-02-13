import React, { Fragment } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import Avatar from "@material-ui/core/Avatar";

const styles = theme => ({
  ...theme.spreadTheme
});
const StaticProfile = props => {
  const {
    classes,
    profile: { handle, createdAt, imageUrl, bio, website, location }
  } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <br />
        <Avatar
          className={classes.avatar}
          src={imageUrl}
          alt="profile"
          component={Link}
          to="/"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        />
        <br />
        <div className="profile-details">
          <MuiLink
            component={Link}
            to={`/users/${handle}`}
            color="primary"
            variant="h5"
          >
            @{handle}
          </MuiLink>
          <hr />
          {bio && (
            <Typography variant="body2" className="bio">
              {bio}
            </Typography>
          )}
          <hr />
          <div className="location-website-date">
            {location && (
              <Fragment>
                <LocationOn
                  color="secondary"
                  style={{ whiteSpace: "pre-line" }}
                />{" "}
                <span>{location}</span>
              </Fragment>
            )}
            <br />
            {website && (
              <Fragment>
                <LinkIcon color="secondary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {" "}
                  {website}
                </a>
              </Fragment>
            )}
            <br />
            <CalendarToday color="secondary" />{" "}
            <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
          </div>
        </div>
      </div>
    </Paper>
  );
};

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StaticProfile);

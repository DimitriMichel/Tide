import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import relativeTime from "dayjs/plugin/relativeTime";

//REDUX
import { connect } from "react-redux";
import { likeWave, unlikeWave } from "../redux/actions/dataActions";

//Material UI
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
import AppButton from "../util/AppButton";
const styles = {
  card: {
    display: "flex",
    marginBottom: 20
  },
  image: {},
  content: {
    padding: 25,
    objectFit: "cover"
  },
  avatar: {
    width: 80,
    height: 80
  }
};
class Wave extends Component {
  //METHODS
  likedWave = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.waveID === this.props.wave.waveID)
    )
      return true;
    else return false;
  };
  likeWave = () => {
    this.props.likeWave(this.props.wave.waveID);
  };

  unlikeWave = () => {
    this.props.unlikeWave(this.props.wave.waveID);
  };
  render() {
    //Get the time our waves are liked, created etc.
    dayjs.extend(relativeTime);
    const {
      classes,
      wave: {
        body,
        createdAt,
        userImage,
        userHandle,
        waveID,
        likeCount,
        commentCount
      },
      user: { authenticated }
    } = this.props;
    const likeButton = !authenticated ? (
      //First: If User is not logged in icon will take to login page.
      <AppButton tip="Like">
        <Link to="/login">
          <FavoriteBorder color={"primary"} />
        </Link>
      </AppButton>
    ) : //Second: If Wave is liked there will be an unlike icon (undo like).
    this.likedWave() ? (
      <AppButton tip="Undo Like" onClick={this.unlikeWave}>
        <Favorite color="primary" />
      </AppButton>
    ) : (
      //Third: if Wave is not like user will be able to like the wave.
      <AppButton tip="Like" onClick={this.likeWave}>
        <FavoriteBorder color="primary" />
      </AppButton>
    );
    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar
                className={classes.avatar}
                src={userImage}
                alt={userHandle}
                component={Link}
                to={`/users/${userHandle}`}
              >
                G
              </Avatar>
            }
          />
          <CardContent className={classes.details}>
            <Typography component={Link} to={`/users/${userHandle}`}>
              {userHandle}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).fromNow()}
            </Typography>
            <Typography variant="body1">{body}</Typography>
            {likeButton}
            <span>{likeCount} Likes</span>
            <AppButton tip="Comments">
              <ChatIcon color="secondary" />
            </AppButton>
            <span>{commentCount} Comments</span>
          </CardContent>
        </Card>
      </div>
    );
  }
}

Wave.propTypes = {
  likeWave: PropTypes.func.isRequired,
  unlikeWave: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  wave: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeWave,
  unlikeWave
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Wave));

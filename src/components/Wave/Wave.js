import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import relativeTime from "dayjs/plugin/relativeTime";
import DeleteWave from "./DeleteWave";
import WaveDialog from "./WaveDialog";

//REDUX
import { connect } from "react-redux";
import { likeWave, unlikeWave } from "../../redux/actions/dataActions";

//Material UI
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import LikeButton from "./LikeButton";
const styles = {
  card: {
    display: "flex",
    marginBottom: 20
  },
  image: {},
  content: {
    padding: 15,
    objectFit: "cover"
  },
  avatar: {
    width: 40,
    height: 40
  }
};
class Wave extends Component {
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
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;
    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteWave waveID={waveID} />
      ) : null;
    return (
      <div>
        <Card className={classes.card}>
          <CardContent
            className={classes.details}
            style={{ position: "relative" }}
          >
            <div className="delete-button">{deleteButton}</div>
            <div style={{ display: "block" }}>
              <Avatar
                className="wave-avatar"
                src={userImage}
                alt={userHandle}
                component={Link}
                to={`/user/${userHandle}`}
                style={{ float: "left" }}
              >
                {" "}
              </Avatar>
              <div className="avatar-container">
                <Typography
                  component={Link}
                  to={`/user/${userHandle}`}
                  style={{ display: "inline !important" }}
                >
                  {userHandle}
                </Typography>
              </div>
            </div>

            <div className="avatar-container">
              <Typography variant="body2" color="textSecondary">
                {dayjs(createdAt).fromNow()}
              </Typography>
            </div>

            <div className="wave-container">
              <div className="wave-body">
                <Typography variant="body1">{body}</Typography>
              </div>
              <div className="like-comment-icon">
                <div className="like-button">
                  <LikeButton waveID={waveID} color="primary" />
                  <div className="like-count">
                    {likeCount} <span className="like-comment">Likes</span>
                  </div>
                </div>
                <div className="comment-button">
                  <WaveDialog
                    waveID={waveID}
                    userHandle={userHandle}
                    openDialog={this.props.openDialog}
                  />
                  <div className="comment-count">
                    {commentCount}{" "}
                    <span className="like-comment">Comments</span>
                  </div>
                </div>
              </div>
            </div>
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
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
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

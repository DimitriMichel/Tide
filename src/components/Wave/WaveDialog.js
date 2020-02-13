import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import AppButton from "../../util/AppButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
//REDUX
import { connect } from "react-redux";
import { getWave, clearErrors } from "../../redux/actions/dataActions";

//MUI
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import ChatIcon from "@material-ui/icons/Chat";
import HighlightOff from "@material-ui/icons/HighlightOff";

const styles = theme => ({
  ...theme.spreadTheme,
  profileImage: {
    maxWidth: 100,
    height: 100,
    borderRadius: "50%",
    objectFit: "cover",
    verticalAlign: "center",
    marginTop: "60%"
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: "absolute",
    left: "90%"
  },
  expandButton: {},
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50
  },
  invisibleSeparator: {
    border: "none",
    margin: 4
  }
});

class WaveDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: ""
  };
  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userHandle, waveID } = this.props;
    const newPath = `/user/${userHandle}/wave/${waveID}`;

    if (oldPath === newPath) oldPath = `/user/${userHandle}`;

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getWave(this.props.waveID);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.props.clearErrors();
    this.setState({ open: false });
  };
  render() {
    const {
      classes,
      wave: {
        waveID,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments
      },
      UI: { loading }
    } = this.props;
    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} color="secondary" />
      </div>
    ) : (
      <Grid container spacing={16}>
        <Grid item sm={2}>
          <img src={userImage} alt="Profile" className="dialog-profile-image" />
        </Grid>
        <Grid item sm={10}>
          <div className="comment-user-details">
            <div className="comment-handle">
              <Typography
                component={Link}
                color="secondary"
                variant="h5"
                to={`/user/${userHandle}`}
              >
                {userHandle}
              </Typography>
            </div>
            <hr className={classes.invisibleSeparator} />
            <Typography variant="body2" color="secondary">
              {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
            </Typography>
          </div>
          <hr className={classes.invisibleSeparator} />
          <div className="wave-body">
            <Typography variant="body1">{body}</Typography>
          </div>
          <div className="like-comment-dialog">
            <LikeButton waveID={waveID} />
            <span>
              {likeCount} <span className="like-comment">Likes</span>
            </span>
            <AppButton style={{ width: "50px" }}>
              <ChatIcon color="secondary" size="small" />
            </AppButton>
            <span style={{ paddingLeft: "5px" }}>
              {commentCount} <span className="like-comment">Comments</span>
            </span>
          </div>
        </Grid>
        <CommentForm waveID={waveID} />
        <Comments comments={comments} />
      </Grid>
    );
    return (
      <Fragment>
        <AppButton
          onClick={this.handleOpen}
          tip="Comments"
          tipClassName={classes.expandButton}
        >
          <ChatIcon color="secondary" />
        </AppButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <AppButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <div className="delete-button-dialog">
              <HighlightOff color="secondary" size="medium" />
            </div>
          </AppButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

WaveDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getWave: PropTypes.func.isRequired,
  waveID: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  wave: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  wave: state.data.wave,
  UI: state.UI
});

const mapActionsToProps = {
  getWave,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(WaveDialog));

import React, { Component } from "react";
import AppButton from "../../util/AppButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { likeWave, unlikeWave } from "../../redux/actions/dataActions";

//MUI
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

export class LikeButton extends Component {

  likedWave = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.waveID === this.props.waveID)
    )
      return true;
    else return false;
  };
  likeWave = () => {
    this.props.likeWave(this.props.waveID);
  };
  unlikeWave = () => {
    this.props.unlikeWave(this.props.waveID);
  };
  render() {
    const { authenticated } = this.props.user;
      //First: If User is not logged in icon will take to login page.
      // eslint-disable-next-line no-unused-vars
    const likeButton = !authenticated ? (
      <Link to="/login">
        <AppButton tip="Like">
          <FavoriteBorder color="primary" />
        </AppButton>
      </Link>
        //Second: If Wave is liked there will be an unlike icon (undo like).
    ) : this.likedWave() ? (
      <AppButton tip="Undo Like" onClick={this.unlikeWave}>
        <FavoriteIcon color="primary" />
      </AppButton>
    ) : (
        //Third: if Wave is not liked user will be able to like the wave.
      <AppButton tip="Like" onClick={this.likeWave}>
        <FavoriteBorder color="primary" />
      </AppButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  waveID: PropTypes.string.isRequired,
  likeWave: PropTypes.func.isRequired,
  unlikeWave: PropTypes.func.isRequired
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
)(LikeButton);

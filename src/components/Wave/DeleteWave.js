import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import AppButton from "../../util/AppButton";
import PropTypes from "prop-types";

//REDUX
import { connect } from "react-redux";
import { deleteWave } from "../../redux/actions/dataActions";

//MUI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import HighlightOff from '@material-ui/icons/HighlightOff';
const styles = {
    deleteButton: {
    }
};

class DeleteWave extends Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteWave = () => {
    this.props.deleteWave(this.props.waveID);
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <AppButton
          tip="Delete Wave"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <HighlightOff color="secondary" fontSize='small' />
        </AppButton>
        <Dialog
          open={this.state.open}
          onClose={this.state.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Are you sure you want to delete this wave?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.deleteWave} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
DeleteWave.propTypes = {
  deleteWave: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired
};
export default connect(
  null,
  { deleteWave }
)(withStyles(styles)(DeleteWave));

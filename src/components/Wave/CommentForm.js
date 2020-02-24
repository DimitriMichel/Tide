import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

// REDUX
import { connect } from "react-redux";
import { submitComment} from "../../redux/actions/dataActions";

// MUI
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  ...theme.spreadTheme
});
class CommentForm extends Component {
  state = {
    body: "",
    errors: {}
  };


  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '' });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitComment(this.props.waveID, { body: this.state.body });

  };

  render() {
    const { authenticated } = this.props;
    const errors = this.state.errors;
    const commentFormMarkup = authenticated ? (
        <div className="comment-form-container">
          <Grid item sm={12} style={{ textAlign: "center" }}>
            <form onSubmit={this.handleSubmit} className="comment-form">
              <TextField
                  color="secondary"
                  name="body"
                  type="text"
                  label="Comment on Wave"
                  error={errors.comment ? true : false}
                  helperText={errors.comment}
                  value={this.state.body}
                  onChange={this.handleChange}
                  fullWidth
                  className="form-text-field"
              />
              <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  className="submit-btn"
              >
                Post
              </Button>
            </form>
          </Grid>
        </div>
    ) : null;
    return commentFormMarkup;
  }
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  waveID: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated
});

export default connect(
    mapStateToProps,
    { submitComment }
)(withStyles(styles)(CommentForm));

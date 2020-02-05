import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

//MATERIAL UI
import Typography from "@material-ui/core/Typography";
import { CircularProgress } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

//REDUX
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const styles = theme => ({
  ...theme.spreadTheme
});

//local state to Class
class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  //loading set true while submit handler and axios fetch data
  handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const {
      classes,
      UI: { loading }
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img
            src={require("./images/tide2.png")}
            className={classes.image}
            alt="App Icon"
          />
          <div className={classes.formContainer}>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                fullWidth
                id="email"
                name="email"
                variant="outlined"
                type="email"
                label="Email"
                helperText={errors.email}
                error={errors.email ? true : false}
                className={classes.textField}
                value={this.state.email}
                onChange={this.handleChange}
              />
              <TextField
                fullWidth
                id="password"
                name="password"
                variant="outlined"
                type="password"
                label="Password"
                helperText={errors.password}
                error={errors.password ? true : false}
                className={classes.textField}
                value={this.state.password}
                onChange={this.handleChange}
              />
              {errors.general && (
                <Typography variant="body2" className={classes.credentialError}>
                  {errors.general}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.button}
                disabled={loading}
              >
                LOGIN
                {loading && (
                  <CircularProgress
                    size={33}
                    className={classes.progress}
                    color="secondary"
                  />
                )}
              </Button>
              <br />
              <div className={classes.formLink}>
              <small>
                <Link to="/signup">Sign up today! </Link>
              </small>
              </div>
            </form>
          </div>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}
login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

// User and UI brought in from Redux Global State into component.
const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));

import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import axios from "axios";
//Material UI Imports
import Typography from "@material-ui/core/Typography";
import { CircularProgress } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

const styles = (theme) =>({
...theme.spreadTheme
});

//local state to Class
class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {}
    };
  }
  //loading set true while submit handler and axios fetch data
  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img
            src={require("./images/brainicon.png")}
            className={classes.image}
            alt="App Icon"
          />

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
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              LOGIN
              {loading && <CircularProgress size={33} className={classes.progress} color="primary" />}
            </Button>
            <br />
            <small>
              <Link to="/signup">Sign up today! </Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}
login.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(login);

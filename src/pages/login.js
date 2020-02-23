import React, { Component, Fragment } from "react";
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
  //andrew@email.com
  //openup
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

  // Select Random Demo User
  /****************************/
  randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  demoUsers = [
    "andrew@email.com",
    "lucille@email.com",
    "richard@email.com",
    "pam@email.com"
  ];

  pickRandomUser = this.randomIntFromInterval(0, this.demoUsers.length - 1);

  // Demo User Database
  demoUserHash = {
    "richard@email.com": "openup",
    "lucille@email.com": "openup",
    "pam@email.com": "openup",
    "andrew@email.com": "openup"
  };

  // Use Random Demo User Function to target key in randomUserHash
  demoUserEmail = this.demoUsers[this.pickRandomUser];
  demoUserPassword = this.demoUserHash[this.demoUserEmail];

  handleDemoClick = event => {
    event.preventDefault();
    const userData = {
      email: this.demoUserEmail,
      password: this.demoUserPassword
    };
    this.props.loginUser(userData, this.props.history);
  };
  /****************************/

  render() {
    const {
      classes,
      UI: { loading }
    } = this.props;

    const { errors } = this.state;
    return (
      <Fragment>
        <div className="background">
          <Grid container className={classes.formFix}>
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
                    color="secondary"
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
                    color="secondary"
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
                    <Typography
                      variant="body2"
                      className={classes.credentialError}
                    >
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
                    Login
                  </Button>
                  {loading && (
                    <div className="spinner">
                      <CircularProgress
                        size={33}
                        className="spinner"
                        color="secondary"
                      />
                    </div>
                  )}
                  <br />
                  <Button
                    onClick={this.handleDemoClick}
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    disabled={loading}
                  >
                    Demo
                  </Button>
                  <div className={classes.formLink}>
                    <small className="signup-small">
                      <Link to="/signup">Sign up today! </Link>
                    </small>
                  </div>
                </form>
              </div>
            </Grid>
            <Grid item sm />{" "}
          </Grid>
        </div>
      </Fragment>
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

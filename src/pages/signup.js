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
class signup extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            handle: "",
            loading: false,
            errors: {}
        };
    }
    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };
        axios
            .post("/signup", newUserData)
            .then(result => {
                console.log(result.data);
                localStorage.setItem("FBIdToken",  `Bearer $(result.data.token`);
                this.setState({
                    loading: false
                });
                this.props.history.push("/");
            })
            .catch(err => {
                console.log(err.response.data);
                this.setState({
                    errors: err.response.data,
                    loading: false
                });
                console.log(this.state.errors.general);
            });
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
                        <TextField
                            fullWidth
                            id="confirmPassword"
                            name="confirmPassword"
                            variant="outlined"
                            type="confirmPassword"
                            label="Confirm Password"
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            className={classes.textField}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                        />
                        <TextField
                            fullWidth
                            id="handle"
                            name="handle"
                            variant="outlined"
                            type="text"
                            label="Username"
                            helperText={errors.handle}
                            error={errors.handle ? true : false}
                            className={classes.textField}
                            value={this.state.handle}
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
                            Sign Up
                            {loading && <CircularProgress size={33} className={classes.progress} color="primary" />}
                        </Button>
                        <br />
                        <small>
                            <Link to="/login">Already have an account?</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
}
signup.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(signup);
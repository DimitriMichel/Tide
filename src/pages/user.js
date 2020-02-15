import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Wave from "../components/Wave/Wave";
import { getUserData } from "../redux/actions/dataActions";
import StaticProfile from "../components/Profile/StaticProfile";

//REDUX
import { connect } from "react-redux";

//MUI
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

class user extends Component {
  state = {
    profile: null,
    waveIDParam: null
  };

  componentDidMount() {
    //"match" contains details about url, baseUrl, pathname etc
    const handle = this.props.match.params.handle;
    const waveID = this.props.match.params.waveID;

    if (waveID) this.setState({ waveIDParam: waveID });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then(response => {
        console.log(response);
        this.setState({
          profile: response.data.user
        });
        console.log(response);
      })
      .catch(err => console.log(err));
  }

  render() {
    const { waves, loading } = this.props.data;
    const { waveIDParam } = this.state;
    const waveMarkup = loading ? (
        <div className="spinnerDiv">
            <CircularProgress size={100} thickness={1.5} color="secondary" />
        </div>
    ) : waves === null ? (
      <p> No Waves From This User.</p>
    ) : !waveIDParam ? (
      waves.map(wave => <Wave key={wave.waveID} wave={wave} />)
    ) : (
      waves.map(wave => {
        if (wave.waveID !== waveIDParam)
          return <Wave key={wave.waveID} wave={wave} />;
        else return <Wave key={wave.waveID} wave={wave} openDialog />;
      })
    );
    return (
      <div className="container">
        <Grid container spacing={3}>
          <Grid item sm={4} xs={12}>
            {this.state.profile === null ? (
              <div>Loading Profile..</div>
            ) : (
              <StaticProfile profile={this.state.profile} />
            )}
          </Grid>
          <Grid item sm={8} xs={12}>
            <div
              style={{
                padding: 10,
                boxShadow: "none",
                borderStyle: "solid",
                borderWidth: "2px",
                borderColor: "#E6ECF0",
                borderRadius: "4px"
              }}
            >
              {waveMarkup}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(user);

import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import News from "../API/News";
import Wave from "../components/Wave/Wave";
import Profile from "../components/Profile/Profile";
import { connect } from "react-redux";
import { getWaves } from "../redux/actions/dataActions";
import PropTypes from "prop-types";

class home extends Component {
  componentDidMount() {
    this.props.getWaves();
    News
      .get("/v2/top-headlines", {
        params: {
          country: "us"
        }
      })
      .then(response => {
        console.log(response);
      });
  }

  render() {
    const { waves, loading } = this.props.data;
    let recentWaves = !loading ? (
      waves.map(wave => <Wave key={wave.waveID} wave={wave} />)
    ) : (
      <p>Loading..</p>
    );

    return (
      <div className="container">
        <Grid container spacing={3}>
          <Grid item sm={4} xs={12}>
            <Profile />
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
              {recentWaves}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
home.propTypes = {
  getWaves: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getWaves }
)(home);

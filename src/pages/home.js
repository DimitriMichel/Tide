import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import news from "../API/news";
import Wave from "../components/Wave";
import Profile from "../components/Profile";
import { connect } from "react-redux";
import { getWaves } from "../redux/actions/dataActions";
import PropTypes from "prop-types";

class home extends Component {
  componentDidMount() {
    this.props.getWaves();
    news
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
      <div style={{ padding: "32px" }}>
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

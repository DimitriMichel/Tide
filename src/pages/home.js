import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import news from "../API/news";
import Wave from "../components/Wave";
class home extends Component {
  state = {
    waves: null
  };
  componentDidMount() {
    axios
      .get("/waves")
      .then(res => {
        console.log(res.data);
        this.setState({
          waves: res.data
        });
      })
      .catch(err => console.log(err));
    news.get("/v2/top-headlines", {
      params: {
        country: "us"
      }
    })
        .then(response =>{
          console.log(response)
        })
  }

  render() {
    let recentWaves = this.state.waves ? (
      this.state.waves.map(wave => <Wave key={wave.waveID} wave={wave} />)
    ) : (
      <p>Loading..</p>
    );

    return (
      <div style={{ padding: "32px" }}>
        <Grid container spacing={3}>
          <Grid item sm={4} xs={12}>
            <p>Profile.</p>
          </Grid>

            <Grid item sm={8} xs={12}>
              <div >
              {recentWaves}
              </div>
            </Grid>

        </Grid>
      </div>
    );
  }
}

export default home;

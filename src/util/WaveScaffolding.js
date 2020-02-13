import React, { Fragment } from "react";
import NoImg from "../pages/images/no-image.png";
import PropTypes from "prop-types";
// MUI
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import LikeButton from "../components/Wave/LikeButton";
import WaveDialog from "../components/Wave/WaveDialog";

const styles = theme => ({
  ...theme.spreadTheme,
  card: {
    display: "flex",
    marginBottom: 20
  },
  cardContent: {
    width: "100%",
    flexDirection: "column",
    padding: 25
  },
  cover: {
    minWidth: 200,
    objectFit: "cover"
  },
  handle: {
    width: 60,
    height: 18,
    backgroundColor: theme.palette.secondary.main,
    marginBottom: 7
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: "rgba(0,0,0, 0.3)",
    marginBottom: 10
  },
  fullLine: {
    height: 15,
    width: "90%",
    backgroundColor: "rgba(0,0,0, 0.6)",
    marginBottom: 10
  },
  halfLine: {
    height: 15,
    width: "50%",
    backgroundColor: "rgba(0,0,0, 0.6)",
    marginBottom: 10
  }
});

const WaveScaffolding = props => {
  const { classes } = props;

  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardContent className={classes.details} style={{ position: "relative" }}>
        <div style={{ display: "block" }}>
        </div>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ));

  return <Fragment>{content}</Fragment>;
};

WaveScaffolding.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WaveScaffolding);

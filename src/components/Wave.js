import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"

//Material UI Card
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20
  },
  image: {
  },
  content: {
    padding: 25,
    objectFit: "cover"
  },
  avatar:{
    width: 80,
    height: 80,
  }
};
class Wave extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      wave: {
        body,
        createdAt,
        userImage,
        userHandle,
        waveID,
        likeCount,
        commentCount
      }
    } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar
                className={classes.avatar}
                src={userImage}
                alt={userHandle}
                component={Link}
                to={`/users/${userHandle}`}
              >
                G
              </Avatar>
            }
          />
          <CardContent className={classes.details}>
            <Typography
              component={Link}
              to={`/users/${userHandle}`}
            >
              {userHandle}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).fromNow()}
            </Typography>
            <Typography variant="body1">{body}</Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Wave);

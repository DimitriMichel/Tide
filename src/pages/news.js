import React, { Component } from "react";
import News from "../API/News";
import Profile from "../components/Profile/Profile";
import imageLinkContainer from "../util/NewsImageLinks";
//MUI
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20
  },
  image: {},
  content: {
    padding: 10,
    objectFit: "cover"
  },
  avatar: {
    width: 40,
    height: 40
  },
  details: {
    CardContent: {
      padding: 0,
      "&:last-child": {
        paddingBottom: 0
      }
    }
  }
};
class news extends Component {
  state = {
    articlesList: []
  };
  //US News Top Headlines
  componentDidMount() {
    News.get("/v2/top-headlines", {
      params: {
        country: "us",
        pageSize: 25,
        apiKey: "eaf2773476064483b40c45df79edba85"
      }
    })
      .then(response => {
        this.setState({ articlesList: response.data.articles });
      })
      .catch(err => console.log(err));
  }

  render() {




    const { classes } = this.props;
    return (
      <div className="container">
        <Grid container spacing={3}>
          <Grid item sm={4} xs={12}>
            <div className="fix-profile">
              <Profile />
            </div>
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
              {this.state.articlesList.map(article => {
                //Remove "-" and following characters in article titles.
                //ex.(The world is ending - CNN) -> (The world is ending).
                const articleTitle = article.title.substring(
                  0,
                  article.title.lastIndexOf("-")
                );
                let datePosted = new Date(article.publishedAt).toLocaleString(
                  "en-US"
                );

                //Dummy News Logos
                let newsLogo;
                if (imageLinkContainer[article.source.name]) {
                  newsLogo = imageLinkContainer[article.source.name];
                } else
                  newsLogo =
                    "https://cdn1.vectorstock.com/i/thumb-large/39/10/world-news-flat-icon-news-symbol-logo-vector-20093910.jpg";

                return (
                  <div>
                    <Card className={classes.card}>
                      <CardContent
                        className={classes.details}
                        style={{ position: "relative" }}
                      >
                        <div style={{ display: "block" }}>
                          <Avatar
                            className="wave-avatar"
                            src={newsLogo}
                            alt="report"
                            component={Link}
                            to={"/news"}
                            style={{ float: "left" }}
                          >
                            {" "}
                          </Avatar>
                          <div className="avatar-container">
                            <Typography
                              component={Link}
                              to={`/news`}
                              style={{ display: "inline !important" }}
                            >
                              {article.source.name}
                            </Typography>
                          </div>
                        </div>

                        <div className="avatar-container">
                          <Typography variant="body2" color="textSecondary">
                            {datePosted}
                          </Typography>
                        </div>

                        <div className="news-wave-container">
                          <div className="news-wave-body">
                            <div className="news-body-text">
                              {article.description}
                            </div>

                            <div className="news-image">
                              <div className="news-image-link">
                                <img
                                  className="news-article-image"
                                  src={article.urlToImage}
                                  alt="Article"
                                />
                                <div className="news-title-link">
                                  <a href={article.url}>{articleTitle}</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(news);

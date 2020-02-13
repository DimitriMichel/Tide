import React, { Component } from "react";
import News from "../API/News";
import Profile from "../components/Profile/Profile";
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
        country: "us"
      }
    }).then(response => {
      this.setState({ articlesList: response.data.articles });
    });
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
                //Create Cards with API
                const articleTitle = article.title.substring(
                  0,
                  article.title.lastIndexOf("-")
                );
                let datePosted = new Date(article.publishedAt).toLocaleString(
                  "en-US"
                );

                //Dummy News Logos
                let sourceLogo;
                if (article.source.name === "Engadget") {
                  sourceLogo =
                    "https://pbs.twimg.com/profile_images/655059892022022144/Pq3Q_1oU_400x400.png";
                } else if (article.source.name === "Politico") {
                  sourceLogo =
                    "https://pbs.twimg.com/profile_images/677177503694237697/y6yTzWn6_400x400.png";
                } else if (article.source.name === "Fox News") {
                  sourceLogo =
                    "https://pbs.twimg.com/profile_images/918480715158716419/4X8oCbge_400x400.jpg";
                } else if (article.source.name === "CNN") {
                  sourceLogo =
                    "https://pbs.twimg.com/profile_images/508960761826131968/LnvhR8ED_400x400.png";
                } else if (article.source.name === "Nytimes.com") {
                  sourceLogo =
                    "https://pbs.twimg.com/profile_images/1098244578472280064/gjkVMelR_400x400.png";
                } else if (article.source.name === "MSNBC News") {
                  sourceLogo =
                    "https://pbs.twimg.com/profile_images/988382060443250689/DijesdNB_400x400.jpg";
                } else if (article.source.name === "CNBC") {
                  sourceLogo =
                    "https://pbs.twimg.com/profile_images/1185182366156894208/pKRddT3o_400x400.png";
                } else if (article.source.name === "Deadline.com") {
                  sourceLogo =
                    "https://pbs.twimg.com/profile_images/1116019573981974528/2El9E56p_400x400.png";
                } else if (article.source.name === "Variety.com") {
                  sourceLogo =
                    "https://pbs.twimg.com/profile_images/1060236422500704257/jltNN1hQ_400x400.jpg";
                } else if (article.source.name === "Bbc.com") {
                  sourceLogo =
                    "https://pbs.twimg.com/profile_images/1150716997254209536/M7gkjsv5_400x400.jpg";
                } else if (article.source.name === "Entertainment Weekly") {
                  sourceLogo =
                    "https://pbs.twimg.com/profile_images/1179528337401581568/rD4Mkr1c_400x400.png";
                } else if (article.source.name === "Npr.org") {
                  sourceLogo =
                    "https://pbs.twimg.com/profile_images/1208165423109292032/_oEEIsvx_400x400.jpg";
                } else if (article.source.name === "Business Insider") {
                  sourceLogo =
                    "https://pbs.twimg.com/profile_images/1199017286780231684/P_hQmsjg_400x400.jpg";
                } else if (article.source.name === "Youtube.com") {
                  sourceLogo =
                    "https://pbs.twimg.com/profile_images/1209179754273730567/ocZKRu9P_400x400.jpg";
                } else if (article.source.name === "Cbssports.com") {
                  sourceLogo =
                    "https://pbs.twimg.com/profile_images/914938790787125248/aDe8EkHk_400x400.jpg";
                } else if (article.source.name === "Si.com") {
                  sourceLogo =
                    "https://pbs.twimg.com/profile_images/876883699559780352/ixURaEXt_400x400.jpg";
                } else if (article.source.name === "Marketwatch.com") {
                  sourceLogo =
                    "https://pbs.twimg.com/profile_images/705601245596090368/Z6xUOnRg_400x400.jpg";
                } else if (article.source.name === "NBC News") {
                  sourceLogo =
                    "https://pbs.twimg.com/profile_images/1226931167472959488/gy-19Sox_400x400.jpg";
                } else if (article.source.name === "Nypost.com") {
                  sourceLogo =
                    "https://pbs.twimg.com/profile_images/966372680306868224/60wfGe9e_400x400.jpg";
                } else if (article.source.name === "Avclub.com") {
                  sourceLogo =
                    "https://pbs.twimg.com/profile_images/1145717993328001030/UHdt_Nam_400x400.png";
                } else if (article.source.name === "Pitchfork.com") {
                  sourceLogo =
                    "https://pbs.twimg.com/profile_images/1137326502624841729/YX-bRuJZ_400x400.jpg";
                } else if (article.source.name === "Reuters") {
                  sourceLogo =
                    "https://pbs.twimg.com/profile_images/1194751949821939712/3VBu4_Sa_400x400.jpg";
                } else if (article.source.name === "The Washington Post") {
                  sourceLogo =
                    "https://pbs.twimg.com/profile_images/1060271522319925257/fJKwJ0r2_400x400.jpg";
                } else if (article.source.name === "The Wall Street Journal") {
                  sourceLogo =
                    "https://pbs.twimg.com/profile_images/971415515754266624/zCX0q9d5_400x400.jpg";
                } else if (article.source.name === "The Verge") {
                  sourceLogo =
                    "https://pbs.twimg.com/profile_images/877903823133704194/Mqp1PXU8_400x400.jpg";
                } else if (article.source.name === "Foxbusiness.com") {
                  sourceLogo =
                    "https://pbs.twimg.com/profile_images/875384861736841217/j4vwsisS_400x400.jpg";
                } else {
                  sourceLogo =
                    "https://cdn1.vectorstock.com/i/thumb-large/39/10/world-news-flat-icon-news-symbol-logo-vector-20093910.jpg";
                }

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
                            src={sourceLogo}
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

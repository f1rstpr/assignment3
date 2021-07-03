import React from "react";

import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
  Link,
  Container,
  Box,
} from "@material-ui/core";

import StarIcon from "@material-ui/icons/StarBorder";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    border: "1.8px solid black",
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Life Tracker
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          An easy to use tool to effectively track three important parts of your
          life.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} justify="center">
          <Grid
            // alignItems="center"
            item
            xs={10}
            // sm={tier.title === "Enterprise" ? 12 : 6}
            // md={4}
          >
            <Card>
              <CardMedia
                className={classes.media}
                image={`https://images.unsplash.com/photo-1617625802912-cde586faf331?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80`}
                title="Paella dish"
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

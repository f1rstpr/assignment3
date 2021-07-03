import React from "react";

import CameraIcon from "@material-ui/icons/PhotoCamera";

import CardMedia from "@material-ui/core/CardMedia";

import { makeStyles } from "@material-ui/core/styles";

import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
  Link,
  Container,
  Box,
} from "@material-ui/core";

import Modal from "./Modal";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  page: {
    backgroundColor: "#E8E8E8",
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Gallery({
  title,
  desc,
  data,
  setData,
  handleClose,
  open,
  curPath,
  errors,
  setErrors,
}) {
  console.log(data);
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.page}>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              {title}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              {desc}
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "100%" }}
                  onClick={handleClose}
                >
                  ADD {curPath}
                </Button>
                <Modal
                  open={open}
                  handleClose={handleClose}
                  setData={setData}
                  curPath={curPath}
                  errors={errors}
                  setErrors={setErrors}
                />
              </Grid>
            </div>
          </Container>
        </div>
        {/* End hero unit */}
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {data.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={`${card.image_url}`}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      style={{ margin: "15px 0" }}
                    >
                      {window.location.href.includes("exercises")
                        ? `Minutes: ${card.duration}`
                        : `Calories: ${card.calories} `}
                    </Typography>
                    <Typography color="textSecondary">
                      {window.location.href.includes("exercises")
                        ? `Intensity: ${card.intensity} `
                        : `Quantity: ${card.quantity}  `}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Grid container justify="space-between">
                      <Button size="small" color="primary">
                        {moment(card.created_at).fromNow()}
                      </Button>
                      <Button size="small" color="primary">
                        {card.category}
                      </Button>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}

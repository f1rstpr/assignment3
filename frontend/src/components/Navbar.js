import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiCalls from "../services/apiCalls";
import "./Navbar.css";
import IconButton from "@material-ui/core/IconButton";
import WatchIcon from "@material-ui/icons/Watch";

import {
  AppBar,
  makeStyles,
  Tabs,
  Toolbar,
  Tab,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  divButton: {
    // width: "100%",
  },
  navBtn: { marginRight: "20px" },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
}));

export default function Navbar({
  user,
  setUser,
  HandleLogoutUser,
  type,
  setType,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="Navbar" style={{ border: "1px solid black" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
          >
            <Link to="/" style={{ color: "inherit" }}>
              <WatchIcon fontSize="large" />
            </Link>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {user?.email
              ? `WELCOME TO LIFE TRACKER, ${user?.first_name}`
              : "LIFE TRACKER"}
          </Typography>
          <div className={classes.divButton}>
            <Link to="/activity" className={classes.link}>
              <Button
                color="inherit"
                variant="outlined"
                onClick={handleOpen}
                className={classes.navBtn}
              >
                ACTIVITY
              </Button>
            </Link>
            <Link
              to="/exercises"
              className={classes.link}
              onClick={() => setType("exercises")}
            >
              <Button
                color="inherit"
                variant="outlined"
                onClick={handleOpen}
                className={classes.navBtn}
              >
                EXERCISES
              </Button>
            </Link>
            <Link
              to="/nutrition"
              className={classes.link}
              onClick={() => setType("nutrition")}
            >
              <Button
                color="inherit"
                variant="outlined"
                onClick={handleOpen}
                className={classes.navBtn}
              >
                nutrition
              </Button>
            </Link>
            <Button
              color="inherit"
              variant="outlined"
              onClick={handleOpen}
              className={classes.navBtn}
              disabled={user?.email ? true : false}
            >
              <Link to="/register" className={classes.link}>
                Register
              </Link>
            </Button>

            <Button
              color="inherit"
              onClick={handleOpen}
              className={classes.navBtn}
              variant="outlined"
            >
              {!user?.email ? (
                <Link to="/login" className={classes.link}>
                  LOGIN
                </Link>
              ) : (
                <Link
                  to="/"
                  className={classes.link}
                  onClick={HandleLogoutUser}
                >
                  Logout
                </Link>
              )}
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

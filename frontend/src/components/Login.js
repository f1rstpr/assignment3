import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiCalls from "../services/apiCalls";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import ErrorHandling from "./ErrorHandling";

import {
  Avatar,
  Button,
  Link as UiLink,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  makeStyles,
  Container,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login({ user, setUser }) {
  const navigate = useNavigate();
  const classes = useStyles();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user.email) {
      navigate("/activity");
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();
    const { data, error } = await apiCalls.login({
      email: form.email,
      password: form.password,
    });

    if (e.target.value === "email") {
      if (e.target.value.indexOf("@") === -1) {
        setErrors((prevState) => ({ ...prevState, email: "Invalid email " }));
      } else {
        setErrors((prevState) => ({ ...prevState, email: null }));
      }
    }

    if (data) {
      setUser(data.user);
      apiCalls.setToken(data.token);
    }

    if (error) {
      setErrors((prevErrors) => ({ ...prevErrors, form: error }));
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            SIGN IN
          </Typography>
          <ErrorHandling message={errors.email} />
          <ErrorHandling message={errors.form} />
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleInputChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleLoginClick}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <UiLink href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </UiLink>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Typography variant="body2" color="textSecondary" align="center">
            LIFETRACKER 2021
          </Typography>
        </Box>
      </Container>
    </div>
  );
}

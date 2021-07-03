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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register({ user, setUser }) {
  const classes = useStyles();

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user.email) {
      navigate("/activity");
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleRegisterBtnClick = async (e) => {
    e.preventDefault();

    if (e.target.value === "email") {
      if (e.target.value.indexOf("@") === -1) {
        setErrors((prevState) => ({ ...prevState, email: "Invalid email " }));
      } else {
        setErrors((prevState) => ({ ...prevState, email: null }));
      }
    }

    const { data, error } = await apiCalls.register({
      username: form.username,
      email: form.email,
      first_name: form.first_name,
      last_name: form.last_name,
      password: form.password,
    });

    if (data) {
      setUser(data.user);
      apiCalls.setToken(data.token);
      // navigate("/");
    }

    if (error) {
      setErrors((prev) => ({ ...prev, form: error }));
    }
  };
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar} src="/broken-image.jpg"></Avatar>
          <Typography component="h1" variant="h5">
            SIGN UP
          </Typography>
          <ErrorHandling message={errors.email}/>
          <ErrorHandling message={errors.form}/>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="first_name"
                  variant="outlined"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  autoFocus
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  autoComplete="lname"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label={
                    <Typography variant="body2" component="h2">
                      I agree to the
                      <Box
                        m={0.5}
                        fontWeight="fontWeightBold"
                        style={{ display: "inline-block" }}
                      >
                        terms and conditions.
                      </Box>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleRegisterBtnClick}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <UiLink href="/login" variant="body2">
                  Already have an account? Sign in
                </UiLink>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Typography variant="body2" color="textSecondary" align="center">
            LIFETRACKER 2021
          </Typography>
        </Box>
      </Container>
    </div>
  );
}

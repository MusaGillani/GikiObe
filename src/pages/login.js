import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "./logo.jpg";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Image } from "@material-ui/icons";
import { ClassNames } from "@emotion/react";
import "./Login.css";

const useStyles = makeStyles({
  title: {
    marginLeft: "31.5%",
    fontFamily: "Hubballi",
    fontSize: "2.5rem",
    marginTop: 15,
    color: "#303F9F",
    fontWeight: "revert",
  },
});

const Login = () => {
  const paperStyle = {
    padding: 40,
    height: "100%",
    width: "30%",
    margin: "8vh auto",
  };

  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "30px 0", color: "#FFFFFF" };
  const classes = useStyles();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      e.target[0].value == "instructor" &&
      e.target[1].value == "instructor"
    ) {
      console.log("Instructor Login");
      history.push(`/inst-login`);
    } else if (e.target[0].value == "dean" && e.target[1].value == "dean") {
      console.log("Dean Login");
      history.push(`/courses`);
    } else {
      console.log("Incorrect password");
    }
  };

  return (
    <div className="login-page">
      <div className={classes.header}>
        <h1>Outcome-Based Education Evaluation System</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <LockOutlinedIcon />
              </Avatar>
              <h2>Sign In</h2>
            </Grid>
            <TextField
              label="Username"
              placeholder="Enter username"
              fullWidth
              required
              value={username}
            />
            <TextField
              label="Password"
              placeholder="Enter password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={() => setPassword(password)}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              onSubmit={handleSubmit}
              fullWidth
            >
              Sign in
            </Button>
            <Typography>
              <Link href="#">Forgot password ?</Link>
            </Typography>
          </Paper>
        </Grid>
      </form>
    </div>
  );
};

export default Login;

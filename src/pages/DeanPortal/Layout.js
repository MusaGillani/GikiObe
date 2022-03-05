import { ClassNames } from "@emotion/react";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { Typography } from "@mui/material";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { AddCircleOutlined, SubjectOutlined } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router-dom";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
      color: "#1C83CD",
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: "flex",
    },
    active: {
      background: "#5DBCFF",
    },
    title: {
      padding: theme.spacing(2),
    },
    // appbar: {
    //   paddingBottom: 20,
    // //   width: `calc(100% - ${drawerWidth}px)`,
    // },
    toolbar: {
      marginTop: "100px",
    },
  };
});

export default function Layout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    {
      text: "Courses",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Add Course",
      icon: <AddCircleOutlined color="primary" />,
      path: "/addCourses",
    },
    {
      text: "Generate Transcript",
      icon: <DownloadForOfflineIcon color="primary" />,
      path: "/generate-transcript",
    },
    {
      text: "Generate Batch Transcript",
      icon: <DownloadIcon color="primary" />,
      path: "/generate-transcript-batch",
    },
    {
      text: "Allot Course to Instructor",
      icon: <EditIcon color="primary" />,
      path: "/abc",
    },
  ];

  return (
    <div className={classes.root}>
      <AppBar
        elevation={0}
        style={{ width: `calc(100% - ${drawerWidth}px)` }}
        align="center"
      >
        <Toolbar>
          <Typography variant="h6" component="div">
            Welcome to Dean Portal
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            OBE-GIKI
          </Typography>
        </div>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              button
              onClick={() => history.push(item.path)}
              className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.page}>
        <div className={classes.toolbar}>{children}</div>
      </div>
    </div>
  );
}

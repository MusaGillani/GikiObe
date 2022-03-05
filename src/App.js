import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Download from "./pages/download";
import Generate from "./pages/generate";
import Populate from "./pages/populate";
import Bulk from "./pages/bulk";
import All from "./pages/all";
import GenerateModified from "./pages/generate_modified";
import DeanPortal from "./pages/DeanPortal/DeanPortal";
import Layout from "./pages/DeanPortal/Layout";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import BatchTrans from "./pages/DeanPortal/BatchTrans";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#044A7C",
    },
    secondary: {
      main: "#044A7C",
    },
  },
  typography: {
    // fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <DeanPortal />
            </Route>
            <Route exact path="/generate-transcript">
              <GenerateModified />
            </Route>
            <Route exact path="/transcript-download/:regNo">
              <Download />
            </Route>
            <Route exact path="/populate">
              <Populate />
            </Route>
            <Route exact path="/bulk">
              <Bulk />
            </Route>
            <Route exact path="/generate-transcript-batch">
              <BatchTrans />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;

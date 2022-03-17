import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Download from "./pages/download";
import Populate from "./pages/populate";
import GenerateModified from "./pages/generate_modified";
import DeanPortal from "./pages/DeanPortal/DeanPortal";
import Layout from "./pages/DeanPortal/Layout";
import { createTheme, ThemeProvider } from "@material-ui/core";
import BatchTrans from "./pages/DeanPortal/BatchTrans";
import AllotCourse from "./pages/DeanPortal/AllotCourse";
import AddCourse from "./pages/DeanPortal/AddCourse";
import InstMain from "./pages/InstructorPortal/InstMain";
import { AddCircleOutlined, SubjectOutlined } from "@material-ui/icons";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import GradingScheme from "./pages/InstructorPortal/GradingScheme";
import AlignHorizontalRightOutlinedIcon from "@mui/icons-material/AlignHorizontalRightOutlined";
import AlignVerticalCenterOutlinedIcon from "@mui/icons-material/AlignVerticalCenterOutlined";
import Assessments from "./pages/InstructorPortal/Assessments";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ChartsGrid from "./pages/InstructorPortal/MainDash/ChartsGrid";
import Login from "./pages/Login";
import CourseInfo from "./pages/DeanPortal/CourseInfo";
import ChartsGridDean from "./pages/DeanPortal/DeanDash/ChartsGridDean";

const theme = createTheme({
  palette: {
    primary: { main: "#3F51B5", contrastText: "#C5CAE9" },
    secondary: { main: "#3F51B5", contrastText: "#C5CAE9" },
  },
  typography: {
    // fontFamily: "Hubballi",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  overrides: {
    MuiSelect: {
      select: {
        "&:focus": {
          backgroundColor: "#ffddec",
          color: "brown",
        },
        "&:before": {
          borderColor: "orange",
        },
        "&:after": {
          borderColor: "green",
        },
      },
    },
  },
});

const deanMenuItems = [
  {
    text: "Analysis",
    icon: <AnalyticsIcon style={{ color: "#C5CAE9" }} />,
    path: "/analysisDean",
  },
  {
    text: "Courses",
    icon: <SubjectOutlined style={{ color: "#C5CAE9" }} />,
    path: "/courses",
  },
  {
    text: "Add Course",
    icon: <AddCircleOutlined style={{ color: "#C5CAE9" }} />,
    path: "/addCourses",
  },
  {
    text: "Student Transcript",
    icon: <DownloadForOfflineIcon style={{ color: "#C5CAE9" }} />,
    path: "/generate-transcript",
  },
  {
    text: "Batch Transcript",
    icon: <DownloadIcon style={{ color: "#C5CAE9" }} />,
    path: "/generate-transcript-batch",
  },
  {
    text: "Course Allotment",
    icon: <EditIcon style={{ color: "#C5CAE9" }} />,
    path: "/allot-course",
  },
];

const instructMenuItems = [
  {
    text: "Analysis",
    icon: <AnalyticsIcon style={{ color: "#C5CAE9" }} />,
    path: "/analysis",
  },
  {
    text: "Courses",
    icon: <SubjectOutlined style={{ color: "#C5CAE9" }} />,
    path: "/inst-login",
  },
  {
    text: "Grading Scheme",
    icon: <AlignVerticalCenterOutlinedIcon style={{ color: "#C5CAE9" }} />,
    path: "/grading-scheme",
  },
  {
    text: "Upload Marks",
    icon: <AlignHorizontalRightOutlinedIcon style={{ color: "#C5CAE9" }} />,
    path: "/assessments",
  },
];

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          {/* Instructor Layout  */}

          <Route
            path={[
              "/inst-login",
              "/grading-scheme",
              "/assessments",
              "/analysis",
            ]}
          >
            <Layout deanMenuItems={instructMenuItems} login="Instructor Portal">
              <Switch>
                <Route exact path="/inst-login">
                  <InstMain />
                </Route>
                <Route exact path="/grading-scheme">
                  <GradingScheme />
                </Route>
                <Route exact path="/assessments">
                  <Assessments />
                </Route>
                <Route exact path="/analysis">
                  <ChartsGrid />
                </Route>
              </Switch>
            </Layout>
          </Route>

          {/* Dean Layout */}

          <Route
            path={[
              "/analysisDean",
              "/courses",
              "/generate-transcript",
              "/transcript-download/:regNo",
              "/populate",
              "/generate-transcript-batch",
              "/allot-course",
              "/addCourses",
            ]}
          >
            <Layout deanMenuItems={deanMenuItems} login="Dean Portal">
              <Switch>
                <Route exact path="/analysisDean">
                  <ChartsGridDean />
                </Route>
                <Route exact path="/courses">
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
                <Route exact path="/generate-transcript-batch">
                  <BatchTrans />
                </Route>
                <Route exact path="/allot-course">
                  <AllotCourse />
                </Route>
                <Route exact path="/addCourses">
                  <AddCourse />
                </Route>
              </Switch>
            </Layout>
          </Route>
          <Route exact path="/courseInfo">
            <CourseInfo />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;

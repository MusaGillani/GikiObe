import React from "react";
import "./GradingScheme.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

const useStyles = makeStyles({
  label: {
    color: "#303F9F",
    "&.Mui-focused": {
      color: "#303F9F",
    },
  },
  select: {
    "& .MuiSelect-select": {
      color: "#303F9F",
      borderColor: "#303F9F",
    },
    "& .MuiSelect-outlined": {
      color: "#303F9F",
    },
    "& .MuiSvgIcon-root": {
      color: "#303F9F",
    },
  },
  field: {
    paddingTop: 60,
    paddingBottom: 20,
    display: "block",
    width: 210,
    color: "blue",
    marginTop: 25,
  },
  box: {
    marginTop: 25,
    marginBottom: 25,
    marginLeft: 250,
  },
});

function GradingScheme(props) {
  const [course, setCourse] = useState("");
  const classes = useStyles();
  const [courses, setCourses] = useState([]);
  const [quiz, setQuiz] = useState("");
  const [assignment, setAssignment] = useState("");
  const [mid, setMid] = useState("");
  const [final, setFinal] = useState("");
  const [project, setProject] = useState("");

  const handleChange = (event) => {
    setCourse(event);
  };

  const handleChangeQuiz = (event) => {
    setQuiz(event);
  };

  const handleChangeAss = (event) => {
    setAssignment(event);
  };

  const handleChangeMid = (event) => {
    setMid(event);
  };

  const handleChangeFinal = (event) => {
    setFinal(event);
  };

  const handleChangeProject = (event) => {
    setProject(event);
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Assignemnt: ", assignment);
    console.log("Quiz: ", quiz);
    console.log("Mid: ", mid);
    console.log("Final: ", final);
    console.log("Project: ", project);

    fetch("http://127.0.0.1:8000/testing/addGrading", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        course_code: course,
        assignment_wt: parseFloat(assignment),
        quizzes_wt: parseFloat(quiz),
        mid_wt: parseFloat(mid),
        final_wt: parseFloat(final),
        final_proj_wt: parseFloat(project),
      }),
    }).then((res) => console.log(res));
  }

  React.useEffect(() => {
    fetch(`http://127.0.0.1:8000/testing/alloted-course/${props.id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        // console.log(data);
      });
  }, []);

  return (
    <div className="policy-form">
      <h2 style={{ color: "#303F9F" }}>Grading Policy</h2>
      <Box sx={{ minWidth: 120 }} className={classes.box}>
        <FormControl className={classes.field}>
          <InputLabel
            id="demo-simple-select-label"
            color="primary"
            className={classes.label}
          >
            Select Course
          </InputLabel>
          <Select
            className={classes.select}
            value={course}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Select Course"
            variant="outlined"
            onChange={(e) => handleChange(e.target.value)}
          >
            {courses.map((name) => (
              <MenuItem value={name}>{name}</MenuItem>
            ))}
          </Select>
          {/* {console.log(sBatch)} */}
        </FormControl>
      </Box>
      <div className="container">
        <Stack
          direction="row"
          spacing={4}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Stack spacing={4}>
            <Button
              className="label"
              variant="contained"
              size="large"
              style={{ color: "#303F9F", background: "#C5CAE9" }}
            >
              Quizzes
            </Button>
            <Button
              className="label"
              variant="contained"
              size="large"
              style={{ color: "#303F9F", background: "#C5CAE9" }}
            >
              Assignments
            </Button>
            <Button
              className="label"
              variant="contained"
              size="large"
              style={{ color: "#303F9F", background: "#C5CAE9" }}
            >
              Midterm Exam
            </Button>
            <Button
              className="label"
              variant="contained"
              size="large"
              style={{ color: "#303F9F", background: "#C5CAE9" }}
            >
              Final Exam
            </Button>
            <Button
              className="label"
              variant="contained"
              size="large"
              style={{ color: "#303F9F", background: "#C5CAE9" }}
            >
              Final Project
            </Button>
          </Stack>
          <Stack spacing={2}>
            <TextField
              id="outlined-basic"
              placeholder="5%"
              variant="outlined"
              value={quiz}
              onChange={(e) => handleChangeQuiz(e.target.value)}
              Required
            />
            <TextField
              id="outlined-basic"
              placeholder="5%"
              variant="outlined"
              value={assignment}
              onChange={(e) => handleChangeAss(e.target.value)}
              Required
            />
            <TextField
              id="outlined-basic"
              placeholder="30%"
              variant="outlined"
              value={mid}
              onChange={(e) => handleChangeMid(e.target.value)}
              Required
            />
            <TextField
              id="outlined-basic"
              placeholder="50%"
              variant="outlined"
              value={final}
              onChange={(e) => handleChangeFinal(e.target.value)}
              Required
            />
            <TextField
              id="outlined-basic"
              placeholder="5%"
              variant="outlined"
              value={project}
              onChange={(e) => handleChangeProject(e.target.value)}
              Required
            />
          </Stack>
        </Stack>
        <div className="btn-container">
          <div className="submit-btn">
            <Button
              variant="contained"
              size="large"
              style={{ color: "#303F9F", background: "#C5CAE9" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GradingScheme;

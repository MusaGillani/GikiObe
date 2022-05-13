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

const courses = ["Full Stack Development", "Database Management System"];

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
  const handleChange = (event) => {
    setCourse(event);
  };
  const [course, setCourse] = useState("");
  const classes = useStyles();
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
              placeholder="10%"
              variant="outlined"
              Required
            />
            <TextField
              id="outlined-basic"
              placeholder="5%"
              variant="outlined"
              Required
            />
            <TextField
              id="outlined-basic"
              placeholder="30%"
              variant="outlined"
              Required
            />
            <TextField
              id="outlined-basic"
              placeholder="50%"
              variant="outlined"
              Required
            />
            <TextField
              id="outlined-basic"
              placeholder="5%"
              variant="outlined"
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

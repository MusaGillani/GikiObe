import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Container } from "@mui/material";
import { makeStyles } from "@material-ui/styles"; // a function
import { Typography } from "@material-ui/core";
import AssCard from "./AssCard";

const Scourses = [
  "Signals and System",
  "Applied Artifical Intelligence",
  "Introduction to Programming",
  "Logic Design",
  "Full Stack Development",
  "Database Management System",
];

const useStyles = makeStyles({
  container: {
    marginLeft: "30%",
  },
  fieldSelect: {
    paddingTop: 40,
    paddingBottom: 20,
    width: 200,
    color: "blue",
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  popup: {
    padding: 0,
    margin: 0,
    width: "90%",
    height: "190%",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "0px 7px 29px 0px rgba(100, 100, 111, 0.2)",
    color: "#3F51B5",
    marginTop: -35,
    paddingTop: 5,
  },
});

export default function Assessments() {
  const [category, setCategory] = useState("todos");
  const [courses, setCourses] = useState(Scourses);
  const [course, setCourse] = useState("");

  const handleChange = (event) => {
    setCourse(event);
  };

  const classes = useStyles();
  return (
    <div className={classes.popup}>
      {" "}
      <div className={classes.container}>
        <Typography
          gutterBottom
          variant="h4"
          className="title"
          style={{ color: "#303F9F" }}
        >
          Assessment Marks
        </Typography>
        <FormControl className={classes.fieldSelect}>
          <InputLabel id="demo-simple-select-label">Select Course</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={course}
            label="Select Course"
            onChange={(e) => handleChange(e.target.value)}
          >
            {courses.map((name) => (
              <MenuItem value={name}>{name}</MenuItem>
            ))}
          </Select>
          {/* {console.log(sBatch)} */}
        </FormControl>
        <FormControl className={classes.field}>
          <FormLabel>Assessment Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel value="Quiz" control={<Radio />} label="Quiz" />
            <FormControlLabel
              value="Assignment"
              control={<Radio />}
              label="Assignment"
            />
            <FormControlLabel
              value="Mid-Exam"
              control={<Radio />}
              label="Mid-Exam"
            />
            <FormControlLabel
              value="Final-Exam"
              control={<Radio />}
              label="Final-Exam"
            />
            <FormControlLabel
              value="Project"
              control={<Radio />}
              label="Project"
            />
          </RadioGroup>
        </FormControl>
      </div>
      {category == "Quiz" && <AssCard type={category} />}
      {category == "Assignment" && <AssCard type={category} />}
    </div>
  );
}

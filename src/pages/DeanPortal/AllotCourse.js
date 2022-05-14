import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Container } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const useStyles = makeStyles({
  name: {
    paddingTop: 10,
    paddingBottom: 20,
  },

  btn: {
    fontSize: 60,
    backgroundColor: "blue",
    "&:hover": {
      backgroundColor: "blue",
    },
  },
  field: {
    paddingTop: 40,
    paddingBottom: 20,
    display: "block",
    width: 300,
    color: "blue",
  },
  appbar: {
    paddingBottom: 20,
  },
  abc: {
    marginTop: 175,
    paddingBottom: 75,
  },
  box: {
    marginBottom: 100,
  },
});

const Steachers = [
  "Mohsin Zafar",
  "Sajid Ali",
  "Masroor Ali",
  "Fawad Hussain",
  "Ali Shaukat",
];

export default function GenerateModified() {
  const classes = useStyles();
  const [teachers, setTeachers] = useState([]);
  const [teacher, setTeacher] = useState("");
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState("");

  const [allotedCourses, setAllotedCourses] = useState([]);
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleChange_r = (event) => {
    setTeacher(event.target.value);
  };

  const handleChange = (event) => {
    setCourse(event);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const TimOut = setTimeout(() => {
      console.log("loading");
    }, 4000);
    fetch(`http://127.0.0.1:8000/testing/alloted-course/${teacher}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(e.target[0].value);
        var a = e.target[0].value.split(" ");
        data.push(a[a.length - 1]);
        setAllotedCourses(data);
        console.log(data);
      })
      .catch((e) => console.log(e));
    setTeacher(e.target[1].value);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    console.log(
      JSON.stringify({
        inst: teacher,
        password: allotedCourses,
      })
    );

    fetch("http://127.0.0.1:8000/testing/allot-course", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        inst: teacher,
        courseCode: allotedCourses,
      }),
    }).then((res) => console.log(res));

    setOpen(false);
  };

  const handleDelete = (name) => {
    const newValue = allotedCourses.filter((i) => i !== name);
    setAllotedCourses(newValue);
    console.log(newValue);
    console.info("You clicked the delete icon.");
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }

    fetch(`http://127.0.0.1:8000/testing/courses/5`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        // console.log(data);
      });

    fetch(`http://127.0.0.1:8000/testing/instructors`)
      .then((res) => res.json())
      .then((data) => {
        setTeachers(data);
        // console.log(data);
      });
  }, [open]);

  return (
    <div className="App">
      <Container align="center">
        <form onSubmit={handleSubmit}>
          {teachers && courses && (
            <div className={classes.abc}>
              <Box sx={{ minWidth: 120 }} className={classes.box}>
                <FormControl className={classes.field}>
                  <InputLabel id="demo-simple-select-label">Courses</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={course}
                    label="Courses"
                    onChange={(e) => handleChange(e.target.value)}
                  >
                    {courses.map((name) => (
                      <MenuItem value={name}>{name}</MenuItem>
                    ))}
                  </Select>
                  {/* {console.log(sBatch)} */}
                </FormControl>
              </Box>
              <Box sx={{ minWidth: 120 }}>
                <FormControl className={classes.field}>
                  <InputLabel id="demo-simple-select-label">
                    Instructors
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={teacher}
                    label="Instructors"
                    onChange={handleChange_r}
                  >
                    {teachers.map((name) => (
                      <MenuItem value={name}>{name}</MenuItem>
                    ))}
                  </Select>
                  {/* {setRegNum(regNum)} */}
                </FormControl>
              </Box>
            </div>
          )}
          <Button
            type="submit"
            variant="contained"
            className={classes.btn}
            onSubmit={handleSubmit}
            style={{ color: "#303F9F", background: "#C5CAE9" }}
          >
            Allot
          </Button>
        </form>
      </Container>
      {/* {console.log(allotedCourses)} */}
      {allotedCourses && (
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={"paper"}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">{teacher}</DialogTitle>
          <DialogContent>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <Typography variant="h6" color="primary" className={classes.name}>
                Currently Alloted Courses
              </Typography>
              {allotedCourses && (
                <Stack direction="row" spacing={1}>
                  {allotedCourses.map((name) => (
                    <Chip
                      label={name}
                      onDelete={() => handleDelete(name)}
                      variant="outlined"
                    />
                  ))}
                </Stack>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleConfirm}
              style={{ color: "#303F9F", background: "#C5CAE9", height: 20 }}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

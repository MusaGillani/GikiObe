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

const Scourses = [
  "Signals and System",
  "Applied Artifical Intelligence",
  "Introduction to Programming",
  "Logic Design",
  "Full Stack Development",
  "Database Management System",
];

export default function GenerateModified() {
  const classes = useStyles();
  const [teachers, setTeachers] = useState(Steachers);
  const [teacher, setTeacher] = useState("");
  const [courses, setCourses] = useState(Scourses);
  const [course, setCourse] = useState("");
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
    console.log(course, " ", teacher);
    setOpen(true);
  };

  //   const handleClickOpen = (scrollType) => () => {
  //     setOpen(true);
  //     setScroll(scrollType);
  //   };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
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
            style={{ color: "#C5CAE9", background: "#3F51B5" }}
          >
            Allot
          </Button>
        </form>
      </Container>
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
            <Stack direction="row" spacing={1}>
              <Chip label="CS101" onDelete={handleDelete} variant="outlined" />
              <Chip label="CS102" variant="outlined" onDelete={handleDelete} />
              <Chip label="CS103" variant="outlined" onDelete={handleDelete} />
              <Chip label="CS104" variant="outlined" onDelete={handleDelete} />
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{
              color: "#C5CAE9",
              background: "#3F51B5",
              height: 20,
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

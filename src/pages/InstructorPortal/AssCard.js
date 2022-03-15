import React from "react";
import { Typography, Grid, TextField, Fab } from "@material-ui/core";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import Box from "@mui/material/Box";
import FormControl from "@material-ui/core/FormControl";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { makeStyles } from "@material-ui/styles"; // a function
import Button from "@mui/material/Button";

const useStyles = makeStyles({
  container: {
    marginLeft: 50,
  },
  select: {
    marginRight: 700,
  },
  fieldSelect: {
    paddingTop: 10,
    paddingBottom: 20,
    width: 200,
    color: "blue",
  },
  field: {
    height: 30,
  },
  abc: {
    height: 30,
  },
  btn: {
    marginTop: 50,
    paddingBottom: 50,
  },
});

const Scourses = ["CLO1", "CLO2", "CLO3", "CLO4"];
const regNumbers = ["2018146", "2018460", "2018468"];

export default function AssCard(props) {
  const [courses, setCourses] = useState(Scourses);
  const [course, setCourse] = useState("");
  const [reg, setReg] = useState();
  const classes = useStyles();

  const [marks, setMarks] = useState([
    {
      label: "Marks",
      placeholder: "Enter Marks of Student 1",
    },
    {
      label: "Marks",
      placeholder: "Enter Marks of Student 2",
    },
  ]);
  const createTextField = () => {
    let cloNum = marks.length + 1;
    let label = "Marks";
    let placeholder = "Enter Marks of Student  " + cloNum;
    setMarks([...marks, { label: label, placeholder: placeholder }]);
  };

  const handleChange = (event) => {
    setCourse(event);
  };

  return (
    <div className={classes.container}>
      {" "}
      <Typography
        gutterBottom
        variant="h6"
        className="title"
        style={{ color: "#303F9F", marginLeft: 400 }}
      >
        Marks of {props.type} 1
      </Typography>
      <form>
        <Box sx={{ minWidth: 120 }}>
          <Grid container spacing={1}>
            <Grid xs={12} sm={12} item>
              <FormControl className={classes.fieldSelect}>
                <InputLabel id="demo-simple-select-label">
                  Select CLO
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={course}
                  label="Select CLO"
                  onChange={(e) => handleChange(e.target.value)}
                >
                  {courses.map((name) => (
                    <MenuItem value={name}>{name}</MenuItem>
                  ))}
                </Select>
                {/* {console.log(sBatch)} */}
              </FormControl>
            </Grid>
            <Grid xs={12} sm={12} item>
              <TextField
                label="Threshold"
                placeholder="Enter course code"
                id="standard-basic"
                required
              ></TextField>
            </Grid>
            <Grid xs={12} sm={12} item>
              <TextField
                label="Total Marks"
                placeholder="Enter course code"
                id="standard-basic"
                required
              ></TextField>
            </Grid>

            {marks.map((mark, reg) => (
              <Grid xs={12} sm={12} item className="abc">
                <div>
                  <TextField
                    label={mark.label}
                    placeholder={mark.placeholder}
                    id="standard-basic"
                    halfWidth
                    required
                  ></TextField>
                </div>
                <div className={classes.select}>
                  <FormControl>
                    <InputLabel
                      id="demo-simple-select-label"
                      placeholder="RegNumber"
                      halfWidth
                      className={classes.field}
                    >
                      Reg Number
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={reg}
                      label="Reg Number"
                      halfWidth
                      className={classes.abc}

                      //   onChange={(e) => handleChange(e.target.value)}
                    >
                      {regNumbers.map((name) => (
                        <MenuItem value={name}>{name}</MenuItem>
                      ))}
                    </Select>
                    {/* {console.log(sBatch)} */}
                  </FormControl>
                </div>
              </Grid>
            ))}
            <div className="add-clos">
              <div className="add-button">
                <Fab
                  color="#3F51B5"
                  aria-label="add"
                  onClick={createTextField}
                  style={{
                    marginTop: "10px",
                    marginLeft: "5px",
                    color: "#3F51B5",
                  }}
                >
                  <AddIcon style={{ color: "#3F51B5" }} />
                </Fab>
              </div>
              <div className="button-label">Add more...</div>
            </div>
          </Grid>
        </Box>
        <div className={classes.btn}>
          <Button
            type="submit"
            variant="contained"
            style={{ color: "#303F9F", background: "#C5CAE9" }}
            //   onSubmit={handleSubmit}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

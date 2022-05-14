import { React, useState } from "react";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Fab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import "./AddCourse.css";

const PLOs = ["1", "2", "3"];

function AddCourse(props) {
  const [plo, setPlo] = useState();
  const [cloFields, setCloField] = useState([
    {
      label: "CLO 1",
      placeholder: "Enter description for CLO 1",
    },
    {
      label: "CLO 2",
      placeholder: "Enter description for CLO 2",
    },
  ]);

  const createTextField = () => {
    let cloNum = cloFields.length + 1;
    let label = "CLO " + cloNum;
    let placeholder = "Enter description for CLO " + cloNum;
    setCloField([...cloFields, { label: label, placeholder: placeholder }]);
  };

  function handleSubmit(e) {
    e.preventDefault();
    var courseTitle = e.target[0].value;
    var courseCode = e.target[1].value;
    var CLOs = [];
    var Threshold = [];
    var PLOs = [];

    // console.log(cloFields.length);
    // console.log(e.target[4].value);

    var iterations = cloFields.length * 3 + 2;
    for (let i = 2; i < iterations; i = i + 3) {
      CLOs.push(e.target[i].value);
      Threshold.push(e.target[i + 1].value);
      PLOs.push(e.target[i + 2].value);
    }

    console.log({
      courseTitle: courseTitle,
      courseCode: courseCode,
      CLOs: CLOs,
      threshold: Threshold,
      PLOs: PLOs,
    });

    fetch("http://127.0.0.1:8000/testing/add-course", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseTitle: courseTitle,
        courseCode: courseCode,
        CLOs: CLOs,
        threshold: Threshold,
        PLOs: PLOs,
      }),
    }).then((res) => console.log(res));
  }

  return (
    <div className="popup">
      <Typography
        gutterBottom
        variant="h4"
        align="center"
        className="title"
        style={{ color: "#303F9F" }}
      >
        Add Course
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ minWidth: 120 }}>
          <Grid container spacing={1}>
            <Grid xs={12} sm={12} item>
              <TextField
                label="Course Title"
                id="standard-basic"
                placeholder="Enter course title"
                variant="standard"
                fullWidth
                required
              ></TextField>
            </Grid>
            <Grid xs={12} sm={12} item>
              <TextField
                label="Course Code"
                placeholder="Enter course code"
                id="standard-basic"
                fullWidth
                required
              ></TextField>
            </Grid>
            <h5 className="heading" style={{ color: "#303F9F" }}>
              Add CLO/PLO Mapping
            </h5>
            {cloFields.map((clof) => (
              <Grid xs={12} sm={12} item className="abc">
                <div>
                  <TextField
                    label={clof.label}
                    placeholder={clof.placeholder}
                    id="standard-basic"
                    halfWidth
                    required
                  ></TextField>
                </div>
                <div>
                  <TextField
                    label="Threshold"
                    placeholder={clof.placeholder}
                    id="standard-basic"
                    halfWidth
                    required
                  ></TextField>
                </div>
                <div className="select">
                  <FormControl className="field">
                    <InputLabel
                      id="demo-simple-select-label"
                      placeholder="Select PLO"
                      halfWidth
                    >
                      PLO{" "}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={plo}
                      label="PLO"
                      halfWidth

                      //   onChange={(e) => handleChange(e.target.value)}
                    >
                      {PLOs.map((name) => (
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
        <div className="btn">
          <Button
            type="submit"
            variant="contained"
            style={{ color: "#303F9F", background: "#C5CAE9" }}
            onSubmit={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddCourse;

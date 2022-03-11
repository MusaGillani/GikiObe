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

const PLOs = ["PLO1", "PLO2", "PLO3"];

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

  return (
    <div className="popup">
      <Typography gutterBottom variant="h4" align="center" className="title">
        Add Course
      </Typography>
      <form>
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
            <h5 className="heading">Add CLO/PLO Mapping</h5>
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
            style={{ color: "#C5CAE9", background: "#3F51B5" }}
            //   onSubmit={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddCourse;

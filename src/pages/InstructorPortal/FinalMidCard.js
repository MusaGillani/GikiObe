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
import * as XLSX from "xlsx";

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
    marginTop: 40,
    paddingBottom: 50,
  },
  upload: {
    marginTop: 50,
    paddingBottom: 10,
    alignItems: "center",
  },
});


export default function FinalMidCard(props) {
  const [file, setFile] = useState([]);
  const [CLOs, setCLOs] = useState([]);
  const [CLO, setCLO] = useState("");
  const [reg, setReg] = useState();
  const classes = useStyles();
  const [formData, setformData] = useState("");
  const [marks, setMarks] = useState([
    {
      label: "Marks",
      placeholder: "Enter Total Marks of Question 1",
    },
    {
      label: "Marks",
      placeholder: "Enter Total Marks of Question 2",
    },
  ]);

  React.useEffect(() => {
    console.log();
    fetch(`http://127.0.0.1:8000/testing/getCourseClo/${props.course}`)
      .then((res) => res.json())
      .then((data) => {
        setCLOs(data);
        console.log(data);
      });
  }, []);

  const createTextField = () => {
    let cloNum = marks.length + 1;
    let label = "Marks";
    let placeholder = "Enter Marks of Student  " + cloNum;
    setMarks([...marks, { label: label, placeholder: placeholder }]);
  };

  const handleChange = (event) => {
    setCLO(event);
  };

  const onSelectImageHandler = (files) => {
    setFile(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(e.target[3]);

    var marks_question = [];
    var threshold = [];
    var CLOs = [];

    var iterations = marks.length * 4;
    console.log(iterations);
    for (let i = 0; i < iterations; i = i + 4) {
      marks_question.push(e.target[i].value);
      threshold.push(e.target[i + 1].value);
      CLOs.push(e.target[i + 2].value);
    }

    var temp = {
      total_marks: marks_question,
      clo_threshold: threshold,
      mapped_on_clo: CLOs,
      assessment_type: props.type,
      course_code: props.course,
      registration_numbers: [],
      obtained_marks: []
    };
    // console.log(marks_question);

    var f = file[0];
    // console.log(f);
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;
      let readedData = XLSX.read(data, { type: "binary" });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      /* Convert array to json*/
      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
      //  console.log(dataParse);

      for (let i = 1; i < dataParse.length; i++) {
        temp.registration_numbers.push(dataParse[i][0]);
        for (let j = 0; j < CLOs.length; j++)
          temp.obtained_marks.push(dataParse[i][j + 1]);
      }
       //console.log(temp);
       fetch("http://127.0.0.1:8000/testing/addFinalMidP", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(temp),
      }).then((res) => console.log(res));
    };
    reader.readAsBinaryString(f);
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
        Marks of {props.type}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ minWidth: 120 }}>
          <Grid container spacing={1}>
            <Typography
              gutterBottom
              variant="h6"
              className="title"
              style={{ color: "#303F9F", marginTop: 30 }}
            >
              Question Wise CLO Mapping
            </Typography>
            {marks.map((mark) => (
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
                <div>
                  <Grid xs={12} sm={12} item>
                    <TextField
                      label="Threshold"
                      placeholder="Enter course code"
                      id="standard-basic"
                      required
                    ></TextField>
                  </Grid>
                </div>
                <div className={classes.select}>
                  <Grid xs={12} sm={12} item>
                    <FormControl className={classes.fieldSelect}>
                      <InputLabel id="demo-simple-select-label">
                        Select CLO
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={CLO}
                        label="Select CLO"
                        // onChange={(e) => handleChange(e.target.value)}
                      >
                        {CLOs.map((name) => (
                          <MenuItem value={name}>{name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
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
        <div className={classes.upload}>
          <label htmlFor="upload">Upload File Mark Sheet</label>
          <input
            type="file"
            name="files"
            id="upload"
            multiple
            onChange={(e) => onSelectImageHandler(e.target.files)}
          />
        </div>
        <div className={classes.btn}>
          <Button
            type="submit"
            variant="contained"
            style={{ color: "#303F9F", background: "#C5CAE9" }}
            onSubmit={handleSubmit}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

import React from "react";
import { Typography, Grid, TextField, Fab } from "@material-ui/core";
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
    marginTop: 50,
    paddingBottom: 50,
  },
  upload: {
    marginTop: 50,
    paddingBottom: 10,
    alignItems: "center",
  },
});

export default function AssCard(props) {
  const [CLOs, setCLOs] = useState([]);
  const [CLO, setCLO] = useState("");
  const classes = useStyles();
  const [file, setFile] = useState([]);
  const [serial, setSerial] = useState();
  const [threshold, setThreshold] = useState();
  const [totalMarks, setTotalMarks] = useState();

  React.useEffect(() => {
    console.log()
    fetch(`http://127.0.0.1:8000/testing/getCourseClo/${props.course}`)
      .then((res) => res.json())
      .then((data) => {
        setCLOs(data);
        console.log(data);
      });
  }, []);

  const handleChangeCLO = (event) => {
    setCLO(event);
  };

  const handleChangeSerial = (event) => {
    setSerial(event);
  };

  const handleChangeThreshold = (event) => {
    setThreshold(event);
  };

  const handleChangeTotalMarks = (event) => {
    setTotalMarks(event);
  };

  const onSelectImageHandler = (files) => {
    setFile(files);
  };

  function handleSave(e) {
    e.preventDefault();
    const type = props.type;
    const course = props.course;

    var f = file[0];

    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;
      let readedData = XLSX.read(data, { type: "binary" });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      /* Convert array to json*/
      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
      // console.log(dataParse);
      var temp = { reg_no: [], marks_obtained: [] };

      for (let i = 1; i < dataParse.length; i++) {
        temp.reg_no.push(dataParse[i][0]);
        temp.marks_obtained.push(dataParse[i][1]);
      }
      temp["course_code"] = course;
      temp["assessment_type"] = type;
      temp["serial_no"] = serial;
      temp["question_no"] = 1;
      temp["total_marks"] = totalMarks;
      temp["mapped_on_clo"] = CLO;
      temp["clo_threshold"] = threshold;
      console.log(temp);
    };
    reader.readAsBinaryString(f);
  }

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
      <form onSubmit={handleSave}>
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
                  value={CLO}
                  label="Select CLO"
                  onChange={(e) => handleChangeCLO(e.target.value)}
                >
                  {CLOs.map((name) => (
                    <MenuItem value={name}>{name}</MenuItem>
                  ))}
                </Select>
                {/* {console.log(sBatch)} */}
              </FormControl>
            </Grid>
            <Grid xs={12} sm={12} item>
              <TextField
                label="SR. Number"
                placeholder="Enter sr. number"
                id="standard-basic"
                required
                value={serial}
                onChange={(e) => handleChangeSerial(e.target.value)}
              >
                {props.type} number
              </TextField>
            </Grid>
            <Grid xs={12} sm={12} item>
              <TextField
                label="Threshold"
                placeholder="Enter course code"
                id="standard-basic"
                required
                value={threshold}
                onChange={(e) => handleChangeThreshold(e.target.value)}
              ></TextField>
            </Grid>
            <Grid xs={12} sm={12} item>
              <TextField
                label="Total Marks"
                placeholder="Enter course code"
                id="standard-basic"
                required
                value={totalMarks}
                onChange={(e) => handleChangeTotalMarks(e.target.value)}
              ></TextField>
            </Grid>
          </Grid>
        </Box>
        <Typography
          gutterBottom
          variant="h6"
          style={{ color: "#303F9F", marginTop: 50 }}
        >
          Upload File
        </Typography>
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
            onSubmit={handleSave}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

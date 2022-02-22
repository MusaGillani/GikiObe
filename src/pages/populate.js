import "./populate.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
//import xlsx from "xlsx";

const useStyles = makeStyles({
  btn: {
    fontSize: 60,
    backgroundColor: "blue",
    margin: 100,
    "&:hover": {
      backgroundColor: "blue",
    },
    marginBottom: 100,
  },
  field: {
    marginTop: 40,
    marginBottom: 20,
    display: "block",
    width: 500,
    color: "blue",
  },
  appbar: {
    paddingBottom: 20,
  },
  uplaod: {
    fontSize: 60,
    backgroundColor: "blue",
    margin: 100,
  },
});
function Populate() {
  // Hooks

  const classes = useStyles();
  const [regNo, setregNo] = useState("");
  const [name, setName] = useState("");
  const [batch, setBatch] = useState("");
  const [reNoError, setReNoError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [batchError, setBatchError] = useState(false);
  const [formData, setformData] = useState("");

  // Handle Submit

  useEffect(() => {
    if (formData != "")
      fetch("http://127.0.0.1:8000/testing/add", {
        method: "POST",
        header: "multipart/form-data",
        body: formData,
      })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    // .then((data) => (data));
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setReNoError(false);
    setNameError(false);
    setBatchError(false);
    if (regNo == "") {
      setReNoError(true);
    }
    if (name == "") {
      setNameError(true);
    }
    if (batch == "") {
      setBatchError(true);
    }
    if (regNo && name && batch) {
      console.log(regNo, name, batch);
      //history.push("/generate-transcript");
    }
  };

  const onSelectImageHandler = (files) => {
    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    setformData(formData);
  };
  return (
    <div className="App">
      <AppBar className={classes.appbar} align="center">
        <Toolbar>
          <Typography variant="h6" component="div">
            Upload Files of Course PLOs
          </Typography>
        </Toolbar>
      </AppBar>
      <Container align="center">
        <form
          noValidate
          autoComplete="off"
          className="forms"
          onSubmit={handleSubmit}
        >
          <TextField
            onChange={(e) => setregNo(e.target.value)}
            className={classes.field}
            label="Instructor"
            variant="outlined"
            fullWidth
            required
            error={reNoError}
          />
          <TextField
            onChange={(e) => setName(e.target.value)}
            className={classes.field}
            label="Course Code"
            variant="outlined"
            fullWidth
            required
            error={nameError}
          />
          <TextField
            onChange={(e) => setBatch(e.target.value)}
            className={classes.field}
            label="Course Title"
            variant="outlined"
            fullWidth
            required
            error={batchError}
          />
          <TextField
            onChange={(e) => setBatch(e.target.value)}
            className={classes.field}
            label="Batch"
            variant="outlined"
            fullWidth
            required
            error={batchError}
          />
          <TextField
            onChange={(e) => setBatch(e.target.value)}
            className={classes.field}
            label="Semester"
            variant="outlined"
            fullWidth
            required
            error={batchError}
          />
          <div className="upload">
            <label htmlFor="upload">Upload File</label>
            <input
              type="file"
              name="upload"
              id="upload"
              onChange={(e) => onSelectImageHandler(e.target.files)}
            />
          </div>
          <Button type="submit" variant="contained" className={classes.btn}>
            Upload
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default Populate;

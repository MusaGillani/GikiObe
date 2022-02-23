import "./generate.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  btn: {
    fontSize: 60,
    backgroundColor: "blue",
    margin: 100,
    "&:hover": {
      backgroundColor: "blue",
    },
  },
  field: {
    marginTop: 40,
    marginBottom: 20,
    display: "block",
    width: 300,
    color: "blue",
  },
  appbar: {
    paddingBottom: 20,
  },
});
function Generate() {
  // Hooks

  const classes = useStyles();
  const [regNo, setregNo] = useState("");
  const [name, setName] = useState("");
  const [batch, setBatch] = useState("");
  const [reNoError, setReNoError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [batchError, setBatchError] = useState(false);
  const history = useHistory();

  // Handle Submit

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
      history.push(`/transcript-download/${regNo}/${name}`);
    }
  };

  return (
    <div className="App">
      <AppBar className={classes.appbar} align="center">
        <Toolbar>
          <Typography variant="h6" component="div">
            Generate Student Transcript
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
            label="Registration Number"
            variant="outlined"
            fullWidth
            required
            error={reNoError}
          />
          <TextField
            onChange={(e) => setName(e.target.value)}
            className={classes.field}
            label="Name"
            variant="outlined"
            fullWidth
            required
            error={nameError}
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
          <Button type="submit" variant="contained" className={classes.btn}>
            Generate
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default Generate;

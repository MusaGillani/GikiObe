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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useStyles = makeStyles({
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
    marginTop: 250,
    paddingBottom: 75,
  },
  box: {
    marginBottom: 100,
  },
});

export default function GenerateModified() {
  const classes = useStyles();
  const [batches, setBatches] = useState([]);
  const [sBatch, setSBatch] = useState("");
  const [regNumbers, setRegNumbers] = useState([]);
  const [regNum, setRegNum] = useState("");
  const [abc, setAbc] = useState(0);
  const history = useHistory();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/testing/batches")
      .then((res) => res.json())
      .then((data) => {
        setBatches(data);
      });
  }, []);
  const handleChange = (event) => {
    setSBatch(event);
    fetch(`http://127.0.0.1:8000/testing/students/${event}`)
      .then((res) => res.json())
      .then((data) => {
        setRegNumbers(data);
      });
  };

  const handleChange_r = (event) => {
    setRegNum(event.target.value);
    // console.log(regNum);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (regNum) {
      history.push(`/transcript-download/${regNum}`);
    }
  };

  return (
    <div className="App">
      <Container align="center">
        <form onSubmit={handleSubmit}>
          {batches && regNumbers && (
            <div className={classes.abc}>
              <Box sx={{ minWidth: 120 }} className={classes.box}>
                <FormControl className={classes.field}>
                  <InputLabel id="demo-simple-select-label">Batch</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sBatch}
                    label="Batch"
                    onChange={(e) => handleChange(e.target.value)}
                  >
                    {batches.map((name) => (
                      <MenuItem value={name}>{name}</MenuItem>
                    ))}
                  </Select>
                  {/* {console.log(sBatch)} */}
                </FormControl>
              </Box>
              <Box sx={{ minWidth: 120 }}>
                <FormControl className={classes.field}>
                  <InputLabel id="demo-simple-select-label">
                    Registration Numbers
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={regNum}
                    label="Registration Numbers"
                    onChange={handleChange_r}
                  >
                    {regNumbers.map((name) => (
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
            Generate
          </Button>
        </form>
      </Container>
    </div>
  );
}

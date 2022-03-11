import React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Container } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@material-ui/styles";
import Button from "@mui/material/Button";

const useStyles = makeStyles({
  // form: {
  //   marginTop: 100,
  // },
  btn: {
    fontSize: 60,
    marginLeft: 100,
    backgroundColor: "blue",
    "&:hover": {
      backgroundColor: "blue",
    },
  },
  abc: {
    marginLeft: 450,
  },
  field: {
    paddingTop: 40,
    paddingBottom: 20,
    display: "block",
    width: 300,
    color: "blue",
  },
  box: {
    marginBottom: 100,
    marginLeft: 350,
    marginTop: 200,
  },
});

export default function BatchTrans() {
  useEffect(() => {
    fetch("http://127.0.0.1:8000/testing/batches")
      .then((res) => res.json())
      .then((data) => {
        setBatches(data);
      });
  }, []);

  const [batches, setBatches] = useState([]);
  const [sBatch, setSBatch] = useState("");
  const classes = useStyles();

  const handleChange = (event) => {
    setSBatch(event);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (regNum) {
    //   history.push(`/transcript-download/${regNum}`);
    // }
  };
  return (
    <div>
      {/* <Container> */}
      <form onSubmit={handleSubmit}>
        {console.log(batches)}
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
        <div className={classes.abc}>
          <Button
            type="submit"
            variant="contained"
            // onSubmit={handleSubmit}
            style={{ color: "#C5CAE9", background: "#3F51B5" }}
          >
            Generate
          </Button>
        </div>
      </form>
      {/* </Container> */}
    </div>
  );
}

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
import axios from "axios";

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
  const [res, setRes] = useState([]);

  const handleChange = (event) => {
    setSBatch(event);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:8000/testing/bulk/${sBatch}`, {
      responseType: "binary",
    })
      .then(async function (response) {
        console.log("response: ", response);
        console.log("response.type: ", response.type);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(
          // new Blob([res.data], { type: "application/zip" })
          blob
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${sBatch}.zip`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        // saveAs(blob, 'hello world.txt')
      })
      .catch(function (error) {
        console.log(error);
      });
    // console.log(res);
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
            style={{ color: "#303F9F", background: "#C5CAE9" }}
          >
            Generate
          </Button>
        </div>
      </form>
      {/* </Container> */}
    </div>
  );
}

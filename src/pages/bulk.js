import { Container } from "@mui/material";
import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import Button from "@mui/material/Button";
import Transcript from "./transcript";
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
export default function Bulk() {
  const classes = useStyles();
  const [regNos, setRegNos] = useState();
  const [reNoError, setReNoError] = useState(false);
  const [flag, setFlag] = useState(false);
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    setReNoError(false);
    setFlag(false);
    if (regNos == "") {
      setReNoError(true);
    }
    if (regNos.length > 1) {
      console.log(regNos);
      history.push(`/generate-transcript-arr/${regNos}`);
    }
  };

  return (
    <Container>
      <form
        noValidate
        autoComplete="off"
        className="forms"
        onSubmit={handleSubmit}
      >
        <TextField
          onChange={(e) => setRegNos(e.target.value)}
          className={classes.field}
          label="Enter Registration Numbers"
          variant="outlined"
          fullWidth
          required
          error={reNoError}
          onChange={(e) => setRegNos(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          className={classes.btn}
          onSubmit={handleSubmit}
        >
          Generate
        </Button>
        {/* {regNos.map((row) => {
          flag && <Transcript reg={row} />;
        })} */}
      </form>
    </Container>
  );
}

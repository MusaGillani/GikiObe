import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import logo from "../logo.jpg";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

export default function CloTranscript(props) {
  const [data, setData] = useState([]);
  const [uniqueCLO, setUniqueCLO] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    console.log(props.regNum);
    fetch(`http://127.0.0.1:8000/testing/getAssessments/${props.regNum}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data[0]["Name"]);
        data = [...data.slice(1, data.length)];
        setData(data);
        console.log(data);
      });
  }, []);

  return (
    <div>
      <div class="container-fluid">
        <div className="row header pt-4">
          <div className="col-2">
            <img src={logo} alt="logo" className="giki-logo" />
          </div>

          <div className="title col-10">
            <h2 className="uni-name">
              Ghulam Ishaq Khan Institute of Engineering Sciences and Technology
            </h2>
            <h4>CLO Transcript</h4>
          </div>
        </div>
        <div className="student-data px-4 py-3">
          <p>
            <b>Name:</b> {name}
          </p>
          <p>
            <b>Registration Number:</b> {props.regNum}
          </p>
          <p>
            <b>Faculty:</b> {"CE"}
          </p>
        </div>
      </div>

      {data.map((k_1, index) => (
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>{`${k_1["course_title"]}  ${k_1["course_code"]}`}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Assessment Type</TableCell>
                  <TableCell>CLO Number</TableCell>
                  <TableCell>Obtained Threshold</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {k_1["assessments"].map((key, index) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{key}</TableCell>
                    <TableCell>{k_1["CLOs"][index]}</TableCell>
                    <TableCell>{k_1["obtained_weightage"][index]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br></br>
          <Typography variant="h6" color="blue">
            Cummaltive CLO Results
          </Typography>
          {(() => {
            var a = [...new Set(k_1["CLOs"])];
            var b = {};
            for (let i = 0; i < k_1["CLOs"].length; i++) {
              if (k_1["CLOs"][i] in b) {
                b[k_1["CLOs"][i]] =
                  parseFloat(b[k_1["CLOs"][i]]) +
                  parseFloat(k_1["obtained_weightage"][i]);
              } else
                b[k_1["CLOs"][i]] = parseFloat(k_1["obtained_weightage"][i]);
            }
            return a.map((key) => (
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>{`CLO ${key}`}</TableCell>
                      <TableCell style={{ color: "red" }}>{`${b[key].toFixed(
                        2
                      )}`}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            ));
          })()}
          <br></br>
        </div>
      ))}
    </div>
  );
}

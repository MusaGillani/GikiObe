import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import logo from "./logo.jpg";
import { makeStyles } from "@material-ui/styles"; // a function
import { useParams } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const useStyles = makeStyles({
  btn: {
    fontSize: 60,
    backgroundColor: "violet",
    "&:hover": {
      backgroundColor: "blue",
    },
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  header_name: {
    display: "flex",
    paddingLeft: 150,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export const Transcript = React.forwardRef((props, ref) => {
  const [details, setDetails] = useState([]);
  const { regNo, name } = useParams();

  const classes = useStyles();
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/testing/transcript/${regNo}`)
      .then((res) => res.json())
      .then((data) => setDetails(data));
  }, []);
  return (
    <div ref={ref}>
      <div className={classes.header_name}>
        <img src={logo} alt="logo" />
        <h1>
          Ghulam Ishaq Khan Institute of Engineering Sciences and Technology
        </h1>
      </div>
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Name: {name}
      </Typography>
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Registration Number: 2018146
      </Typography>
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Faculty: BCE
      </Typography>
      {Object.keys(details).map((year) => (
        //let year = year_no.split("_")[1];
        <div>
          <Typography
            variant="h6"
            color="textSecondary"
            component="h2"
            gutterBottom
          >
            {year}
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Course Code</StyledTableCell>
                  <StyledTableCell align="right">Course Title</StyledTableCell>
                  <StyledTableCell align="right">PLO1&nbsp;</StyledTableCell>
                  <StyledTableCell align="right">PLO2&nbsp;</StyledTableCell>
                  <StyledTableCell align="right">PLO3&nbsp;</StyledTableCell>
                  <StyledTableCell align="right">PLO4&nbsp;</StyledTableCell>
                  <StyledTableCell align="right">PLO5&nbsp;</StyledTableCell>
                  <StyledTableCell align="right">PLO6&nbsp;</StyledTableCell>
                  <StyledTableCell align="right">PLO7&nbsp;</StyledTableCell>
                  <StyledTableCell align="right">PLO8&nbsp;</StyledTableCell>
                  <StyledTableCell align="right">PLO9&nbsp;</StyledTableCell>
                  <StyledTableCell align="right">PLO10&nbsp;</StyledTableCell>
                  <StyledTableCell align="right">PLO11&nbsp;</StyledTableCell>
                  <StyledTableCell align="right">PLO12&nbsp;</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {details[year].map((row) => (
                  <StyledTableRow key={row.course_code}>
                    <StyledTableCell component="th" scope="row">
                      {row.course_code}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.course_name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.PLO1 == "" ? "-" : row.PLO1}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.PLO2 == "" ? "-" : row.PLO2}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.PLO3 == "" ? "-" : row.PLO3}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.PLO4 == "" ? "-" : row.PLO4}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.PLO5 == "" ? "-" : row.PLO5}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.PLO6 == "" ? "-" : row.PLO6}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.PLO7 == "" ? "-" : row.PLO7}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.PLO8 == "" ? "-" : row.PLO8}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.PLO9 == "" ? "-" : row.PLO9}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.PLO10 == "" ? "-" : row.PLO10}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.PLO11 == "" ? "-" : row.PLO11}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.PLO12 == "" ? "-" : row.PLO12}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))}
    </div>
  );
});
export default Transcript;

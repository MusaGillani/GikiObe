import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

function createData(
  CourseCode,
  CourseTitle,
  PLO1,
  PLO2,
  PLO3,
  PLO4,
  PLO5,
  PLO6,
  PLO7,
  PLO8,
  PLO9,
  PLO10,
  PLO11,
  PLO12
) {
  return {
    CourseCode,
    CourseTitle,
    PLO1,
    PLO2,
    PLO3,
    PLO4,
    PLO5,
    PLO6,
    PLO7,
    PLO8,
    PLO9,
    PLO10,
    PLO11,
    PLO12,
  };
}

const rows = [
  createData(
    "MT101",
    "Calculus",
    "Y",
    "-",
    "Y",
    "N",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-"
  ),
  createData(
    "MT101",
    "Calculus",
    "Y",
    "-",
    "Y",
    "N",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-"
  ),
  createData(
    "MT101",
    "Calculus",
    "Y",
    "-",
    "Y",
    "N",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-"
  ),
  createData(
    "MT101",
    "Calculus",
    "Y",
    "-",
    "Y",
    "N",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-"
  ),
  createData(
    "MT101",
    "Calculus",
    "Y",
    "-",
    "Y",
    "N",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-"
  ),
];

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
          {rows.map((row) => (
            <StyledTableRow key={row.CourseCode}>
              <StyledTableCell component="th" scope="row">
                {row.CourseCode}
              </StyledTableCell>
              <StyledTableCell align="right">{row.CourseTitle}</StyledTableCell>
              <StyledTableCell align="right">{row.PLO1}</StyledTableCell>
              <StyledTableCell align="right">{row.PLO2}</StyledTableCell>
              <StyledTableCell align="right">{row.PLO3}</StyledTableCell>
              <StyledTableCell align="right">{row.PLO4}</StyledTableCell>
              <StyledTableCell align="right">{row.PLO5}</StyledTableCell>
              <StyledTableCell align="right">{row.PLO6}</StyledTableCell>
              <StyledTableCell align="right">{row.PLO7}</StyledTableCell>
              <StyledTableCell align="right">{row.PLO8}</StyledTableCell>
              <StyledTableCell align="right">{row.PLO9}</StyledTableCell>
              <StyledTableCell align="right">{row.PLO10}</StyledTableCell>
              <StyledTableCell align="right">{row.PLO11}</StyledTableCell>
              <StyledTableCell align="right">{row.PLO12}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

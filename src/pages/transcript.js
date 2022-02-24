import * as React from "react";
import { useEffect, useState } from "react";
import logo from "./logo.jpg";
import { useParams } from "react-router-dom";
import "./transcript.css";

export const Transcript = React.forwardRef((props, ref) => {
  const [details, setDetails] = useState([]);
  const { regNo, name } = useParams();
  const [regNum, setRegNum] = useState(regNo);
  if (props.reg) {
    //console.log(props.reg);
    setRegNum(props.reg);
  }
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/testing/transcript/${regNum}`)
      .then((res) => res.json())
      .then((data) => setDetails(data));
  }, [regNum]);
  return (
    <div class="container-fluid px-5" ref={ref}>
      <div class="container-fluid">
        <div className="row header pt-4">
          <div className="col-2">
            <img src={logo} alt="logo" className="giki-logo" />
          </div>

          <div className="title col-10">
            <h2 className="uni-name">
              Ghulam Ishaq Khan Institute of Engineering Sciences and Technology
            </h2>
            <h4>PLO Transcript</h4>
          </div>
        </div>
        <div className="student-data px-4 py-3">
          <p>
            <b>Name:</b> Hassan Raza
          </p>
          <p>
            <b>Registration Number:</b> {regNum}
          </p>
          <p>
            <b>Faculty:</b> BCE
          </p>
        </div>
      </div>
      {Object.keys(details).map((year) => (
        //let year = year_no.split("_")[1];
        <div class="w-100">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th
                  class="border-start-1 border-end-0 border-top-0 fw-normal"
                  scope="col"
                  style={{ width: "20%" }}
                >
                  {year}
                </th>
                <th
                  class="border-0 border-top-0"
                  scope="col"
                  style={{ width: "25%" }}
                ></th>
                <th
                  class="table-light rowhead"
                  scope="col"
                  colspan="12"
                  style={{ width: "55%" }}
                >
                  PLOs
                </th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th scope="col">Course Code</th>
                <th scope="col">Course Title</th>
                <th scope="col">1</th>
                <th scope="col">2</th>
                <th scope="col">3</th>
                <th scope="col">4</th>
                <th scope="col">5</th>
                <th scope="col">6</th>
                <th scope="col">7</th>
                <th scope="col">8</th>
                <th scope="col">9</th>
                <th scope="col">10</th>
                <th scope="col">11</th>
                <th scope="col">12</th>
              </tr>
            </thead>
            <tbody>
              {details[year].map((row) => (
                <tr>
                  <td scope="row">{row.course_code}</td>
                  <td scope="row">{row.course_name}</td>
                  <td scope="row">{row.PLO1 == "" ? "-" : row.PLO1}</td>
                  <td scope="row">{row.PLO2 == "" ? "-" : row.PLO2}</td>
                  <td scope="row">{row.PLO3 == "" ? "-" : row.PLO3}</td>
                  <td scope="row">{row.PLO4 == "" ? "-" : row.PLO4}</td>
                  <td scope="row">{row.PLO5 == "" ? "-" : row.PLO5}</td>
                  <td scope="row">{row.PLO6 == "" ? "-" : row.PLO6}</td>
                  <td scope="row">{row.PLO7 == "" ? "-" : row.PLO7}</td>
                  <td scope="row">{row.PLO8 == "" ? "-" : row.PLO8}</td>
                  <td scope="row">{row.PLO9 == "" ? "-" : row.PLO9}</td>
                  <td scope="row">{row.PLO10 == "" ? "-" : row.PLO10}</td>
                  <td scope="row">{row.PLO11 == "" ? "-" : row.PLO11}</td>
                  <td scope="row">{row.PLO12 == "" ? "-" : row.PLO12}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
});
export default Transcript;

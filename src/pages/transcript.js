import * as React from "react";
import { useEffect, useState } from "react";
import logo from "./logo.jpg";
import { useParams } from "react-router-dom";
import "./transcript.css";

export const Transcript = React.forwardRef((props, ref) => {
  const [details, setDetails] = useState({});
  const { regNo, name } = useParams();
  const [regNum, setRegNum] = useState(regNo);
  const [studentName, setStudentName] = useState("");
  const [faculty, setFaculty] = useState("");
  const [batch, setBatch] = useState("");
  //const [flag, setFlag] = useState(1);

  function yesNo(string) {
    if (string) return string.charAt(0).toUpperCase();
    else return "-";
  }

  if (props.reg) {
    //console.log(props.reg);
    setRegNum(props.reg);
  }
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/testing/transcript/${regNum}`)
      .then((res) => res.json())
      .then((data) => {
        setFaculty(data["faculty"]);
        setStudentName(data["name"]);
        setBatch(data["batch"]);
        delete data["faculty"];
        delete data["name"];
        delete data["batch"];
        delete data["reg"];
        const ordered = Object.keys(data["result"])
          .sort()
          .reduce((obj, key) => {
            obj[key] = data["result"][key];
            return obj;
          }, {});
        setDetails(ordered);
      });
  }, [regNo]);
  return (
    // <div>
    //   {details && (
    //     <div>
    //       {Object.keys(details).map((row) => {
    //         const ordered = Object.keys(details[row])
    //           .sort()
    //           .reduce((obj, key) => {
    //             obj[key] = details[row][key];
    //             return obj;
    //           }, {});
    //         //console.log(ordered);
    //         return (
    //           <div>
    //             {Object.keys(ordered).map((year) => (
    //               <div>Hello World</div>
    //             ))}
    //           </div>
    //         );
    //       })}
    //       {/* {console.log(details["2018"])} */}
    //     </div>
    //   )}
    // </div>
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
            <b>Name:</b> {studentName}
          </p>
          <p>
            <b>Registration Number:</b> {regNum}
          </p>
          <p>
            <b>Faculty:</b> {faculty}
          </p>
        </div>
      </div>
      <div>
        {Object.keys(details).map((row_r) => {
          const ordered = Object.keys(details[row_r])
            .sort()
            .reduce((obj, key) => {
              obj[key] = details[row_r][key];
              return obj;
            }, {});
          return (
            <div>
              {Object.keys(ordered).map((year) => (
                <div>
                  <div class="w-100">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th
                            class="border-start-1 border-end-0 border-top-0 fw-normal"
                            scope="col"
                            style={{ width: "20%" }}
                          >
                            {(() => {
                              if (year == 3) return <div>Fall {row_r}</div>;
                              else if (year == 2)
                                return <div>Summer {row_r}</div>;
                              else return <div>Spring {row_r}</div>;
                            })()}
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
                        {details[row_r][year].map((row) => (
                          <tr>
                            <td scope="row">{row.CourseCode}</td>
                            <td scope="row">{row.courseTitle}</td>
                            <td scope="row">{yesNo(row.PLO1)}</td>
                            <td scope="row">{yesNo(row.PLO2)}</td>
                            <td scope="row">{yesNo(row.PLO3)}</td>
                            <td scope="row">{yesNo(row.PLO4)}</td>
                            <td scope="row">{yesNo(row.PLO5)}</td>
                            <td scope="row">{yesNo(row.PLO6)}</td>
                            <td scope="row">{yesNo(row.PLO7)}</td>
                            <td scope="row">{yesNo(row.PLO8)}</td>
                            <td scope="row">{yesNo(row.PLO9)}</td>
                            <td scope="row">{yesNo(row.PLO10)}</td>
                            <td scope="row">{yesNo(row.PLO11)}</td>
                            <td scope="row">{yesNo(row.PLO12)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
});
export default Transcript;

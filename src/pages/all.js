import React from "react";
import { useParams } from "react-router-dom";
import Download from "./download";
export default function All() {
  const { regNo } = useParams();
  // console.log(regNo);
  let arr = regNo.split(",");
  return (
    <div>
      {arr.map((row) => (
        <Download reg={row} />
        // <div>
        //   Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
        //   assumenda id nemo ea voluptates consectetur culpa praesentium placeat
        //   odio error. Labore dolor, maiores vel sapiente molestiae laboriosam
        //   eaque itaque earum!
        // </div>
      ))}
    </div>
  );
}

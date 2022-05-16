import React from "react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

export default function StudentTranscript(props) {
  const history = useHistory();
  const [reg, setReg] = useState(props.regNum);

  React.useEffect(() => {
    console.log();
    history.push(`/transcript-download/${reg}`);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reg) {
      history.push(`/transcript-download/${reg}`);
    }
  };
  return <div>Student Transcript Loading .... </div>;
}

import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import Transcript from "./transcript";

export default function Download() {
  const componentRef = useRef();

  return (
    <div>
      <Transcript ref={componentRef} />
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      {/* hello world */}
    </div>
  );
}

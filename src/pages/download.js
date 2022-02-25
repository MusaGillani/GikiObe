import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import Transcript from "./transcript";

export default function Download(props) {
  const componentRef = useRef();

  return (
    <div>
      {/* {console.log(props.reg)} */}
      <Transcript ref={componentRef} reg={props.reg} />
      <ReactToPrint
        // trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
    </div>
  );
}

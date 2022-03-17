import React from "react";
import "./LoginButton.css";

const LoginButton = ({ buttonText }) => {
  return (
    <div>
      <button class="loginbutton" role="button">
        {" "}
        {buttonText}{" "}
      </button>
    </div>
  );
};

export default LoginButton;

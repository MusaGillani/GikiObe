import React from "react";
import LoginButton from "./components/LoginButton";
import "./components/LoginButton.css";

const MultiLoginScreen = () => {
  return (
    <div className="multiLoginScreen">
      <LoginButton buttonText="Student Login" />
      <LoginButton buttonText="Instructor Login" />
      <LoginButton buttonText="Dean Login" />
      <LoginButton buttonText="Admin Login" />
    </div>
  );
};

export default MultiLoginScreen;

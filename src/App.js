import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Generate from "./pages/generate";
import Transcript from "./pages/transcript";

function App() {
  return (
    <div className="App">
      {" "}
      <Router>
        <Switch>
          <Route exact path="/">
            <Generate />
          </Route>
          <Route exact path="/transcript-download">
            <Transcript />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

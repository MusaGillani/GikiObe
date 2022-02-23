import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Download from "./pages/download";
import Generate from "./pages/generate";
import Populate from "./pages/populate";
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
          <Route exact path="/transcript-download/:regNo/:name">
            <Download />
          </Route>
          <Route exact path="/populate">
            <Populate />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

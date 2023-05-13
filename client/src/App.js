import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./component/Home";

import Voting from "./component/Voting/Voting";
import Results from "./component/Results/Results";
import Registration from "./component/Registration/Registration";
import AddCandidate from "./component/Admin/AddCandidate/AddCandidate";
import Verification from "./component/Admin/Verification/Verification";
import Features from "./component/Features/Features";
import About from "./component/About/About";
import Instructions from "./component/Instructions/Instructions";
import Rules from "./component/Rules/Rules";
import ElectionPage from "./component/ElectionPage/ElectionPage";
import test from "./component/test";
// import StartEnd from "./component/Admin/StartEnd/StartEnd";


import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/addCandidate" component={AddCandidate} />
            <Route exact path="/voting" component={Voting} />
            <Route exact path="/results" component={Results} />
            <Route exact path="/registration" component={Registration} />
            <Route exact path="/verification" component={Verification} />
            <Route exact path="/features" component={Features} />
            <Route exact path="/about" component={About} />
            <Route exact path="/instructions" component={Instructions} />
            <Route exact path="/rules" component={Rules} />
            <Route exact path="/elections" component={ElectionPage}  />
            <Route exact path="*" component={NotFound} />
            <Route exact path="/test" component={test} />
          </Switch>
        </Router>
        
        
      </div>
    );
  }
}

class NotFound extends Component {
  render() {
    return (
      <>
        <h1>404 NOT FOUND!</h1>
        <center>
          <p>
            The page your are looking for doesn't exist.
            <br />
            Go to{" "}
            <Link
              to="/"
              style={{ color: "black", textDecoration: "underline" }}
            >
              Home
            </Link>
          </p>
        </center>
      </>
    );
  }
}

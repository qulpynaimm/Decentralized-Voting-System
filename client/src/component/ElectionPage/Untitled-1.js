import React, {Component} from "react";


import UserHome from "../UserHome"
import { Link } from "react-router-dom";
import "./ElectionPage.css";


export default class ElectionPage extends Component {
    render(){
      const {isAdmin, elStarted, elEnded, isElStarted, isElEnded} = this.props;
  return (
    <> 
    <div>{isAdmin ? (<div>Hello</div>) : (<div>Bye</div>)}</div>
    { !elStarted & !elEnded ? (
      <div className="container-item info">
        <center>
          <h3>The election has not been initialize.</h3>
          {isAdmin ? (
            <p>Set up the election.</p>
          ) : (
            <p>Please wait..</p>
          )}
        </center>
      </div>
    ) : null}
     {isAdmin ? (
          <>
            <div>test</div>
          </>
        ) : elStarted ? (
          null
        ) : !isElStarted && isElEnded ? (
          <>
            <div className="container-item attention">
              <center>
                <h3>The Election ended.</h3>
                <br />
                <Link
                  to="/Results"
                  style={{ color: "black", textDecoration: "underline" }}
                >
                  See results
                </Link>
              </center>
            </div>
          </>
        ) : null}
    </>

    
  )
}
}

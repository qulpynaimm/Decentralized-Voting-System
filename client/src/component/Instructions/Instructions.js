import React, { Component } from "react";
import "./Instructions.css";

import Icon7 from './icon7.png';
import Icon8 from './icon8.svg';
import Icon9 from './icon9.svg';
import Icon10 from './icon10.png';
import Icon11 from './icon11.svg';
import Navbar from "../Navbar/Navigation";


class Instructions extends Component {
    render(){
  return (
    <div className="steps">
      <Navbar></Navbar>
      <div className="follow-these-easy-steps-parent">
        <div className="follow-these-easy">Follow these easy steps:</div>
        <div className="steps1">
          <img className="icon9" alt="" src={Icon9}/>
          <img className="icon7" alt="" src={Icon7}/>
          <div className="register-yourself-by">
            Register yourself by filling the required informations </div>
          <img className="icon8" alt="" src={Icon8} />
          <div className="signin-as-user">Signin as user</div>
          <img className="icon10" alt="" src={Icon10} />
          <div className="go-to-vote">Go to vote option on dashboard</div>
          <div className="give-security-key">Give security key</div>
          <img className="icon11" alt="" src={Icon11} />
          <div className="vote-your-candidate">
            Vote your candidate and submit
          </div>
        </div>
      </div>
      <div className="steps-child" />
    </div>
  );
}
}

export default Instructions;

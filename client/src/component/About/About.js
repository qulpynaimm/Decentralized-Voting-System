import React, { Component } from "react";

import Line from './white_line.svg'

import "./About.css";
class About extends Component {
    render(){
  return (
    <div className="about">
      <div className="vector-parent">
        <img className="white_line" alt="" src={Line} />
        <div className="about1">About</div>
        <div className="an-online-voting-container">
          <p className="an-online-voting"> 
          An online voting system that will replace the 
          old ballot sytem or paper system. Over the time 
          we have utilized the required technology in every
          sector to improve efficiency and save the extra
          resources. But the voting system is still very 
          expensive and requires a bigger workforce.
          The system is slower and still not completely 
          tamper proof. We bring the system that is safe,
          reliable and solve the modern issues like higher
          reachability of the booth, crowd free voting, 
          inexpensive, faster results and others.
          </p>
          
        </div>
      </div>
    </div>
  );
}
}

export default About;

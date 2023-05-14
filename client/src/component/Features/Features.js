import React, { Component } from "react";

import "./Features.css";
import Line from './line.svg';
import Icon1 from './icon1.png';
import Icon2 from './icon2.svg';
import Icon3 from './icon3.png';
import Icon4 from './icon4.png';
import Icon5 from './icon5.png';
import Icon6 from './icon6.png';
import Navbar from "../Navbar/Navigation";


class Features extends Component {
    render(){
    return (
      <div className="features">
        <Navbar></Navbar>
        <div className="vector-parent">
          <img className="line" alt="" src={Line} />
          <div className="features1">Features</div>
          <div className="features2">
            <div className="secured-by-256">Secured by 256 bit encryption</div>
            <div className="backed-by-ethereum">
              Backed by ethereum based technology
            </div>
            <div className="verifiable-transactions">Verifiable transactions</div>
            <div className="easy-to-use">Easy to use</div>
            <div className="cheaper-than-ballot">
              Cheaper than ballot voting system
            </div>
            <div className="faster-voting-process">Faster voting process</div>
            <img className="icon1" alt="" src={Icon1} />
            <img className="icon2" alt="" src={Icon2} />
            <img className="icon3" alt="" src={Icon3} />
            <img className="icon4" alt="" src={Icon4} />
            <img className="icon5" alt="" src={Icon5} />
            <img className="icon6" alt="" src={Icon6} />
          </div>
        </div>
      </div>
    );
  }
}
  
  export default Features;
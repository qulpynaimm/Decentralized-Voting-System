import React, {Component} from "react";

import Navbar from "../Navbar/Navigation";
import NavbarAdmin from "../Navbar/NavigationAdmin";
import "./ElectionPage.css";


class ElectionPage extends Component {
    render(){
  return (
    <div className="electionpage" >
        <Navbar></Navbar>
      <div className="div">02-04-2022</div>
      <div className="elections">Elections:</div>
      <div className="manipur-state-election-parent">
        <div className="manipur-state-election">{`Manipur state Election: `}</div>
        <div className="div1">04-04-2022</div>
      </div>
      <div className="chhatishgarh-state-election-parent">
        <div className="manipur-state-election">{`Chhatishgarh state Election: `}</div>
        <div className="div2">12-04-2022</div>
      </div>
      <div className="bangluru-state-election-parent">
        <div className="manipur-state-election">Bangluru state Election:</div>
        <div className="div3">20-04-2022</div>
      </div>
      <div className="gurgaon-municipal-corporation-parent">
        <div className="gurgaon-municipal-corporation">
          Gurgaon Municipal Corporation
        </div>
        <div className="div4">26-04-2022</div>
      </div>
    </div>
  );
}
}

export default ElectionPage;

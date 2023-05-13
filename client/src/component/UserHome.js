import React, { useState } from "react";

import "./ElectionPage/ElectionPage.css";



function UserHome(props) {
  const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Option 1");
  
    const handleOptionClick = (option) => {
      setSelectedOption(option);
      setIsOpen(false);
    };
  return (
    <div className="electionpage">
      <div className="elections"> Elections:</div>
        <div className="election_info">
          <div className="election_name" >{props.el.electionTitle}</div>
          <div className="div1">{props.el.organizationTitle}</div>
          <br />
        </div>
    </div>
  );
}
}

export default UserHome;

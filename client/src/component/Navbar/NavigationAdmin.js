import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css";
import Home from "../Home";
import Logo from "./logo.png";

export default function NavbarAdmin() {
  const [open, setOpen] = useState(false);
  return (
      <nav className="header">
        <div className="topmain">
          <button className="connect-wallet-button">
            <div className="connect-wallet-button-child" />
            <div className="connect-wallet">Connect Wallet</div>
          </button>
          <NavLink to="/about">
            <div className="about" >
              About
            </div>
          </NavLink>
          <NavLink to="/instructions">
            <div className="how-to-vote">
              How to Vote?
            </div>
          </NavLink>
          <NavLink to="/voting">
            <div className="how-to-vote2">
              Voting
            </div>
          </NavLink>
          <NavLink to="/addCandidate">
            <div className="add-candidate">
              Add Candidate
            </div>
          </NavLink>
          <i onClick={() => setOpen(!open)} className="fas fa-bars burger-menu"></i>
        </div>
        <NavLink to="/">
          <img className="image-icon" alt="" src={Logo} />
        </NavLink>
      </nav>
  );
}

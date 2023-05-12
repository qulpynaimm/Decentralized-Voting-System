import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from './logo.png';


import "./Navbar.css";
import Home from "../Home";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="header"> 
    <NavLink to="/">
      <img className="image-icon" onClick={Home} alt="" src={Logo} />
      </NavLink>
    <div className="topmain">
      <NavLink to="/" className="connect-wallet-button">
        <div className="connect-wallet-button-child" />
        <div className="connect-wallet">Connect Wallet</div>
      </NavLink>
      <NavLink to="/about">
      <div className="about" >
          About
        </div>
      </NavLink>
      <NavLink to="/instructions">
        <div className="how-to-vote">How to Vote?</div>
      </NavLink>
      <NavLink to="/voting">
        <div className="how-to-vote2">Go to VOTE</div>
      </NavLink>
      <i onClick={() => setOpen(!open)} className="fas fa-bars burger-menu"></i>
      </div>
      </nav>
  );
}

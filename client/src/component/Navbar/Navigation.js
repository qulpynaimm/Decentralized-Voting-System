import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from './logo.png';


import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="header"> 
      <img className="image-icon" alt="" src={Logo} />
    <div className="topmain">
      <NavLink to="/" className="connect-wallet-button">
        <div className="connect-wallet-button-child" />
        <div className="connect-wallet">Connect Wallet</div>
      </NavLink>
      <NavLink to="/">
      <div className="about" >
          About
        </div>
      </NavLink>
      <NavLink to="/">
        <div className="how-to-vote">How to Vote?</div>
      </NavLink>
      <NavLink to="/">
        <div className="go-to-vote">Go to VOTE</div>
      </NavLink>
      <i onClick={() => setOpen(!open)} className="fas fa-bars burger-menu"></i>
      </div>
      </nav>
  );
}

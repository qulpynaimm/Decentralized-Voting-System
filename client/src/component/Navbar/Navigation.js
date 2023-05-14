import React, {useEffect, useRef, useState} from "react";
import { NavLink } from "react-router-dom";
import Logo from './logo.png';
import Web3 from 'web3';


import "./Navbar.css";
import Home from "../Home";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  /*const [address, setAddress] = useState("");
  const [buttonWidth, setButtonWidth] = useState("auto");
  const buttonRef = useRef(null);
  const connectToMetaMask = async () => {
    try {
      if (window.ethereum && window.ethereum.selectedAddress) {
        // Disconnect from the current account if already connected
        await window.ethereum.request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }],
        });
      } else {
        // Request permission to connect the user's MetaMask account
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  }; 

  const handleDisconnect = () => {
    setAddress("");
    sessionStorage.removeItem("accountAddress");
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      handleDisconnect();
    } else {
      setAddress(accounts[0]);
      sessionStorage.setItem("accountAddress", accounts[0]);
    }
  };

  useEffect(() => {
    const storedAddress = sessionStorage.getItem("accountAddress");
    if (storedAddress) {
      setAddress(storedAddress);
    }

    if (window.ethereum && window.ethereum.selectedAddress) {
      setAddress(window.ethereum.selectedAddress);
    }

    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum.off("accountsChanged", handleAccountsChanged);
    };
  }, []);
  useEffect(() => {
    // Adjust the button's width to match the font size
    if (buttonRef.current) {
      const buttonElement = buttonRef.current;
      const textWidth = buttonElement.scrollWidth;
      setButtonWidth(`${textWidth}px`);
    }
  }, [address]);

  const getShortenedAddress = () => {
    if (address.length <= 13) {
      return address;
    }
    const start = address.slice(0, 8);
    const end = address.slice(-5);
    return `${start}...${end}`;
  }; */
  return (
    <nav className="header">
    <div className="topmain">
      <button  className="connect-wallet-button">
        <div className="connect-wallet-button-child" />
         
            <div className="connect-wallet">Connect Wallet</div>
        
       </button>
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
      <NavLink to="/">
      <img className="image-icon" alt="" src={Logo} />
    </NavLink>
      </nav>
  );
}

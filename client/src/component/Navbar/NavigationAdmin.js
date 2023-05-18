import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css";
import Home from "../Home";
import Logo from "./logo.png";

export default function NavbarAdmin() {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("");

  useEffect(() => {
    checkMetaMaskConnection();
  }, []);

  const checkMetaMaskConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      // MetaMask is installed
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          // MetaMask is connected and address is available
          setAddress(accounts[0]);
        }
      } catch (error) {
        console.log("Failed to get accounts:", error);
      }
    } else {
      console.log("MetaMask not detected.");
    }
  };

  const connectToMetaMask = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      await checkMetaMaskConnection();
    } catch (error) {
      console.log("Failed to connect to MetaMask:", error);
    }
  };

  const disconnectFromMetaMask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [{eth_accounts: {}}],
        });

      } catch (error) {
        console.log('Failed to disconnect from MetaMask:', error);
      }
    }
  };

  const getShortenedAddress = () => {
    if (address.length <= 13) {
      return address;
    }
    const start = address.slice(0, 8);
    const end = address.slice(-5);
    return `${start}...${end}`;
  };
  return (
      <nav className="header">
        <div className="topmain">
          {address ? (
              <button
                  onClick={() => disconnectFromMetaMask()}
                  className="connect-wallet-button"
              >
                <div className="connect-wallet-button-child" />
                <div className="connect-wallet">
              <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontFamily: "Paytone One",
                    justifyContent: "left",
                    height: "80%",
                  }}
              >
                {getShortenedAddress()}
              </span>
                </div>
              </button>
          ) : (
              <button
                  onClick={() => connectToMetaMask()}
                  className="connect-wallet-button"
              >
                <div className="connect-wallet-button-child" />
                <div className="connect-wallet">Connect Wallet</div>
              </button>
          )}
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

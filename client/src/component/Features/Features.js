import React, { Component } from "react";

import "./Features.css";
import Line from './line.svg';


const info = () => {
  return (
    <div className="features">
      <div className="vector-parent">
        <img className="line" alt="" src="/line-2.svg" />
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
          <img className="lock-icon" alt="" src="/lock@2x.png" />
          <img className="icon" alt="" src="/.svg" />
          <img
            className="approved-delivery-icon"
            alt=""
            src="/approved-delivery@2x.png"
          />
          <img className="hand-cursor-icon" alt="" src="/hand-cursor@2x.png" />
          <img className="low-price-icon" alt="" src="/low-price@2x.png" />
          <img className="time-span-icon" alt="" src="/time-span@2x.png" />
        </div>
      </div>
    </div>
  );
};

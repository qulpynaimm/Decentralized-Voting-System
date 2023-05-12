import React, { Component } from "react";
import "./Rules.css";

class Rules extends Component{
    render(){
  return (
    <div className="rules">
      <div className="rules1">
        <div className="you-as-being-container">
          <p className="you-as-being">
            You, as being a member of the constituency under the constituencies
            of Uttar Pradesh
          </p>
          <p className="you-as-being">{`State Election, are allowed to vote. Please take the following steps in order to cast a `}</p>
          <p className="you-as-being">{`valid vote. You are requested to cast vote on your own decision and not by being `}</p>
          <p className="you-as-being">
            presserurized or terroized by someone. If someone threatens you for
            making a voting
          </p>
          <p className="you-as-being">
            decsion please contact the given helpline numbers.
          </p>
          <p className="you-as-being">&nbsp;</p>
          <p className="you-as-being">{`Steps - `}</p>
          <ul className="stay-in-the-frame-of-your-came">
            <li className="stay-in-the">{`Stay in the frame of your camera alone and with suuficient lighting for the entire `}</li>
          </ul>
          <p className="you-as-being">duration.</p>
          <ul className="stay-in-the-frame-of-your-came">
            <li className="stay-in-the">
              Have Security Keys with you as you would require it to proceed.
            </li>
            <li className="stay-in-the">
              You are allowed to make only one vote per election.
            </li>
            <li className="stay-in-the">
              You are allowed to choose only one candidate per election.
            </li>
            <li className="stay-in-the">
              Candidates information are available on the page.
            </li>
            <li className="stay-in-the">
              Make sure that you are selecting your wanted candidate by
              confirming the name
            </li>
          </ul>
          <p className="you-as-being">and symbol on the screen.</p>
          <ul className="stay-in-the-frame-of-your-came">
            <li className="stay-in-the">
              After selecting the candidates make sure to submit the vote.
            </li>
            <li className="stay-in-the">
              Result will be announced after 5 days of election being completed.
            </li>
            <li>
              You can verify your vote after the election results are announced.
            </li>
          </ul>
        </div>
        <b className="this-election-is">{`This  election is being conducted by the election  commission of India.  `}</b>
        <div className="rules-child" />
        <div className="rules-item" />
        <div className="i-understand-and">
          I understand and will follow above steps.
        </div>
      </div>
      <div className="rules-inner"  />
      <div className="rectangle-div2" />
      <div className="proceed">Proceed</div>
      <div className="cancel">Cancel</div>
    </div>
  );
}
}

export default Rules;

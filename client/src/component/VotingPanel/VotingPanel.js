import React, { Component} from "react";

import "./VotingPanel.css";

class VotingPanel extends Component {

  render(){
  return (
    <div className="votingpanel" >
      <div className="votingpanel-child" />
      <div className="party-independent">Party : Independent</div>
      <div className="education-ba">Education : BA (English Hons.)</div>
      <div className="age-58">Age : 58</div>
      <div className="name-baburao-ganpatrao">Name: Baburao Ganpatrao Apte</div>
      <div className="votingpanel-item" />
      <div className="independent">Independent</div>
      <div className="votingpanel-inner" />
      <div className="bjp">BJP</div>
      <div className="naredra-modi">Naredra Modi</div>
      <div className="rectangle-div" />
      <div className="votingpanel-child1" />
      <img className="ellipse-icon" alt="" src="/ellipse-1.svg" />
      <img className="votingpanel-child2" alt="" src="/ellipse-2.svg" />
      <img className="votingpanel-child3" alt="" src="/ellipse-2.svg" />
      <img className="votingpanel-child4" alt="" src="/ellipse-2.svg" />
      <div className="baburao">Baburao</div>
      <div className="rahul-gandhi">Rahul Gandhi</div>
      <div className="congress">Congress</div>
      <div className="arvind-kejriwal">Arvind Kejriwal</div>
      <div className="aap">AAP</div>
      <div className="votingpanel-child5" />
      <div className="i-have-selected">
        I have selected Baburao from independent as my candidate.
      </div>
      <div className="submitvote">
        <div className="submit">SUBMIT</div>
      </div>
      <div className="voting-panel">Voting Panel</div>
      <img className="vector-icon" alt="" src="/vector.svg" />
      <img className="vector-icon1" alt="" src="/vector1.svg" />
      <img className="vector-icon2" alt="" src="/vector1.svg" />
      <img className="vector-icon3" alt="" src="/vector1.svg" />
    </div>
  );
}
}

export default VotingPanel;

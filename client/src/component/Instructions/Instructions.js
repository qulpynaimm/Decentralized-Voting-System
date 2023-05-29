import React, { Component } from "react";
import "./Instructions.css";

import Icon7 from './icon7.png';
import Icon8 from './icon8.svg';
import Icon9 from './icon9.svg';
import Icon10 from './icon10.png';
import Icon11 from './icon11.svg';
import Navbar from "../Navbar/Navigation";
import getWeb3 from "../../getWeb3";
import Election from "../../contracts/Election.json";
import NavbarAdmin from "../Navbar/NavigationAdmin";


class Instructions extends Component {
    constructor(props) {

        super(props);
        this.state = {
            ElectionInstance: undefined,
            account: null,
            web3: null,
            isAdmin: false,
            candidateCount: undefined,
            candidates: [],
            isElStarted: false,
            isElEnded: false,
            elDetails:{},
            currentVoter: {
                address: undefined,
                name: null,
                phone: null,
                hasVoted: false,
                isVerified: false,
                isRegistered: false,
                isHasNFT: false,
            },
            showCandidates: false,
        };
    }

    componentDidMount = async () => {
        if (!window.location.hash) {
            window.location = window.location + "#loaded";
            window.location.reload();
        }
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Election.networks[networkId];
        const instance = new web3.eth.Contract(
            Election.abi,
            deployedNetwork && deployedNetwork.address
        );

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        this.setState({
            web3: web3,
            ElectionInstance: instance,
            account: accounts[0],
        });



        // Loading Candidates details
        for (let i = 1; i <= this.state.candidateCount; i++) {
            const candidate = await this.state.ElectionInstance.methods
                .candidateDetails(i - 1)
                .call();
            this.state.candidates.push({
                id: candidate.candidateId,
                header: candidate.header,
                slogan: candidate.slogan,
            });
        }
        this.setState({ candidates: this.state.candidates });

        // Admin account and verification
        const admin = await this.state.ElectionInstance.methods.getAdmin().call();
        if (this.state.account === admin) {
            this.setState({ isAdmin: true });
        }
    }
    render(){
  return (
    <div className="steps">
        {this.state.isAdmin ? <NavbarAdmin /> : <Navbar />}
      <div className="follow-these-easy-steps-parent">
        <div className="follow-these-easy">Follow these easy steps:</div>
        <div className="steps1">
          <img className="icon9" alt="" src={Icon9}/>
          <img className="icon7" alt="" src={Icon7}/>
          <div className="register-yourself-by">
            Register yourself by filling the required informations </div>
          <img className="icon8" alt="" src={Icon8} />
          <div className="signin-as-user">Check your email, get confirmed and get the NFT from the NFT Minting dApp.</div>
          <div className="go-to-vote">Go to Voting page of the website.</div>
          <img className="icon11" alt="" src={Icon11} />
          <div className="vote-your-candidate">
            Vote your candidate and submit
          </div>
        </div>
      </div>
      <div className="steps-child" />
    </div>
  );
}
}

export default Instructions;

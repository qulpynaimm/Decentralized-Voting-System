import React, { Component } from "react";
import Line from './white_line.svg';
import "./About.css";
import Navbar from "../Navbar/Navigation";
import NavbarAdmin from "../Navbar/NavigationAdmin";
import getWeb3 from "../../getWeb3";
import Election from "../../contracts/Election.json";

class About extends Component {
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
      elDetails: {},
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

    // Getting election details from the contract
    const electionDetails = await this.state.ElectionInstance.methods
      .getElectionDetails()
      .call();

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

    // Loading current voter
    const voter = await this.state.ElectionInstance.methods
      .voterDetails(this.state.account)
      .call();

    // Admin account and verification
    const admin = await this.state.ElectionInstance.methods.getAdmin().call();
    if (this.state.account === admin) {
      this.setState({ isAdmin: true });
    }
  };

  render() {
    return (
      <div className="about1">
        {this.state.isAdmin ? <NavbarAdmin /> : <Navbar />}
        <div className="vector-parent">
          <img className="white_line" alt="" src={Line} />
          <div className="about2">About</div>
          <div className="an-online-voting-container">
            <p className="an-online-voting">
              This is a decentralized e-voting platform that is designed to overcome the
              limitations of centralized voting systems such as traditional paper ballot
              system, e-voting platform and ATM machine. The main idea is that authentication and verification of users
              is carried out through an individual ID and as a result of authorization,
              each person gets NFT tokens from NFT Minting dApp. The voting event is created by deploying
              smart contracts in an EVM environment. Only a person with NFT tokens will be eligible
              to vote.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;

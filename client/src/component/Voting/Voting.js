// Node modules
import React, { Component} from "react";
import { Link } from "react-router-dom";

// Components
import Navbar from "../Navbar/Navigation";
import NavbarAdmin from "../Navbar/NavigationAdmin";
import NotInit from "../NotInit";
import UserHome from "../UserHome";

// Contract
import getWeb3 from "../../getWeb3";
import Election from "../../contracts/Election.json";
import { abi, NFT_CONTRACT_ADDRESS } from "./constant";




// CSS
import "./Voting.css";
import "../ElectionPage/ElectionPage.css"
import { isElStarted } from "../Home";

export default class Voting extends Component {
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
  toggleCandidates = () => {
    this.setState({ showCandidates: !this.state.showCandidates });
  };

  // rest of the code ...

  componentDidMount = async () => {
    // refreshing once
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }
    try {
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

      // Get total number of candidates
      const candidateCount = await this.state.ElectionInstance.methods
        .getTotalCandidate()
        .call();
      this.setState({ candidateCount: candidateCount });

      // Get start and end values
      const start = await this.state.ElectionInstance.methods.getStart().call();
      this.setState({ isElStarted: start });
      const end = await this.state.ElectionInstance.methods.getEnd().call();
      this.setState({ isElEnded: end });

      // Getting election details from the contract
      const electionDetails = await this.state.ElectionInstance.methods
      .getElectionDetails()
      .call();
      
      this.setState({
        elDetails: {
          adminName: electionDetails.adminName,
          adminEmail: electionDetails.adminEmail,
          adminTitle: electionDetails.adminTitle,
          electionTitle: electionDetails.electionTitle,
          organizationTitle: electionDetails.organizationTitle,
        },
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

      // Loading current voter
      const voter = await this.state.ElectionInstance.methods
        .voterDetails(this.state.account)
        .call();
      
      // Admin account and verification
      const admin = await this.state.ElectionInstance.methods.getAdmin().call();
      if (this.state.account === admin) {
        this.setState({ isAdmin: true });
      }
      
      const hasNFT = await this.checkNFT();
      if (hasNFT === true){       
        //alert("You have the required NFT to continue."); 
        this.setState({
          currentVoter: {
            address: voter.voterAddress,
            name: voter.name,
            phone: voter.phone,
            hasVoted: voter.hasVoted,
            isVerified: voter.isVerified,
            isRegistered: voter.isRegistered,
            isHasNFT: true,
          },
        });
      }
      else{
        this.setState({
          currentVoter: {
            address: voter.voterAddress,
            name: voter.name,
            phone: voter.phone,
            hasVoted: voter.hasVoted,
            isVerified: voter.isVerified,
            isRegistered: voter.isRegistered,
            isHasNFT: false,
          },
        });
      }
      
      

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  }
  
  async checkNFT() {
    const contractAddress = NFT_CONTRACT_ADDRESS; 
    const contractABI = abi; 
    const web3 = this.state.web3;
    const account = this.state.account;
  
    const nftContract = new web3.eth.Contract(contractABI, contractAddress);
    const balance = await nftContract.methods.balanceOf(account).call();
  
    return balance > 0;
  }  

  renderCandidates = (candidate) => {
    const castVote = async (id) => {
      await this.state.ElectionInstance.methods
        .vote(id)
        .send({ from: this.state.account, gas: 1000000 });
      window.location.reload();
    };
    const confirmVote = (id, header) => {
      var r = window.confirm(
        "Vote for " + header + " with Id " + id + ".\nAre you sure?"
      );
      if (r === true) {
        castVote(id);
      }
    };
    return (
      <div className="container-item">
        <div className="candidate-info">
          <p className="candidate_info">
            {candidate.header} <p className="slogan_info">"{candidate.slogan}"</p>
          </p>
        </div>
        <div className="vote-btn-container">
          <button
            onClick={() => confirmVote(candidate.id, candidate.header)}
            className="vote-bth"
            disabled={
              !this.state.currentVoter.isRegistered ||
              !this.state.currentVoter.isHasNFT ||
              this.state.currentVoter.hasVoted
            }
          >
            Vote
          </button>
        </div>
      </div>
    );
  };

  render() {
    if (!this.state.web3) {
      return (
        <>
          {this.state.isAdmin ? <NavbarAdmin /> : <Navbar />}
          <div className="electionpage">
          <center style={{ padding:"25px", color: "white" }}>Loading Web3, accounts, and contract...</center>
          </div>
        </>
      );
    }
    
    return (
      <>
         
        {this.state.isAdmin ? <NavbarAdmin /> : <Navbar />}
        <div className="electionpage">
        <div className="under2"></div>
          {!this.state.isElStarted && !this.state.isElEnded ? (
            <NotInit isAdmin={this.state.isAdmin}/>
          ) : this.state.isElStarted && !this.state.isElEnded ? (
            <>
              {this.state.currentVoter.isRegistered ? (
                this.state.currentVoter.isHasNFT ? (
                  this.state.currentVoter.hasVoted ? (
                    <div className="container-item success">
                      <div>
                        <strong>You've casted your vote.</strong>
                        <p />
                        <center>
                          <Link
                            to="/Results"
                            style={{
                              color: "black",
                              textDecoration: "underline",
                            }}
                          >
                            See Results
                          </Link>
                        </center>
                      </div>
                    </div>
                  ) : (
                    null
                  )
                ) : (
                  <div className="container-item attention">
                    <center>You do not have NFT. Please check your email.</center>
                  </div>
                )
              ) : (
                <>
                  <div className="container-item attention">
                    <center>
                      <p>You're not registered. Please register first.</p>
                      <br />
                      <Link
                        to="/Registration"
                        style={{ color: "black", textDecoration: "underline" }}
                      >
                        Registration Page
                      </Link>
                    </center>
                  </div>
                </>
              )}
              
              <div className="election">
                {this.state.candidates.length < 1 ? (
                  <div className="container-item attention">
                    <center>Not one to vote for.</center>
                  </div>
                ) : (
                  <>
                    {this.state.isElStarted ? (
            <>
              <div className="electionpage">
                <center>
                <div className="elections"> Election Information:</div>
                  <div className="election_info" onClick={this.toggleCandidates}>
                  <div className="election_name" > {this.state.elDetails.electionTitle} </div>
                  <br></br>
                  
                  {this.state.showCandidates && (
                    <>
                    <div className="under">
                      <div className = "candidates" >{this.state.candidates.map(this.renderCandidates)}</div>
                    </div>
                  </>
                  )}
                  <div className="div1">{this.state.elDetails.organizationTitle}</div>
                  <br />
              </div>
              </center>
              </div>
            </>
          ) : null }
                  </>
                )}
              </div>
            </>
          ) : !this.state.isElStarted && this.state.isElEnded ? (
            <>
              <div className="container-item attention">
                <center>
                  <h3>The Election ended.</h3>
                  <br />
                  <Link
                    to="/Results"
                    style={{ color: "black", textDecoration: "underline" }}
                  >
                    See results
                  </Link>
                </center>
              </div>
            </>
          ) : null}
        </div>
      </>
    );
  }
}

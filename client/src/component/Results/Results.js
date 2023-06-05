// Node modules
import React, { Component } from "react";
import { Link } from "react-router-dom";

// Components
import Navbar from "../Navbar/Navigation";
import NavbarAdmin from "../Navbar/NavigationAdmin";
import NotInit from "../NotInit";

// Contract
import getWeb3 from "../../getWeb3";
import Election from "../../contracts/Election.json";

// CSS
import "./Results.css";

export default class Result extends Component {
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
    };
  }
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
      this.setState({ web3, ElectionInstance: instance, account: accounts[0] });

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

      // Loading Candidates detials
      for (let i = 0; i < this.state.candidateCount; i++) {
        const candidate = await this.state.ElectionInstance.methods
          .candidateDetails(i)
          .call();
        this.state.candidates.push({
          id: i + 1,
          header: candidate.header,
          slogan: candidate.slogan,
          voteCount: candidate.voteCount,
        });
      }
      this.setState({ candidates: this.state.candidates });

      // Admin account and verification
      const admin = await this.state.ElectionInstance.methods.getAdmin().call();
      if (this.state.account === admin) {
        this.setState({ isAdmin: true });
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return (
        <>
          {this.state.isAdmin ? <NavbarAdmin /> : <Navbar />}
          <div className="results-page">
          <center style={{ padding:"25px", color: "white" }}>Loading Web3, accounts, and contract...</center>
          </div>
        </>
      );
    }

    return (
      <>
        {this.state.isAdmin ? <NavbarAdmin /> : <Navbar />}
        <div className="results-page">
          {!this.state.isElStarted && !this.state.isElEnded ? (
            <NotInit />
          ) : this.state.isElStarted && !this.state.isElEnded ? (
            <div className="container-item attention">
              <center>
                <h3>The election is being conducted at the movement.</h3>
                <p>Result will be displayed once the election has ended.</p>
                <p>Go ahead and cast your vote {"(if not already)"}.</p>
                <br />
                <Link
                  to="/Voting"
                  style={{ color: "black", textDecoration: "underline" }}
                >
                  Voting Page
                </Link>
              </center>
            </div>
          ) : !this.state.isElStarted && this.state.isElEnded ? (
            displayResults(this.state.candidates)
          ) : null}
        </div>
      </>
    );
  }
}

function displayWinner(candidates) {
  const getWinner = (candidates) => {
    let maxVoteReceived = 0;
    let winnerCandidates = [];
    for (let i = 0; i < candidates.length; i++) {
      if (candidates[i].voteCount > maxVoteReceived) {
        maxVoteReceived = candidates[i].voteCount;
        winnerCandidates = [candidates[i]];
      } else if (candidates[i].voteCount === maxVoteReceived) {
        winnerCandidates.push(candidates[i]);
      }
    }
    return winnerCandidates;
  };

  const renderWinner = (winner) => {
    return (
      <div className="container-winner">
        <div className="winner-info">
          <p className="winner-tag">Winner!</p>
          <h2>{winner.header}</h2>
          <p className="winner-slogan">{winner.slogan}</p>
        </div>
        <div className="winner-votes">
          <div className="votes-tag">Total Votes:</div>
          <div className="vote-count">{winner.voteCount}</div>
        </div>
      </div>
    );
  };

  const winnerCandidates = getWinner(candidates);

  return <div className="container-main-results">{winnerCandidates.map(renderWinner)}</div>;
}

export function displayResults(candidates) {
  const renderResults = (candidate) => {
    return (
      <tr key={candidate.id}>
        <td>{candidate.id}</td>
        <td>{candidate.header}</td>
        <td>{candidate.voteCount}</td>
      </tr>
    );
  };
  const downloadResults = () => {
    const csvContent = "data:text/csv;charset=utf-8," + candidates.map(candidate => [candidate.id, candidate.header, candidate.slogan, candidate.voteCount].join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "voting_results.csv");
    document.body.appendChild(link);
    link.click();
  };
  return (
    <>
      {candidates.length > 0 ? (
        <div className="container-main-results">{displayWinner(candidates)}</div>
      ) : null}
      <div className="container-main-results" style={{ borderTop: "1px solid" }}>
        <h2>RESULTS</h2>
        {candidates.length < 1 ? (
          <div className="container-item-results attention-results">
            <center>No candidates.</center>
          </div>
        ) : (
          <>
            <table className="results-table">
                <thead>
                  <tr>
                    <th>Candidate ID</th>
                    <th>Header</th>
                    <th>Slogan</th>
                    <th>Vote Count</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((candidate) => (
                    <tr key={candidate.id}>
                      <td>{candidate.id}</td>
                      <td>{candidate.header}</td>
                      <td>{candidate.slogan}</td>
                      <td>{candidate.voteCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="download-button animation-effect" onClick={downloadResults}>Download Results</button>
          </>
        )}
      </div>
    </>
  );
}
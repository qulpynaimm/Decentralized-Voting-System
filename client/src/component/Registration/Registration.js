// Node modules
import React, { Component } from "react";
// import axios from "axios";
// Components
import Navbar from "../Navbar/Navigation";
import NavbarAdmin from "../Navbar/NavigationAdmin";
import NotInit from "../NotInit";
import Register from './website.png';
// CSS
import "./Registration.css";

// Contract
import getWeb3 from "../../getWeb3";
import Election from "../../contracts/Election.json";



export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ElectionInstance: undefined,
      web3: null,
      account: null,
      isAdmin: false,
      isElStarted: false,
      isElEnded: false,
      voterCount: undefined,
      voterName: "",
      voterPhone: "",
      voterAge: "",
      voterID: "",
      voters: [],
      currentVoter: {
        address: undefined,
        name: null,
        phone: null,
        age: null,
        id: null,
        hasVoted: false,
        isVerified: false,
        isRegistered: false,
      },
    };
  }

  // refreshing once
  componentDidMount = async () => {
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

      // Admin account and verification
      const admin = await this.state.ElectionInstance.methods.getAdmin().call();
      if (this.state.account === admin) {
        this.setState({ isAdmin: true });
      }

      // Get start and end values
      const start = await this.state.ElectionInstance.methods.getStart().call();
      this.setState({ isElStarted: start });
      const end = await this.state.ElectionInstance.methods.getEnd().call();
      this.setState({ isElEnded: end });

      // Total number of voters
      const voterCount = await this.state.ElectionInstance.methods
        .getTotalVoter()
        .call();
      this.setState({ voterCount: voterCount });

      // Loading all the voters
      for (let i = 0; i < this.state.voterCount; i++) {
        const voterAddress = await this.state.ElectionInstance.methods
          .voters(i)
          .call();
        const voter = await this.state.ElectionInstance.methods
          .voterDetails(voterAddress)
          .call();
        this.state.voters.push({
          address: voter.voterAddress,
          name: voter.name,
          phone: voter.phone,
          age: voter.age,
          id: voter.id,
          hasVoted: voter.hasVoted,
          isVerified: voter.isVerified,
          isRegistered: voter.isRegistered,
        });
      }
      this.setState({ voters: this.state.voters });

      // Loading current voters
      const voter = await this.state.ElectionInstance.methods
        .voterDetails(this.state.account)
        .call();
      this.setState({
        currentVoter: {
          address: voter.voterAddress,
          name: voter.name,
          phone: voter.phone,
          age: voter.age,
          id: voter.id,
          hasVoted: voter.hasVoted,
          isVerified: voter.isVerified,
          isRegistered: voter.isRegistered,
        },
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      console.error(error);
      alert(
        `Failed to load web3, accounts, or contract. Check console for details (f12).`
      );
    }
  };
  updateVoterName = (event) => {
    this.setState({ voterName: event.target.value });
  };

  updateVoterPhone = (event) => {
    this.setState({ voterPhone: event.target.value });
  };

  updateVoterAge = (event) => {
    this.setState({ voterAge: event.target.value });
  };

  updateVoterID = (event) => {
    this.setState({ voterID: event.target.value });
  };
  /*updateVoterDetails = async () => {
    const voter = this.state.currentVoter;
    await this.state.ElectionInstance.methods
      .updateVoterDetails(voter.name, voter.phone, voter.age, voter.id)
      .send({ from: this.state.account, gas: 1000000 });
    window.location.reload();
  };*/
  handleClick = async () => {
    await this.submitVoterDetails();
    await this.registerAsVoter();

  }
  
  registerAsVoter = async () => {
   
    await this.state.ElectionInstance.methods
      .registerAsVoter(this.state.voterName, this.state.voterPhone, this.state.voterAge, this.state.voterID)
      .send({ from: this.state.account, gas: 1000000 });

    window.location.reload();

     // Make a POST request to http://laravel.election/api/v1/email

  };
  
  submitVoterDetails = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.voterID + "@astanait.edu.kz",
        account: this.state.account,
        message: 'Thank you for registering to vote in our election!',
      })
    };
    fetch('https://k4p72wppjc3ujwfpxw7sdf54e40fsrko.lambda-url.us-east-1.on.aws/api/v1/email', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));
  };
  render() {
    if (!this.state.web3) {
      return (
        <>
          {this.state.isAdmin ? <NavbarAdmin /> : <Navbar />}
          <div className="registration-page">
          <center style={{fontSize:"20px"}}>Loading Web3, accounts, and contract...</center>
          </div>
        </>
      );
    }
    return (
      <>
        {this.state.isAdmin ? <NavbarAdmin /> : <Navbar />}
        {!this.state.isElStarted && !this.state.isElEnded ? (
            <div className="registration-page-not-init">
            <NotInit/>
            </div>
        ) : (
          <>
          <div className="registration-page">
          <img className="figure-icon" alt="" src={Register} />
            <b className="registration-form">Registration Form</b>
            <div className="registration-page-inner">
              <div className="group-wrapper">
                <div className="group-wrapper">
                  <div className="group-container">
                    <div className="account-address-parent">
                    <div className="account-address" style={{ whiteSpace: 'nowrap' }}>Account Address</div>
                    <br></br>
                    <input type = "text" class = "address" value={this.state.account}></input>
                      <span style={{ color: this.state.currentVoter.isRegistered ? 'red' : 'inherit',  fontSize: '15px'}}>{this.state.currentVoter.isRegistered ? "You are already registered." : ""}</span>
                    <div className="group-child" />
                    </div>
                    <div className="age-parent">
                <div className="account-address"  style={{ whiteSpace: 'nowrap' }}>Age
                </div>
                <br></br>
                <input type = "number" class = "age"
                        placeholder="eg. 20"
                        value={this.state.voterAge}
                        onChange={this.updateVoterAge}></input>
                      <span style={{ color: this.state.voterAge < 18 ? 'red' : 'inherit',  fontSize: '15px'}}>{this.state.voterAge < 18 ? "You must be at least 18 years old to register." : ""}</span>
                <div className="group-child" />
              </div>
                    <div className="barcode-parent">
                <div className="account-address" style={{ whiteSpace: 'nowrap' }}>Barcode </div>
                <br></br>
                <input type = "text" class = "barcode"
                        placeholder="eg. 201358"
                        value={this.state.voterID}
                        onChange={this.updateVoterID} ></input>
                      <span style={{ color: this.state.voterID.length !==6 ? 'red' : 'inherit',  fontSize: '15px'}}>{this.state.voterID.length !== 6 ? "Please enter your barcode from university." : ""}</span>
                <div className="group-child" />
              </div>
              <div className="full-name-parent">
                <div className="full-name" >Full Name</div>
                <br></br>
                <input type="text" class = "name"
                        placeholder="eg. Aruzhan"
                        value={this.state.voterName}
                        onChange={this.updateVoterName}></input>
                <div className="group-child" />
              </div>
              <div className="phone-number-parent">
                <div className="phone-number">Phone Number</div>
                <br></br>
                <input type="text" class="phone"
                        placeholder="eg. +7 777 789 8998"
                        value={this.state.voterPhone}
                        onChange={this.updateVoterPhone} ></input>
                       <span style={{ color: this.state.voterPhone.length !==12 ? 'red' : 'inherit',  fontSize: '15px'}}>{this.state.voterPhone.length !== 12 ? "Please enter a valid phone number." : ""}</span>
                <div className="group-child" />
              </div>
              </div>
              <div className="group-frame">
              <div className="rectangle-parent">
                <div className="rectangle-div" />
                <button className="register"
                   disabled={
                       this.state.voterPhone.length !== 12 ||
                       this.state.voterAge < 18 ||
                       this.state.voterID.length !== 6 ||
                       this.state.currentVoter.isRegistered
                   }
                onClick={this.handleClick} >Register</button>
              </div>

            </div>


            <div
              className="container-main"
              style={{
                borderTop: this.state.currentVoter.isRegistered
                  ? null
                  : "1px solid",
              }}
            >
              {loadCurrentVoter(
                this.state.currentVoter,
                this.state.currentVoter.isRegistered
              )}
            </div>
            {/*{this.state.isAdmin ? (*/}
            {/*  <div*/}
            {/*    className="container-main"*/}
            {/*    style={{ borderTop: "1px solid" }}*/}
            {/*  >*/}
            {/*    <small>TotalVoters: {this.state.voters.length}</small>*/}
            {/*    {loadAllVoters(this.state.voters)}*/}
            {/*  </div>*/}
            {/*) : null}*/}
            </div>
            </div>
            </div>
            </div>
          </>
          
        )}
      </>
    );
  }
}
export function loadCurrentVoter(voter, isRegistered) {
/*  return (
    <>
      <div
        className={"container-item " + (isRegistered ? "success" : "attention")}
      >
        <center>Your Registered Info</center>
      </div>
      <div
        className={"container-list " + (isRegistered ? "success" : "attention")}
      >
        <table>
          <tr>
            <th>Account Address</th>
            <td>{voter.address}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{voter.name}</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>{voter.phone}</td>
          </tr>
          <tr>
            <th>Age</th>
            <td>{voter.age}</td>
          </tr>
          <tr>
            <th>Barcode</th>
            <td>{voter.id}</td>
          </tr>
          <tr>
            <th>Voted</th>
            <td>{voter.hasVoted ? "True" : "False"}</td>
          </tr>
          <tr>
            <th>Verification</th>
            <td>{voter.isVerified ? "True" : "False"}</td>
          </tr>
          <tr>
            <th>Registered</th>
            <td>{voter.isRegistered ? "True" : "False"}</td>
          </tr>
        </table>
      </div>
    </>
  );*/
}
// export function loadAllVoters(voters) {
//   const renderAllVoters = (voter) => {
//     return (
//       <>
//         <div className="container-list success">
//           <table>
//             <tr>
//               <th>Account address</th>
//               <td>{voter.address}</td>
//             </tr>
//             <tr>
//               <th>Name</th>
//               <td>{voter.name}</td>
//             </tr>
//             <tr>
//               <th>Phone</th>
//               <td>{voter.phone}</td>
//             </tr>
//             <tr>
//               <th>Age</th>
//               <td>{voter.age}</td>
//             </tr>
//             <tr>
//               <th>Barcode</th>
//               <td>{voter.id}</td>
//             </tr>
//             <tr>
//               <th>Voted</th>
//               <td>{voter.hasVoted ? "True" : "False"}</td>
//             </tr>
//             <tr>
//               <th>Verified</th>
//               <td>{voter.isVerified ? "True" : "False"}</td>
//             </tr>
//             <tr>
//               <th>Registered</th>
//               <td>{voter.isRegistered ? "True" : "False"}</td>
//             </tr>
//           </table>
//         </div>
//       </>
//     );
//   };
//   return (
//     <>
//       <div className="container-item success">
//         <center>List of voters</center>
//       </div>
//       {voters.map(renderAllVoters)}
//     </>
//   );
// }

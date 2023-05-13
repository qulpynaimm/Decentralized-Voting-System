// Node modules
import React, { Component } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import queryString from 'querystring'

// Components
import Navbar from "./Navbar/Navigation";
import NavbarAdmin from "./Navbar/NavigationAdmin";
import UserHome from "./UserHome";
import StartEnd from "./StartEnd";
import ElectionStatus from "./ElectionStatus";

// Contract
import getWeb3 from "../getWeb3";
import Election from "../contracts/Election.json";

// CSS
import "./Home.css";
import Slogan from './slogan.png';
import ElectionPage from "./ElectionPage/ElectionPage";



// const buttonRef = React.createRef();
export default class Home extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      ElectionInstance: undefined,
      account: null,
      web3: null,
      isAdmin: false,
      elStarted: false,
      elEnded: false,
      elDetails: {},
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

      const admin = await this.state.ElectionInstance.methods.getAdmin().call();
      if (this.state.account === admin) {
        this.setState({ isAdmin: true });
      }


      // Export the current value of isAdmin


      // Get election start and end values
      const start = await this.state.ElectionInstance.methods.getStart().call();
      this.setState({ elStarted: start });
      const end = await this.state.ElectionInstance.methods.getEnd().call();
      this.setState({ elEnded: end });

      

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
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };
  // end election
  endElection = async () => {
    await this.state.ElectionInstance.methods
      .endElection()
      .send({ from: this.state.account, gas: 1000000 });
    window.location.reload();
  };
  
  // register and start election
  registerElection = async (data) => {
    await this.state.ElectionInstance.methods
      .setElectionDetails(
        data.adminFName.toLowerCase() + " " + data.adminLName.toLowerCase(),
        data.adminEmail.toLowerCase(),
        data.adminTitle.toLowerCase(),
        data.electionTitle.toLowerCase(),
        data.organizationTitle.toLowerCase()
      )
      .send({ from: this.state.account, gas: 1000000 });
    window.location.reload();

    
  };
  
  
  
  render() {
    if (!this.state.web3) {
      return (
        <>
          <Navbar />
          <center>Loading Web3, accounts, and contract...</center>
        </>
      );
    }
    return (
      <>
        <ElectionPage isAdmin={String(this.state.isAdmin)} elStarted = {this.state.elStarted} 
        elEnded = {this.state.elEnded} isElStarted = {this.state.isElStarted} isElEnded = {this.state.isElEnded}/>;

        {this.state.isAdmin ? <NavbarAdmin /> : <Navbar />}
        {!this.state.isAdmin ? (
        <div className="header-home">
      <div className="frame">
        <div className="be-a-part-container">
          <p className="be-a-part">Be a part of decision</p>
          <p className="vote-today">Vote Today</p>
        </div>
        <div className="buttons">
          <div className="buttons-child"  />
          <div className="buttons-item"  />
          <b className="reg">REGISTER</b>
          <b className="read-more">READ MORE</b>
        </div>
        
      </div>
      <img className="slogan" alt="" src={Slogan}/>
      </div>
        ) : null }
      {!this.state.elStarted & !this.state.elEnded ? (
            <div className="container-item info">
              <center>
                <h3>The election has not been initialize.</h3>
                {this.state.isAdmin ? (
                  <p>Set up the election.</p>
                ) : (
                  <p>Please wait..</p>
                )}
              </center>
            </div>
          ) : null}
        {this.state.isAdmin ? (
          <>
            <this.renderAdminHome />
          </>
        ) : this.state.elStarted ? (
          <>
            <UserHome el={this.state.elDetails} />
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
      </>
      
    );
    
  }

  renderAdminHome = () => {
    const EMsg = (props) => {
      return <span style={{ color: "tomato" }}>{props.msg}</span>;
    };

    const AdminHome = () => {
      // Contains of Home page for the Admin
      const {
        handleSubmit,
        register,
        formState: { errors },
      } = useForm();

      const onSubmit = (data) => {
        this.registerElection(data);
      };
      return (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {!this.state.elStarted & !this.state.elEnded ? (
              <div className="container-main">
                {/* about-admin */}
                <div className="about-admin">
                  <h3>About Admin</h3>
                  <div className="container-item center-items">
                    <div>
                      <label className="label-home">
                        Full Name{" "}
                        {errors.adminFName && <EMsg msg="*required" />}
                        <input
                          className="input-home"
                          type="text"
                          placeholder="First Name"
                          {...register("adminFName", {
                            required: true,
                          })}
                        />
                        <input
                          className="input-home"
                          type="text"
                          placeholder="Last Name"
                          {...register("adminLName")}
                        />
                      </label>

                      <label className="label-home">
                        Email{" "}
                        {errors.adminEmail && (
                          <EMsg msg={errors.adminEmail.message} />
                        )}
                        <input
                          className="input-home"
                          placeholder="eg. you@example.com"
                          name="adminEmail"
                          {...register("adminEmail", {
                            required: "*Required",
                            pattern: {
                              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, // email validation using RegExp
                              message: "*Invalid",
                            },
                          })}
                        />
                      </label>

                      <label className="label-home">
                        Job Title or Position{" "}
                        {errors.adminTitle && <EMsg msg="*required" />}
                        <input
                          className="input-home"
                          type="text"
                          placeholder="eg. HR Head "
                          {...register("adminTitle", {
                            required: true,
                          })}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                {/* about-election */}
                <div className="about-election">
                  <h3>About Election</h3>
                  <div className="container-item center-items">
                    <div>
                      <label className="label-home">
                        Election Title{" "}
                        {errors.electionTitle && <EMsg msg="*required" />}
                        <input
                          className="input-home"
                          type="text"
                          placeholder="eg. School Election"
                          {...register("electionTitle", {
                            required: true,
                          })}
                        />
                      </label>
                      <label className="label-home">
                        Organization Name{" "}
                        {errors.organizationName && <EMsg msg="*required" />}
                        <input
                          className="input-home"
                          type="text"
                          placeholder="eg. Lifeline Academy"
                          {...register("organizationTitle", {
                            required: true,
                          })}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div> 
            ) : this.state.elStarted ? (
              <UserHome el={this.state.elDetails} />
            ) : null}
            <StartEnd
              elStarted={this.state.elStarted}
              elEnded={this.state.elEnded}
              endElFn={this.endElection}
            />
            <ElectionStatus
              elStarted={this.state.elStarted}
              elEnded={this.state.elEnded}
            />
          </form>
        </div>
      ); 
    };
    return <AdminHome />;
  };
}
export const elStarted = localStorage.getItem("ElectStart");
export const elEnded = localStorage.getItem("ElectEnd");

export const isElStarted = localStorage.getItem("isElectStart");
export const isElEnded = localStorage.getItem("IsElectEnd");

export const isAdmin = localStorage.getItem("storage");


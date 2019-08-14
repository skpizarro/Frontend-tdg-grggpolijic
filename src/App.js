import Header from "./componentes/Header";
import Footer from "./componentes/Footer";
import FormularioModal from "./componentes/FormularioModal";
import { BASE_ENDPOINT } from "./constants";
import axios from "axios";
import "./css/App.css";

import React, { Component } from "react";

export default class App extends Component {
  state = {
    showModal: false,
    acceptTerms: false,
    user: [],
    showNavAdmin: false,
    status: "",
    error: ""
  };

  componentDidMount = () => {
    const value =
      localStorage.getItem("adminCredentials") === "false" ? true : false;
    this.setState({
      showNavAdmin: value
    });
  };

  handleToggleModal = e => {
    this.setState(prevState => ({
      ...prevState,
      showModal: !prevState.showModal
    }));
  };

  switchNavAdmin = e => {
    localStorage.setItem("adminCredentials", this.state.showNavAdmin);
    this.setState(prevState => ({
      ...prevState,
      showNavAdmin: !prevState.showNavAdmin
    }));
  };

  handleSubmit = (e, user) => {
    this.setState({
      user: user
    });
    this.handleToggleModal(e);
  };

  handleSwitchTerms = e => {
    this.setState({
      acceptTerms: false
    });
  };

  sendInfo = (e, user) => {
    e.preventDefault();

    axios
      .post(
        `${BASE_ENDPOINT}/api/generateqr`,
        { user },
        {
          headers: { "Content-Type": "application/json" }
        }
      )
      .then(function(response) {
        this.setState({
          status: response.data.ok
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    this.setState({
      acceptTerms: true
    });
    this.handleToggleModal(e);
  };

  render() {
    const { showModal, showNavAdmin, user, acceptTerms } = this.state;
    const switchClassModal = showModal ? "active-body" : "no-active-body";
    const body = document.querySelector("#no-active");
    if (switchClassModal === "active") {
      body.className = "active";
    } else {
      body.className = "no-active";
    }

    return (
      <div className="App">
        {this.state.showModal && (
          <FormularioModal
            handleToggleModal={this.handleToggleModal}
            sendInfo={this.sendInfo}
            user={user}
          />
        )}
        <Header
          handleOpenModal={this.handleToggleModal}
          handleSubmit={this.handleSubmit}
          showNavAdmin={showNavAdmin}
          switchNavAdmin={this.switchNavAdmin}
          acceptTerms={acceptTerms}
          handleSwitchTerms={this.handleSwitchTerms}
        />
        <Footer />
      </div>
    );
  }
}

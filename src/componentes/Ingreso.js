import React, { Component } from "react";
import Mensaje from "./Mensaje";
import "../css/Ingreso.css";
import axios from "axios";
import { BASE_ENDPOINT } from "../constants";
import { withRouter } from "react-router-dom";

class Ingreso extends Component {
  state = {
    user: "",
    pass: "",
    errorStatus: false,
    error: ""
  };

  handleInput = (e, keyText) => {
    const value = e.target.value;
    this.setState({
      [keyText]: value,
      errorStatus: false
    });
  };

  verifyCredentials = async e => {
    e.preventDefault();
    const { user: usuario, pass } = this.state;

    const user = {
      idUsuario: usuario,
      passwordUsuario: pass
    };
    //acc: 1234  pass: ee2RR
    try {
      const response = await axios.post(`${BASE_ENDPOINT}/api/login`, { user }); //aqui me debe devolver un true o false dependiendo si la info es correcta
      console.log(response);
      if (response.data.ok) {
        //Modificar variable admin del componente app para mostrar otro nav
        //Llevar al componente Solicitudes.js
        this.setState({
          errorStatus: false
        });
        console.log("logeo exitoso");
        this.props.switchNavAdmin(e);
        this.props.history.push("/SolicitudesPendientes");
      }
    } catch (error) {
      console.log(error);
      this.setState({
        error: "Usuario y/o Contraseña no válidos",
        errorStatus: true
      });
    }
  };

  render() {
    const { error, errorStatus } = this.state;
    return (
      <form className="formulario" onSubmit={this.verifyCredentials}>
        <div className="form-container">
          <div className="contenedor">
            <label>Identificación</label>
            <input type="Number" onChange={e => this.handleInput(e, "user")} />
          </div>
          <div className="contenedor">
            <label>Contraseña</label>
            <input
              type="password"
              onChange={e => this.handleInput(e, "pass")}
            />
          </div>
          {errorStatus && <Mensaje mensaje={error} property="error" />}
          <button type="submit" className="formulario__boton">
            Entrar
          </button>
        </div>
      </form>
    );
  }
}

export default withRouter(Ingreso);

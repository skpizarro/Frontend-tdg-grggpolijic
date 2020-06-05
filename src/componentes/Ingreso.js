import React, { Component } from "react";
import Mensaje from "./Mensaje";
import "../css/Ingreso.css";
import axios from "axios";
import { URL_BASE } from "../constants";
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
    //const{updateAuthAdmin}= this.props;
    e.preventDefault();
    const { user: admin, pass } = this.state;

    const user = {
      idAdmin: admin,
      passwordAdmin: pass
    };

    try {
      const response = await axios.post(`${URL_BASE}/api/login`, { user });
      if (response.data.ok) {
        //Modificar variable admin del componente app para mostrar otro nav
        //Llevar al componente Solicitudes.js
       
        //se guarda el id en el almacenamiento local
        localStorage.setItem('idAdmin',response.data.admin);


        this.setState({
          errorStatus: false
        });
        
        this.props.switchNavAdmin(e);
        this.props.history.push("/SolicitudesPendientes");


        //mandamos el id del admin al header para usarlo en el momento de gestionar las solicitudes
        //updateAuthAdmin(response.data.admin);        

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

import React, { Component } from "react";
import axios from "axios";
import { BASE_ENDPOINT } from "../constants";
import Solicitud from "./Solicitud";
import "../css/SolicitudesPendientes.css";
import Mensaje from "./Mensaje";
import { withRouter } from "react-router-dom";

class SolicitudesPendientes extends Component {
  state = {
    solicitudes: [],
    error: ""
  };

  getSolicitudesBD = async () => {
    try {
      const response = await axios.get(`${BASE_ENDPOINT}/api/solicitudes`);
      console.log(response.data.data);
      this.setState({
        solicitudes: response.data.data,
        error: ""
      });
    } catch (error) {
      this.setState({
        error: error.message,
        solicitudes: []
      });
    }
  };

  deleteSolicitud = async id_solicitud => {
    try {
      const response = await axios.delete(
        `${BASE_ENDPOINT}/api/solicitudes/${id_solicitud}`
      );
      this.getSolicitudesBD();
    } catch (error) {
      this.setState({
        error: error.message
      });
    }
  };

  acceptSolicitud = async user => {
    try {
      const response = await axios.post(`${BASE_ENDPOINT}/api/adm/approve`, {
        user
      });
      this.getSolicitudesBD();
    } catch (error) {
      this.setState({
        error: error.message
      });
    }
  };

  declineSolicitud = id_solicitud => {
    this.deleteSolicitud(id_solicitud);
  };

  componentDidMount = () => {
    this.getSolicitudesBD();
  };

  render() {
    const { solicitudes } = this.state;
    if (solicitudes.length === 0) {
      return (
        <Mensaje
          mensaje="¡No existen solicitudes pendientes!"
          property="solicitudes"
        />
      );
    }
    return (
      <div className="contenedor-solicitudes">
        {solicitudes.map(
          ({
            id_solicitud,
            id_usuario,
            nombre_usuario,
            email_usuario,
            tipo_usuario,
            fecha_visita,
            motivo_visita
          }) => (
            <Solicitud
              decision="pendiente"
              key={id_solicitud}
              id_solicitud={id_solicitud}
              id_usuario={id_usuario}
              nombre_usuario={nombre_usuario}
              email_usuario={email_usuario}
              tipo_usuario={tipo_usuario}
              fecha_visita={fecha_visita}
              motivo_visita={motivo_visita}
              acceptSolicitud={this.acceptSolicitud}
              declineSolicitud={this.declineSolicitud}
            />
          )
        )}
      </div>
    );
  }
}

export default withRouter(SolicitudesPendientes);

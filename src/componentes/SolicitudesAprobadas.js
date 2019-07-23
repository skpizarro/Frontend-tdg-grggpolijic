import React, { Component } from "react";
import Axios from "axios";
import { BASE_ENDPOINT } from "../constants";
import Solicitud from "./Solicitud";
import Mensaje from "./Mensaje";

export default class SolicitudesAprobadas extends Component {
  state = {
    solicitudes: [],
    error: ""
  };

  getSolicitudesBD = async () => {
    console.log("se cargan las solicitudes aprobadas");
    try {
      const respone = await Axios.get(`${BASE_ENDPOINT}/api/adm/aprobadas`);
      this.setState({
        solicitudes: respone.data.data,
        error: ""
      });
    } catch (error) {
      this.setState({
        error: error.message,
        solicitudes: []
      });
    }
  };

  deleteAprobadas = async id_solicitud => {
    try {
      const response = await Axios.delete(
        `${BASE_ENDPOINT}/api/adm/aprobadas/${id_solicitud}`
      );
      console.log(response);
      this.getSolicitudesBD();
    } catch (error) {
      this.setState({
        error: error.message
      });
    }
  };

  componentDidMount = () => {
    this.getSolicitudesBD();
  };
  render() {
    const { solicitudes } = this.state;
    if (solicitudes.length === 0) {
      return (
        <Mensaje
          mensaje="¡No existen solicitudes aprobadas!"
          property="solicitudes"
        />
      );
    }
    return (
      <div className="contenedor-solicitudes">
        {solicitudes.map(
          ({
            id_aprobada,
            id_usuario,
            nombre_usuario,
            email_usuario,
            tipo_usuario,
            fecha_visita,
            motivo_visita
          }) => (
            <Solicitud
              decision="aprobada"
              key={id_aprobada}
              id_solicitud={id_aprobada}
              id_usuario={id_usuario}
              nombre_usuario={nombre_usuario}
              email_usuario={email_usuario}
              tipo_usuario={tipo_usuario}
              fecha_visita={fecha_visita}
              motivo_visita={motivo_visita}
              deleteAprobadas={this.deleteAprobadas}
            />
          )
        )}
      </div>
    );
  }
}

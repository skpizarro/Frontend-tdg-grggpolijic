import React, { Component } from "react";
import axios from "axios";
import { URL_BASE } from "../constants";
import Solicitud from "./Solicitud";
import "../css/SolicitudesPendientes.css";
import "../css/Progress.css";
import Mensaje from "./Mensaje";
import { withRouter } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';



class SolicitudesPendientes extends Component {
  constructor(){
    super();
    this.state = {
      zonas: [],
      solicitudes:false,
      error: ""
    };

    this.getZonas();
  }
  

  getSolicitudesBD = async () => {
    try {
      const response = await axios.get(`${URL_BASE}/api/solicitudes`);
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

  denySolicitud = async (dataUser) => {
    console.log("authAdmin",dataUser.authAdmin)
    try {
        await axios.put(
        `${URL_BASE}/api/solicitudes`,{dataUser}
      );
      this.getSolicitudesBD();
    } catch (error) {
      this.setState({
        error: error.message
      });
    }
  };

getZonas=()=>{
   axios.get(`${URL_BASE}/api/Zonas`).then(response=>{
    this.setState({
      zonas: response.data.data,
      error: ""
    });
   })
      
  .catch(e =>{
    console.log("Error")
    this.setState({error:e.message})
  })
}

  acceptSolicitud = async dataUser => {
    console.log("authAdmin",dataUser.authAdmin)
    try {
        await axios.put(`${URL_BASE}/api/adm/approve`, {
        dataUser
      });
      this.getSolicitudesBD();
    } catch (error) {
      this.setState({
        error: error.message
      });
    }
  };

  specialPermission = async dataUser => {
    console.log("authAdmin",dataUser.authAdmin)
    try {
        await axios.put(`${URL_BASE}/api/adm/specialPermission`, {
        dataUser
      });
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
    const { solicitudes,zonas } = this.state;
    const {authAdmin} = this.props;

    if(!solicitudes){
      return (
        
          <div class="spinner">
          <CircularProgress className="prog" size={100} color={"rgb(212, 174, 1)"}/> 
          </div>
          ) 
    }else if (solicitudes.length === 0) {
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
            apellido_usuario,
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
              apellido_usuario={apellido_usuario}
              email_usuario={email_usuario}
              tipo_usuario={tipo_usuario}
              fecha_visita={fecha_visita}
              motivo_visita={motivo_visita}
              acceptSolicitud={this.acceptSolicitud}
              denySolicitud={this.denySolicitud}
              specialPermission={this.specialPermission}
              zonas={zonas}
              authAdmin={authAdmin}
            />
          )
        )}
        
      </div>
    );
  }
}

export default withRouter(SolicitudesPendientes);

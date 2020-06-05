import React, { Component } from "react";
import Axios from "axios";
import { URL_BASE } from "../constants";
import Solicitud from "./Solicitud";
import Mensaje from "./Mensaje";
import "../css/Progress.css";
import CircularProgress from '@material-ui/core/CircularProgress';

export default class SolicitudesAprobadas extends Component {
  
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
      const respone = await Axios.get(`${URL_BASE}/api/adm/aprobadas`);
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

  getZonas=async()=>{
    await Axios.get(`${URL_BASE}/api/Zonas`).then(response=>{
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

  cancelSolicitud = async (dataUser) => {
    console.log("authAdmin",dataUser.authAdmin)
    try {
        await Axios.put(
        `${URL_BASE}/api/adm/Cancel`,{dataUser}
      );
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
    }else
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
            id_solicitud,
            id_usuario,
            nombre_usuario,
            apellido_usuario,
            email_usuario,
            tipo_usuario,
            fecha_visita,
            motivo_visita,
            estado
          }) => (
            <Solicitud
              decision="aprobada"
              key={id_solicitud}
              id_solicitud={id_solicitud}
              id_usuario={id_usuario}
              nombre_usuario={nombre_usuario}
              apellido_usuario={apellido_usuario}
              email_usuario={email_usuario}
              tipo_usuario={tipo_usuario}
              fecha_visita={fecha_visita}
              motivo_visita={motivo_visita}
              cancelSolicitud={this.cancelSolicitud}
              estado={estado}
              zonas={zonas}
              authAdmin={authAdmin}
            />
          )
        )}
      </div>
    );
  }
}

import React,{Component} from "react";
import "../css/Solicitud.css";
import "../css/SolicitudAceptada.css";
import AceptarSolicitud from "./AceptarSolicitud";
import RechazarSolicitud from "./RechazarSolicitud";
import SolicitudZonas from "./zonas/solicitudZonas";
import PermisoEspecial from "./PermisoEspecial"


//Se cambio por un componente tipo clase pra usar el state con el objetivo de poder actualizar el checkbox de zonas zolicitadas

class Solicitud extends Component {
  
  constructor(){
    super();
    this.state={
      zonasAprovadas:[],
      observaciones:"",
      authAdmin:localStorage.getItem('idAdmin')
    }
  }
  

  handlerCheckbox=(z)=>{
    this.setState({zonasAprovadas:z})

  }

  handlerInputText = (e, keyText) => {
    const value = e.target.value;
    this.setState({
      [keyText]: value
    });
  };

render(){

  const{decision,
    id_solicitud,
    id_usuario,
    nombre_usuario,
    apellido_usuario,
    email_usuario,
    tipo_usuario,
    fecha_visita,
    motivo_visita,
    acceptSolicitud,
    denySolicitud,
    cancelSolicitud,
    specialPermission,
    zonas,estado}= this.props

  const{zonasAprovadas,observaciones}=this.state


  //Vamos a mapear las zonas con las zonas solicitadas
  const zonasSolicitadas=[]
  zonas.forEach(({id_zona,nombre_zona})=>{
    if(motivo_visita.includes(id_zona)){
      zonasSolicitadas.push({id_zona,nombre_zona})
    }
  })


  if(decision === "pendiente"){
    return (
      <div className="card-solicitud">
        <p>Nombre: <span className="data">{nombre_usuario} {apellido_usuario}</span> </p>
        <p>Identificación: <span className="data">{id_usuario}</span></p>
        <p>Tipo de Usuario: <span className="data">{tipo_usuario}</span></p>
        <p>Email: <span className="data">{email_usuario}</span></p>
        <p>Fecha de Visita: <span className="data">{fecha_visita}</span></p>
        <p>Zonas solicitadas a visitar</p>
        {<SolicitudZonas updateMotivoVisita={this.handlerCheckbox} zonas={zonasSolicitadas}/>}
        <p>Observaciones:</p>
        <span>
          <textarea
            name="observaciones"
            cols="30"
            rows="1"
            onChange={e => this.handlerInputText(e, "observaciones")}
            value={observaciones}
          />
        </span>
        
          
          <div className="container-buttons">
            <AceptarSolicitud
              acceptSolicitud={acceptSolicitud}
              id_solicitud={id_solicitud}
              id_usuario={id_usuario}
              nombre_usuario={nombre_usuario}
              apellido_usuario={apellido_usuario}
              email_usuario={email_usuario}
              tipo_usuario={tipo_usuario}
              fecha_visita={fecha_visita}
              zonasSolicitadas={zonasSolicitadas}
              zonasAprovadas={zonasAprovadas}
              observaciones={observaciones}
              authAdmin={this.state.authAdmin}
            />
            <PermisoEspecial
              specialPermission={specialPermission}
              id_solicitud={id_solicitud}
              id_usuario={id_usuario}
              nombre_usuario={nombre_usuario}
              apellido_usuario={apellido_usuario}
              email_usuario={email_usuario}
              tipo_usuario={tipo_usuario}
              fecha_visita={fecha_visita}
              zonasSolicitadas={zonasSolicitadas}
              zonasAprovadas={zonasAprovadas}
              observaciones={observaciones}
              special="Special Permission"
              authAdmin={this.state.authAdmin}
            />
            <RechazarSolicitud
              origen="solicitud"
              denySolicitud={denySolicitud}
              id_solicitud={id_solicitud}
              id_usuario={id_usuario}
              nombre_usuario={nombre_usuario}
              apellido_usuario={apellido_usuario}
              email_usuario={email_usuario}
              tipo_usuario={tipo_usuario}
              fecha_visita={fecha_visita}
              estado={estado}
              zonasSolicitadas={zonasSolicitadas}
              observaciones={observaciones}
              authAdmin={this.state.authAdmin}
            />
          </div>
      </div>
    );


  }else{


    return (
      <div className="card-solicitud-aceptada">
        <p>Nombre: <span className="data">{nombre_usuario} {apellido_usuario}</span> </p>
        <p>Identificación: <span className="data">{id_usuario}</span></p>
        <p>Tipo de Usuario: <span className="data">{tipo_usuario}</span></p>
        <p>Email: <span className="data">{email_usuario}</span></p>
        <p>Fecha de Visita: <span className="data">{fecha_visita}</span></p>
        <p>Estado: <span className="data-estado">{estado}</span></p>
        <p>Observaciones:</p>
        <span>
          <textarea
            name="observaciones"
            cols="30"
            rows="1"
            onChange={e => this.handlerInputText(e, "observaciones")}
            value={observaciones}
          />
        </span>
        
          <div className="container-buttons">
            <RechazarSolicitud
              origen="aprobada"
              cancelSolicitud={cancelSolicitud}
              id_solicitud={id_solicitud}
              id_usuario={id_usuario}
              nombre_usuario={nombre_usuario}
              apellido_usuario={apellido_usuario}
              email_usuario={email_usuario}
              tipo_usuario={tipo_usuario}
              fecha_visita={fecha_visita}
              estado={estado}
              zonasSolicitadas={zonasSolicitadas}
              observaciones={observaciones}
              authAdmin={this.state.authAdmin}
            />
          </div>
        
      </div>
    );

  }
  
}

}


export default Solicitud;

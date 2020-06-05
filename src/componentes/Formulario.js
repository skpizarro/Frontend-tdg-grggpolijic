import React, { Component } from "react";
import axios from "axios";
import Error from "./Error";
import "../css/Formulario.css";
import Mensaje from "./Mensaje";
import SolicitudZonas from "./zonas/solicitudZonas";
import TipoUsuario from "./TipoUsuario";
import { URL_BASE } from "../constants";




class Formulario extends Component {
    constructor(){
        super();
        this.state = {
            nombre: "",
            apellido: "",
            cedula: "",
            email: "",
            tipoPersona: "",
            fecha: "",
            motivoVisita: [],
            vecTipoUsuario: [],
            vecZonas:false,
            //motivoVisita: "",
            error: false
        };

        this.getTipoUsuario();

    }
    


//Consultamos en la api el tipo de usuarios
getTipoUsuario=()=>{
        axios
        .get(
          `${URL_BASE}/api/Formulario`,
          {
            headers: { "Content-Type": "application/json" }
          }
        )
        .then(response => {
            this.setState({vecTipoUsuario: response.data.data});
            console.log(this.state.vecTipoUsuario);
            //vecTipoUsuario = response.data.data;
            //console.log(vecTipoUsuario);
        })
        .catch(error=>{
          console.log(error);
        });
      };

//consultmos en la api las zonas con disponiilidad deingreso según la fecha
getZonas=(fecha)=>{
    axios
    .get(
      `${URL_BASE}/api/Formulario/Fecha`,
      { params: {fecha: fecha} },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(response => {
      this.setState({
        vecZonas: response.data.data
      });
    })
    .catch(error =>{
      console.log(error);
    });
}

    //Manejo de los datos del formulario
    handlerInputText = (e, keyText) => {
        const value = e.target.value;
        console.log("Valor en el handler ",value)
        console.log(keyText);
        this.props.handleSwitchTerms(e);
        this.setState({
            [keyText]: value
        });
    };

    //Metodo para validar que la fecha sea correcta (>= Al dia de hoy)
    //metodo actualizado para obtener las zonas segun la fecha escogida
    handlerInputDate = (e, keyText) => {
        let date = new Date();
        const value = e.target.value;
        const separatedDate = value.split("-");
        const valueNumbers = separatedDate.map(x => parseInt(x));

        if (valueNumbers[0] === date.getFullYear()) {
            if (valueNumbers[1] === date.getMonth() + 1) {
                if (valueNumbers[2] >= date.getDate()) {
                    return (this.setState({
                        fecha: value,
                        error: false
                    }),this.getZonas(value));
                } else {
                    return this.setState({ error: true });
                }
            } else if (valueNumbers[1] > date.getMonth()) {
                return (this.setState({
                    fecha: value,
                    error: false
                }),this.getZonas(value));
            } else {
                return this.setState({ error: true });
            }
        } else if (valueNumbers[0] > date.getFullYear()) {
            return (this.setState({
                fecha: value,
                error: false
            }),this.getZonas(value));
        } else {
            return this.setState({ error: true });
        }

        
    };


    handleCheckbox = (zonas) => {
        this.setState({ motivoVisita: zonas });
    }

    //Metodo para crear el usuario

    crearUsuario = e => {
        e.preventDefault();
        //Convertimos el array deobjetos en string para evitar problemas en la respuesta del backend
        //const stringMotivo = JSON.stringify(this.state.motivoVisita);
        const user = {
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            cedula: parseInt(this.state.cedula),
            email: this.state.email,
            tipoPersona: parseInt(this.state.tipoPersona),
            fecha: this.state.fecha,
            motivoVisita: this.state.motivoVisita
        };

        this.props.handleSubmit(e, user);
    };

    render(){
        const {
            nombre,
            apellido,
            cedula,
            email,
            tipoPersona,
            fecha,
            vecTipoUsuario,
            vecZonas,
            error
        } = this.state;
        
        
         return ( 
            
        <div>
            <form className = "formulario" onSubmit = { e => this.crearUsuario(e) } >
                <div className = "form-contenedor" >
                    <div className = "contenedor" >
                        <label> Nombre </label> 
                        <input required type = "text"
                        name = "nombre"
                        className = "input_nombre"
                        onChange = { e => this.handlerInputText(e, "nombre") }
                        value = { nombre }/>
                    </div>
                    <div className = "contenedor" >
                        <label > Apellido </label> 
                        <input required type = "text"
                        name = "apellido"
                        className = "input_apellido"
                        onChange = { e => this.handlerInputText(e, "apellido") }
                        value = { apellido }/>
                    </div> 
                    <div className = "contenedor" >
                        <label> Documento de identidad </label>
                        <input required type = "number"
                        name = "cedula"
                        className = "input_cedula"
                        onChange = { e => this.handlerInputText(e, "cedula") }
                        value = { cedula }/>
                    </div>
                    <div className = "contenedor" >
                        <label> Email </label> 
                        <input required type = "email"
                        name = "email"
                        className = "input_email"
                        onChange = { e => this.handlerInputText(e, "email") }
                        value = { email }/>
                    </div>
                    <div className = "contenedor" >
                        <label > Tipo de usuario </label> 
                        {vecTipoUsuario ? 
                        <TipoUsuario handlerInputText={this.handlerInputText} tipoPersona={tipoPersona} vecTipoUsuario={vecTipoUsuario}/> : 
                        "Cargando"
                        }
                        </div> 
                    <div className = "contenedor" >
                        <label > Fecha de visita </label>
                        <input required type = "date"
                        name = "fecha"
                        className = "input_date"
                        onChange = { e => this.handlerInputDate(e, "fecha")}
                        value = { fecha }/>
                    </div>
                          { error ? < Error mensaje = "Digite una Fecha Válida"/> : null } 
                    <div className = "contenedor" >
                        <label> Solicitar entrada a zonas: </label> 
                        {vecZonas ?
                        <SolicitudZonas updateMotivoVisita = { this.handleCheckbox }
                        zonas = { vecZonas }/> :
                        <Mensaje mensaje = "Seleccione una fecha para consultar disponibilidad de zonas" 
                             property = "aviso"/>
                        
                        }
                    </div> 
                    {
                        this.props.acceptTerms &&
                            (this.props.status.data.ok ?
                            <Mensaje mensaje = {this.props.status.data.data}
                             property = "normal"/> : 
                             <Mensaje mensaje = {this.props.status.data.data}
                             property = "error"/>)
                        
                    }


                    <button type = "submit"
                        className = "formulario__boton" >
                        enviar 
                    </button> 
                </div> 
            </form> 
        </div>
            
        );
    }
}
export default Formulario;

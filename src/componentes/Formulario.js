import React, { Component } from "react";
import CodigoQR from "./CodigoQR";
import "../css/Formulario.css";

export default class Formulario extends Component {

  state = {
    nombre: '',
    apellido: '',
    cedula: '',
    email: '',
    celular: '',
    tipoPersona: '',
    fecha: '',
    motivoVisita: ''
  };


  //Manejo de los datos del formulario

  handlerInputText = ( e , keyText ) => {
    const value = e.target.value;
    this.setState({[ keyText ] : value })
  };


  handlerInputDate = ( e , keyText ) => {
    let date = new Date();
    const value = e.target.value.split("-");
    
  };

  crearUsuario = e => {
    e.preventDefault();

    const user = {
      nombre: this.state.nombre,
      apellido: this.state.apellido,
      cedula: this.state.cedula,
      email: this.state.email,
      celular: this.state.celular,
      tipoPersona: this.state.tipoPersona,
      fecha: this.state.fecha,
      morivoVisita:this.state.motivoVisita
    }

    this.props.agregarUsuario(user)
  }

  render() {
    const {
      nombre,
      apellido,
      cedula,
      email,
      celular,
      tipoPersona,
      fecha,
      motivoVisita
    } = this.state;

    return (
      <div>
        <form className="formulario" onSubmit={this.crearUsuario}>
          <div className="contenedor">
            <label>Nombre</label>
            <input
              required
              type="text"
              name="nombre"
              className="input_nombre"
              onChange={e => this.handlerInputText(e,"nombre")}
              value={nombre}
            />
          </div>

          <div className="contenedor">
            <label>Apellido</label>
            <input
              required
              type="text"
              name="apellido"
              className="input_apellido"
              onChange={e => this.handlerInputText(e,"apellido")}
              value={apellido}
            />
          </div>

          <div className="contenedor">
            <label>Documento de identidad</label>
            <input
              required
              type="number"
              name="cedula"
              className="input_cedula"
              onChange={e => this.handlerInputText(e, "cedula")}
              value={cedula}
            />
          </div>

          <div className="contenedor">
            <label>Email</label>
            <input 
              required 
              type="email" 
              name="email" 
              className="input_email"
              onChange={e => this.handlerInputText(e,"email")}
              value={email}
              />
          </div>

          <div className="contenedor">
            <label>Celular</label>
            <input
              required
              type="number"
              name="celular"
              className="input_celular"
              onChange={e => this.handlerInputText(e,"celular")}
              value={celular}
            />
          </div>

          <div className="contenedor">
            <label>Tipo de persona</label>
            <select 
              required 
              name="tipopersona" 
              className="select_tipopersona"
              onChange={e => this.handlerInputText(e,"tipoPersona")}
              value={tipoPersona}
              >
              <option value="vacio">Elige una opción</option>
              <option value="estudiante">Estudiante</option>
              <option value="empleado">Empleado</option>
              <option value="visitante">Visitante</option>
            </select>
          </div>
          <div className="contenedor">
            <label>Fecha de visita</label>
            <input 
              required 
              type="date" 
              name="fecha" 
              className="input_date" 
              onChange={e => this.handlerInputDate(e,"fecha")}
              value={fecha}
              />
          </div>
          <div className="contenedor">
            <label>Motivo de la visita</label>
            <textarea
              name="motivovisita"
              cols="30"
              rows="3"
              className="textarea_motivo"
              onChange={e => this.handlerInputText(e,"motivoVisita")}
              value={motivoVisita}
            />
          </div>

          <button type="submit" className="formulario__boton">
            Enviar
          </button>
        </form>
        {/* <CodigoQR
         usuarios={this.props.usuarios}
        /> */}
      </div>
    );
  }
}

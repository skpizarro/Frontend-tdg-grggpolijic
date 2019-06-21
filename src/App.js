import Header from "./componentes/Header";
import Footer from "./componentes/Footer";
import './css/App.css';

import React, { Component } from "react";

export default class App extends Component {

  state={
    showModal:false
  }

  handleToggleModal = () => {
    this.setState(prevState => ({...prevState, showModal : !prevState.showModal }))
  }

 /**
  * ---------------------Front End---------------------------------------
  * 
  * Diseño del header -- Cambiar a centrado con todo el fondo amarillo OK
  * 
  * Modificar vista nosotros en la seccion titulo poner info de la granja OK
  * Modificar captura de campos quitar Ref ---> poner Handler inputs // OK
  *  Revisar Validaciones de campos: nombre - apellido solo texto OK
  * id - celular solo numerico entradas numericas(que no permita ingresar numeros) OK
  * entradas de fecha validar que no se pueda escoger una fecha anterior al dia actual To Do
  * Crear modal con terminos y condiciones To Do
  * Envio post (Axios) de los datos del usuario  OK
  * recibir un respuesta y mostrar mensaje de qr enviado exitosamente al correo 
  * 
  * (EndPoints en el drive)-----
  * 
  * axios.post(endpoint, (
  * 
  * usuario // objeto como tal 
  * ))
  * 
  * --------------------Raspberry ------------------------------------------------
  * descargar librerias y probar que funcione
  * 
  */

  render() {
    return (
      <div className="App"> 
      {

      this.state.showModal && <aside className="modal">
        hola
        <button onClick={this.handleToggleModal}>X</button>
      </aside>
      }
        <Header 
        handleOpenModal={this.handleToggleModal}
        />
        <Footer />
      </div>
    );
  }
}

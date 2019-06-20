import Header from "./componentes/Header";
import Footer from "./componentes/Footer";
import './css/App.css';

import React, { Component } from "react";

export default class App extends Component {
 state = {
     user: {}
 }

 agregarUsuario = user => {
    console.log(user)
    //Ponerlo en el state
    this.setState({
        user
    })

 }


 /**
  * ---------------------Front End---------------------------------------
  * 
  * Diseño del header -- Cambiar a centrado con todo el fondo amarillo OK
  * 
  * Modificar vista nosotros en la seccion titulo poner info de la granja 
  * Modificar captura de campos quitar Ref ---> poner Handler inputs //
  *  Revisar Validaciones de campos: nombre - apellido solo texto
  * id - celular solo numerico entradas numericas(que no permita ingresar numeros)
  * entradas de fecha validar que no se pueda escoger una fecha anterior al dia actual
  * Crear modal con terminos y condiciones 
  * Envio post (Axios) de los datos del usuario 
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
        <Header 
        agregarUsuario = {this.agregarUsuario}
        />
        <Footer />
      </div>
    );
  }
}

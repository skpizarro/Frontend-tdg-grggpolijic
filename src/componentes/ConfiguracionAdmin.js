import React, { Component } from "react";
import CrearAdmin from "./CrearAdministrador";
import { URL_BASE } from "../constants";
import axios from "axios";
import AdminInfo from "./AdminInfo";
import "../css/ConfiguracionAdmin.css";
import DeleteAdmin from "./DeleteAdmin";
import ErrorDeleteAdmin from "./ErrorDeleteAdmin";
import "../css/Progress.css";
import CircularProgress from '@material-ui/core/CircularProgress';

export default class ConfiguracionAdmin extends Component {
  state = {
    administradores: [],
    showCreateAdmin: false,
    showEditAdmin: false,
    showDeleteAdmin: false,
    id_administrador: "",
    nombre_administrador: "",
    clave_administrador: "",
    error: "",
    isError: false
  };

  handleShowCreateAdmin = e => {
    this.setState(prevState => ({
      ...prevState,
      showCreateAdmin: !prevState.showCreateAdmin
    }));
  };

  handleShowEditAdmin = (e, id_administrador = "") => {
    this.setState(prevState => ({
      ...prevState,
      showEditAdmin: !prevState.showEditAdmin,
      id_administrador
    }));
  };

  handleShowErrorDelete = () => {
    this.setState(prevState => ({
      ...prevState,
      isError: !prevState.isError
    }));
  };

  handleShowDeleteAdmin = (e, id_administrador = "") => {
    this.setState(prevState => ({
      ...prevState,
      showDeleteAdmin: !prevState.showDeleteAdmin,
      id_administrador
    }));
  };

  getAllAdminBD = async () => {
    try {
      const response = await axios.get(`${URL_BASE}/admin/crud`);
      this.setState({
        administradores: response.data.data
      });
    } catch (error) {
      this.setState({
        error: error.message,
        administradores: []
      });
    }
  };

  crearAdminBD = async e => {
    e.preventDefault();
    const user = {
      idUsuario: this.state.id_administrador,
      nombresUsuario: this.state.nombre_administrador,
      passwordUsuario: this.state.clave_administrador
    };

    try {
        await axios.post(`${URL_BASE}/admin/crud`, {
        user
      });
      this.getAllAdminBD();
    } catch (error) {
      this.setState({
        error: error.message
      });
    }
    this.handleShowCreateAdmin(e);
  };

  editAdminBD = async (e, user) => {
    e.preventDefault();
    const { idUsuario } = user;
    try {
        await axios.put(
        `${URL_BASE}/admin/crud/${idUsuario}`,
        {
          user
        }
      );
      this.getAllAdminBD();
    } catch (error) {
      this.setState({
        error: error.message
      });
    }
    this.handleShowDeleteAdmin(e);
  };

  deleteAdminBD = async (e, id_administrador) => {
    const { administradores } = this.state;
    try {
      if (administradores.length > 1) {
          await axios.delete(
          `${URL_BASE}/admin/crud/${id_administrador}`
        );
        this.setState({
          isError: false
        });
        this.getAllAdminBD();
      } else {
        this.setState({
          isError: true
        });
      }
    } catch (error) {
      this.setState({
        error: error.message
      });
    }
    this.handleShowDeleteAdmin(e);
  };

  handlerInpunt = (e, keyText) => {
    const value = e.target.value;
    this.setState({
      [keyText]: value
    });
  };

  componentDidMount = () => {
    this.getAllAdminBD();
  };

  render() {
    const {
      administradores,
      showCreateAdmin,
      showEditAdmin,
      showDeleteAdmin,
      id_administrador,
      nombre_administrador,
      clave_administrador,
      isError
    } = this.state;

    const user = {
      idUsuario: id_administrador,
      nombresUsuario: nombre_administrador,
      passwordUsuario: clave_administrador
    };

    if(administradores.length === 0){
      return (
        
          <div class="spinner">
          <CircularProgress className="prog" size={100} color={"rgb(212, 174, 1)"}/> 
          </div>
          ) 
    }else

    return (

      
      <div className="container-configuracion">
        <div className="container-create-admin">
          {/* Componente boton crear admin */}
          <button
            className="button-config"
            onClick={e => this.handleShowCreateAdmin(e)}
          >
            Crear Administrador
          </button>
          {showCreateAdmin && (
            <CrearAdmin
              tipo="crear"
              mensaje="Crear Administrador"
              handleShowEntrante={this.handleShowCreateAdmin}
              handlerInpunt={this.handlerInpunt}
              id_administrador={id_administrador}
              nombre_administrador={nombre_administrador}
              clave_administrador={clave_administrador}
              funcionEntrante={this.crearAdminBD}
            />
          )}
        </div>
        <div className="container-show-admin-info">
          {/* Componente  Mostrar todos los admin*/}
          {administradores.map(
            ({ id_administrador, nombre_administrador, clave_administrador }) => (
              <AdminInfo
                key={id_administrador}
                id_administrador={id_administrador}
                nombre_administrador={nombre_administrador}
                clave_administrador={clave_administrador}
                handleShowEditAdmin={this.handleShowEditAdmin}
                handleShowDeleteAdmin={this.handleShowDeleteAdmin}
              />
            )
          )}
          {showEditAdmin && (
            <CrearAdmin
              tipo="editar"
              mensaje="Editar Administrador"
              handleShowEntrante={this.handleShowEditAdmin}
              handlerInpunt={this.handlerInpunt}
              id_administrador={id_administrador}
              nombre_administrador={nombre_administrador}
              clave_administrador={clave_administrador}
              funcionEntrante={this.editAdminBD}
              user={user}
            />
          )}
          {showDeleteAdmin && (
            <DeleteAdmin
              mensaje="¿Está seguro?"
              id_administrador={id_administrador}
              handleShowDeleteAdmin={this.handleShowDeleteAdmin}
              deleteAdminBD={this.deleteAdminBD}
            />
          )}
          {isError && (
            <ErrorDeleteAdmin
              mensaje="¡No puedes eliminar todos los administradores!"
              handleShowErrorDelete={this.handleShowErrorDelete}
            />
          )}
        </div>
      </div>
    );
  }
}

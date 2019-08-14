import React, { Component } from "react";
import CrearAdmin from "./CrearAdministrador";
import { BASE_ENDPOINT } from "../constants";
import axios from "axios";
import AdminInfo from "./AdminInfo";
import "../css/ConfiguracionAdmin.css";
import DeleteAdmin from "./DeleteAdmin";
import ErrorDeleteAdmin from "./ErrorDeleteAdmin";

export default class ConfiguracionAdmin extends Component {
  state = {
    administradores: [],
    showCreateAdmin: false,
    showEditAdmin: false,
    showDeleteAdmin: false,
    id_usuario: "",
    nombre_usuario: "",
    clave_usuario: "",
    error: "",
    isError: false
  };

  handleShowCreateAdmin = e => {
    this.setState(prevState => ({
      ...prevState,
      showCreateAdmin: !prevState.showCreateAdmin
    }));
  };

  handleShowEditAdmin = (e, id_usuario = "") => {
    this.setState(prevState => ({
      ...prevState,
      showEditAdmin: !prevState.showEditAdmin,
      id_usuario
    }));
  };

  handleShowErrorDelete = () => {
    this.setState(prevState => ({
      ...prevState,
      isError: !prevState.isError
    }));
  };

  handleShowDeleteAdmin = (e, id_usuario = "") => {
    this.setState(prevState => ({
      ...prevState,
      showDeleteAdmin: !prevState.showDeleteAdmin,
      id_usuario
    }));
  };

  getAllAdminBD = async () => {
    try {
      const response = await axios.get(`${BASE_ENDPOINT}/admin/crud`);
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
      idUsuario: this.state.id_usuario,
      nombresUsuario: this.state.nombre_usuario,
      passwordUsuario: this.state.clave_usuario
    };

    try {
      const response = await axios.post(`${BASE_ENDPOINT}/admin/crud`, {
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
      const response = await axios.put(
        `${BASE_ENDPOINT}/admin/crud/${idUsuario}`,
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

  deleteAdminBD = async (e, id_usuario) => {
    const { administradores } = this.state;
    try {
      if (administradores.length > 1) {
        const response = await axios.delete(
          `${BASE_ENDPOINT}/admin/crud/${id_usuario}`
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
      id_usuario,
      nombre_usuario,
      clave_usuario,
      isError
    } = this.state;

    const user = {
      idUsuario: id_usuario,
      nombresUsuario: nombre_usuario,
      passwordUsuario: clave_usuario
    };
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
              id_usuario={id_usuario}
              nombre_usuario={nombre_usuario}
              clave_usuario={clave_usuario}
              funcionEntrante={this.crearAdminBD}
            />
          )}
        </div>
        <div className="container-show-admin-info">
          {/* Componente  Mostrar todos los admin*/}
          {administradores.map(
            ({ id_usuario, nombre_usuario, clave_usuario }) => (
              <AdminInfo
                key={id_usuario}
                id_usuario={id_usuario}
                nombre_usuario={nombre_usuario}
                clave_usuario={clave_usuario}
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
              id_usuario={id_usuario}
              nombre_usuario={nombre_usuario}
              clave_usuario={clave_usuario}
              funcionEntrante={this.editAdminBD}
              user={user}
            />
          )}
          {showDeleteAdmin && (
            <DeleteAdmin
              mensaje="¿Está seguro?"
              id_usuario={id_usuario}
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

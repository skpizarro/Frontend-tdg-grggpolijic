import React from "react";
import "../css/AdminInfo.css";

const AdminInfo = ({
  id_administrador,
  nombre_administrador,
  clave_administrador,
  handleShowEditAdmin,
  handleShowDeleteAdmin
}) => {
  return (
    <div className="container-info-admin">
      <div className="container-block-info">
        <div className="container-iput">
          <label htmlFor="">Identificación: </label>
          <span>{id_administrador}</span>
        </div>
        <div className="container-iput">
          <label htmlFor="">Usuario: </label>
          <span>{nombre_administrador}</span>
        </div>
        <div className="container-iput">
          <label htmlFor="">Contraseña: </label>
          <span>{clave_administrador}</span>
        </div>
      </div>
      <div className="container-block-btns">
        <div className="container-buttons-crud">
          <button
            className="btn-crud edit"
            // onClick={e => handleShowEditAdmin(e, id_usuario)}
            disabled
          >
            Editar
          </button>
          <button
            className="btn-crud delete"
            onClick={e => handleShowDeleteAdmin(e, id_administrador)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminInfo;

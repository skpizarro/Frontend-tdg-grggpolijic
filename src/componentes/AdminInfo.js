import React from "react";
import "../css/AdminInfo.css";

const AdminInfo = ({
  id_usuario,
  nombre_usuario,
  clave_usuario,
  handleShowEditAdmin,
  handleShowDeleteAdmin
}) => {
  return (
    <div className="container-info-admin">
      <div className="container-block-info">
        <div className="container-iput">
          <label htmlFor="">Identificación: </label>
          <span>{id_usuario}</span>
        </div>
        <div className="container-iput">
          <label htmlFor="">Usuario: </label>
          <span>{nombre_usuario}</span>
        </div>
        <div className="container-iput">
          <label htmlFor="">Contraseña: </label>
          <span>{clave_usuario}</span>
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
            onClick={e => handleShowDeleteAdmin(e, id_usuario)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminInfo;

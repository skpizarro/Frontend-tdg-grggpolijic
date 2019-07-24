import React from "react";
import "../css/DeleteAdmin.css";

const DeleteAdmin = ({
  mensaje,
  id_usuario,
  handleShowDeleteAdmin,
  deleteAdminBD
}) => {
  return (
    <div className="container-delete-admin">
      <div className="container-delete">
        <h2>{mensaje}</h2>
        <div className="btns-decisions">
          <button
            className="btn-decision-si"
            onClick={e => deleteAdminBD(e, id_usuario)}
          >
            Si
          </button>
          <button
            className="btn-decision-no"
            onClick={() => handleShowDeleteAdmin()}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAdmin;

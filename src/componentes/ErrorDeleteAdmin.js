import React from "react";
import "../css/ErrorDeleteAdmin.css";

const ErrorDeleteAdmin = ({ mensaje, handleShowErrorDelete }) => {
  return (
    <div className="error-delete-admin">
      <div className="error-delete">
        <h2>{mensaje}</h2>
        <button onClick={handleShowErrorDelete}>Aceptar</button>
      </div>
    </div>
  );
};

export default ErrorDeleteAdmin;

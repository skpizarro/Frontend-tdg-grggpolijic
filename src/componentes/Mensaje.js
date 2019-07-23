import React from "react";
import "../css/Mensaje.css";

const Mensaje = ({ mensaje, property }) => {
  return (
    <div className={`container-mensaje-${property}`}>
      <h2>{mensaje}</h2>
    </div>
  );
};

export default Mensaje;

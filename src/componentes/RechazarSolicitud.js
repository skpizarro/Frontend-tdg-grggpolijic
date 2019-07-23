import React from "react";
import "../css/RechazarSolicitud.css";

const RechazarSolicitud = ({
  origen,
  declineSolicitud,
  id_solicitud,
  deleteAprobadas
}) => {
  return (
    <div>
      {origen === "solicitud" ? (
        <button
          className="decision-button-refuse"
          onClick={() => declineSolicitud(id_solicitud)}
        >
          Rechazar
        </button>
      ) : (
        <button
          className="decision-button-refuse"
          onClick={() => deleteAprobadas(id_solicitud)}
        >
          Eliminar
        </button>
      )}
    </div>
  );
};

export default RechazarSolicitud;

import React from "react";
import "../css/RechazarSolicitud.css";

const RechazarSolicitud = ({
  origen,
  denySolicitud,
  cancelSolicitud,
  id_solicitud,
  id_usuario,
  nombre_usuario,
  apellido_usuario,
  email_usuario,
  tipo_usuario,
  fecha_visita,
  estado,
  zonasSolicitadas,
  observaciones,
  authAdmin
  
}) => {
  const dataUser={
    id_solicitud,
    id_usuario,
    nombre_usuario,
    apellido_usuario,
    email_usuario,
    tipo_usuario,
    fecha_visita,
    estado,
    zonasSolicitadas,
    observaciones,
    authAdmin

  }
  return (
    <div>
      {origen === "solicitud" ? (
        <button
          className="decision-button-refuse"
          onClick={() => denySolicitud(dataUser)}
        >
          Rechazar
        </button>
      ) : (
        <button
          className="decision-button-refuse"
          onClick={() => cancelSolicitud(dataUser)}
        >
          Cancelar
        </button>
      )}
    </div>
  );
};

export default RechazarSolicitud;

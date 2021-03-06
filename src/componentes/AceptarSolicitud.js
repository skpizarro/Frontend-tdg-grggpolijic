import React from "react";
import "../css/AceptarSolicitud.css";

const AceptarSolicitud = ({
  acceptSolicitud,
  id_solicitud,
  id_usuario,
  nombre_usuario,
  apellido_usuario,
  email_usuario,
  tipo_usuario,
  fecha_visita,
  zonasSolicitadas,
  zonasAprovadas,
  observaciones,
  authAdmin
}) => {
  const dataUser = {
    id_solicitud,
    id_usuario,
    nombre_usuario,
    apellido_usuario,
    email_usuario,
    tipo_usuario,
    fecha_visita,
    zonasSolicitadas,
    zonasAprovadas,
    observaciones,
    authAdmin
    
  };
  return (
    <button
      className="decision-button-accept"
      onClick={() => acceptSolicitud(dataUser)}
    >
      Aceptar
    </button>
  );
};

export default AceptarSolicitud;

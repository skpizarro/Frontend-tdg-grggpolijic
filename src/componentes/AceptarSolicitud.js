import React from "react";
import "../css/AceptarSolicitud.css";

const AceptarSolicitud = ({
  acceptSolicitud,
  id_solicitud,
  id_usuario,
  nombre_usuario,
  email_usuario,
  tipo_usuario,
  fecha_visita,
  motivo_visita
}) => {
  const user = {
    idQr: id_solicitud,
    cedula: id_usuario,
    nombre: nombre_usuario,
    email: email_usuario,
    tipoPersona: tipo_usuario,
    fecha: fecha_visita,
    motivoVisita: motivo_visita
  };
  return (
    <button
      className="decision-button-accept"
      onClick={() => acceptSolicitud(user)}
    >
      Aceptar
    </button>
  );
};

export default AceptarSolicitud;

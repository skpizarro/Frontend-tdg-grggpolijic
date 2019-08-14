import React from "react";
import "../css/Solicitud.css";
import AceptarSolicitud from "./AceptarSolicitud";
import RechazarSolicitud from "./RechazarSolicitud";

const Solicitud = ({
  decision,
  id_solicitud,
  id_usuario,
  nombre_usuario,
  email_usuario,
  tipo_usuario,
  fecha_visita,
  motivo_visita,
  acceptSolicitud,
  declineSolicitud,
  deleteAprobadas
}) => {
  const fullNameUser = nombre_usuario.split("undefined");
  const name = fullNameUser[0];
  const lastName = fullNameUser[1];
  return (
    <div className="card-solicitud">
      <p>Nombre:</p>
      <span>{name}</span>
      <p>Identificación:</p>
      <span>{id_usuario}</span>
      <p>Email:</p>
      <span>{email_usuario}</span>
      <p>Fecha de Visita:</p>
      <span>{fecha_visita}</span>
      {decision === "pendiente" ? (
        <div className="container-buttons">
          <AceptarSolicitud
            acceptSolicitud={acceptSolicitud}
            id_solicitud={id_solicitud}
            id_usuario={id_usuario}
            nombre_usuario={nombre_usuario}
            email_usuario={email_usuario}
            tipo_usuario={tipo_usuario}
            fecha_visita={fecha_visita}
            motivo_visita={motivo_visita}
          />
          <RechazarSolicitud
            origen="solicitud"
            declineSolicitud={declineSolicitud}
            id_solicitud={id_solicitud}
          />
        </div>
      ) : (
        <div className="container-buttons">
          <RechazarSolicitud
            origen="aprobada"
            deleteAprobadas={deleteAprobadas}
            id_solicitud={id_solicitud}
          />
        </div>
      )}
    </div>
  );
};

export default Solicitud;

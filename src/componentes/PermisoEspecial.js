import React from "react";
import "../css/PermisoEspecial.css";

const PermisoEspecial = ({
  specialPermission,
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
  special,authAdmin
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
    special,
    authAdmin
    
  };
  return (
    <button
      className="decision-button-accept-special"
      onClick={() => specialPermission(dataUser)}
    >
     Especial
    </button>
  );
};

export default PermisoEspecial;

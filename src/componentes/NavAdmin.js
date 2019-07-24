import React from "react";
import { NavLink } from "react-router-dom";

const NavAdmin = ({ switchNavAdmin }) => {
  return (
    <ul className="header__lista">
      <li>
        <NavLink
          className="header__lista-item"
          to="/SolicitudesPendientes"
          activeClassName="active"
        >
          Solicitudes Pendientes
        </NavLink>
      </li>
      <li>
        <NavLink
          className="header__lista-item"
          to="/SolicitudesAprobadas"
          activeClassName="active"
        >
          Solicitudes Aprobadas
        </NavLink>
      </li>
      <li>
        <NavLink
          className="header__lista-item"
          to="/Configuracion"
          activeClassName="active"
        >
          Configuración
        </NavLink>
      </li>
      <li>
        <NavLink
          className="header__lista-item"
          onClick={switchNavAdmin}
          to="/Ingresar"
          activeClassName="active"
        >
          Salir
        </NavLink>
      </li>
    </ul>
  );
};

export default NavAdmin;

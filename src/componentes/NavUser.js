import React from "react";
import { NavLink } from "react-router-dom";
const NavUser = () => {
  return (
    <ul className="header__lista">
      <li>
        <NavLink
          to="/Nosotros"
          activeClassName="active"
          className="header__lista-item"
        >
          Nosotros
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/Formulario"
          activeClassName="active"
          className="header__lista-item"
        >
          Formulario
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/Ingresar"
          activeClassName="active"
          className="header__lista-item"
        >
          Ingresar
        </NavLink>
      </li>
    </ul>
  );
};

export default NavUser;

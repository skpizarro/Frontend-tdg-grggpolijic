import React from "react";
import NavAdmin from "./NavAdmin";
import NavUser from "./NavUser";
import "../css/Navegacion.css";
import image from "../assets/img/logo-negro.png";

const Navegacion = ({ showNavAdmin, switchNavAdmin }) => {
  console.log(`Desde navegacion, el valor del switch es, ${showNavAdmin}`);
  return (
    <nav className="navegacion">
      <div className="navegacion__img-container">
        <img src={image} alt="logo poli" />
      </div>
      {showNavAdmin ? (
        <NavAdmin switchNavAdmin={switchNavAdmin} />
      ) : (
        <NavUser />
      )}
    </nav>
  );
};

export default Navegacion;

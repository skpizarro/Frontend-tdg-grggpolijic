import React from "react";
import "../css/CrearAdministrador.css";

const CrearAdmin = ({
  tipo,
  mensaje,
  handleShowEntrante,
  handlerInpunt,
  funcionEntrante,
  user
}) => {
  return (
    <div className="container-form-create-admin">
      <button className="button-close-admin" onClick={handleShowEntrante}>
        X
      </button>
      {tipo === "crear" ? (
        <form className="form-create-admin" onSubmit={e => funcionEntrante(e)}>
          <h2>{mensaje}</h2>
          <div className="container-inputs-form">
            <label>Identificacion</label>
            <input
              type="number"
              name="identificacion"
              className="input_identificacion"
              onChange={e => handlerInpunt(e, "id_usuario")}
              required
            />
          </div>
          <div className="container-inputs-form">
            <label>Usuario</label>
            <input
              type="text"
              name="usuario"
              className="input_usuario"
              onChange={e => handlerInpunt(e, "nombre_usuario")}
              required
            />
          </div>
          <div className="container-inputs-form">
            <label>Contraseña</label>
            <input
              type="text"
              name="contraseña"
              className="input_contraseña"
              onChange={e => handlerInpunt(e, "clave_usuario")}
              required
            />
          </div>
          <div className="container-form-buttons">
            <button className="btn-form-crear" type="submit">
              Crear
            </button>
            <button
              className="btn-form-cancelar"
              type="button"
              onClick={handleShowEntrante}
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <form
          className="form-create-admin"
          onSubmit={e => funcionEntrante(e, user)}
        >
          <h2>{mensaje}</h2>
          <div className="container-inputs-form">
            <label>Usuario</label>
            <input
              type="text"
              name="usuario"
              className="input_usuario"
              onChange={e => handlerInpunt(e, "nombre_usuario")}
              required
            />
          </div>
          <div className="container-inputs-form">
            <label>Contraseña</label>
            <input
              type="text"
              name="contraseña"
              className="input_contraseña"
              onChange={e => handlerInpunt(e, "clave_usuario")}
              required
            />
          </div>
          <div className="container-form-buttons">
            <button className="btn-form-crear" type="submit">
              Editar
            </button>
            <button
              className="btn-form-cancelar"
              type="button"
              onClick={handleShowEntrante}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CrearAdmin;

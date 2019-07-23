import React from "react";
import Navegacion from "./Navegacion";
import Nosotros from "./Nosotros";
import Formulario from "./Formulario";
import Ingreso from "./Ingreso";
import SolicitudesPendientes from "./SolicitudesPendientes";
import SolicitudesAprobadas from "./SolicitudesAprobadas";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Header = ({
  handleOpenModal,
  handleSubmit,
  showNavAdmin,
  switchNavAdmin,
  acceptTerms,
  handleSwitchTerms
}) => {
  return (
    <Router>
      <header>
        <Navegacion
          showNavAdmin={showNavAdmin}
          switchNavAdmin={switchNavAdmin}
        />
        <Switch>
          <Route path="/" exact component={Nosotros} />
          <Route path="/Nosotros" component={Nosotros} />
          <Route
            path="/Formulario"
            render={() => (
              <Formulario
                handleOpenModal={handleOpenModal}
                handleSubmit={handleSubmit}
                acceptTerms={acceptTerms}
                handleSwitchTerms={handleSwitchTerms}
              />
            )}
          />
          <Route
            path="/Ingresar"
            render={() => <Ingreso switchNavAdmin={switchNavAdmin} />}
          />
          <Route
            path="/SolicitudesPendientes"
            component={SolicitudesPendientes}
          />
          <Route
            path="/SolicitudesAprobadas"
            component={SolicitudesAprobadas}
          />
        </Switch>
      </header>
    </Router>
  );
};

export default Header;

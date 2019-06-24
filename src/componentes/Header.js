import React from "react";
import Navegacion from "./Navegacion";
import Nosotros from "./Nosotros";
import Formulario from "./Formulario";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Header = ({ handleOpenModal, handleSubmit}) => {
  return (
    <Router>
      <header>
        <Navegacion/>
        <Switch>
          <Route path="/" exact component={Nosotros}/>
          <Route path="/Nosotros"  component={Nosotros} />
          <Route path="/Formulario"  render={()=>(
            <Formulario
             handleOpenModal={handleOpenModal}
             handleSubmit={handleSubmit}
            />
          )}/>
        </Switch>
      </header>
    </Router>
  );
};

export default Header;

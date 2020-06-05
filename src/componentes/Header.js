import React,{Component} from "react";
import Navegacion from "./Navegacion";
import Nosotros from "./Nosotros";
import Formulario from "./Formulario";
import Ingreso from "./Ingreso";
import SolicitudesPendientes from "./SolicitudesPendientes";
import SolicitudesAprobadas from "./SolicitudesAprobadas";
import ConfiguracionAdmin from "./ConfiguracionAdmin";
import Visitas from './visitas/Visitas';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const zonas = [{
  id_zona: "0",
  nombre_zona:"Todas"
},
{
  id_zona: "1",
  nombre_zona:"Ganado de leche"
},{
  id_zona: "2",
  nombre_zona:"Porcicultura"
},
{
  id_zona: "3",
  nombre_zona:"Avicultura"
}
];



class Header extends Component{

  constructor(){
    super();
    this.state={
      authAdmin:false
    }
  }


 

render(){

  

  const {
    handleOpenModal,
    handleSubmit,
    showNavAdmin,
    switchNavAdmin,
    acceptTerms,
    status,
    handleSwitchTerms,
  } = this.props

  return (
    <Router>
      <header>
        <Navegacion
          showNavAdmin={showNavAdmin}
          switchNavAdmin={switchNavAdmin}
        />
        <Switch>
          
          <Route exact path="/" component={Nosotros} />
          <Route
            path="/Formulario"
            render={() => (
              <Formulario
                handleOpenModal={handleOpenModal}
                handleSubmit={handleSubmit}
                acceptTerms={acceptTerms}
                status={status}
                handleSwitchTerms={handleSwitchTerms}
              />
            )}
          />
          <Route
            path="/Ingresar"
            render={() => <Ingreso switchNavAdmin={switchNavAdmin}  />}
          />
          <Route path="/Configuracion" render={() => <ConfiguracionAdmin />} />
          <Route
            path="/SolicitudesPendientes"
            component={SolicitudesPendientes}
            
          />
          <Route
            path="/SolicitudesAprobadas"
            component={SolicitudesAprobadas}
        
          />
          {zonas.map(({nombre_zona,id_zona})=>{
            return <Route
                      key={id_zona}
                      path={`/visitas/${nombre_zona}`}
                      component={Visitas}
                    />
          })}
          
        </Switch>
      </header>
    </Router>
  );
}
}

export default Header;

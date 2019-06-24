import Header from "./componentes/Header";
import Footer from "./componentes/Footer";
import { BASE_ENDPOINT } from "./constants";
import axios from "axios";
import "./css/App.css";

import React, { Component } from "react";

export default class App extends Component {
  state = {
    showModal: false,
    acceptTerms: false,
    user:[]
  };

  handleToggleModal = e => {
    e.preventDefault();
    this.setState(prevState => ({
      ...prevState,
      showModal: !prevState.showModal
    }));
  };

  handleChangeCheckbox = e => {
    const value = e.target.checked;
    this.setState({ acceptTerms: value });
  };

  handleSubmit = (e, user) => {
    this.setState({
      user:user
    })
    this.handleToggleModal(e);
  };

  sendInfo = ( e , user) => {
    e.preventDefault();

    // axios.post(`${BASE_ENDPOINT}/api/generateqr`, {user},
    // {
    //   headers: { "Content-Type": "application/json"}
    // }).then( function (response){
    //   console.log('respuesta',response)
      
    // }).catch(function(error){
    //   console.log(error)
    // })
    
    this.handleToggleModal(e);
    e.currentTarget.reset();

  }

  /**
   * ---------------------Front End---------------------------------------
   *
   * Diseño del header -- Cambiar a centrado con todo el fondo amarillo OK
   *
   * Modificar vista nosotros en la seccion titulo poner info de la granja OK
   * Modificar captura de campos quitar Ref ---> poner Handler inputs // OK
   *  Revisar Validaciones de campos: nombre - apellido solo texto OK
   * id - celular solo numerico entradas numericas(que no permita ingresar numeros) OK
   * entradas de fecha validar que no se pueda escoger una fecha anterior al dia actual OK
   * Envio post (Axios) de los datos del usuario  OK
   * Crear modal con terminos y condiciones To Do
   * recibir un respuesta y mostrar mensaje de qr enviado exitosamente al correo To Do
   *
   * --------------------Raspberry ------------------------------------------------
   * descargar librerias y probar que funcione
   *
   */

  render() {
    const { showModal } = this.state;
    const switchClassModal = showModal ? 'active' : 'no-active';
    const body = document.querySelector('#no-active');
    if(switchClassModal === 'active'){
      body.className = 'active'
    }else{
      body.className = 'no-active';
    }

    return (
      <div className="App">
        {this.state.showModal && (
          <aside className="modal">
            <form
              className="form-general-modal"
              onSubmit={e => this.sendInfo(e, this.state.user)}
            >
              <h2 className="title-tyc">Términos y condiciones</h2>
              <div className="container-tyc">
                <p>
                  <strong>POLÍTICA DE PRIVACIDAD</strong>
                </p>
                <p>&nbsp;</p>
                <p>
                  El presente Política de Privacidad establece los términos en
                  que el Politécnico Colombiano Jaime Isaza Cadavid usa y
                  protege la información que es proporcionada por sus usuarios
                  al momento de utilizar su sitio web. Esta compañía está
                  comprometida con la seguridad de los datos de sus usuarios.
                  Cuando le pedimos llenar los campos de información personal
                  con la cual usted pueda ser identificado, lo hacemos
                  asegurando que sólo se empleará de acuerdo con los términos de
                  este documento. Sin embargo esta Política de Privacidad puede
                  cambiar con el tiempo o ser actualizada por lo que le
                  recomendamos y enfatizamos revisar continuamente esta página
                  para asegurarse que está de acuerdo con dichos cambios.
                </p>
                <p>
                  <strong>Información que es recogida</strong>
                </p>
                <p>
                  Nuestro sitio web podrá recoger información personal por
                  ejemplo: Nombre,&nbsp; información de contacto como&nbsp; su
                  dirección de correo electrónica e información demográfica. Así
                  mismo cuando sea necesario podrá ser requerida información
                  específica para procesar algún pedido o realizar una entrega o
                  facturación.
                </p>
                <p>
                  <strong>Uso de la información recogida</strong>
                </p>
                <p>
                  Nuestro sitio web emplea la información con el fin de
                  proporcionar el mejor servicio posible, particularmente para
                  mantener un registro de usuarios, de pedidos en caso que
                  aplique, y mejorar nuestros productos y servicios. &nbsp;Es
                  posible que sean enviados correos electrónicos periódicamente
                  a través de nuestro sitio con ofertas especiales, nuevos
                  productos y otra información publicitaria que consideremos
                  relevante para usted o que pueda brindarle algún beneficio,
                  estos correos electrónicos serán enviados a la dirección que
                  usted proporcione y podrán ser cancelados en cualquier
                  momento.
                </p>
                <p>
                  el Politécnico Colombiano Jaime Isaza Cadavid está altamente
                  comprometido para cumplir con el compromiso de mantener su
                  información segura. Usamos los sistemas más avanzados y los
                  actualizamos constantemente para asegurarnos que no exista
                  ningún acceso no autorizado.
                </p>
                <p>
                  <strong>Cookies</strong>
                </p>
                <p>
                  Una cookie se refiere a un fichero que es enviado con la
                  finalidad de solicitar permiso para almacenarse en su
                  ordenador, al aceptar dicho fichero se crea y la cookie sirve
                  entonces para tener información respecto al tráfico web, y
                  también facilita las futuras visitas a una web recurrente.
                  Otra función que tienen las cookies es que con ellas las web
                  pueden reconocerte individualmente y por tanto brindarte el
                  mejor servicio personalizado de su web.
                </p>
                <p>
                  Nuestro sitio web emplea las cookies para poder identificar
                  las páginas que son visitadas y su frecuencia. Esta
                  información es empleada únicamente para análisis estadístico y
                  después la información se elimina de forma permanente. Usted
                  puede eliminar las cookies en cualquier momento desde su
                  ordenador. Sin embargo las cookies ayudan a proporcionar un
                  mejor servicio de los sitios web, estás no dan acceso a
                  información de su ordenador ni de usted, a menos de que usted
                  así lo quiera y la proporcione directamente,{" "}
                  <a
                    href="https://recargalebara.es"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    visitas a una web{" "}
                  </a>
                  . Usted puede aceptar o negar el uso de cookies, sin embargo
                  la mayoría de navegadores aceptan cookies automáticamente pues
                  sirve para tener un mejor servicio web. También usted puede
                  cambiar la configuración de su ordenador para declinar las
                  cookies. Si se declinan es posible que no pueda utilizar
                  algunos de nuestros servicios.
                </p>
                <p>
                  <strong>Enlaces a Terceros</strong>
                </p>
                <p>
                  Este sitio web pudiera contener en laces a otros sitios que
                  pudieran ser de su interés. Una vez que usted de clic en estos
                  enlaces y abandone nuestra página, ya no tenemos control sobre
                  al sitio al que es redirigido y por lo tanto no somos
                  responsables de los términos o privacidad ni de la protección
                  de sus datos en esos otros sitios terceros. Dichos sitios
                  están sujetos a sus propias políticas de privacidad por lo
                  cual es recomendable que los consulte para confirmar que usted
                  está de acuerdo con estas.
                </p>
                <p>
                  <strong>Control de su información personal</strong>
                </p>
                <p>
                  En cualquier momento usted puede restringir la recopilación o
                  el uso de la información personal que es proporcionada a
                  nuestro sitio web.&nbsp; Cada vez que se le solicite rellenar
                  un formulario, como el de alta de usuario, puede marcar o
                  desmarcar la opción de recibir información por correo
                  electrónico. &nbsp;En caso de que haya marcado la opción de
                  recibir nuestro boletín o publicidad usted puede cancelarla en
                  cualquier momento.
                </p>
                <p>
                  Esta compañía no venderá, cederá ni distribuirá la información
                  personal que es recopilada sin su consentimiento, salvo que
                  sea requerido por un juez con un orden judicial.
                </p>
                <p>
                  el Politécnico Colombiano Jaime Isaza Cadavid Se reserva el
                  derecho de cambiar los términos de la presente Política de
                  Privacidad en cualquier momento.
                </p>
                <p>
                  Esta politica de privacidad se han generado en{" "}
                  <a
                    href="https://politicadeprivacidadplantilla.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    politicadeprivacidadplantilla.com
                  </a>
                  . <br />
                </p>
              </div>
              <div className="container-accpet">
                
                <button type="submit" className="button-accpet">Acepto Términos y Condiciones</button>
              </div>
            </form>
            <button className="button-close" onClick={this.handleToggleModal}>x</button>
          </aside>
        )}
        <Header
          handleOpenModal={this.handleToggleModal}
          handleSubmit={this.handleSubmit}
        />
        <Footer />
      </div>
    );
  }
}

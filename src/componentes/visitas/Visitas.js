import React, {Component} from 'react';
import { URL_BASE } from "../../constants";
import Mensaje from "../Mensaje";
import Tabla from './Tabla';
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import io from "socket.io-client";
import Fecha from './Fecha';
import "../../css/Progress.css";
import CircularProgress from '@material-ui/core/CircularProgress';


class Visitas extends Component{
    constructor(){
        super();
        this.state = {
            visitas:false,
            status:"Ok",
            url:window.location.pathname,
            fecha:"",
            socket:"",
            visita:"",
            today:""
        }
        console.log(this.state.url)
        
    }
     
    static propTypes ={
        match: PropTypes.object.isRequired,
        location:PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };
    

    handlerInputDate = (fecha) => {
        this.setState({fecha:fecha})
        this.getVisitsByDate(fecha)
    }


    getVisitsByDate=(fecha)=>{
        const route = this.props.location.pathname;
        this.state.socket.emit('getVisitsByDate',{fecha:fecha,ruta:route})
    }

    //Evento para obtener todas las visitas de una zona o todas
    getVisits = (socket)=>{
         const route = this.props.location.pathname;
        socket.emit('getVisits',{
            ruta:route
        });
    }

    //Evento que recive todas las visitas de una zona o todas
    newVisits = (socket)=>{
        socket.on('NewVisits',(visits)=>{
            console.log("Nueva vista: ",visits.obj);
            if(!visits.obj){
                this.setState({visitas:[]})
            }else{
                this.setState({visitas:visits.obj})
            }
            
        });
    }
      
    
    //Evento que para obtener una nueva visita
    getNewVisit = (socket)=>{
        socket.on('getNewVisit',(newVisit)=>{
            console.log("nueva visita",newVisit);

            
            const nombreZona = newVisit[0].nombre_zona;
            const pathName = this.props.location.pathname;

            //si la fecha esta vacia es porque no ha seleccionado ninguna aun
            if(this.state.fecha === ""){
                // si ha filtrado por zona
                if(pathName.includes(nombreZona)){

                    const newMapVisit = []
                    newVisit.forEach(({
                        
                        id_visita,
                        id_usuario,
                        nombre_usuario,
                        apellido_usuario,
                        tipo_usuario,
                        nombre_zona,
                        hora,
                        fecha_visita})=>{
                            if(nombre_zona === nombreZona){
                                newMapVisit.push({
                                    id_visita:id_visita,
                                    id_usuario:id_usuario,
                                    nombre_usuario: nombre_usuario,
                                    apellido_usuario:apellido_usuario,
                                    tipo_usuario:tipo_usuario,
                                    nombre_zona:nombre_zona,
                                    hora:hora,
                                    fecha_visita:fecha_visita
                                })
                            }
                        })
                    
                    // una vez termina el map se acatualiza el state
                    this.setState({
                        visitas: newMapVisit
                    })

                    // si no ha filtrado por zona se muestran todas
                }else if(pathName.includes("Todas")){
                    this.setState({
                        visitas: newVisit
                    })
                }
                
                ////////si la fecha de filtrado es de hoy
            }else if(this.state.fecha === newVisit[0].fecha_visita){
                // si ha filtrado por zona

                if(pathName.includes(nombreZona)){
                    const newMapVisit = []
                    newVisit.forEach(({
                        
                        id_visita,
                        id_usuario,
                        nombre_usuario,
                        apellido_usuario,
                        tipo_usuario,
                        nombre_zona,
                        hora,
                        fecha_visita})=>{
                            if(nombre_zona === nombreZona){
                                newMapVisit.push({
                                    id_visita:id_visita,
                                    id_usuario:id_usuario,
                                    nombre_usuario:nombre_usuario,
                                    apellido_usuario:apellido_usuario,
                                    tipo_usuario:tipo_usuario,
                                    nombre_zona:nombre_zona,
                                    hora:hora,
                                    fecha_visita:fecha_visita
                                })
                            }
                        })
                    
                    // una vez termina el map se acatualiza el state
                    this.setState({
                        visitas: newMapVisit
                    })

                    // si no ha filtrado por zona se muestran todas
                }else if(pathName.includes("Todas")){
                    this.setState({
                        visitas: newVisit
                    })
                }

            //la fecha es diferente, NOFUNCIONAAAAAAAA!!
            }else{
                console.log("No se actualiza si la fecha es diferente a la de hoy");
                
            } 
            
        })
    }

    dateMethod = ()=>{
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1; // el mes se maneja como vector entonces se le suma 1
        const year = date.getFullYear();
    
        // Logica para organizar la fecha
        if(month <10 && day <10){
          this.setState({today:`${year}-0${month}-0${day}`})
        }else if(month <10){
          this.setState({today:`${year}-0${month}-${day}`})
        }else if(day <10){
          this.setState({today:`${year}-${month}-0${day}`})
        }else{
          this.setState({today:`${year}-${month}-${day}`})
        }
    
      }

    componentDidMount() {
        const socket = io(`${URL_BASE}`);
        this.dateMethod();
        console.log('Conectado al servidor');
        this.setState({socket:socket})
        
        this.getVisits(socket);
       
        this.newVisits(socket);

        

        socket.on('disconnect', ()=>{
            console.log("Perdimos conexioncon el servidor")
        })

        
         console.log('ComponentDidMount')

    }

    componentDidUpdate(prevProps,prevState){
        const {location} = this.props;
        console.log("location ",location.pathname)
        console.log("ComponentDidUpdate")
        if(this.props.location.pathname!== prevProps.location.pathname){
            console.log("La ruta cambió")
            this.getVisits(this.state.socket);
            this.newVisits(this.state.socket);
        }
        if(this.state.fecha!== prevState.fecha){
            console.log("La Fecha cambió")
            this.newVisits(this.state.socket);
        }
        
        this.getNewVisit(this.state.socket);

    }

    
    // cuando se desmonta el componente se cierra el socket para evitar llenar de conexiones nuevas al momento 
    //de navegar en el menú y voler de nuevo a la seccion de visitas
    componentWillUnmount(){
        this.state.socket.close();
        console.log("Desmontaje del componente y cierre del socket")
    }

    
    
    render(){
         
        const {visitas} = this.state;

        if(!visitas){
            return (
              
                <div class="spinner">
                <CircularProgress className="prog" size={100} color={"rgb(212, 174, 1)"}/>
                </div>
                
            )
          }else

        if(visitas.length === 0){
            return(
                <div>
                    <Fecha handlerInputDate={this.handlerInputDate} />
                    <Mensaje 
                        mensaje="No hay Visitas registradas en la zona para la fecha."
                        property ="visitas"
                    />

                </div>
                
            );
        }else
            {
            return(
                <div>

                    <Fecha handlerInputDate={this.handlerInputDate} />
                    <Tabla visitas={visitas}/> 
                    
                    
                </div>
            );
        }
        
    }

}
export default withRouter(Visitas);
import React,{Component} from 'react';

export default class TipoUsuario extends Component{
    state={
        vecTipoUsuario:[]
    }

    
    handlerSelect=(e, tp)=>{
        //llamamos al metodo de formulario
        const {handlerInputText}=this.props;
        handlerInputText(e,tp);
    }

    render(){
        //this.getTipoUsuario();
        const {vecTipoUsuario}=this.props;
        
        
        return(
        <div>               
            <select required name = "tipopersona"
                            className = "select_tipopersona"
                            onChange = { e => this.handlerSelect(e, "tipoPersona") }
                             >
                            <option value = "vacio" >Seleccione una opcion</option>
                            {vecTipoUsuario.map(({id_tipo_usuario,tipo_usuario})=>(
                                
                                <option value = {id_tipo_usuario} key ={id_tipo_usuario} >{tipo_usuario}</option>
                            ))
                            }
            </select>
        </div>
        )
    }
}
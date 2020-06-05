import React,{Component} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


export default class SolicitudZonas extends Component{
    
 state={
    listChecked:[],
}

    //Controlamos cada vez que el checkbox es alterado en un arreglo de forma que queden solo los seleccionados
    handleChangeCheckbox =(event,id_zona)=>{
        //Destructuri para el metodo que esta en Formulario y poder ejecutarlo mas adelante enviandole parametros
        const {updateMotivoVisita} = this.props;

        console.log("event ", event.target.value, " Checked", event.target.checked);
        console.log("Id zona: ",id_zona);

        let listChecked = this.state.listChecked;

        //Si el array ya contiene el valor del checkbox entonces procedemos a extraerlo del array
        if(listChecked.includes(id_zona)){
            listChecked.splice(listChecked.indexOf(id_zona),1)
        }else{
            listChecked.push(id_zona);
        }

        //Actualizamos el estado del array y el texto que sera mandado al backend principal
        
        const zone= listChecked;
        this.setState({
            listChecked:listChecked,
        },()=>{
            console.log("ListCheked ",this.state.listChecked);
            //enviamos el valor para acualizar el checkbox que sera el motivovisita
            updateMotivoVisita(zone);
        });

    }
  
    
  
render(){
    const{zonas}= this.props;
    
    return(
        <div>
        <FormControl component="fieldset" >
      <FormGroup aria-label="position" row>
        {zonas.map(({id_zona,nombre_zona})=>{
            return(
                
                <FormControlLabel
                key={id_zona}
                control={
                <Checkbox 
                    color="primary"
                    onChange={(e)=> this.handleChangeCheckbox(e,id_zona)}
                    value={nombre_zona}
                    
                />}
                label={nombre_zona}
                
                />
            )

        })    
        }
      </FormGroup>
    </FormControl>
    
    </div>
    )}
}
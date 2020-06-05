import 'date-fns';
import React,{Component} from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default class Fecha extends Component{
  
  constructor (){
    super();
    this.state = {
      fecha:new Date(),
      setValDate:null
    }

    
  }

  
  dateMethod = async (date)=>{
    const day = date.getDate();
    const month = date.getMonth() + 1; // el mes se maneja como vector entonces se le suma 1
    const year = date.getFullYear();

    // se maneja fecha para el envo al servidor y serValDate para la vista ya que el formato es diferente
    // Logica para organizar la fecha
    if(month <10 && day <10){
      this.setState({fecha:`${year}-0${month}-0${day}`,
      setValDate:`${year}/${month}/${day}`})
    }else if(month <10){
      this.setState({fecha:`${year}-0${month}-${day}`,
      setValDate:`${year}/${month}/${day}`})
    }else if(day <10){
      this.setState({fecha:`${year}-${month}-0${day}`,
      setValDate:`${year}/${month}/${day}`})
    }else{
      this.setState({fecha:`${year}-${month}-${day}`,
    setValDate:`${year}/${month}/${day}`})
    }

  }

  handleDateChange = async (date,key) => {
    const {handlerInputDate} =  this.props;
    console.log("date ",date)
    await this.dateMethod(date);
    console.log("state ",this.state.fecha)
    
    //Enviamos la fecha al componente visita
    handlerInputDate(this.state.fecha);
  };

render(){
    const{setValDate}= this.state;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          autoOk
          variant="inline"
          format="yyyy/MM/dd"
          margin="normal"
          inputVariant="outlined"
          id="date-picker-inline"
          label="Filtrar por fecha"
          value={setValDate}
          name="fecha"
          InputAdornmentProps={{ position: "start" }}
          onChange={(e) => this.handleDateChange(e,"fecha")}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
}
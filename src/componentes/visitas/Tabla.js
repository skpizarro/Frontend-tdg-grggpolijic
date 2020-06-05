import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import './../../css/Tabla.css';

const columns = [
  { id: 'id_visita', label:
   'Id Visita',
    minWidth: 50,
    format: value => value.toLocaleString()
    },

  { id: 'id_usuario',
    label: 'Id Usuario',
    minWidth: 100,
    format: value => value.toLocaleString()
    },

  {
    id: 'nombre_usuario',
    label: 'Usuario',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString(),
  },
  {
    id: 'tipo_usuario',
    label: 'Tipo',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString(),
  },
  {
    id: 'nombre_zona',
    label: 'Zona',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString(),
  },
  {
    id: 'hora',
    label: 'Hora',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString(),
  },
  {
    id: 'fecha_visita',
    label: 'Fecha',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString(),
  },
];


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
})

function mapeoVisitas(visitas){
  
  console.log("Tabla:",visitas);
  
  const visit = visitas.map(({
    id_visita,
    id_usuario,
    nombre_usuario,
    apellido_usuario,
    tipo_usuario,
    nombre_zona,
    hora,
    fecha_visita
   
  })=>{
    return{
      id_visita:id_visita,
      id_usuario:id_usuario.toString(),
      nombre_usuario:`${nombre_usuario} ${apellido_usuario}`,
      apellido_usuario:apellido_usuario,
      tipo_usuario:tipo_usuario,
      nombre_zona:nombre_zona,
      hora:hora,
      fecha_visita:fecha_visita
  }
  })
  return visit;
}


const Tabla = ({visitas}) =>{
  
  const rows = mapeoVisitas(visitas);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let counter=0;
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={counter++}>
                  {columns.map(column => {
                    
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}


export default Tabla;

import React, { useEffect, useState } from "react";
import {
    Box, TextField, Margin, Container, Typography, Checkbox, Select,
    ListItemText, FormControl, MenuItem, InputLabel, OutlinedInput, Card, Button
}
    from '@mui/material';
import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const listaTurnos = [
    'Manhã',
    'Tarde',
    'Noite',
];
const TelaFormulario = () => {
    const [valueParaOSelect, setValueParaOSelecet] = useState([]);
    const [localizacaoDaEscola, setLocalizacaoDaEscola] = useState([]);
    const [SelecionadoTurnosNoSelect,setSelecionadoTurnosNoSelect] = useState([])
    const [ListaDeObjetosDosInputs, setListaDeObjetosDosInputs] = useState({
        nomeDaEscola: '',
        nomeDoDiretor: '',
        localizacaoDaEscola: '',
        turnos: '',
    })
    const[listaDaTabela,setlistaDaTabela]= useState([
        
    ])
    const selectTurnos = (event) => {
        const {target: { value }} = event;
        setValueParaOSelecet(typeof value === 'string' ? value.split(',') : value,);
        setListaDeObjetosDosInputs(value)
    };
    const [showTable, setShowTable] = useState(false);

    const handleButtonClick = () => {
      setShowTable(true);
    };
    const selectLocalizacaoDaEscola = (event) => {
        setLocalizacaoDaEscola(event.target.value);
    };
    const exibirOsTurnosNaTabela =  (event) => {
        const {
            target: { value },
        } = event;
        setValueParaOSelecet( typeof value === 'string' ? value.join(',') : value,  
        )
        setListaDeObjetosDosInputs(value)
    }
    const respostasDosTextFieldNomeEscolaEDiretor = (event) =>{
        const{name,value} = event.target
        setListaDeObjetosDosInputs({...ListaDeObjetosDosInputs,[name]:value})
    }
    
    function handleCreate(e) {
      if(({...ListaDeObjetosDosInputs})){
        console.log(ListaDeObjetosDosInputs)
      }
    }
    return (

        <Card sx={{}}>
            <Container >
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 2, width: '30ch', } }}
                    noValidate
                    autoComplete="off"
                >
                    <Typography component="h3" variant="h2" > Formulário</Typography>
                    <Typography component='h3' variant='h8'>Preencha corretamente seus Dados</Typography>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" 
                     name="nomeDaEscola" value={ListaDeObjetosDosInputs.nomeDaEscola}  onChange={respostasDosTextFieldNomeEscolaEDiretor}
                     />
                    <TextField id="outlined-basic" label="Outlined" variant="outlined"  
                    name="nomeDoDiretor" value={ListaDeObjetosDosInputs.nomeDoDiretor} onChange={respostasDosTextFieldNomeEscolaEDiretor}
                    />

                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={valueParaOSelect}
                            onChange={selectTurnos}
                            input={<OutlinedInput label="Turnos" />}
                            renderValue={(selected) => selected.join(',')}
                            MenuProps={MenuProps}
                          
                        >
                            {listaTurnos.map((turnosMapeados) => (
                                <MenuItem key={turnosMapeados} value={turnosMapeados}>
                                    <Checkbox checked={valueParaOSelect.indexOf(turnosMapeados) > -1} />
                                    <ListItemText primary={turnosMapeados} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">localizacaoDaEscola</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={localizacaoDaEscola}
                            label="localizacaoDaEscola"
                            onChange={selectLocalizacaoDaEscola}
                        >
                            <MenuItem value={'urbana'}>Urbana</MenuItem>
                            <MenuItem value={'rural'}>Rural</MenuItem>                            
                        </Select>
                    </FormControl>

                    <Button variant="contained" onClick={handleCreate} >Contained</Button>
                
                        {showTable ? (
                    <Card>
                    <Container>
                   
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='left'>Nome da escola</TableCell>
                                    <TableCell align= 'left'>Nome do diretor</TableCell>
                                    <TableCell align= 'left'>Turnos</TableCell>
                                    <TableCell align="left">Localização da escola</TableCell>
                                </TableRow>                                  
                            </TableHead>
                            <TableBody>
                             <TableRow>
                                    <TableCell>{ListaDeObjetosDosInputs.nomeDaEscola}</TableCell>
                                    <TableCell>{ListaDeObjetosDosInputs.nomeDoDiretor}</TableCell>
                                    {SelecionadoTurnosNoSelect.map((selecionadoTUrnos) =>(
                                         <TableRow key={selecionadoTUrnos}>
                                         <TableCell>{selecionadoTUrnos}</TableCell>
                                         </TableRow>   
                                         ))}
                                </TableRow>
                                         <TableCell>{localizacaoDaEscola}</TableCell>
                            </TableBody>
                        </Table>  
                        </Container>
                       </Card>

):null}
                </Box>
            </Container>
        </Card >
    )
}

export default TelaFormulario
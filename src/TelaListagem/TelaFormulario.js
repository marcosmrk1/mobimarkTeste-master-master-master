import React, { useEffect, useState } from "react";
import {
    Box, TextField, Margin, Container, Typography, Checkbox, Select,
    ListItemText, FormControl, MenuItem, InputLabel, OutlinedInput, Card
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
    
    const [localizacaoDaEscola, setLocalizacaoDaEscola] = useState('');
    const [selectTunos,setselectTunos] = useState([])
    const [ListaDeObjetosDosInputs, setListaDeObjetosDosInputs] = useState({
        nomeDaEscola: '',
        nomeDoDiretor: '',
        localizacaoDaEscola: '',
        turnos: '',
    })
    const [SelecionadoTurnosNoSelect,setSelecionadoTurnosNoSelect] = useState([])
    const selectTurnos = (event) => {
        const {
            target: { value },
        } = event;
        setValueParaOSelecet(
            typeof value === 'string' ? value.split(',') : value,
        );
        setSelecionadoTurnosNoSelect(value)
    };

    const selectLocalizacaoDaEscola = (event) => {
        setLocalizacaoDaEscola(event.target.value);
    };
    const respostasDosTextFieldNomeEscolaEDiretor = (event) =>{
        const{name,value} = event.target
        setListaDeObjetosDosInputs({...ListaDeObjetosDosInputs,[name]:value})
    }
    const GetDoSelectTurnos =  (event) => {
        const {
            target: { value },
        } = event;
        setValueParaOSelecet( typeof value === 'string' ? value.join(',') : value,  
        )
        setSelecionadoTurnosNoSelect(value)
    }

    // Fim da const de criação do select de Turnos e localização das escolas
    
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
                     name="nomeDaEscola" value={ListaDeObjetosDosInputs.nomeDaEscola} onChange={respostasDosTextFieldNomeEscolaEDiretor}
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
                            <MenuItem value={1}>Urbana</MenuItem>
                            <MenuItem value={2}>Rural</MenuItem>                            
                        </Select>
                    </FormControl>
                    <Card>
                    <Container>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='left'>Nome da escola</TableCell>
                                    <TableCell align= 'left'>Nome do diretor</TableCell>
                                    <TableCell align= 'left'>Turnos</TableCell>
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
                            </TableBody>
                        </Table>  
                        </Container>
                       </Card>

                </Box>
            </Container>
        </Card >
    )
}

export default TelaFormulario
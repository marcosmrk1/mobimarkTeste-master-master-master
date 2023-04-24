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
    const [ListaDeObjetosDosInputs, setListaDeObjetosDosInputs] = useState({
        nomeDaEscola: '',
        nomeDoDiretor: '',
        localizacaoDaEscola: '',
        turnos: [],
    })
    const [listaDaTabela, setlistaDaTabela] = useState([])
    const concatListaDaTabela = (event) => {
        event.preventDefault();
        setlistaDaTabela((listaAntiga) => listaAntiga.concat({...ListaDeObjetosDosInputs}));
        setListaDeObjetosDosInputs({
            nomeDaEscola: '',
            nomeDoDiretor: '',
            localizacaoDaEscola:'',
            turnos: [],
        });
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setListaDeObjetosDosInputs((objetosAntigos) => ({
            ...objetosAntigos,
            [name]: value,
        }))
    }
    const selectTurnos = (event) => {
        const { value } = event.target;
        // setValueParaOSelecet(typeof value === 'string' ? value.split(',') : value,);
        setListaDeObjetosDosInputs((prev)=>({ 
            ...prev,
            turnos: value

        }))
    };
    const seleectLocalizacaoDaEscola = (event) => {
        setListaDeObjetosDosInputs({
          ...ListaDeObjetosDosInputs,
          localizacaoDaEscola: event.target.value,
        });
      };
    return (

        <Container >
                <Card sx={{}}>
                <Box
                    onSubmit={concatListaDaTabela}
                    component="form"
                    sx={{ '& > :not(style)': { m: 2, width: '30ch', } }}
                    noValidate
                    autoComplete="off"
                >
                    <Typography component="h3" variant="h2" > Formulário</Typography>
                    <Typography component='h3' variant='h8'>Preencha corretamente seus Dados</Typography>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined"
                        name="nomeDaEscola" value={ListaDeObjetosDosInputs.nomeDaEscola} onChange={handleChange}
                    />
                    <TextField id="outlined-basic" label="Outlined" variant="outlined"
                        name="nomeDoDiretor" value={ListaDeObjetosDosInputs.nomeDoDiretor} onChange={handleChange}
                    />

                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={ListaDeObjetosDosInputs.turnos}
                            onChange={selectTurnos}
                            input={<OutlinedInput label="Turnos" />}
                            renderValue={(selected) => selected.join(',')}
                            MenuProps={MenuProps}

                        >
                            {listaTurnos.map((turnosMapeados) => (
                                <MenuItem key={turnosMapeados} value={turnosMapeados}>
                                    <Checkbox checked={ListaDeObjetosDosInputs.turnos.indexOf(turnosMapeados) > -1} />
                                    <ListItemText primary={turnosMapeados} />
                                </MenuItem>

                            ))}
                      
                        </Select>1
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">localizacaoDaEscola</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={ListaDeObjetosDosInputs.localizacaoDaEscola}
                            label="localizacaoDaEscola"
                            onChange={seleectLocalizacaoDaEscola}
                        >
                            <MenuItem value={'urbana'}>Urbana</MenuItem>
                            <MenuItem value={'rural'}>Rural</MenuItem>
                        </Select>
                    </FormControl>

                    <Button type="submit" >Contained</Button>

                  
                        <Container>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='left'>Nome da escola</TableCell>
                                        <TableCell align='left'>Nome do diretor</TableCell>
                                        <TableCell align='left'>Turnos</TableCell>
                                        <TableCell align="left">Localização da escola</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {listaDaTabela.map((index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index.nomeDaEscola}</TableCell>
                                            <TableCell>{index.nomeDoDiretor}</TableCell>

                                            <TableCell >
                                            {index.turnos.join(",")}
                                                </TableCell>
                                                <TableCell>{index.localizacaoDaEscola}</TableCell>
                                                {console.log(index.localizacaoDaEscola)}
                                        </TableRow>
                                    ))}

                                </TableBody>
                            </Table>
               
                        </Container>

                </Box>
        </Card >
            </Container>
    )
}

export default TelaFormulario

import React, { useEffect, useState } from "react";
import {
    Box, TextField, Margin, Container, Typography, Checkbox, Select,
    ListItemText, FormControl, MenuItem, InputLabel, OutlinedInput, Card
}
    from '@mui/material';


// CONST para a criação do select de Turnos e Localização da escola
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

// const names = [
//     'Oliver Hansen',
//     'Van Henry',
//     'April Tucker',
//     'Ralph Hubbard',
//     'Omar Alexander',
//     'Carlos Abbott',
//     'Miriam Wagner',
//     'Bradley Wilkerson',
//     'Virginia Andrews',
//     'Kelly Snyder',
// ];

const TelaFormulario = () => {
    const [turnosUseState, setturnosUseState] = React.useState([]);
    const [localizacaoDaEscola, setLocalizacaoDaEscola] = React.useState('');

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setturnosUseState(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const mudancaEvento = (event) => {
        setLocalizacaoDaEscola(event.target.value);
    };


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
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />

                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={turnosUseState}
                            onChange={handleChange}
                            input={<OutlinedInput label="Turnos" />}
                            renderValue={(selected) => selected.join(',')}
                            MenuProps={MenuProps}
                        >
                            {listaTurnos.map((turnosMapeados) => (
                                <MenuItem key={turnosMapeados} value={turnosMapeados}>
                                    <Checkbox checked={turnosUseState.indexOf(turnosMapeados) > -1} />
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
                            onChange={mudancaEvento}
                        >
                            <MenuItem value={1}>Urbana</MenuItem>
                            <MenuItem value={2}>Rural</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Container>
        </Card >
    )
}

export default TelaFormulario

// usar objeto no lugar dos sets
// usar cada if para cada condição
import React, { useEffect, useState } from "react";
import {
    Box, TextField, Margin, Container, Typography, Checkbox, Select,
    ListItemText, FormControl, MenuItem, InputLabel,
    OutlinedInput, Card, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery,
    CircularProgress
}
    from '@mui/material';
import { CardActions, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useTheme } from "styled-components";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 100,
        },
    },
}

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
    const [textErrorNomeDaEscola, setTextErrorNomeDaEscola] = useState(false)
    const [textErrorParaLocalizacaoDaEscola, setTextErrorParaLocalizacaoDaEscola] = useState(false)
    const [textErrorSelecioneUmTurno, setTextErrorSelecioneUmTunro] = useState(false)
    const [loading, setloading] = useState(false)

    const concatListaDaTabela = (event) => {
        event.preventDefault()
        setloading(true)
        setTimeout(() => {
            if (validacao()) {
                let espratiDaListaDaTabela = [...listaDaTabela]
                let ExibirInformaçõesDosInputs = espratiDaListaDaTabela.concat({ ...ListaDeObjetosDosInputs })
                setlistaDaTabela(ExibirInformaçõesDosInputs)
                let listaSalva = localStorage.getItem('listaDaTabelaLocalstorage')
                if (listaSalva) {
                    listaSalva = JSON.parse(listaSalva);
                    ExibirInformaçõesDosInputs = [...ExibirInformaçõesDosInputs,];
                }
                localStorage.setItem('listaDaTabelaLocalstorage', JSON.stringify(ExibirInformaçõesDosInputs));
                setListaDeObjetosDosInputs({
                    nomeDaEscola: '',
                    nomeDoDiretor: '',
                    localizacaoDaEscola: '',
                    turnos: [],
                });
            }
            setloading(false)
        }, 1000);
        return;
    }

    useEffect(() => {
        const listaSalva = localStorage.getItem('listaDaTabelaLocalstorage');
        if (listaSalva) {
            setlistaDaTabela(JSON.parse(listaSalva));
        }
    },);

    const localStorageExibir = () => {
        let RecebendoInformacaoDoArmazenamentoDoLocalStorage = localStorage.getItem('listaDaTabelaLocalstorage')
        if (RecebendoInformacaoDoArmazenamentoDoLocalStorage === null) {
        }
        return JSON.parse(RecebendoInformacaoDoArmazenamentoDoLocalStorage)
    }

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
        setListaDeObjetosDosInputs((prev) => ({
            ...prev,
            turnos: value

        }))
    };
    const seleectLocalizacaoDaEscola = (event) => {
        setListaDeObjetosDosInputs({
            ...ListaDeObjetosDosInputs,
            localizacaoDaEscola: event.target.value,
        });
    }
    const validacao = () => {
        if (ListaDeObjetosDosInputs.nomeDaEscola.length <= 4) {
            setTextErrorNomeDaEscola(true)

        }
        if (ListaDeObjetosDosInputs.localizacaoDaEscola.length === 0) {
            setTextErrorParaLocalizacaoDaEscola(true)
           
        }
        if (ListaDeObjetosDosInputs.turnos.length === 0) {
            setTextErrorSelecioneUmTunro(true)
            return false
        }
        return true

    }
    const excluirItemDaTabela = (index) => {
        let novaListaDaTabela = [...listaDaTabela];
        novaListaDaTabela.splice(index, 1);
        setlistaDaTabela(novaListaDaTabela);
        localStorage.setItem('listaDaTabelaLocalstorage', JSON.stringify(novaListaDaTabela));
    };
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        setOpen(false);
        excluirItemDaTabela()
    };
    return (
        <>
            <Card>
                <Typography variant="p" style={{
                    fontFamily: "Roboto, Helvetica,Arial,sans-serif", fontSize: "20px",
                    fontWeight: "bold", color: "#325d87" , marginLeft:'12px'
                }}> Formulario </Typography>
            </Card>
            <Container >

                <Card sx={{ marginTop: '12px' }}>
                    <Box
                        onSubmit={concatListaDaTabela}
                        component="form"
                        sx={{ '& > :not(style)': { m: 2 } }}
                        noValidate
                        autoComplete="off"
                    >
                        <Typography variant="h8" component='h3' style={{
                            fontFamily: "Roboto, Helvetica,Arial,sans-serif", fontSize: "20px",
                            fontWeight: "bold", color: "#325d87"
                        }}> Preencha Seus Dados  </Typography>
                        <TextField size="small" id="outlined-basic" label="Nome da escola" variant="outlined"
                            name="nomeDaEscola" value={ListaDeObjetosDosInputs.nomeDaEscola} onChange={handleChange}
                        />

                        {textErrorNomeDaEscola && ListaDeObjetosDosInputs['nomeDaEscola'] === '' ? <Typography  >Preencha o campo: Nome Da Escola</Typography>
                            : textErrorNomeDaEscola && ListaDeObjetosDosInputs['nomeDaEscola'].length < 4
                                ? <Typography>O campo: Nome Da Escola deve ter pelo menos 4 caracteres</Typography>
                                : ""}

                        <TextField size="small" id="outlined-basic" label="Nome do diretor" variant="outlined"
                            name="nomeDoDiretor" value={ListaDeObjetosDosInputs.nomeDoDiretor} onChange={handleChange}
                        />

                        <FormControl sx={{ m: 1, width: 188 }}>
                            <InputLabel id="demo-multiple-checkbox-label">Turnos</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                size="small"
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

                            </Select>
                            {textErrorSelecioneUmTurno ? <Typography> selecione um turno</Typography> : ''}
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 188 }}>
                            <InputLabel id="demo-simple-select-label">localizacao</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                size="small"
                                id="demo-simple-select"
                                value={ListaDeObjetosDosInputs.localizacaoDaEscola}
                                label="localizacaoDaEscola"
                                onChange={seleectLocalizacaoDaEscola}
                            >
                                <MenuItem value={'urbana'}>Urbana</MenuItem>
                                <MenuItem value={'rural'}>Rural</MenuItem>
                            </Select>
                            {textErrorParaLocalizacaoDaEscola ? <Typography> selecione a localizacaoDaEscola</Typography> : ""}
                        </FormControl>
                        <Button type="submit" variant="contained" >Cadastrar</Button>
                    </Box>
                </Card>
                {loading ? <Box><CircularProgress sx={{ marginLeft: '46%', marginTop: '14%' }} /></Box> :
                    (localStorageExibir() || []).length > 0 && (
                        <>
                            <Box sx={{ marginTop: '60px' }}>
                                <Card>
                                    <CardActions>
                                        <Typography variant="p" style={{
                                            fontFamily: "Roboto, Helvetica,Arial,sans-serif", fontSize: "20px",
                                            fontWeight: "bold", color: "#325d87"
                                        }}> Tabelas De Escolas Cadastradas </Typography>
                                    </CardActions>

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
                                            {localStorageExibir().map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{item.nomeDaEscola}</TableCell>
                                                    <TableCell>{item.nomeDoDiretor.length > 0 ? item.nomeDoDiretor : <Typography>Não informado </Typography>}</TableCell>
                                                    <TableCell>
                                                        {item.turnos.join(",")}
                                                    </TableCell>
                                                    <TableCell>{item.localizacaoDaEscola}</TableCell>
                                     
                            <Button onClick={handleClickOpen}>
                                <DeleteForeverIcon />
                            </Button>
                            <Dialog open={open} onClose={handleCancel}>
                                <DialogTitle>Confirmar ação</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Deseja confirmar a ação?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCancel} color="primary">
                                        Cancelar
                                    </Button>
                                    <Button onClick={() => handleConfirm(item)} color="primary" autoFocus>
                                        Confirmar
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Card>
                            </Box>
                        </>
                    )
                }
            </Container>
        </>
    )
}
export default TelaFormulario
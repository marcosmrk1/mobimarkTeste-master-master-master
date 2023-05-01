
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
import CheckIcon from '@mui/icons-material/Check';
import { red } from "@mui/material/colors";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import EditIcon from '@mui/icons-material/Edit';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
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
    const [objetosDosInputs, setobjetosDosInputs] = useState({
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
    const [itemDoMap, setItemDoMap] = useState({})
    const[ordemAlfabeticaAscendente,setOrdemAlfabeticaAscendente] = useState([])
    const [NomeDobuttonEditar , setNomeDoButtonEditar] = useState(null)
    const concatListaDaTabela = (event) => {
        event.preventDefault()
        setloading(true)
        setTimeout(() => {
            if (validacao()) {
                let ExibirInformaçõesDosInputs = [...listaDaTabela]
                if (!objetosDosInputs.id) {
                    ExibirInformaçõesDosInputs = ExibirInformaçõesDosInputs.concat({ ...objetosDosInputs, id: ExibirInformaçõesDosInputs.length + 1 })
                } else {
                    ExibirInformaçõesDosInputs = ExibirInformaçõesDosInputs.map(item => {
                        if (objetosDosInputs.id === item.id) {
                            return objetosDosInputs

                        } return item
                    })
                }
                setlistaDaTabela(ExibirInformaçõesDosInputs)
                let listaSalva = localStorage.getItem('listaDaTabelaLocalstorage')
                if (listaSalva) {
                    listaSalva = JSON.parse(listaSalva);
                    ExibirInformaçõesDosInputs = [...ExibirInformaçõesDosInputs,];
                }
                localStorage.setItem('listaDaTabelaLocalstorage', JSON.stringify(ExibirInformaçõesDosInputs));
                setobjetosDosInputs({
                    nomeDaEscola: '',
                    nomeDoDiretor: '',
                    localizacaoDaEscola: '',
                    turnos: [],
                });
            }
            setloading(false)
        }, 1000);
        setNomeDoButtonEditar(false)
        return;
    }
    useEffect(() => {
        const listaSalva = localStorage.getItem('listaDaTabelaLocalstorage');
        if (listaSalva) {
            setlistaDaTabela(JSON.parse(listaSalva));
        }
    }, []);
    const localStorageExibir = () => {
        let RecebendoInformacaoDocampoDoLocalStorage = localStorage.getItem('listaDaTabelaLocalstorage')
        if (RecebendoInformacaoDocampoDoLocalStorage === null) {
        }
        return JSON.parse(RecebendoInformacaoDocampoDoLocalStorage)
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setobjetosDosInputs((objetosAntigos) => ({
            ...objetosAntigos,
            [name]: value,
        }))
    }
    const selectTurnos = (event) => {
        const { value } = event.target;
        // setValueParaOSelecet(typeof value === 'string' ? value.split(',') : value,);
        setobjetosDosInputs((prev) => ({
            ...prev,
            turnos: value
        }))
    };
    const seleectLocalizacaoDaEscola = (event) => {
        setobjetosDosInputs({
            ...objetosDosInputs,
            localizacaoDaEscola: event.target.value,
        });
    }
    const validacao = () => {
        if (objetosDosInputs.nomeDaEscola.length <= 3) {
            setTextErrorNomeDaEscola(true)
            return false
        }
        if (objetosDosInputs.localizacaoDaEscola.length == 0) {
            setTextErrorParaLocalizacaoDaEscola(true)
            return false
        }
        if (objetosDosInputs.turnos.length == 0) {
            setTextErrorSelecioneUmTunro(true)
            return false
        }
        return true
    }
    const excluirItemDaTabela = () => {
        let listaAposExclusao = listaDaTabela.filter((item) => item.id != itemDoMap.id
        )
        setlistaDaTabela(listaAposExclusao)
        localStorage.setItem('listaDaTabelaLocalstorage', JSON.stringify(listaAposExclusao))
    }
    const editarItemDaTabela = (campo) => {
        setobjetosDosInputs(campo)
        if (NomeDobuttonEditar){
        setNomeDoButtonEditar(false)
    }setNomeDoButtonEditar(true)
    }

    const ordernarEmOrdemAlfabeticaNomeDaEscola  = () => {
        const ordenacaoNomeDaEscola = [...listaDaTabela].sort((a,b) => {
            if(ordemAlfabeticaAscendente){
                return a.nomeDaEscola.localeCompare(b.nomeDaEscola)                        
            }else {
                return b.nomeDaEscola.localeCompare(a.nomeDaEscola)
            }
        })
        setlistaDaTabela(ordenacaoNomeDaEscola)
        setOrdemAlfabeticaAscendente(!ordemAlfabeticaAscendente)
        localStorage.setItem('listaDaTabelaLocalstorage',JSON.stringify(ordenacaoNomeDaEscola))
    }
    const ordenarEmOrdermAlfabeticaNomeDoDiretor = () =>{
        const ordenacaoNomeDoDiretor = [...listaDaTabela].sort((a,b) => {
            if(ordemAlfabeticaAscendente){
                return a.nomeDoDiretor.localeCompare(b.nomeDoDiretor)
            }else{
                return b.nomeDoDiretor.localeCompare(a.nomeDoDiretor)
            }  
        })
        
        setlistaDaTabela(ordenacaoNomeDoDiretor)
        setOrdemAlfabeticaAscendente(!ordemAlfabeticaAscendente)
        localStorage.setItem('listaDaTabelaLocalstorage', JSON.stringify(ordenacaoNomeDoDiretor))
    }
    const arrowIcon = ordemAlfabeticaAscendente ? <ArrowDropUpIcon  /> : <ArrowDropDownIcon />;
    const [open, setOpen] = useState(false);
    const handleClickOpen = (item) => {
        setOpen(true);
        setItemDoMap(item)
    }
    const handleCancel = () => {
        setOpen(false);
    }
    const handleConfirm = () => {
        setOpen(false);
        excluirItemDaTabela()
    }
    return (
        <>
            <Card>
                <Typography variant="p" style={{
                    fontFamily: "Roboto, Helvetica,Arial,sans-serif", fontSize: "20px",
                    fontWeight: "bold", color: "#325d87", marginLeft: '12px'
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
                            name="nomeDaEscola" value={objetosDosInputs.nomeDaEscola} onChange={handleChange}
                        />

                        {textErrorNomeDaEscola && objetosDosInputs['nomeDaEscola'] === '' ?
                            <Typography sx={{ color: 'red' }}  >
                                <WarningAmberIcon sx={{ fontSize: 'medium', marginInline: '5px' }} />
                                Preencha o campo: Nome Da Escola</Typography>
                            : textErrorNomeDaEscola && objetosDosInputs['nomeDaEscola'].length < 4
                                ? <Typography sx={{ color: 'red' }} ><WarningAmberIcon sx={{ fontSize: 'medium', marginInline: '5px' }} />
                                    O campo: Nome Da Escola deve ter pelo menos 4 caracteres </Typography>
                                : ''}


                        <TextField size="small" id="outlined-basic" label="Nome do diretor" variant="outlined"
                            name="nomeDoDiretor" value={objetosDosInputs.nomeDoDiretor} onChange={handleChange}
                        />

                        <FormControl sx={{ m: 1, width: 188 }}>
                            <InputLabel id="demo-multiple-checkbox-label"> Turnos</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                size="small"
                                id="demo-multiple-checkbox"
                                multiple
                                value={objetosDosInputs.turnos}
                                onChange={selectTurnos}
                                input={<OutlinedInput label="Turnos" />}
                                renderValue={(selected) => selected.join(',')}
                                MenuProps={MenuProps}
                            >
                                {listaTurnos.map((turnosMapeados) => (
                                    <MenuItem key={turnosMapeados} value={turnosMapeados}>
                                        <Checkbox checked={objetosDosInputs.turnos.indexOf(turnosMapeados) > -1} />
                                        <ListItemText primary={turnosMapeados} />
                                    </MenuItem>
                                ))}

                            </Select>
                            {textErrorSelecioneUmTurno ? <Typography sx={{ color: 'red' }} ><WarningAmberIcon
                                sx={{ fontSize: 'medium', marginInline: '5px' }} />
                                selecione um turno</Typography> : ''}
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 188 }}>
                            <InputLabel id="demo-simple-select-label">localizacao</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                size="small"
                                id="demo-simple-select"
                                value={objetosDosInputs.localizacaoDaEscola}
                                label="localizacaoDaEscola"
                                onChange={seleectLocalizacaoDaEscola}
                            >
                                <MenuItem value={'urbana'}>Urbana</MenuItem>
                                <MenuItem value={'rural'}>Rural</MenuItem>
                            </Select>
                            {textErrorParaLocalizacaoDaEscola ? <Typography sx={{ color: 'red' }} >
                                <WarningAmberIcon sx={{ fontSize: 'medium', marginInline: '5px' }} />
                                selecione a localizacaoDaEscola</Typography> : ""}
                        </FormControl>
                        <Button type="submit" variant="contained"   
                        onClick={() => setNomeDoButtonEditar(!NomeDobuttonEditar)} >
                        {NomeDobuttonEditar ? 'editar' : 'cadastro' }
                     
                       </Button>
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
                                                <TableCell align='left'>Nome da escola
                                                <Button onClick={ordernarEmOrdemAlfabeticaNomeDaEscola}  endIcon = {arrowIcon}></Button>
                                                </TableCell>

                                                <TableCell align='left'>Nome do diretor
                                                <Button onClick={ordenarEmOrdermAlfabeticaNomeDoDiretor} endIcon={arrowIcon}></Button>
                                                </TableCell>
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
                                                    <Button onClick={() => handleClickOpen(item)}>
                                                        <DeleteForeverIcon />
                                                    </Button>
                                                    <Button onClick={() => editarItemDaTabela(item)}> <EditIcon /></Button>
                                                </TableRow>
                                            ))}
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
                                                    <Button onClick={handleConfirm} color="primary" autoFocus>
                                                        Confirmar
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
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
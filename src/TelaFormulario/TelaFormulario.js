
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { listaDaTabelaDoLocalStorageTelaForm } from '../localStorageGlobais/index'
import CardListagem from './CardListagem'
import {
    Box,
    Button,
    Card,
    Checkbox,
    CircularProgress,
    Container,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography
} from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import React, { useEffect, useState } from "react";
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
    const [loading, setloading] = useState(false)
    const [itemDoMap, setItemDoMap] = useState({})
    const [ordemAlfabeticaAscendente, setOrdemAlfabeticaAscendente] = useState([])
    const [NomeDobuttonEditar, setNomeDoButtonEditar] = useState(null)
    const [cadastroRealizadoComSucessoText, setCadastroRealizadoComSucessoText] = useState(false)
    const [itensQueVaoSerExcluidos, setItensQueVaoSerExcluidos] = useState([])
    const [buscarInformacoes, setBuscarInformacoes] = useState('')
    const [tabelaFiltradoComAPesquisa, setTabelaFiltradoComAPesquisa] = useState([])
    const [verificarPesquisa, setVerificarPesquisa] = useState(false)
    const [loadingPesquisa, setLoadingPesquisa] = useState(false)
    const errosCampos = {
        nomeDaEscola: { msg: 'Digite o nome da escola', error: false },
        localizacaoDaEscola: { msg: 'Informe a localização da escola', error: false },
        turnos: { msg: 'Informe o turno da escola ', error: false },
    }
    const [erros, setErros] = useState({ ...errosCampos })
    const concatListaDaTabela = (event) => {
        event.preventDefault()
        if (validacao()) {
            setBuscarInformacoes('')
            setVerificarPesquisa(false)
            setErros({ ...errosCampos })
            setloading(true)
            setTimeout(() => {

                setCadastroRealizadoComSucessoText(true)
                setTimeout(() => {
                    setCadastroRealizadoComSucessoText(false)
                }, 3000);
                let ExibirInformaçõesDosInputs = [...listaDaTabela]
                if (!objetosDosInputs.id) {
                    ExibirInformaçõesDosInputs = ExibirInformaçõesDosInputs.concat({ ...objetosDosInputs, id: Math.random() })
                } else {
                    ExibirInformaçõesDosInputs = ExibirInformaçõesDosInputs.map(item => {
                        if (objetosDosInputs.id === item.id) {
                            return objetosDosInputs

                        } return item
                    })
                }
                setlistaDaTabela(ExibirInformaçõesDosInputs)
                let listaSalva = localStorage.getItem(listaDaTabelaDoLocalStorageTelaForm)
                if (listaSalva) {
                    listaSalva = JSON.parse(listaSalva);
                    ExibirInformaçõesDosInputs = [...ExibirInformaçõesDosInputs,];
                }
                localStorage.setItem(listaDaTabelaDoLocalStorageTelaForm, JSON.stringify(ExibirInformaçõesDosInputs));
                setobjetosDosInputs({
                    nomeDaEscola: '',
                    nomeDoDiretor: '',
                    localizacaoDaEscola: '',
                    turnos: [],
                });
                setloading(false)
            }, 1000);
        }
        setNomeDoButtonEditar(false)
        return;
    }

    useEffect(() => {
        const listaSalva = localStorage.getItem(listaDaTabelaDoLocalStorageTelaForm);
        if (listaSalva) {
            setloading(true)
            setTimeout(() => {

                setlistaDaTabela(JSON.parse(listaSalva));
                setloading(false)
            }, 1000);
        }
    }, []);
    const localStorageExibir = () => {
        let RecebendoInformacaoDocampoDoLocalStorage = localStorage.getItem(listaDaTabelaDoLocalStorageTelaForm)
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
        setobjetosDosInputs((prev) => ({
            ...prev,
            turnos: value
        }))
    };
    const seleectLocalizacaoDaEscola = (event) => {
        setobjetosDosInputs({
            ...objetosDosInputs,
            localizacaoDaEscola: event.target.value,
        })
    }
    const validacao = () => {
        if (objetosDosInputs.nomeDaEscola.length === 0) {
            setErros({ ...erros, nomeDaEscola: { ...erros.nomeDaEscola, error: true, } })
            return false
        }
        if (objetosDosInputs.localizacaoDaEscola.length === 0) {
            setErros({ ...erros, localizacaoDaEscola: { ...erros.localizacaoDaEscola, error: true } })
            return false
        }
        if (objetosDosInputs.turnos.length === 0) {
            setErros({ ...erros, turnos: { ...erros.turnos, error: true, } })
            return false
        }
        return true
    }
    const excluirItemDaTabela = () => {
        let listaAposExclusao = listaDaTabela.filter((item) => item.id != itemDoMap.id)
        setItensQueVaoSerExcluidos(listaAposExclusao)
        setlistaDaTabela(listaAposExclusao)
        setTabelaFiltradoComAPesquisa(listaAposExclusao)
        localStorage.setItem(listaDaTabelaDoLocalStorageTelaForm, JSON.stringify(listaAposExclusao))
    }

    const editarItemDaTabela = (campo) => {
        setobjetosDosInputs(campo)
        if (NomeDobuttonEditar) {

            setNomeDoButtonEditar(false)
        } setNomeDoButtonEditar(true)
    }
    const CancelarEdicao = () => {
        setobjetosDosInputs({
            nomeDaEscola: '',
            nomeDoDiretor: '',
            localizacaoDaEscola: '',
            turnos: [],
        })
        setNomeDoButtonEditar(false)

    }
    const ordenarOrdemAlfabetica = (atributoOrdenacao) => {
        const ordenacaoNomeDaEscola = [...listaDaTabela].sort((a, b) => {
            if (ordemAlfabeticaAscendente) {
                return a[atributoOrdenacao].localeCompare(b[atributoOrdenacao])
            } else {
                return b[atributoOrdenacao].localeCompare(a[atributoOrdenacao])
            }
        })
        setlistaDaTabela(ordenacaoNomeDaEscola)
        setOrdemAlfabeticaAscendente(!ordemAlfabeticaAscendente)
    }
    const arrowIcon = ordemAlfabeticaAscendente ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
    const [open, setOpen] = useState(false);
    const handleClickOpen = (item) => {
        setOpen(true);
        setItemDoMap(item)
        setItensQueVaoSerExcluidos(item)
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
                }}> Formulário </Typography>
            </Card>
            <Container >

                <Card sx={{ marginTop: '12px', padding: '12px' }}>
                    <Box
                        onSubmit={concatListaDaTabela}
                        component="form"
                        sx={{ margin: 2 }}
                        noValidate
                        autoComplete="off"
                    >

                        <Typography variant="h8" component='h3' style={{
                            fontFamily: "Roboto, Helvetica,Arial,sans-serif", fontSize: "20px",
                            fontWeight: "bold", color: "#325d87", marginBottom: '26px'

                        }}> Preencha seus dados  </Typography>
                        <Grid container spacing={2} >
                            <Grid item lg={3} xs={12} md={3} sm={6}>
                                <TextField size="small" id="outlined-basic" label="Nome da escola" variant="outlined" fullWidth
                                    name="nomeDaEscola" value={objetosDosInputs.nomeDaEscola} onChange={handleChange}
                                />
                                {erros['nomeDaEscola'].error && <Typography sx={{ color: 'red' }}  >
                                    <WarningAmberIcon sx={{ fontSize: 'medium', marginInline: '5px' }} />
                                    {erros['nomeDaEscola'].msg}</Typography>}
                            </Grid>

                            <Grid item lg={3} xs={12} md={3} sm={6} >
                                <TextField size="small" id="outlined-basic" label="Nome do diretor" variant="outlined" fullWidth
                                    name="nomeDoDiretor" value={objetosDosInputs.nomeDoDiretor} onChange={handleChange}
                                />
                            </Grid>
                            <Grid item lg={3} xs={12} md={3} sm={6} >
                                <FormControl fullWidth  >
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
                                    {erros['turnos'].error && <Typography sx={{ color: 'red' }} ><WarningAmberIcon
                                        sx={{ fontSize: 'medium', marginInline: '5px' }} />{erros['turnos'].msg}</Typography>}
                                </FormControl>
                            </Grid>

                            <Grid item lg={3} xs={12} sm={6} md={3}>
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">Localização</InputLabel>
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
                                    {erros['localizacaoDaEscola'].error && <Typography sx={{ color: 'red' }} ><WarningAmberIcon
                                        sx={{ fontSize: 'medium', marginInline: '5px' }} />{erros['localizacaoDaEscola'].msg}</Typography>}
                                </FormControl>
                            </Grid>
                            <Grid item lg={4} xs={12} sm={6} md={4} >
                                <Button type="submit" variant="contained" sx={{ marginRight: '12px', marginBUtt: '12px' }}
                                    onClick={() => setNomeDoButtonEditar(!NomeDobuttonEditar)} >
                                    {objetosDosInputs.id ? 'editar' : 'cadastrar'}
                                </Button>
                                {NomeDobuttonEditar && (
                                    <Button type="submit" variant="contained" onClick={CancelarEdicao}> cancelar </Button>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
                {loading ? <Box><CircularProgress sx={{ marginLeft: '46%', marginTop: '14%' }} /></Box> :
                    (localStorageExibir() || []).length > 0 && (
                        <CardListagem />
                    )
                }
            </Container >
        </>
    )
}
export default TelaFormulario

import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import {
    Box,
    Button,
    Card,
    Checkbox,
    CircularProgress,
    Container,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography
} from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setMensagem, setlistaDaTabela } from '../Redux/counterSlice';
import { listaDaTabelaDoLocalStorageTelaForm } from '../localStorageGlobais/index';
import { errosCampos } from '../utils/utils';
import CardListagem from './CardListagemForm';
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
]
const TelaFormulario = () => {
    const [objetosDosInputs, setobjetosDosInputs] = useState({
        nomeDaEscola: '',
        nomeDoDiretor: '',
        localizacaoDaEscola: '',
        turnos: [],
    })

    const dispatch = useDispatch()
    const [loading, setloading] = useState(false)
    const [nomeDoButtonEditarECancelar, setButtonEditarEcancelar] = useState(null)
    const listaDaTabela = useSelector(state => state.listagemDaEscolaFormulario.listaDaTabela)
    const [erros, setErros] = useState({ ...errosCampos })
    const envioDaInformacaoParaListagemDoFormulario = (event) => {
        event.preventDefault()
        if (validacao()) {
            setErros({ ...errosCampos })
            setloading(true)
            dispatch(setMensagem(true))
            setTimeout(() => {
                setTimeout(() => {
                    dispatch(setMensagem(false))
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
                dispatch(setlistaDaTabela(ExibirInformaçõesDosInputs))
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
        setButtonEditarEcancelar(false)
        return;
    }
    useEffect(() => {
    }, [listaDaTabela])

    useEffect(() => {
        const listaSalva = localStorage.getItem(listaDaTabelaDoLocalStorageTelaForm);
        if (listaSalva) {
            setloading(true)
            setTimeout(() => {
                dispatch(setlistaDaTabela(JSON.parse(listaSalva)));
                setloading(false)
            }, 1000);
        }
        // eslint-disable-next-line
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
    const CancelarEdicao = () => {

        setobjetosDosInputs({
            nomeDaEscola: '',
            nomeDoDiretor: '',
            localizacaoDaEscola: '',
            turnos: [],
        })
        setButtonEditarEcancelar(false)
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
                        onSubmit={envioDaInformacaoParaListagemDoFormulario}
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
                                    <InputLabel id="demo-simple-select-label" size="small" > Turnos</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        size="small"
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
                                    <InputLabel id="demo-simple-select-label" size="small">Localização</InputLabel>
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
                                <Button type="submit" variant="contained" sx={{ marginRight: '12px', }}
                                    onClick={() => setButtonEditarEcancelar(!nomeDoButtonEditarECancelar)} >
                                    {objetosDosInputs.id ? 'editar' : 'cadastrar'}
                                </Button>
                                {nomeDoButtonEditarECancelar && (
                                    <Button type="submit" variant="contained" onClick={CancelarEdicao}> cancelar </Button>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
                {loading ? <Box><CircularProgress sx={{ marginLeft: '46%', marginTop: '14%' }} /></Box> :
                    (localStorageExibir() || []).length > 0 && (
                        <CardListagem objetosDosInputs={objetosDosInputs}
                            setobjetosDosInputs={setobjetosDosInputs}
                            nomeDoButtonEditarECancelar={nomeDoButtonEditarECancelar}
                            setButtonEditarEcancelar={setButtonEditarEcancelar}
                        />
                    )
                }
            </Container >
        </>
    )
}
export default TelaFormulario
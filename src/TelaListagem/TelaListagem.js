import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {
    Box,
    Card,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from "react";
import { buscarCidades, buscarEscolasByCidade, buscarEscolasGlobais } from '../Api/Api';
import { localStorageEstado } from "../localStorageGlobais/index";
import { estados } from '../utils/utils';
import CardListagem from "./CardListagem";
const Formulario = () => {
    const [buscaTexto, setBuscaTexto] = useState('')
    const [escolasFiltradas, setEscolasFiltradas] = useState([])
    const [cidades, setCidades] = useState([])
    const [cidadeSelecionada, setCidadeselecionada] = useState('')
    const [escolasDados, setEscolasDados] = useState({})
    const localStorageSaveEstado = localStorage.getItem(localStorageEstado)
    const [estado, setestado] = useState((localStorageSaveEstado ? (
        localStorageSaveEstado
    ) : (
        ""
    )))
    console.log(cidades, escolasDados)
    useEffect(() => {
        buscarEscolasGlobais(handleSetEscolas)
        getCidades()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        BuscaTesteCidadeId()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cidadeSelecionada])
    const handleSetEscolas = (data) => {
        if (data.dados) {
            window.localStorage.setItem('listaApi', JSON.stringify(data.dados));
            setEscolasFiltradas(data.dados[1]);
        }
        if (data.error) {// isso é porque a requisicao é fresca e tem que esperar 1 hora se fizer muitas requisições por isso pega o valor do localStorage se tiver
            let dadosLocalStorage = JSON.parse(window.localStorage.getItem('listaApi'))
            if (dadosLocalStorage) {
                setEscolasFiltradas(dadosLocalStorage[1]);
                setEscolasDados({ ...data, dados: dadosLocalStorage, error: false });
                return
            }
        }
        setEscolasDados({ ...data });
    }

    const getCidades = () => {
        if (estado) {
            buscarCidades(estado, (data) => {
                if (data.dados) {
                    window.localStorage.setItem(estado, JSON.stringify(data.dados));
                }
                if (data.error) {
                    let dadosLocalStorage = JSON.parse(window.localStorage.getItem(estado))
                    if (dadosLocalStorage) {
                        setCidades({ ...data, dados: dadosLocalStorage, error: false });
                        return
                    }
                }
                setCidades({ ...data })
            })
        }
    }
    const BuscaTesteCidadeId = () => {
        const cidadeID = cidadeSelecionada.split(':')[0]
        if (cidadeID) {
            buscarEscolasByCidade(cidadeID, handleSetEscolas)
        }
    }

    const pressionarbusca = () => {
        if (escolasDados.dados) {
            // eslint-disable-next-line 
            setEscolasFiltradas(escolasDados.dados[1].filter((escolaTextoBusca) => {
                if (escolaTextoBusca.nome.toLowerCase().includes(buscaTexto.toLowerCase())) {
                    return escolaTextoBusca
                }
            }))
        }
    }
    const handleChange = (e) => {
        setestado(e.target.value)
        localStorage.setItem(localStorageEstado, e.target.value)
    }
    return (

        <Box >
            <Card style={{ width: '100%', display: "flex", marginTop: '2px', }} >
                <Typography variant="p" style={{
                    fontFamily: "Roboto, Helvetica,Arial,sans-serif", fontSize: "20px",
                    fontWeight: "bold", color: "#325d87", marginLeft: '12px'
                }}> Tela listagem </Typography>
            </Card>
            <Box sx={{ display: 'flex', justifyContent: 'center' }} >
                <Grid container spacing={2} style={{ justifyContent: 'center', marginTop: "20px", width: '80%' }} >
                    <Grid item lg={3} sm={4} xs={10} md={5} >

                        <TextField
                            fullWidth
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="start" >
                                        <IconButton onClick={pressionarbusca}>
                                            <Tooltip title='clique aqui para pesquisar a escola desejada'>
                                                <SearchRoundedIcon />
                                            </Tooltip>
                                        </IconButton>
                                    </InputAdornment>,
                            }}
                            id="searchbar"
                            type="text"
                            name="search"
                            placeholder="Procurar  Escola... "
                            value={buscaTexto}
                            onChange={(ev) => setBuscaTexto(ev.target.value)}
                        />
                    </Grid>
                    <Grid item xs={10} sm={4} md={3} lg={2} >
                        <FormControl fullWidth>
                            <InputLabel  >Selecione um estado</InputLabel>
                            <Select
                                fullWidth
                                label='Selecione um turno'
                                name='selecione'
                                value={estado}
                                onChange={handleChange}
                            >
                                {estados.map((selectEstados, i) => (
                                    <MenuItem key={i} value={selectEstados["sigla"]}>{selectEstados["nome"]}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={10} sm={4} md={3} lg={2}>
                        {
                            cidades.dados && cidades.dados.length > 0 && <FormControl fullWidth >
                                <InputLabel  >Selecione a cidade</InputLabel>
                                <Select
                                    fullWidth
                                    label='selecione uma cidade'
                                    name='selecione'
                                    value={cidadeSelecionada}
                                    onChange={(event) => setCidadeselecionada(event.target.value)}
                                >
                                    {cidades.dados.map((selectCidades, i) => (
                                        <MenuItem key={i} value={selectCidades}>{selectCidades}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        }
                    </Grid>
                </Grid>
            </Box>
            <CardListagem
                escolasDados={escolasDados}
                cidades={cidades}
                escolasFiltradas={escolasFiltradas}
            />
        </Box>

    )
}





export default Formulario
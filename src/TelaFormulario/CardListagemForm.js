import { CardActions, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import {
    Box,
    Button,
    Card,
    CircularProgress,
    IconButton,
    InputAdornment,
    TextField,
    Typography
} from '@mui/material';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItensExcluidos, setlistaDaTabela } from "../Redux/counterSlice";
import ModalCard from "./ModalCard";
const CardListagem = ({ setobjetosDosInputs, setNomeDoButtonEditar, NomeDobuttonEditar },) => {
    const dispatch = useDispatch()
    const listaDaTabela = useSelector(state => state.listagemDaEscolaFormulario.listaDaTabela)
    const textoDaTabelaAtualizadaComSucesso = useSelector(state => state.listagemDaEscolaFormulario.mensagem)
    const [itemDoMap, setItemDoMap] = useState({})
    const [ordemAlfabeticaAscendente, setOrdemAlfabeticaAscendente] = useState([])
    const [buscarInformacoes, setBuscarInformacoes] = useState('')
    const [tabelaFiltradoComAPesquisa, setTabelaFiltradoComAPesquisa] = useState([])
    const [verificarPesquisa, setVerificarPesquisa] = useState(false)
    const [loadingPesquisa, setLoadingPesquisa] = useState(false)
    const [open, setOpen] = useState(false);
    const ordenarOrdemAlfabetica = (atributoOrdenacao) => {
        const ordenacaoNomeDaEscola = [...listaDaTabela].sort((a, b) => {
            if (ordemAlfabeticaAscendente) {
                return a[atributoOrdenacao].localeCompare(b[atributoOrdenacao])
            } else {
                return b[atributoOrdenacao].localeCompare(a[atributoOrdenacao])
            }
        })
        dispatch(setlistaDaTabela(ordenacaoNomeDaEscola))
        setOrdemAlfabeticaAscendente(!ordemAlfabeticaAscendente)
    }
    const botaoParaPesquisarNaTabela = () => {
        const resultadoFiltro = listaDaTabela.filter((item) =>
            item.nomeDaEscola.toLowerCase().includes(buscarInformacoes.toLowerCase())
            ||
            item.nomeDoDiretor.toLowerCase().includes(buscarInformacoes.toLowerCase())
        );
        setLoadingPesquisa(true)
        setTimeout(() => {
            setTabelaFiltradoComAPesquisa(resultadoFiltro)
            setVerificarPesquisa(true)
            setLoadingPesquisa(false)
        }, 1200);
        return resultadoFiltro;
    }
    const arrowIcon = ordemAlfabeticaAscendente ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
    const arrowIconDiretor = ordemAlfabeticaAscendente ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
    const editarItemDaTabela = (campo) => {
        setobjetosDosInputs(campo)
        if (NomeDobuttonEditar) {
            console.log('iai')
            setNomeDoButtonEditar(false)
        } setNomeDoButtonEditar(true)
    }
    const handleClickOpen = (item) => {
        setOpen(true);
        setItemDoMap(item)
        dispatch(setItensExcluidos(item))
    }
    return (
        <>
            <Box sx={{ marginTop: '60px' }}>
                <Card sx={{ overflow: 'auto' }}>
                    <CardActions>
                        <Typography variant="p" style={{
                            fontFamily: "Roboto, Helvetica,Arial,sans-serif", fontSize: "20px",
                            fontWeight: "bold", color: "#325d87"
                        }}> Tabelas de escolas cadastradas </Typography>
                    </CardActions>
                    {textoDaTabelaAtualizadaComSucesso &&
                        <Typography sx={{ color: 'green' }}>
                            <CheckCircleIcon sx={{ fontSize: 'medium', marginInline: '5px' }} />
                            Tabela atualizada com sucesso
                        </Typography>}
                    <Box>
                        <TextField
                            sx={{ marginTop: '10px', width: '80%', marginLeft: '8%' }}
                            id="searchbar"
                            type="text"
                            name="search"
                            placeholder="Procurar escola ou diretor..."
                            value={buscarInformacoes}
                            onChange={(e) => setBuscarInformacoes(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={botaoParaPesquisarNaTabela}>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='left'>Nome da escola
                                    <Button onClick={() => ordenarOrdemAlfabetica('nomeDaEscola')} endIcon={arrowIcon}></Button>
                                </TableCell>
                                <TableCell align='left'>Nome do diretor
                                    <Button onClick={() => ordenarOrdemAlfabetica('nomeDoDiretor')} endIcon={arrowIconDiretor}></Button>
                                </TableCell>
                                <TableCell align='left'>Turnos</TableCell>
                                <TableCell align="left">Localização da escola</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ marginBottom: '12px' }}>
                            {loadingPesquisa ?
                                <TableRow>
                                    <Box> <CircularProgress sx={{ marginLeft: '147%' }} /> </Box>
                                </TableRow>
                                :
                                (verificarPesquisa ? tabelaFiltradoComAPesquisa : listaDaTabela).map((item, index) => (
                                    <TableRow key={index}>

                                        <TableCell>{item.nomeDaEscola}</TableCell>
                                        <TableCell>{item.nomeDoDiretor.length > 0 ? item.nomeDoDiretor : <Typography>Não informado </Typography>
                                        }</TableCell>
                                        <TableCell>
                                            {item.turnos.join(",")}
                                        </TableCell>
                                        <TableCell>{item.localizacaoDaEscola}</TableCell>
                                        <Button onClick={() => { handleClickOpen(item) }}>
                                            <DeleteForeverIcon />
                                        </Button>
                                        <Button onClick={() => { editarItemDaTabela(item) }}> <EditIcon /></Button>
                                    </TableRow>
                                ))
                            }
                            <ModalCard
                                handleClickOpen={handleClickOpen}
                                open={open}
                                setOpen={setOpen}
                                itemDoMap={itemDoMap}
                                setItemDoMap={setItemDoMap}
                                setTabelaFiltradoComAPesquisa={setTabelaFiltradoComAPesquisa}
                            />
                            {verificarPesquisa && tabelaFiltradoComAPesquisa.length === 0 &&
                                <TableRow>
                                    <TableCell colSpan={5} align="center" style={{
                                        fontFamily: "Roboto, Helvetica,Arial,sans-serif",
                                        fontSize: "20px", fontWeight: "bold", color: "red", width: '100%'
                                    }}>
                                        Nenhum resultado encontrado
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </Card>
            </Box>

        </>
    )
}

export default CardListagem
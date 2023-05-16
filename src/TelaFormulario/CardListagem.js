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
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    IconButton,
    InputAdornment,
    TextField,
    Typography
} from '@mui/material';
import React, { useState } from "react";
import { listaDaTabelaDoLocalStorageTelaForm } from '../localStorageGlobais/index';

const CardListagem = () => {
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
    const [open, setOpen] = useState(false);
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

    const botaoParaPesquisarNaTabela = () => {
        const resultadoFiltro = listaDaTabela.filter((item) =>
            item.nomeDaEscola.toLowerCase().includes(buscarInformacoes.toLowerCase()) ||
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
    const [objetosDosInputs, setobjetosDosInputs] = useState({
        nomeDaEscola: '',
        nomeDoDiretor: '',
        localizacaoDaEscola: '',
        turnos: [],

    })

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
                    {cadastroRealizadoComSucessoText &&
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
                                    <Button onClick={() => ordenarOrdemAlfabetica('nomeDoDiretor')} endIcon={arrowIcon}></Button>
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
                                        <Button onClick={() => handleClickOpen(item)}>
                                            <DeleteForeverIcon />
                                        </Button>
                                        <Button onClick={() => editarItemDaTabela(item)}> <EditIcon /></Button>
                                    </TableRow>
                                ))
                            }
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
                            <Dialog open={open} onClose={handleCancel}>
                                <DialogTitle>Confirmar ação</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Essas informações estão prestes a ser excluidos:
                                        {itensQueVaoSerExcluidos && (
                                            <Box sx={{ marginTop: "10px" }}>
                                                <Typography variant="h7">
                                                    <p>Nome da escola: {itensQueVaoSerExcluidos.nomeDaEscola}</p>
                                                    <p> nome do Diretor: {itensQueVaoSerExcluidos.nomeDoDiretor}</p>
                                                    <p>Turno selecionado: {itensQueVaoSerExcluidos.turnos ? itensQueVaoSerExcluidos.turnos.join(",") : ""}</p>                                                                    <p> localização da escola : {itensQueVaoSerExcluidos.localizacaoDaEscola}</p>

                                                </Typography>
                                            </Box>
                                        )}
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

export default CardListagem
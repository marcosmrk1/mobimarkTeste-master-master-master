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
import { useDispatch, useSelector } from "react-redux";
import { setlistaDaTabela } from "../Redux/counterSlice";
import { listaDaTabelaDoLocalStorageTelaForm } from '../localStorageGlobais/index';
const ModalCard = (props, {open,setOpen,itemDoMap,setItemDoMap,setTabelaFiltradoComAPesquisa}) => {
    const dispatch = useDispatch()

    const ItensQueSeraoExcluidos = useSelector(state => state.listagemDaEscolaFormulario.listaDosItensQueVaoSerExcluidos)
    const listaDaTabela = useSelector(state => state.listagemDaEscolaFormulario.listaDaTabela)
    props.handleClickOpen()

    const handleCancel = () => {
        setOpen(false);
    }
    const handleConfirm = () => {
        setOpen(false);
        excluirItemDaTabela()
    }
    const excluirItemDaTabela = () => {
        let listaAposExclusao = listaDaTabela.filter((item) => item.id != itemDoMap.id)
        dispatch(ItensQueSeraoExcluidos(listaAposExclusao))
        dispatch(setlistaDaTabela(listaAposExclusao))
        setTabelaFiltradoComAPesquisa(listaAposExclusao)
        localStorage.setItem(listaDaTabelaDoLocalStorageTelaForm, JSON.stringify(listaAposExclusao))
    }
  return (

         <Dialog open={open} onClose={handleCancel}>
                                <DialogTitle>Confirmar ação</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Essas informações estão prestes a ser excluidos:
                                        {ItensQueSeraoExcluidos && (
                                            <Box sx={{ marginTop: "10px" }}>
                                                <Typography variant="h7">
                                                    <p>Nome da escola: {ItensQueSeraoExcluidos.nomeDaEscola}</p>
                                                    <p> nome do Diretor: {ItensQueSeraoExcluidos.nomeDoDiretor}</p>
                                                    <p>Turno selecionado: {ItensQueSeraoExcluidos.turnos ? ItensQueSeraoExcluidos.turnos.join(",") : ""}</p>
                                                    <p> localização da escola : {ItensQueSeraoExcluidos.localizacaoDaEscola}</p>

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
  )
}

export default ModalCard
import {
    Button,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Typography
} from '@mui/material';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItensExcluidos, setlistaDaTabela } from "../Redux/counterSlice";
import { listaDaTabelaDoLocalStorageTelaForm } from '../localStorageGlobais';
const ModalCard = ({ open, setOpen, itemDoMap, setTabelaFiltradoComAPesquisa, }) => {
    const dispatch = useDispatch()
    const ItensQueSeraoExcluidos = useSelector(state => state.listagemDaEscolaFormulario.listaDosItensQueVaoSerExcluidos)
    const listaDaTabela = useSelector(state => state.listagemDaEscolaFormulario.listaDaTabela)
    const excluirItemDaTabela = () => {
        let listaAposExclusao = listaDaTabela.filter((item) => item.id !== itemDoMap.id)
        dispatch(setItensExcluidos(listaAposExclusao))
        dispatch(setlistaDaTabela(listaAposExclusao))
        setTabelaFiltradoComAPesquisa(listaAposExclusao)
        localStorage.setItem(listaDaTabelaDoLocalStorageTelaForm, JSON.stringify(listaAposExclusao))
    }
    const handleCancel = () => {
        setOpen(false);
    }
    const handleConfirm = () => {
        setOpen(false);
        excluirItemDaTabela()
    }
    return (

        <Dialog open={open} onClose={handleCancel}>
            <DialogTitle>Confirmar ação</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Essas informações estão prestes a ser excluidos:
                    {ItensQueSeraoExcluidos && (

                        <Typography component={'span'} variant="h7" >
                            <li>Nome da escola: {ItensQueSeraoExcluidos.nomeDaEscola}</li>
                            <li> Nome do diretor: {ItensQueSeraoExcluidos.nomeDoDiretor}</li>
                            <li>Turno selecionado: {ItensQueSeraoExcluidos.turnos ? ItensQueSeraoExcluidos.turnos.join(",") : ""}</li>
                            <li> Localização da escola : {ItensQueSeraoExcluidos.localizacaoDaEscola}</li>
                        </Typography>

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
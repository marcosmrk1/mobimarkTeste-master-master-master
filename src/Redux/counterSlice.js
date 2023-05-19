import { createSlice } from "@reduxjs/toolkit";

const listaDaTabelaSlice = createSlice({
    name: 'listagemDaEscolaFormulario',
    initialState: { listaDaTabela: [], mensagemAtualizadaComSucesso:false},
    reducers: {
        setlistaDaTabela: (state, action) => {
            state.listaDaTabela = action.payload
        },

        setMensagem: (state,action) => {
            state.mensagem = action.payload
        },
    }

})
export const { setlistaDaTabela ,setMensagem } = listaDaTabelaSlice.actions
export default listaDaTabelaSlice.reducer
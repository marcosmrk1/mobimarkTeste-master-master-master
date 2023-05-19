import { createSlice } from "@reduxjs/toolkit";

const listaDaTabelaSlice = createSlice({
    name: 'listagemDaEscolaFormulario',
    initialState: { listaDaTabela: [], mensagemAtualizadaComSucesso:false, listaDosItensQueVaoSerExcluidos:[]},
    reducers: {
        setlistaDaTabela: (state, action) => {
            state.listaDaTabela = action.payload
        },

        setMensagem: (state,action) => {
            state.mensagem = action.payload
        },

        setItensExcluidos: (state,action) => { 
            state.listaDosItensQueVaoSerExcluidos = action.payload 
        },
    }

})
export const { setlistaDaTabela ,setMensagem ,setItensExcluidos } = listaDaTabelaSlice.actions
export default listaDaTabelaSlice.reducer
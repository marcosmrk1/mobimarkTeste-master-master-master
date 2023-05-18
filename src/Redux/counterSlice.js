import { createSlice } from "@reduxjs/toolkit";

const listaDaTabelaSlice = createSlice({
    name: 'listagemDaEscolaFormulario',
    initialState: { listaDaTabela: [] },
    reducers: {
        setlistaDaTabela: (state, action) => {
            state.listaDaTabela = action.payload
        }
    }

})
export const { setlistaDaTabela } = listaDaTabelaSlice.actions
export default listaDaTabelaSlice.reducer
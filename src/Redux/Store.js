import { configureStore } from "@reduxjs/toolkit";
import counterReduce from '../Redux/counterSlice';
export default configureStore({
    reducer: {
        listagemDaEscolaFormulario: counterReduce,
    }
})
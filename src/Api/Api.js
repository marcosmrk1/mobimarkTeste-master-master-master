import axios from "axios";
import  { GET_CIDADES, GET_ESCOLAS_BY_CIDADES, GET_ESCOLAS_GLOBAIS } from './Constantes'

const buscaApiGet = (url, action) => {
    let data = { loading:false, dados:null, error:false, action: ()=>{}}
    let request = () => {
        data.loading = true
        data.action = request
        action(data)
        axios.get(url).then(response=>{
            data.dados = response.data
            action(data)
        }).catch((error)=>{
            // console.log(error)
            data.error=true
            action(data)
        }).finally(()=>{
            data.loading=false
            action(data)
        })
    }
    request()
}
export const buscarEscolasGlobais = (action) => {
    buscaApiGet(GET_ESCOLAS_GLOBAIS, action)
}
export const buscarEscolasByCidade = (cidadeId, action) => {
    buscaApiGet(GET_ESCOLAS_BY_CIDADES+cidadeId, action)
}
export const buscarCidades = (estado, action) => {
    buscaApiGet(GET_CIDADES+estado, action)
}

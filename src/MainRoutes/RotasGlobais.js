import { Route, Routes, Navigate, Router, redirect, RoutePri, } from 'react-router-dom';
import Login from '../TelaDeLogin/TelaDeLogin'
import { dadosDoEmaileSenha } from '../localStorageGlobais'
import Formulario from '../Formulario/Formulario';
import Template from '../Template/Template';
import TeladeMenu from '../TelaDeMenu/TelaDeMenu'
import TelaListagem from '../TelaListagem/TelaListagem';

function Protected({ children }) {
  if (!window.localStorage.getItem(dadosDoEmaileSenha)) {
    return (
      <Navigate to='/' replace />
    )
  } return (
    children
  )
}
function NaoVoltarListagem({ children }) {
  if (window.localStorage.getItem(dadosDoEmaileSenha)) {
    return (
      <Navigate to='/formulario' replace />
    )
  }
  return (
    children
  )
}
const mainroutes = () => {
  return (
    <Routes>
      <Route exact path='/' element={
        // <Template/>
    <NaoVoltarListagem>
          <Login/>
        </NaoVoltarListagem>
      } />
      <Route path='/Sobremim' element={
        <>
          <Template/>
          <TeladeMenu/>
        </>
        }
        />
      <Route path='/telalistagem' element={
        <Protected>
        <Template />
        <TelaListagem />
        </Protected>
      }
      />
      <Route path='/formulario' element={
        <Protected >
          <Template />
          <Formulario />
        </Protected>
      } />
    </Routes>
  )
}
export default mainroutes 
import { Route, Routes, Navigate, Router, redirect, RoutePri, } from 'react-router-dom';
import Login from '../TelaDeLogin/TelaDeLogin'
import { dadosDoEmaileSenha } from '../localStorageGlobais'
import Listagem from '../TelaListagem/TelaListagem';
import Template from '../Template/Template';
import TeladeMenu from '../TelaDeMenu/TelaDeMenu'
import TelaFormularioo from '../TelaFormulario/TelaFormulario';
import TelaFormulario from '../TelaFormulario/TelaFormulario';
import TeladeMenuu from '../'
function Protected({ children }) {




  if (!window.localStorage.getItem(dadosDoEmaileSenha)) {
    return (
      <Navigate to='/' replace />
    )
  } return (
    <>
      <Template>
        {children}
      </Template>
    </>

  )
}
function NaoVoltarListagem({ children }) {
  if (window.localStorage.getItem(dadosDoEmaileSenha)) {
    return (
      <Navigate to='/sobremim' replace />
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

        <NaoVoltarListagem>
          <Login />
        </NaoVoltarListagem>
      } />
      <Route path='/Sobremim' element={
        <Protected>
          <TeladeMenu />
        </Protected>
      }
      />
      <Route path='/TelaFormulario' element={
        <Protected>
          <TelaFormularioo />
        </Protected>
      }
      />
      <Route path='/telalistagem' element={
        <Protected >
          <Listagem />
        </Protected>
      } />
    </Routes>
  )
}
export default mainroutes 
import { Route, Routes, Navigate, Router, redirect, RoutePri, } from 'react-router-dom';
import Login from '../TelaDeLogin/TelaDeLogin'
import { dadosDoEmaileSenha } from '../localStorageGlobais'
import Formulario from '../Formulario/Formulario';
import Template from '../Template/Template';
import TeladeMenu from '../TelaDeMenu/TelaDeMenu'
import TelaListagem from '../TelaListagem/TelaListagem';
import TelaFormulario from '../TelaListagem/TelaFormulario';
import TeladeMenuu from '../'
function Protected({ children }) {
  if (!window.localStorage.getItem(dadosDoEmaileSenha)) {
    return (
      <Navigate to='/' replace />
      )
  } return (
    <>
    <Template/>
    {children}
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
          <Login/>
        </NaoVoltarListagem>
      } />
      <Route path='/Sobremim' element={
        
          <Protected>
         <TeladeMenu/>
         </Protected>
  
        }
        />
      <Route path='/TelaFormulario' element={
        <Protected>
        <TelaFormulario />
        </Protected>
      }
      />
      <Route path='/telalistagem' element={
        <Protected >
          <Formulario />
        </Protected>
      } />
    </Routes>
  )
}
export default mainroutes 
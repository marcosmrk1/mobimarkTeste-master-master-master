import { Navigate, Route, Routes } from 'react-router-dom';
import Sobremim from '../Sobremim/Sobremim';
import Login from '../TelaDeLogin/TelaDeLogin';
import TelaFormulario from '../TelaFormulario/TelaFormulario';
import TelaListagem from '../TelaListagem/TelaListagem';
import Template from '../Template/NavbarDesktop/NavBarDesktop';

import { dadosDoEmaileSenha } from '../localStorageGlobais';

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
          <Sobremim />
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
          <TelaListagem />
        </Protected>
      } />
    </Routes>
  )
}
export default mainroutes 
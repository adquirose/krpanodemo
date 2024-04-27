import { Header, Titulo, ContenedorHeader, ContenedorBotones } from './elements/Header'
import Boton from './elements/Boton'
import BotonCerrarSesion from './components/BotonCerrarSesion'
import { Helmet } from "react-helmet"
import FormularioLote from './components/FormularioLote'
function App() {
  return (
    <>
      <Helmet>
        <title>
          Agregar Lote
        </title>
      </Helmet>
      <Header>
        <ContenedorHeader>
          <Titulo>Agregar Lote</Titulo>
          <ContenedorBotones>
            <Boton to="/#">Categorias</Boton>
            <Boton to="/lista-de-lotes">Lista de Lotes</Boton>
            <BotonCerrarSesion/>
          </ContenedorBotones>
        </ContenedorHeader>
      </Header>
      <FormularioLote/>
    </>
  )
}

export default App

import App from "../App"
import TourVirtual from '../components/TourVirtual'
import ListaDeLotes from "../components/ListaDeLotes"
import RutaPrivada from "../components/RutaPrivada"
import SignIn from "../components/SignIn"
import { AuthProvider } from "../context/AuthContext"
import { BrowserRouter, Routes, Route } from "react-router-dom" 
import Container from '../elements/Container'
import EditarLote from '../components/EditarLote'

const Index = () => {
    return(
      <BrowserRouter>
        <AuthProvider>
            <Container>
                <Routes>
                    <Route path="/" element={<TourVirtual/>}/>

                    <Route path="/home" element={
                        <RutaPrivada>
                            <App/>
                        </RutaPrivada>
                    }/> 
                    <Route path="/signin" element={<SignIn/>}/> 
                    <Route path="/lista-de-lotes" element={
                        <RutaPrivada>
                            <ListaDeLotes/>
                        </RutaPrivada>}
                    />
                    <Route path="/edit/:id" element={
                        <RutaPrivada >
                            <EditarLote/>
                        </RutaPrivada>
                    }/>
                </Routes>
            </Container>
        </AuthProvider>
      </BrowserRouter>
    )
}
export default Index
import { Helmet } from "react-helmet"
import { Header, Titulo } from "../../elements/Header"
import BtnRegresar from "../../elements/BtnRegresar"

import FormularioLote from '../FormularioLote'
import { useParams } from "react-router-dom"
import useObtenerLote from "../../hooks/useObtenerLote"

const EditarLote = () => {
    const { id } = useParams()
    const [lote] = useObtenerLote(id)
    return(
        <>
            <Helmet>
                Editar lote
            </Helmet>
            <Header>
                <BtnRegresar ruta="/lista-de-lotes"/>
                <Titulo>
                    Editar lote 
                </Titulo>    
            </Header>
            <FormularioLote lote={lote}/>
        </>  
    )
}
export default EditarLote
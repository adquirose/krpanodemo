import { Header } from "../../elements/Header"
import BtnRegresar from "../../elements/BtnRegresar"

import FormularioLote from '../FormularioLote'
import { useParams } from "react-router-dom"
import useObtenerLote from "../../hooks/useObtenerLote"

const EditarLote = () => {
    const { id } = useParams()
    const [lote] = useObtenerLote(id)
    return(
        <>
            <Header>
                <BtnRegresar ruta="/lista-de-lotes"/>    
            </Header>
            <FormularioLote lote={lote}/>
        </>  
    )
}
export default EditarLote
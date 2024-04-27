import useObtenerLotes from "../../hooks/useObtenerLotes"
import { Helmet } from "react-helmet"
import { Header,Titulo } from '../../elements/Header'
import BtnRegresar from '../../elements/BtnRegresar'
import Boton from '../../elements/Boton'
import { Link } from "react-router-dom"
import IconoEditar from '../../assets/imagenes/editar.svg?react'
import IconoBorrar from '../../assets/imagenes/borrar.svg?react'
import borrarGasto from '../../firebase/borrarGasto'
import convertirAMoneda from "../../functions/convertirAMoneda"
import {
    Lista,
    ElementoLista,
    Descripcion,
    Valor,
    ContenedorBotones,
    BotonAccion,
    ContenedorSubtitulo,
    Subtitulo
} from '../../elements/ElementosDeLista'

const ListaDeLotes = () => {
    const lotes = useObtenerLotes()

    return(
        <>
        <Helmet>
            <title>Lista de Lotes</title>
        </Helmet>
        <Header>
            <BtnRegresar/>
            <Titulo>
                Lotes
            </Titulo>    
        </Header>
        <Lista>
            {lotes.map((lote) => {
                return(
                    <div key={lote.id}>
                        <ElementoLista key={lote.id}>
                            {/* <Categoria>
                                <IconoCategoria id={lote.nombre}/>
                                {lote.categoria}
                            </Categoria> */}
                            <Descripcion>
                                {lote.nombreLote}
                            </Descripcion>
                            <Descripcion>
                                {lote.estado}
                            </Descripcion>
                            <Valor>
                                {convertirAMoneda(lote.valor)}
                            </Valor>
                            <ContenedorBotones>
                                <BotonAccion to={`/edit/${lote.id}`} as={Link}><IconoEditar/></BotonAccion>
                                <BotonAccion onClick={() => borrarGasto(lote.id)}>
                                    <IconoBorrar/>
                                </BotonAccion>
                            </ContenedorBotones>
                        </ElementoLista>
                    </div>
                )
            })}
            
            {lotes.length === 0 && 
                <ContenedorSubtitulo>
                    <Subtitulo>No hay lotes por mostrar</Subtitulo>
                    <Boton as={Link} to="/home">
                        Agregar Lote
                    </Boton>
                </ContenedorSubtitulo>
            }
            </Lista>
        </>
    )
}
export default ListaDeLotes
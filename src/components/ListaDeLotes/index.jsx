import useObtenerLotes from "../../hooks/useObtenerLotes"
import styled from "styled-components"
import IconoFlecha from '../../assets/imagenes/flecha.svg?react';
import Boton from '../../elements/Boton'
import { Link, useNavigate } from "react-router-dom"
import IconoEditar from '../../assets/imagenes/editar.svg?react'
import IconoBorrar from '../../assets/imagenes/borrar.svg?react'
import borrarGasto from '../../firebase/borrarGasto'
import convertirAMoneda from "../../functions/convertirAMoneda"
import theme from "../../constants/theme";

const Lista = styled.ul`
    min-width:360px;
    max-width:720px;
    grid-area:content;
    justify-self:center;
    list-style: none;
    padding: 0 2rem;
    height: 100%;
    overflow-y: auto;
    @media(max-width: 380px){
        padding: 0;
    }
`;
const ElementoLista = styled.li`
    position:${props => props.$position ? props.$position : 'relative'};
    background:white;
    z-index:${props => props.$zIndex ? props.$zIndex : '1'};
    padding: 1rem 0;
    border-bottom: 2px solid #F2F2F2;
    display: grid;
    grid-template-columns: minmax(30px,1fr) minmax(100px,1fr) minmax(100px,1fr) minmax(90px,1fr);
    gap: 5px;
    & > div {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content:start;
    }
 
    &:hover button,
    &:hover a {
        opacity: 1;
    }
    
`;
const Header = styled.div`
    grid-area:header;
    position:fixed;
    z-index:20;
    background:white;
    width:100%;
    height:60px;
    display:grid;
    grid-template-columns:repeat(3,1fr);
    
`
const Button = styled.button`
    display: block;
    width: 3.12rem; /* 50px */
    height: 3.12rem; /* 50px */
    line-height: 3.12rem; /* 50px */
    text-align: center;
    margin-right: 1.25rem; /* 20px */
    border: none;
    background: #000;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.31rem; /* 5px */
    cursor: pointer;

    @media(max-width: 60rem){ /* 950px */
        width: 2.5rem; /* 40px */
        height: 2.5rem; /* 40px */
        line-height: 2.5rem; /* 40px */
    }
`
const Icono = styled(IconoFlecha)`
    width: 50%;
    height: auto;
    fill: #fff;
`;
const Descripcion = styled.div`
    justify-content: center;
    font-size: 1.25rem;
    text-transform: capitalize;
    @media (max-width: 50rem) { /* 50px */
        justify-content: end;
    }
`;
 
const Valor = styled.div`
    font-size: 1.25rem; /* 20px */
    font-weight: 700;
    justify-content: end;
 
    @media (max-width: 50rem) { /* 80px */
        justify-content: start;
    }
`;
 
// const Fecha = styled.div`
//     border-radius: 0.31rem; /* 5px */
//     background: ${theme.azulClaro};
//     text-align: center;
//     color: #fff;
//     padding: 0.62rem 3.12rem; /* 10px 50px */
//     display: inline-block;
//     margin: 1.25rem 0; /* 20px */
 
//     @media (max-width: 50rem) { /* 80px */
//         width: 100%;
//     }
// `;
 
const ContenedorBotones = styled.div`
    @media (max-width: 50rem) { /* 80px */
        justify-content: end;
    }
`;
 
const BotonAccion = styled.button`
    outline: none;
    background: ${theme.grisClaro};
    border: none;
    width: 2.5rem; /* 40px */
    display: inline-block;
    height: 2.5rem; /* 40px */
    line-height: 2.5rem; /* 40px */
    font-size: 16px;
    cursor: pointer;
    border-radius: 0.31rem; /* 5px */
    margin-left: 0.625rem; /* 10px */
    transition: .3s ease all;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
 
    &:hover {
        background: ${theme.grisClaro2};
    }
 
    svg {
        width: 1.125rem; /* 18px */
    }
 
    @media (max-width: 50rem) { /* 80px */
        opacity: 1;
    }
`;
 
const ContenedorSubtitulo = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
 
const Subtitulo = styled.h3`
    color: ${theme.grisClaro2};
    font-weight: 400;
    font-size: 40px;
    padding: 2.5rem 0; /* 40px */
`;
 

const ListaDeLotes = () => {
    const lotes = useObtenerLotes()
    const navigate = useNavigate()
    return(
        <>
        <Header>
            <Button onClick={({ruta="/home"}) => navigate(ruta)}>
                <Icono/>
            </Button>
            <span>
                Nav
            </span>
            <span>Buscador</span>   
        </Header>
        <Lista>
            <ElementoLista $position="fixed" $zIndex="65">
                <Descripcion>ID</Descripcion>
                <Descripcion>Estado</Descripcion>
                <Descripcion>Valor</Descripcion>
            </ElementoLista>
            {lotes.map((lote) => {
                return(
                    <div key={lote.id}>
                        <ElementoLista key={lote.id}>
                            <Descripcion>
                                {lote.nombreLote}
                            </Descripcion>
                            <Descripcion>
                                {lote.estado}
                            </Descripcion>
                            <Valor>
                                {convertirAMoneda(Number(lote.precio))}
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
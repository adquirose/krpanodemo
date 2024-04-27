/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import useKrpano from 'react-krpano-hooks'
import styled, { keyframes } from 'styled-components'
import useObtenerLotes from '../../hooks/useObtenerLotes'
import convertirAMoneda from '../../functions/convertirAMoneda'
const KrpanoContainer = styled.div`
    width:100vw;
    height:100vh;
    position:relative;
`
const slideIn = keyframes`
    0% {
        transform: translateX(-340px); 
        opacity: 0;
    }
    100% {
        transform: translateX(0px);
        opacity: 1;
    }
`;
// const slideOut = keyframes`
//     0% {
//         transform: translateX(20px); 
//         opacity: 1;
//     }
//     100% {
//         transform: translateX(-340px);
//         opacity: 0;
//     }
// `;
const FichaContainer = styled.div`
    -webkit-box-shadow: 17px 20px 36px -15px rgba(0,0,0,0.75);
    -moz-box-shadow: 17px 20px 36px -15px rgba(0,0,0,0.75);
    box-shadow: 17px 20px 36px -15px rgba(0,0,0,0.75);
    width:340px;
    height:360px;
    background-color:rgba(255,255,255,0.9);
    border-radius:5px;
    display:flex;
    flex-direction:column;
    position:relative;
    top:150px;
    padding:2rem;
    left:20px;
    animation:${slideIn} 1s;    
`
const Button = styled.button`
    border:none;
    padding:0.85rem 2rem;
    border-radius:5px;
    background:#5B69E2;
    color:white
`
const ButtonGroup = styled.div`
    position:absolute;
    bottom:2rem;
`
const Titulo = styled.h2`
    font-size:2.25rem;
    color:black;
    margin-bottom:0.5rem;
`
const P = styled.p`
    font-size:1.25rem;
    margin-top:0.5rem;
    text-transform:capitalize;
`
// eslint-disable-next-line react/prop-types

const Ficha = ({dataLote = {}, setVisibleFicha, visibleFicha}) => {
    console.log(dataLote)
    return(
        <FichaContainer $visibleFicha={visibleFicha}>
            <Titulo>Lote {dataLote.nombreLote}</Titulo>
            <P>Estado: {dataLote.estado}</P>
            <P>Valor: {convertirAMoneda(dataLote.valor)}</P>
            <ButtonGroup>
                <Button type="Button" onClick={() => setVisibleFicha(!visibleFicha)}>Cerrar</Button>
            </ButtonGroup> 
        </FichaContainer>
    )
}

const KrpanoExample = () => {
    const lotes = useObtenerLotes()
    const [visibleFicha, setVisibleFicha] = useState(false)
    const [nombreSpotFicha, setNombreSpotFicha] = useState('')
    const [nombreEscena, setNombreEscena] = useState('')
    const [loteFiltrado, setLoteFiltrado] = useState({})
    const { 
        containerRef,
        callKrpano 
    } = useKrpano({ 
        height:'100%', 
        width:'100%',
        globalFunctions:{
            mostrarFicha: (nombreSpot) => {
                console.log(nombreSpot)
                setNombreSpotFicha(nombreSpot) 
                setVisibleFicha(true)
            },
            nameScene: (escena) => {
                setNombreEscena(escena)
            }
        }
    })

    useEffect(() => {
        const crearSpots = () => {
            lotes.map((lote) => {
                callKrpano(`crear_hs(${lote.nombreSpot}, ${lote.ath}, ${lote.atv}, ${lote.estado}, ${lote.nombreLote});` )
            })
        }
        if(nombreEscena === 'scene_master'){
            crearSpots()
        }
    },[callKrpano, lotes, nombreEscena])

    useEffect(()=> {
        const filtroLote = (nombreSpot) => lotes.find((lote) => lote.nombreSpot === nombreSpot)
        setLoteFiltrado(filtroLote(nombreSpotFicha))
    },[nombreSpotFicha, lotes])

    return(
        <KrpanoContainer>
            <div ref={containerRef} style={{position:'absolute'}}/>
            {visibleFicha && <Ficha dataLote={loteFiltrado} visibleFicha={visibleFicha} setVisibleFicha={setVisibleFicha}/> }
            
        </KrpanoContainer>   
    )
}
export default KrpanoExample
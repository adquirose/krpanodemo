/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import agregarLote from '../../firebase/agregarLote'
import Alerta from '../Alerta'
import { getUnixTime } from 'date-fns'
import styled from 'styled-components'
import { useAuth } from '../../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import { fromUnixTime } from 'date-fns'
import editarLote from '../../firebase/editarLote.js'
import SelectEstados from '../SelectEstados/index.jsx'
import theme from '../../constants/theme.js'

const Form = styled.form`
    width:100%;
    max-width:600px
    heigth:100%;
    display:flex;
    flex-direction:column;
`
const Label = styled.label`
    height: 2.25rem; 
    width: 35%;
    padding: 0px 1.25rem; 
    font-size: 1rem; 
`
const Input = styled.input`
    background: ${theme.grisClaro};
    cursor: pointer;
    margin:0.5rem;
    border-radius: 0.25rem;
    border:none;
    position: relative;
    height: 2.25rem; 
    width: 25%;
    padding: 0px 1.25rem; 
    font-size: 1rem; 
    transition: .5s ease all;
    &:hover {
        background: ${theme.grisClaro2};
    }
`
const Button = styled.button`
    border-radius:5px;
    background-color: lightgreen;
    color:white;
    padding:0.75rem 1rem;
    border:none;
`
const INITIAL_STATE_LOTE = {
    nombreSpot:'',
    ath:'',
    atv:'',
    estado:'disponible',
    nombreLote:'',
    valor:'',
    fecha: new Date()
}
const INITIAL_STATE_ALERTA = {
    active: false, tipo:'', mensaje:'' 
}
const FormularioLote = ({lote}) => {

    const [data, setData] = useState({...INITIAL_STATE_LOTE})
    const [alerta, setAlerta] = useState({...INITIAL_STATE_ALERTA})
    const navigate = useNavigate()
    const { user} = useAuth()
    
    useEffect(() => {
        if(lote){
            if(lote.data().uid === user.uid){
                setData({
                    nombreSpot:lote.data().nombreSpot,
                    nombreLote: lote.data().nombreLote,
                    valor: lote.data().valor,
                    estado:lote.data().estado,
                    fecha: fromUnixTime(lote.data().fecha),
                    ath: lote.data().ath,
                    atv: lote.data().atv
                })
            }else{
                navigate('/lista-de-lotes')
            }
        }
    },[lote, user, navigate])
    const handleChange = event => {
        setData({
            ...data, 
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = event => {
        event.preventDefault()
        const {ath, atv, nombreSpot, fecha, valor, estado, nombreLote } = data 
        const newLote = { ath, atv, nombreSpot, valor: Number(valor), estado, nombreLote, fecha: getUnixTime(fecha), uid:user.uid}
        if(ath !== '' && atv !== ''){
            if(lote){
                editarLote({
                    ...data,
                    id:lote.id,
                    fecha:getUnixTime(fecha)
                })
                    .then(() => {
                        navigate("/lista-de-lotes")
                        setAlerta({active: true, tipo:'exito', mensaje:'Lote actualizado' })
                    })
                    .catch((error) => console.log(error))
            }else{
                agregarLote(newLote)
                    .then(() => {
                        setData({...INITIAL_STATE_LOTE})
                        setAlerta({active: true, tipo:'exito', mensaje:'Se ha creado un lote en el masterplan' })
                    })
                    .catch((error)=> {
                        setAlerta({active: true, tipo:'error', mensaje:`Ocurrio un error: ${error}` })
                    })
            }
        }else{
            setAlerta({active: true, tipo:'error', mensaje:'Por favor rellena todos los campos' })
        }
    }
    return(
        <>
            <Form onSubmit={handleSubmit}>
                <div>
                    <Label>Ath:</Label>
                    <Input type="text" name="ath" value={data.ath} onChange={handleChange} placeholder="ath"/>
                    <Label>Atv:</Label>
                    <Input type="text" name="atv" value={data.atv} onChange={handleChange} placeholder="atv"/>
                </div>
                <div>
                    <Label>Nombre del Spot:</Label>
                    <Input type="text" name="nombreSpot" value={data.nombreSpot} onChange={handleChange} placeholder="Nombre Spot"/>
                    <Label>Nombre del Lote:</Label>
                    <Input type="text" name="nombreLote" value={data.nombreLote} onChange={handleChange} placeholder="Nombre Lote"/>
                </div>
                <div style={{display:'flex',flexDirection:'row', alignItems:'center'}}>
                    <Label>Valor:</Label>
                    <Input type="text" name="valor" value={data.valor} onChange={handleChange} placeholder="Valor"/>
                    <Label>Estado:</Label>
                    <SelectEstados data={data} setData={setData}/>
                </div>
                <div>
                    <Button type="submit">{lote ? 'Actualizar Lote': 'Crear Lote'}</Button>
                </div>
                
            </Form>
            <Alerta alerta={alerta} setAlerta={setAlerta}/>
        </>
    )
}
export default FormularioLote
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

const FormContainer = styled.div`
    grid-area:content;
    border: 1px solid gray;
    width:420px;
    height:500px;
    justify-self:center;
    align-self:center;
    box-shadow: 0px 1.25rem 2.5rem rgba(0,0,0,.05);
    border-radius: 0.625rem;
    padding:2rem;
`
const Form = styled.form`
    width:100%;
    display:grid;
    grid-gap:5px;
    grid-template-columns:repeat(auto-fill,minmax(180px, 1fr));
    grid-template-rows: 50px;
    grid-auto-rows:50px;
    
`
const Label = styled.label`
    width: auto;
    font-size: 1.25rem; 
    align-self:center;
    margin-right:1rem;
`
const Input = styled.input`
    background: ${theme.grisClaro};
    cursor: pointer;
    
    border-radius: 0.25rem;
    border: none;
    position: relative;
    height: 100%; 
    min-width: 30px;
    max-width: 140px;
    padding-left:1.25rem;
    
    font-size: 1rem; 
    transition: .5s ease all;
    &:hover {
        background: ${theme.grisClaro2};
    }
`
const InputLabel = styled.div`
    display:flex;
    alignContent:center;
    margin:0.5rem 0;
    &:last-child{
        grid-column: 1;
        grid-row: 8; 
    }
`
const Button = styled.button`
    border-radius:5px;
    padding:0.75rem 0.75rem;
    background-color: lightblue;
    color:white;
    font-size: 1rem;
    border:none;
    cursor:pointer;
    height:3rem;
    transition: .5s ease all;
    &:hover{
        background-color:blue;
    }
    
`
const INITIAL_STATE_LOTE = {
    ath:'',
    atv:'',
    nombreSpot:'',
    estado:'disponible',
    nombreLote:'',
    precio:'',
    fecha: new Date()
}
const INITIAL_STATE_ALERTA = {
    active: false, tipo:'', mensaje:'' 
}
const FormularioLote = ({lote}) => {

    const [data, setData] = useState({...INITIAL_STATE_LOTE})
    const [alerta, setAlerta] = useState({...INITIAL_STATE_ALERTA})
    const navigate = useNavigate()
    const { user } = useAuth()
    
    useEffect(() => {
        if(lote){
            if(lote.data().uid === user.uid){
                setData({            
                    nombreLote: lote.data().nombreLote,
                    precio: lote.data().precio,
                    estado:lote.data().estado,
                    fecha: fromUnixTime(lote.data().fecha),
                    ...lote.data()
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
        const { fecha, precio, estado, nombreLote } = data 
        const newLote = { valor: precio, estado, nombreLote, fecha: getUnixTime(fecha), uid:user.uid }
        if(lote){
            editarLote({
                ...data,
                id:lote.id,
                fecha:getUnixTime(fecha)
            }).then(() => {
                setAlerta({active: true, tipo:'exito', mensaje:'Lote actualizado' })
            }).then(() => {
                navigate("/lista-de-lotes")
        }).catch((error) => console.log(error))
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
    }
    return(
        <FormContainer>
            <Form onSubmit={handleSubmit}>
                <InputLabel>
                    <Label>Nombre del Lote:</Label>
                    <Input type="text" name="nombreLote" value={data.nombreLote} onChange={handleChange} placeholder="Nombre Lote"/>
                </InputLabel>
                <InputLabel>
                    <Label>Valor:</Label>
                    <Input type="text" name="precio" value={data.precio} onChange={handleChange} placeholder="Valor"/>
                </InputLabel>
                <InputLabel>
                    <Label>Estado:</Label>
                    <SelectEstados data={data} setData={setData}/>
                </InputLabel>
                <InputLabel>
                    <Button type="submit">{lote ? 'Actualizar LOTE': 'Crear Lote'}</Button>
                </InputLabel>
                
            </Form>
            <Alerta alerta={alerta} setAlerta={setAlerta}/>
        </FormContainer>
    )
}
export default FormularioLote
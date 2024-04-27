import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { Header, Titulo, ContenedorHeader } from '../../elements/Header'
import Boton from '../../elements/Boton'
import { Formulario, Input, ContenedorBoton } from '../../elements/ElementosDeFormulario'
import SvgLogin from '../../assets/imagenes/login.svg?react'
import styled from 'styled-components'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/firebaseConfig'
import Alerta from '../Alerta'

const Svg = styled(SvgLogin)`
    width:100%;
    max-height:12.5rem;
    margin-bottom:1.25rem;
`
const INITIAL_STATE_ALERTA = {
    active: false, tipo:'', mensaje:'' 
}
const SignIn = () => {
    const [data, setData] = useState({email:'', password:''})
    const [alerta, setAlerta] = useState(INITIAL_STATE_ALERTA)

    const navigate = useNavigate()

    const handleOnSubmit = async(e) => {
        e.preventDefault()
        setAlerta({ ...INITIAL_STATE_ALERTA })

        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if(!expresionRegular.test(email)){
            setAlerta({active:true, tipo:'error', mensaje:'Correo no es valido'})
            return
        }
        if(email === '' || password === ''){
            setAlerta({active:true, tipo:'error', mensaje:'Rellena todos los campos'})
            return
        }
        try{
            await signInWithEmailAndPassword(auth, email, password)
            setAlerta({active:true, mensaje:'Usuario registrado', tipo:'exito'})
            navigate('/lista-de-lotes')
        } catch(error){
            let mensaje 
            switch(error.code){
				case 'auth/wrong-password':
					mensaje = 'La contraseña no es correcta'
					break;
				case 'auth/user-not-found':
					mensaje = 'No se encontro ninguna cuenta con este email'
				break;
				case 'auth/invalid-email':
					mensaje = 'El correo electrónico no es válido.'
				break;
				default:
					mensaje = 'Hubo un error al intentar crear la cuenta.'
				break;
			}
            setAlerta({active:true, mensaje, tipo:'error'})
        }
    }
    const handleOnChange = (e) => {
        setData({...data, [e.target.name]:e.target.value})
    }
    const { email, password } = data 
    return(
        <>
            <Helmet>
                <title>Iniciar Sesion</title>
            </Helmet>
            <Header>
                <ContenedorHeader>
                    <Titulo>Iniciar Sesion</Titulo>
                    {/* <div>
                        <Boton to="/signup">
                            Registrarse
                        </Boton>
                    </div> */}
                </ContenedorHeader>
            </Header>
            <Formulario onSubmit={handleOnSubmit}>
                <Svg/>
                <Input 
                    type="email" 
                    name="email"
                    value={email}
                    onChange={handleOnChange}
                    placeholder='Correo Electronico'/>
                <Input 
                    type="password" 
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder='Contraseña'
                />
                <ContenedorBoton>
                    <Boton as="button" type="submit" $primario>Iniciar Sesion</Boton>
                </ContenedorBoton>
            </Formulario>
            <Alerta alerta={alerta} setAlerta={setAlerta}/>
        </>
    )
}
export default SignIn
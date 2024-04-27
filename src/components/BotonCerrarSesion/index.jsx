import IconoCerrarSesion from './../../assets/imagenes/log-out.svg?react'
import Boton from '../../elements/Boton'
import { auth } from '../../firebase/firebaseConfig'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const BotonCerrarSesion = () => {
    const navigate = useNavigate()
    const cerrarSesion = async() => {
        try{
            await signOut(auth)
            navigate('/signin')
        }catch(error){
            console.log(error)
        }
    }
    return(
        <Boton $iconoGrande as="button" onClick={cerrarSesion}>
            <IconoCerrarSesion/>
        </Boton>
    )
}
export default BotonCerrarSesion
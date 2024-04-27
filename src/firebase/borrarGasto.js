import { db } from './firebaseConfig'
import { doc, deleteDoc } from 'firebase/firestore'

const borrarGasto = async(id) => {
    try{
        await deleteDoc(doc(db, 'lotes', id))
    }catch(error){
        console.log(error)
    }
}
export default borrarGasto
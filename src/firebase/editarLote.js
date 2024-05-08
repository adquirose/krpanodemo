import { db } from "./firebaseConfig";
import { doc, updateDoc } from 'firebase/firestore'

const editarLote = async({id, ath, atv, nombreLote, nombreSpot, estado, precio, fecha}) => {
    const documento = doc(db,'lotes', id)
    return await updateDoc(documento, {
        ath: ath,
		atv: atv,
        nombreLote: nombreLote,
        nombreSpot: nombreSpot,
        estado: estado,
		precio: Number(precio),
		fecha: fecha
    })
}
export default editarLote
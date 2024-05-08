import { useEffect, useState } from "react"
import { db } from "../firebase/firebaseConfig"
import { query, collection, onSnapshot } from "firebase/firestore"

const useObtenerLotes = () => {
    const [lotes, setLotes] = useState([])

    useEffect(() => {
        const consulta = query(
            collection(db, 'lotes')
        )
        const unsuscribe = onSnapshot(consulta,(snapshot) => {
            setLotes(snapshot.docs.map((lote) => {
                return { ...lote.data(), id: lote.id }
            }))
        })
        return unsuscribe
    },[])
    return lotes
}
export default useObtenerLotes
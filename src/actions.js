import{ firebaseApp } from './firebase'
import firebase from 'firebase' // importa todo de firebase
require ('firebase/firestore') //da accesoa  las colleciones de la base de datos

const db = firebase.firestore(firebaseApp)    //para poder acceder a la base de datos

export const getCollection = async(collection) => {  //crea método genérico que permite obtener una colección de datos
    const result = { statusResponse : false, data: null, error: null }  //crea un objeto result igual a objeto con parámetro statusresponse que falló, cuyo data es nulo y el error es nulo
    try { //hacemos consulta a base de datos
        const data = await db.collection(collection).get()   // si pudo hacer consulta de base de datos obtenenmos la data
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data()}))    //crea variable arrayData y le pasa elemento docs que está dentro de data y lo mapea, le dice que es de tipo doc documento también la pasa el id
        result.statusResponse = true
        result.data = arrayData
    }  catch (error) {  //en caso de que falleva va a haber un error
        result.error = error
    }

    return result
}   

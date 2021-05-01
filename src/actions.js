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
    }  catch (error) {  //en caso de que falle va va a haber un error
        result.error = error
    }
    return result
}   

export const addDocument = async(collection, data) =>{    //crea nuevo método addDocument, método asíncrono que recibe 2 parámetros collection y data
    const result = { statusResponse : false, data: null, error: null }  //crea un objeto result igual a objeto con parámetro statusresponse que falló, cuyo data es nulo y el error es nulo
    try {
        const response = await db.collection(collection).add(data)   // si pudo hacer consulta de base de datos obtenenmos la data de acuerdo al parámetro que le pasamos en collection
        result.data = { id: response.id }//le vamos a pedir que nos devuelva solo el id de la tarea
        result.statusResponse = true    //estamos diciendo que se pudo obtener la información fue exitosa la consulta
    } catch (error) {   //en caso de que falle la consulta va va a haber un error
        result.error = error //si hay un error  guarda en la constante result el error que arroje la base de datos
    }
    return result
}

export const getDocument = async(collection, id) => {   //Método para obtener un solo documento de la base de datos en línea
    const result = { statusResponse : false, data: null, error: null }  //crea un objeto result igual a objeto con parámetro statusresponse que falló, cuyo data es nulo y el error es nulo
    try {
        const response = await db.collection(collection).doc(id).get()  //crea variable response y espera consulta base de datos de la colección de acuerdo al nombre del parámtero collection que pasamos, que nos devuelva de un documento con su id
        result.data = { id: response.id, ...response.data() }  //result.data tiene dos partes id del response pero la data viene del response.data
    } catch (error) {   //en caso de que falle la consulta va va a haber un error
        result.error = error //si hay un error  guarda en la constante result el error que arroje la base de datos
    }
    return result
}

export const updateDocument = async(collection, id, data) => {   //Método para actualizar un  documento de la base de datos en línea
    const result = { statusResponse : false, error: null }  //crea un objeto result igual a objeto con parámetro statusresponse que falló, no es necesario colocar data:null, pero sí el error es nulo
    try {   //como no hay que devolver la data entonces se ejecuta método update
        await db.collection(collection).doc(id).update(data)  //espera la collectiond el a base de datos acorde al parámetro collection y el id, luego llama  método update y actualiza data
        result.statusResponse = true    //si la actulización funciona statusResponse es true
    } catch (error) {   //en caso de que falle la consulta va va a haber un error
        result.error = error //si hay un error  guarda en la constante result el error que arroje la base de datos
    }
    return result
}

export const deleteDocument = async(collection, id) => {   //Método para elimiar un  documento de la base de datos en línea
    const result = { statusResponse : false, error: null }  //crea un objeto result igual a objeto con parámetro statusresponse que falló, no es necesario colocar data:null, pero sí el error es nulo
    try {
        await db.collection(collection).doc(id).delete()
        result.statusResponse = true    //si la actulización funciona statusResponse es true
    } catch (error) {   //en caso de que falle la consulta va va a haber un error
        result.error = error //si hay un error  guarda en la constante result el error que arroje la base de datos
    }
    return result
}
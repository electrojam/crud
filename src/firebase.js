import firebase from 'firebase/app' //importar libreria firebase desde firebaseapp
import 'firebase/firestore'  //se conecta a la base de datos

const firebaseConfig = {
    apiKey: "AIzaSyAOpsmow8I1hbGGYrkJ7a144IRBC5JDtMI",
    authDomain: "crud-1a363.firebaseapp.com",
    projectId: "crud-1a363",
    storageBucket: "crud-1a363.appspot.com",
    messagingSenderId: "1032228750454",
    appId: "1:1032228750454:web:7defb203018da34ca90b57"
  }

export const firebaseApp = firebase.initializeApp(firebaseConfig) //inicializa la aplicación, conectar con la base de datos


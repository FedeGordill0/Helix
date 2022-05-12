// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  getDocs,
  setDoc,
  getFirestore,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const config = {
  apiKey: "AIzaSyCxeFLF8jzsVo5gao-fks7MU_EAn-YWofA",
  authDomain: "sistema-cee14.firebaseapp.com",
  projectId: "sistema-cee14",
  storageBucket: "sistema-cee14.appspot.com",
  messagingSenderId: "21208641041",
  appId: "1:21208641041:web:ab46f193d5abd8b5674bb0",
  measurementId: "G-HG5996MZMG",
};

// Initialize Firebase
const app = initializeApp(config);
const analytics = getAnalytics(app);

//Crear Usuario
export async function firebaseRegistrarUsuario(email, password) {
  let credenciales = await createUserWithEmailAndPassword(getAuth(), email, password);
}

//Inicio de Sesión
export async function firebaseIniciarSesion(email, password) {
  try {
    let credenciales = await signInWithEmailAndPassword(getAuth(), email, password);
  } catch (e) {
    return false;
  }
  return true;
}

//Crear Cliente
export function firebaseCrear(coleccion, objeto) {
  objeto.id = uuidv4();

  let referencia = doc(getFirestore(), coleccion, objeto.id);
  setDoc(referencia, objeto);
}

//Mostrar Clientes
export async function firebaseBuscar(coleccionABuscar) {
  let listado = [];
  let consulta = collection(getFirestore(), coleccionABuscar);
  let resultado = await getDocs(consulta);
  resultado.forEach((documento) => {
    documento.id;
    let objeto = documento.data();
    objeto.id = documento.id;
    listado.push(objeto);
  });

  return listado;
}
//Eliminar Cliente
export async function firebaseEliminar(coleccion, id) {
  await deleteDoc(doc(getFirestore(), coleccion, id));
}

//Actualizar Cliente
export async function firebaseActualizar(id, phone) {
  await updateDoc(doc(getFirestore(), coleccion, id));
}

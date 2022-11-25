  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"
  import { getFirestore, collection, addDoc, getDocs, getDoc, doc, setDoc, onSnapshot, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCBdHdh0hH5NXTgJpLDZDA-KQ9nJHGzXCU",
    authDomain: "form-fce.firebaseapp.com",
    databaseURL: "https://form-fce.firebaseio.com",
    projectId: "form-fce",
    storageBucket: "form-fce.appspot.com",
    messagingSenderId: "258213920771",
    appId: "1:258213920771:web:797dbf5b28968875b28e36"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);

  let id = "";

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      const email = user.email;
      console.log(user.uid);
      console.log(user.email);

      // leer datos
      const datosPersonales = doc(db, "clientes", uid, "datosPersonales", "datosPersonalesDetalle");
      const datosPersonalesDetalle = await getDoc(datosPersonales);

      document.getElementById('apellido').innerHTML = datosPersonalesDetalle.data().apellido;
      document.getElementById('nombre').innerHTML = datosPersonalesDetalle.data().nombre;
      document.getElementById('fechaDeNacimiento').innerHTML = datosPersonalesDetalle.data().fechaDeNacimiento;
      document.getElementById('apellidoMaterno').innerHTML = datosPersonalesDetalle.data().apellidoMaterno;
      document.getElementById('cuit').innerHTML = datosPersonalesDetalle.data().cuit;

      // listar empresas
      const listarEmpresasDetalle = document.getElementById('listarEmpresas')

      onSnapshot(collection(db, "clientes", uid, "datosSocietarios"), (listarEmpresas) => {

        let html = ''
        listarEmpresas.forEach(doc => {
          html += `
          <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold" style="text-transform:uppercase">${doc.data().empresaRazonSocial}</div>
            ${doc.data().empresaCuit}
          </div>
          <button class="btn btn-danger btn-borrar" type="button" data-id="${doc.id}">Borrar <i class="bi bi-trash3-fill"></i></button>
        </li>

          `
        })
  
        listarEmpresasDetalle.innerHTML = html;

        // Borrar datos
        const btnBorrar = listarEmpresasDetalle.querySelectorAll('.btn-borrar')
        btnBorrar.forEach(btn => {
          btn.addEventListener('click', ({target: {dataset}}) => {
            const deleteEmpresa = id => deleteDoc(doc(db, "clientes", uid, "datosSocietarios", id));
            deleteEmpresa(dataset.id)
          })
        })
        
      })

      // agregar empresas
      const empresasFB = document.querySelector("#empresasFB");
      empresasFB.addEventListener("submit", async (e) => {
        e.preventDefault();
  
        const empresaRazonSocial = empresasFB["empresaRazonSocial"];
        const empresaCuit = empresasFB["empresaCuit"];
  
        const docRef = doc(db, "clientes", uid);
        const dataEmpresa = {
          agregaCollection: addDoc(collection(docRef, "datosSocietarios"), {
          empresaRazonSocial: empresaRazonSocial.value,
          empresaCuit: empresaCuit.value
          })}
          empresasFB.reset();
        });

      // agregar datos personales
      const datosFB = document.querySelector("#datosFB");
      datosFB.addEventListener("submit", async (e) => {
        e.preventDefault();
  
        const fechaDeNacimiento = datosFB["fechaDeNacimiento"];
        const apellidoMaterno = datosFB["apellidoMaterno"];
        const cuit = datosFB["cuit"];
  
        const docRef = doc(db, "clientes", uid);
        const dataEmpresa = {
          agregaCollection: addDoc(collection(docRef, "datosPersonales", "datosPersonalesDetalle"), {
          fechaDeNacimiento: fechaDeNacimiento.value,
          apellidoMaterno: apellidoMaterno.value,
          cuit: cuit
          })}
          datosFB.reset();
        });

      // signout process
      document.getElementById('signOut').addEventListener('click', function (event) {
        const auth = getAuth();
        signOut(auth).then(() => {
          // Sign-out successful.
        }).catch((error) => {
          // An error happened.
        });
      });
    } else {
      window.location.href = "clientes.html";
      // User is signed out    
    }
  });


  $(document).ready(function(){
    $('#empresaCuit').mask('00-00000000-0');
    $('#cuit').mask('00-00000000-0');
    $('#fechaDeNacimiento').mask('00/00/0000');
  });
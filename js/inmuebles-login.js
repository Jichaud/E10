  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"
  import { getFirestore, collection, addDoc, getDocs, getDoc, doc, setDoc, onSnapshot, deleteDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"

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

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      const email = user.email;
      console.log(user.uid);
      console.log(user.email);

      // listar datos
      const listarInueblesDetalle = document.getElementById('listarInmuebles')

      onSnapshot(collection(db, "clientes", uid, "inmuebles"), (listarInmuebles) => {

        let html = ''
        listarInmuebles.forEach(doc => {
          html += `
          <div class="card border border-2 border-success mt-3">
          <div class="card-body">
            <h5 class="card-title fw-bolder" style="text-transform:uppercase">${doc.data().domicilioCalle}</h5>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">${doc.data().fechaAlta}</li>
              <li class="list-group-item">${doc.data().destinoInmueble}</li>
              <li class="list-group-item text-center h2-a text-light bg-success rounded-2 fw-bolder" style="Number.prototype.toLocaleString()">${doc.data().valorCompra}</li>
            </ul>
            <div class="d-grid gap-2 d-md-block mt-3 float-end">
              <button class="btn btn-warning" type="button">Editar <i class="bi bi-pencil-fill"></i></button>
              <button class="btn btn-danger btn-borrar" type="button" data-id="${doc.id}">Borrar <i class="bi bi-trash3-fill"></i></button>
            </div>
          </div>
        </div>
          `
        })
  
        listarInueblesDetalle.innerHTML = html;
        const btnBorrar = listarInueblesDetalle.querySelectorAll('.btn-borrar')
        btnBorrar.forEach(btn => {
          btn.addEventListener('click', ({target: {dataset}}) => {
            const deleteInmueble = id => deleteDoc(doc(db, "clientes", uid, "inmuebles", id));
            deleteInmueble(dataset.id)
          })
        })
  
      })

    // agregar datos
    const inmueblesFB = document.querySelector("#inmueblesFB");
    inmueblesFB.addEventListener("submit", async (e) => {
      e.preventDefault();

      const fechaAlta = inmueblesFB["fechaAlta"].value;
      const tipoInmueble = inmueblesFB["tipoInmueble"].value;
      const destinoInmueble = inmueblesFB["destinoInmueble"].value;
      const domicilioCalle = inmueblesFB["domicilioCalle"].value;
      const domicilioLocalidad = inmueblesFB["domicilioLocalidad"].value;
      const domicilioCodigoPostal = inmueblesFB["domicilioCodigoPostal"].value;
      const domicilioProvincia = inmueblesFB["domicilioProvincia"].value;
      const montoHipoteca = inmueblesFB["montoHipoteca"].value;
      const partidaInmobiliaria = inmueblesFB["partidaInmobiliaria"].value;
      const valuacionFiscal = inmueblesFB["valuacionFiscal"].value;
      const valorCompra = inmueblesFB["valorCompra"].value;

      await addDoc(collection(db, "clientes", uid, "inmuebles"), {
        fechaAlta: fechaAlta,
        tipoInmueble: tipoInmueble,
        destinoInmueble: destinoInmueble,
        domicilioCalle: domicilioCalle,
        domicilioLocalidad: domicilioLocalidad,
        domicilioCodigoPostal: domicilioCodigoPostal,
        domicilioProvincia: domicilioProvincia,
        montoHipoteca: montoHipoteca,
        partidaInmobiliaria: partidaInmobiliaria,
        valuacionFiscal: valuacionFiscal,
        valorCompra: valorCompra
      })
      inmueblesFB.reset();
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
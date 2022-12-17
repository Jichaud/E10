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

  let editStatus = false;
  let id = "";
  tipoActivo.focus();
  
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      const email = user.email;
      console.log(user.uid);
      console.log(user.email);

      const updateDemas = (id, newFields) => updateDoc(doc(db, "clientes", uid, "Demas", id), newFields);

      // listar datos
      const listarDemasDetalle = document.getElementById('listarDemas')

      onSnapshot(collection(db, "clientes", uid, "Demas"), (listarDemas) => {

        let html = ''
        listarDemas.forEach(doc => {
          html += `
          <div class="card border border border-success mt-3 align-center">
            <div class="card-header">
              <h5 class="card-title fw-bolder">${doc.data().tipoActivo}</h5>
            </div>
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><i class="bi bi-check-circle-fill text-primary"></i> Radicación: ${doc.data().radicacion}</li>
                <li class="list-group-item"><i class="bi bi-check-circle-fill text-primary"></i> Tipo de rendimiento: ${doc.data().tipoRendimiento}</li>
                <li class="list-group-item"><i class="bi bi-check-circle-fill text-primary"></i> Monto del rendimiento: ${doc.data().montoRendimiento}</li>
                <li class="list-group-item" style="text-transform:uppercase"><i class="bi bi-check-circle-fill text-primary"></i> Detalle activo: ${doc.data().detalleActivo}</li>
              </ul>
            </div>
            <div class="card-footer">
              <div class="d-grid-2 gap-2 d-md-block float-end">
                <button class="btn btn-warning btn-edit" type="button" data-id="${doc.id}">Editar <i class="bi bi-pencil-fill"></i></button>
                <button class="btn btn-danger btn-borrar" type="button" data-id="${doc.id}">Borrar <i class="bi bi-trash3-fill"></i></button>
              </div>
            </div>
          </div>
          `
        })
  
        listarDemasDetalle.innerHTML = html;
        
        // Borrar datos
        const btnBorrar = listarDemasDetalle.querySelectorAll('.btn-borrar')
        btnBorrar.forEach(btn => {
          btn.addEventListener('click', ({target: {dataset}}) => {
            const deleteDemas = id => deleteDoc(doc(db, "clientes", uid, "Demas", id));
            deleteDemas(dataset.id)
          })
        })

        // Editar datos
        const editarDemas = id => getDoc(doc(db, "clientes", uid, "Demas", id));
        const btnEditar = listarDemasDetalle.querySelectorAll('.btn-edit')
          btnEditar.forEach((btn) => {
            btn.addEventListener('click', async (e) => {
              const doc = await editarDemas(e.target.dataset.id)
              console.log(doc.data());
              const editar = doc.data()
              demasFB["tipoActivo"].value = editar.tipoActivo
              demasFB["fechaCompra"].value = editar.fechaCompra
              demasFB["valorCompra"].value = editar.valorCompra
              demasFB["radicacion"].value = editar.radicacion
              demasFB["tipoRendimiento"].value = editar.tipoRendimiento
              demasFB["montoRendimiento"].value = editar.montoRendimiento
              demasFB["fechaVenta"].value = editar.fechaVenta
              demasFB["valorVenta"].value = editar.valorVenta
              demasFB["detalleActivo"].value = editar.detalleActivo
              editStatus = true;
              id = doc.id;
              document.getElementById('agregarDemas').innerHTML = "Editar";
            })
          })
      })

    // agregar / editar datos
    
    const demasFB = document.querySelector("#demasFB");
    demasFB.addEventListener("submit", async (e) => {
      e.preventDefault();

      const tipoActivo = demasFB["tipoActivo"];
      const fechaCompra = demasFB["fechaCompra"];
      const valorCompra = demasFB["valorCompra"];
      const radicacion = demasFB["radicacion"];
      const tipoRendimiento = demasFB["tipoRendimiento"];
      const montoRendimiento = demasFB["montoRendimiento"];
      const fechaVenta = demasFB["fechaVenta"];
      const valorVenta = demasFB["valorVenta"];
      const detalleActivo = demasFB["detalleActivo"];

      if (!editStatus) {
      const docRef = doc(db, "clientes", uid);
      const dataSaldo = {
        agregaCollection: addDoc(collection(docRef, "Demas"), {
        tipoActivo: tipoActivo.value,
        fechaCompra: fechaCompra.value,
        valorCompra: valorCompra.value,
        radicacion: radicacion.value,
        tipoRendimiento: tipoRendimiento.value,
        montoRendimiento: montoRendimiento.value,
        fechaVenta: fechaVenta.value,
        valorVenta: valorVenta.value,
        detalleActivo: detalleActivo.value
      })};
    } else {
      await updateDemas(id, {
        tipoActivo: tipoActivo.value,
        fechaCompra: fechaCompra.value,
        valorCompra: valorCompra.value,
        radicacion: radicacion.value,
        tipoRendimiento: tipoRendimiento.value,
        montoRendimiento: montoRendimiento.value,
        fechaVenta: fechaVenta.value,
        valorVenta: valorVenta.value,
        detalleActivo: detalleActivo.value
      })
      editStatus = false;
      document.getElementById('agregarDemas').innerHTML = "Agregar";
    }
    
      demasFB.reset();
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      tipoActivo.focus();
    });

         // auditor
         const verBoolean = onSnapshot(doc(db, "clientes", uid), doc => {
          console.log(doc.data().auditorDemas);
          const valorBoolean = doc.data().auditorDemas;
  
          if (valorBoolean === true) {
            console.log("verdadero");
            $('.btn-borrar').prop('disabled', false);
            $('.btn-edit').prop('disabled', false);
            const btnAgregar = document.querySelector('.agregarDemas');
            btnAgregar.disabled = false;
          } else {
            console.log("falso");
            $('.btn-borrar').prop('disabled', true);
            $('.btn-edit').prop('disabled', true);
            const btnAgregar = document.querySelector('.agregarDemas');
            btnAgregar.disabled = true;
  
          }
        });
  

    // datos cabecera
    const listarDatosCabeceraDetalle = document.getElementById('listarDatosCabecera')

    onSnapshot(collection(db, "clientes", uid, "datosPersonales"), (listarDatosCabecera) => {

    let htmlDatos = ''
    listarDatosCabecera.forEach(doc => {
    htmlDatos += `
    <div class="row g-2">
    <div class="col-6">
    <h4 class="alert-heading fw-bold" style="text-transform:uppercase">${doc.data().nombre} ${doc.data().apellido}</h4>
    <p class="mb-0 alert-heading">DDJJ ganancias - bienes personales - período fiscal 2022</p>
  </div>
    <div class="col-4 ms-auto d-grid gap-2">
      <button class="btn btn-primary" onclick="location.href='clientes-login.html'">Ir a inicio</button>
    </div>
  </div>
    <hr>
    <p class="mb-0 alert-heading">Acciones - Títulos - Plazo fijo - FCI - etc.</p>
  `
  })

  listarDatosCabeceraDetalle.innerHTML = htmlDatos;

  })


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

  $(function(){
    $('#fechaCompra').mask('00/00/0000');
    $('#fechaVenta').mask('00/00/0000');
    $('#valorCompra').mask('000.000.000.000.000,00', {reverse: true});
    $('#montoRendimiento').mask('000.000.000.000.000,00', {reverse: true});
    $('#valorVenta').mask('000.000.000.000.000,00', {reverse: true});
  });
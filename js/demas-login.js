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
  nombreEmpresa.focus();
  
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      const email = user.email;
      console.log(user.uid);
      console.log(user.email);

      const updateSaldo = (id, newFields) => updateDoc(doc(db, "clientes", uid, "Saldos", id), newFields);

      // listar datos
      const listarSaldosDetalle = document.getElementById('listarSaldos')

      onSnapshot(collection(db, "clientes", uid, "Saldos"), (listarSaldos) => {

        let html = ''
        listarSaldos.forEach(doc => {
          html += `
          <div class="card border border border-success mt-3 align-center">
            <div class="card-header">
              <h5 class="card-title fw-bolder" style="text-transform:uppercase">${doc.data().nombreEmpresa} ${doc.data().tipoSocietario}</h5>
            </div>
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item" style="text-transform:uppercase"><i class="bi bi-check-circle-fill text-primary"></i> Tipo de saldo: ${doc.data().pais}</li>
                <li class="list-group-item"><i class="bi bi-check-circle-fill text-primary"></i> Tipo de saldo: ${doc.data().tipoSaldo}</li>
                <li class="list-group-item"><i class="bi bi-check-circle-fill text-primary"></i> Estado del saldo: ${doc.data().estadoSaldo}</li>
                <li class="list-group-item" style="text-transform:uppercase"><i class="bi bi-check-circle-fill text-primary"></i> Moneda extranjera: ${doc.data().nombreME}</li>
                <li class="list-group-item" style="text-transform:uppercase"><i class="bi bi-check-circle-fill text-primary"></i> Importe moneda extranjera: ${doc.data().montoNominalME}</li>
                <li class="list-group-item fw-bolder"><i class="bi bi-check-circle-fill text-primary"></i> Valor al 31/12: $ ${doc.data().valorPesos}</li>
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
  
        listarSaldosDetalle.innerHTML = html;
        
        // Borrar datos
        const btnBorrar = listarSaldosDetalle.querySelectorAll('.btn-borrar')
        btnBorrar.forEach(btn => {
          btn.addEventListener('click', ({target: {dataset}}) => {
            const deleteSaldos = id => deleteDoc(doc(db, "clientes", uid, "Saldos", id));
            deleteSaldos(dataset.id)
          })
        })

        // Editar datos
        const editarSaldos = id => getDoc(doc(db, "clientes", uid, "Saldos", id));
        const btnEditar = listarSaldosDetalle.querySelectorAll('.btn-edit')
          btnEditar.forEach((btn) => {
            btn.addEventListener('click', async (e) => {
              const doc = await editarSaldos(e.target.dataset.id)
              console.log(doc.data());
              const editar = doc.data()
              saldosFB["nombreEmpresa"].value = editar.nombreEmpresa
              saldosFB["pais"].value = editar.pais
              saldosFB["tipoSaldo"].value = editar.tipoSaldo
              saldosFB["estadoSaldo"].value = editar.estadoSaldo
              saldosFB["nombreME"].value = editar.nombreME
              saldosFB["montoNominalME"].value = editar.montoNominalME
              saldosFB["cuit"].value = editar.cuit
              saldosFB["tipoSocietario"].value = editar.tipoSocietario
              saldosFB["valorPesos"].value = editar.valorPesos
              editStatus = true;
              id = doc.id;
              document.getElementById('agregarSaldos').innerHTML = "Editar";
            })
          })
      })

    // agregar / editar datos
    
    const saldosFB = document.querySelector("#saldosFB");
    saldosFB.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nombreEmpresa = saldosFB["nombreEmpresa"];
      const pais = saldosFB["pais"];
      const tipoSaldo = saldosFB["tipoSaldo"];
      const estadoSaldo = saldosFB["estadoSaldo"];
      const nombreME = saldosFB["nombreME"];
      const montoNominalME = saldosFB["montoNominalME"];
      const cuit = saldosFB["cuit"];
      const tipoSocietario = saldosFB["tipoSocietario"];
      const valorPesos = saldosFB["valorPesos"];

      if (!editStatus) {
      const docRef = doc(db, "clientes", uid);
      const dataSaldo = {
        agregaCollection: addDoc(collection(docRef, "Saldos"), {
        nombreEmpresa: nombreEmpresa.value,
        pais: pais.value,
        tipoSaldo: tipoSaldo.value,
        estadoSaldo: estadoSaldo.value,
        nombreME: nombreME.value,
        montoNominalME: montoNominalME.value,
        cuit: cuit.value,
        tipoSocietario: tipoSocietario.value,
        valorPesos: valorPesos.value
      })};
    } else {
      await updateSaldo(id, {
        nombreEmpresa: nombreEmpresa.value,
        pais: pais.value,
        tipoSaldo: tipoSaldo.value,
        estadoSaldo: estadoSaldo.value,
        nombreME: nombreME.value,
        montoNominalME: montoNominalME.value,
        cuit: cuit.value,
        tipoSocietario: tipoSocietario.value,
        valorPesos: valorPesos.value
      })
      editStatus = false;
      document.getElementById('agregarSaldos').innerHTML = "Agregar";
    }
    
      saldosFB.reset();
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      nombreEmpresa.focus();
    });

         // auditor
         const puedeEditar = doc(db, "clientes", uid);
         const auditor = await getDoc(puedeEditar);
         const auditorBoolean = await auditor.data().auditorSaldos;
         // const valueAuditor = puedeEditar.uid;
         console.log(auditor.data().auditorSaldos);
         if (auditorBoolean === true) {
           console.log("verdadero");
         } else {
           console.log("falso");
           $('.btn-borrar').prop('disabled', true);
           $('.btn-edit').prop('disabled', true);
           const btnAgregar = document.querySelector('.agregarSaldos');
           btnAgregar.disabled = true;
           
         }

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
    <p class="mb-0 alert-heading">Saldos con empresas</p>
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
    $('#valorPesos').mask('000.000.000.000.000,00', {reverse: true});
    $('#cuit').mask('00-00000000-0');
  });
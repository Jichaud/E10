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
  nombreBanco.focus();

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      const email = user.email;
      console.log(user.uid);
      console.log(user.email);

      const updateBanco = (id, newFields) => updateDoc(doc(db, "clientes", uid, "Bancos", id), newFields);

      // listar datos
      const listarBancosDetalle = document.getElementById('listarBancos')

      onSnapshot(collection(db, "clientes", uid, "Bancos"), (listarBancos) => {

        let html = ''
        listarBancos.forEach(doc => {
          html += `
          <div class="card border border border-success mt-3 align-center">
            <div class="card-header">
              <h5 class="card-title fw-bolder" style="text-transform:uppercase">${doc.data().nombreBanco} | ${doc.data().nombreSucursal}</h5>
            </div>
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><i class="bi bi-check-circle-fill text-primary"></i> Nº de cuenta: ${doc.data().numeroCuenta}</li>
                <li class="list-group-item"><i class="bi bi-check-circle-fill text-primary"></i> Tipo de cuenta: ${doc.data().tipoCuenta}</li>
                <li class="list-group-item" style="text-transform:uppercase"><i class="bi bi-check-circle-fill text-primary"></i> Estado cuenta: ${doc.data().estadoCuenta}</li>
                <li class="list-group-item fw-bold"><i class="bi bi-check-circle-fill text-primary"></i> Saldo al 31/12: ${doc.data().saldoPesos}</li>
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
  
        listarBancosDetalle.innerHTML = html;
        
        // Borrar datos
        const btnBorrar = listarBancosDetalle.querySelectorAll('.btn-borrar')
        btnBorrar.forEach(btn => {
          btn.addEventListener('click', ({target: {dataset}}) => {
            const deleteBanco = id => deleteDoc(doc(db, "clientes", uid, "Bancos", id));
            deleteBanco(dataset.id)
          })
        })

        // Editar datos
        const editarBanco = id => getDoc(doc(db, "clientes", uid, "Bancos", id));
        const btnEditar = listarBancosDetalle.querySelectorAll('.btn-edit')
          btnEditar.forEach((btn) => {
            btn.addEventListener('click', async (e) => {
              const doc = await editarBanco(e.target.dataset.id)
              console.log(doc.data());
              const editar = doc.data()
              bancosFB["nombreBanco"].value = editar.nombreBanco
              bancosFB["pais"].value = editar.pais
              bancosFB["nombreSucursal"].value = editar.nombreSucursal
              bancosFB["codigoSucursal"].value = editar.codigoSucursal
              bancosFB["cbu"].value = editar.cbu
              bancosFB["numeroCuenta"].value = editar.numeroCuenta
              bancosFB["tipoCuenta"].value = editar.tipoCuenta
              bancosFB["estadoCuenta"].value = editar.estadoCuenta
              bancosFB["nombreME"].value = editar.nombreME
              bancosFB["nominalME"].value = editar.nominalME
              bancosFB["saldoPesos"].value = editar.saldoPesos
              editStatus = true;
              id = doc.id;
              document.getElementById('agregarBancos').innerHTML = "Editar";
            })
          })            
      })

    // agregar / editar datos
    
    const bancosFB = document.querySelector("#bancosFB");
    bancosFB.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nombreBanco = bancosFB["nombreBanco"];
      const pais = bancosFB["pais"];
      const nombreSucursal = bancosFB["nombreSucursal"];
      const codigoSucursal = bancosFB["codigoSucursal"];
      const cbu = bancosFB["cbu"];
      const numeroCuenta = bancosFB["numeroCuenta"];
      const tipoCuenta = bancosFB["tipoCuenta"];
      const estadoCuenta = bancosFB["estadoCuenta"];
      const nombreME = bancosFB["nombreME"];
      const nominalME = bancosFB["nominalME"];
      const saldoPesos = bancosFB["saldoPesos"];

      if (!editStatus) {
      const docRef = doc(db, "clientes", uid);
      const dataBanco = {
        agregaCollection: addDoc(collection(docRef, "Bancos"), {
        nombreBanco: nombreBanco.value,
        pais: pais.value,
        nombreSucursal: nombreSucursal.value,
        codigoSucursal: codigoSucursal.value,
        cbu: cbu.value,
        numeroCuenta: numeroCuenta.value,
        tipoCuenta: tipoCuenta.value,
        estadoCuenta: estadoCuenta.value,
        nombreME: nombreME.value,
        nominalME: nominalME.value,
        saldoPesos: saldoPesos.value
      })};
    } else {
      await updateBanco(id, {
        nombreBanco: nombreBanco.value,
        pais: pais.value,
        nombreSucursal: nombreSucursal.value,
        codigoSucursal: codigoSucursal.value,
        cbu: cbu.value,
        numeroCuenta: numeroCuenta.value,
        tipoCuenta: tipoCuenta.value,
        estadoCuenta: estadoCuenta.value,
        nombreME: nombreME.value,
        nominalME: nominalME.value,
        saldoPesos: saldoPesos.value
      })
      editStatus = false;
      document.getElementById('agregarBancos').innerHTML = "Agregar";
    }
    
      bancosFB.reset();
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      nombreBanco.focus();
    });

         // auditor
         const verBoolean = onSnapshot(doc(db, "clientes", uid), doc => {
          console.log(doc.data().auditorBancos);
          const valorBoolean = doc.data().auditorBancos;
  
          if (valorBoolean === true) {
            console.log("verdadero");
            $('.btn-borrar').prop('disabled', false);
            $('.btn-edit').prop('disabled', false);
            const btnAgregar = document.querySelector('.agregarBancos');
            btnAgregar.disabled = false;
          } else {
            console.log("falso");
            $('.btn-borrar').prop('disabled', true);
            $('.btn-edit').prop('disabled', true);
            const btnAgregar = document.querySelector('.agregarBancos');
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
    <p class="mb-0 alert-heading">Bancos</p>
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
    $('#saldoPesos').mask('000.000.000.000.000,00', {reverse: true});
    $('#nominalME').mask('000.000.000.000.000,00', {reverse: true});
    $('#cbu').mask('00000000 00000000000000', {reverse: true});
  });
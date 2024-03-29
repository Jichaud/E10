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

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      const email = user.email;
      console.log(user.uid);
      console.log(user.email);

      // listar datos inmuebles
      const listarInmueblesDetalle = document.getElementById('listarInmuebles')

      onSnapshot(collection(db, "clientes", uid, "inmuebles"), (listarInmuebles) => {

        let htmlInmuebles = ''
        listarInmuebles.forEach(doc => {
          htmlInmuebles += `
          <span class="list-group-item list-group-item-action" aria-current="true">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1"  style="text-transform:capitalize">${doc.data().domicilioCalle}</h5>
              <small class="text-danger fw-bold badge bg-danger text-white mb-1">${doc.data().destinoInmueble}</small>
            </div>
            <p class="mb-1">$${doc.data().valorCompra}</p>
            <p class="mb-1">${doc.data().fechaAlta}</p>
            <small class="fw-bold"><i class="bi bi-circle-fill text-danger"></i> inmuebles</small>
          </span>
          `
        })

        listarInmueblesDetalle.innerHTML = htmlInmuebles;
      })

      // listar datos rodados
      const listarRodadosDetalle = document.getElementById('listarRodados')

      onSnapshot(collection(db, "clientes", uid, "Rodados"), (listarRodados) => {

        let htmlRodados = ''
        listarRodados.forEach(doc => {
          htmlRodados += `
          <span class="list-group-item list-group-item-action" aria-current="true">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1"  style="text-transform:uppercase">${doc.data().marca} | ${doc.data().modelo}</h5>
              <small class="text-warning mb-1 fw-bold badge bg-warning text-dark" style="text-transform:uppercase">${doc.data().patenteNumero}</small>
            </div>
            <p class="mb-1">$${doc.data().valorCompra}</p>
            <p class="mb-1">${doc.data().fechaAlta}</p>
            <small class="fw-bold"><i class="bi bi-circle-fill text-warning"></i> rodados</small>
          </span>
          `
        })

        listarRodadosDetalle.innerHTML = htmlRodados;
      })

      // listar datos bancos
      const listarBancosDetalle = document.getElementById('listarBancos')

      onSnapshot(collection(db, "clientes", uid, "Bancos"), (listarBancos) => {

        let htmlBancos = ''
        listarBancos.forEach(doc => {
          if(doc.data().nombreME=="") {
          htmlBancos += `
          <span class="list-group-item list-group-item-action" aria-current="true">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1"  style="text-transform:uppercase">${doc.data().nombreBanco} | ${doc.data().nombreSucursal}</h5>
              <small class="text-white mb-1 fw-bold badge bg-primary" style="text-transform:uppercase">Pesos</small>
            </div>
            <p class="mb-1">${doc.data().tipoCuenta}</p>
            <p class="mb-1">${doc.data().numeroCuenta}</p>
            <p class="mb-1 fw-bolder text-primary">$${doc.data().saldoPesos}</p>
            <p class="mb-1">${doc.data().estadoCuenta}</p>
            <small class="fw-bold"><i class="bi bi-circle-fill text-primary"></i> bancos</small>
          </span>
          `
          } else {
          htmlBancos += `
          <span class="list-group-item list-group-item-action" aria-current="true">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1" style="text-transform:uppercase">${doc.data().nombreBanco} | ${doc.data().nombreSucursal}</h5>
              <small class="mb-1 text-white badge bg-success fw-bold" style="text-transform:uppercase">${doc.data().nombreME}</small>
            </div>
            <p class="mb-1">${doc.data().tipoCuenta}</p>
            <p class="mb-1">${doc.data().numeroCuenta}</p>
            <p class="mb-1 fw-bolder text-success" style="text-transform:uppercase">${doc.data().nombreME} ${doc.data().nominalME}</p>
            <p class="mb-1">$${doc.data().saldoPesos}</p>
            <p class="mb-1">${doc.data().estadoCuenta}</p>
            <small class="fw-bold"><i class="bi bi-circle-fill text-success"></i> bancos</small>
          </span>
          `
        }
        })

        listarBancosDetalle.innerHTML = htmlBancos;
      })

      // listar datos tenencias
      const listarTenenciasDetalle = document.getElementById('listarTenencias')

      onSnapshot(collection(db, "clientes", uid, "Tenencias"), (listarTenencias) => {

        let htmlTenencias = ''
        listarTenencias.forEach(doc => {
          htmlTenencias += `
          <span class="list-group-item list-group-item-action" aria-current="true">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1"  style="text-transform:capitalize">${doc.data().tipoMoneda}</h5>
              <small class="text-primary fw-bold badge bg-primary text-white mb-1" style="text-transform:uppercase">${doc.data().nombreMoneda}</small>
            </div>
            <p class="mb-1"  style="text-transform:uppercase">${doc.data().nombreMoneda} ${doc.data().montoNominal}</p>
            <p class="mb-1">$${doc.data().valorPesos}</p>
            <small class="fw-bold"><i class="bi bi-circle-fill text-primary"></i> tenencias</small>
          </span>
          `
        })

        listarTenenciasDetalle.innerHTML = htmlTenencias;
      })

      // listar datos empresas
      const listarEmpresasDetalle = document.getElementById('listarEmpresas')

      onSnapshot(collection(db, "clientes", uid, "Empresas"), (listarEmpresas) => {

        let htmlEmpresas = ''
        listarEmpresas.forEach(doc => {
          htmlEmpresas += `
          <span class="list-group-item list-group-item-action" aria-current="true">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1"  style="text-transform:capitalize">${doc.data().nombreEmpresa}</h5>
              <small class="text-info fw-bold badge bg-info mb-1 text-white" style="text-transform:uppercase">${doc.data().tipoSocietario}</small>
            </div>
            <p class="mb-1">Acciones: ${doc.data().tenenciaAcciones}</p>
            <p class="mb-1">$${doc.data().valorPesos}</p>
            <small class="fw-bold"><i class="bi bi-circle-fill text-info"></i> participación accionaria</small>
          </span>
          `
        })

        listarEmpresasDetalle.innerHTML = htmlEmpresas;
      })

      // listar datos
      const listarSaldosDetalle = document.getElementById('listarSaldos')

      onSnapshot(collection(db, "clientes", uid, "Saldos"), (listarSaldos) => {

        let htmlSaldos = ''
        listarSaldos.forEach(doc => {
          htmlSaldos += `
          <span class="list-group-item list-group-item-action" aria-current="true">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1"  style="text-transform:uppercase">${doc.data().nombreEmpresa} ${doc.data().tipoSocietario}</h5>
              <small class="text-secondary fw-bold badge bg-secondary text-white mb-1" style="text-transform:uppercase">${doc.data().tipoSaldo}</small>
            </div>
            <p class="mb-1">${doc.data().nombreME} ${doc.data().montoNominalME}</p>
            <p class="mb-1">$${doc.data().valorPesos}</p>
            <small class="fw-bold"><i class="bi bi-circle-fill text-secondary"></i> saldos con empresas</small>
          </span>
          `
        })

        listarSaldosDetalle.innerHTML = htmlSaldos;
      })

      // listar datos
      const listarDemasDetalle = document.getElementById('listarDemas')

      onSnapshot(collection(db, "clientes", uid, "Demas"), (listarDemas) => {

        let htmlDemas = ''
        listarDemas.forEach(doc => {
          htmlDemas += `
          <span class="list-group-item list-group-item-action" aria-current="true">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1"  style="text-transform:uppercase">${doc.data().tipoActivo}</h5>
              <small class="text-dark fw-bold badge bg-dark text-white mb-1" style="text-transform:uppercase">${doc.data().tipoRendimiento}</small>
            </div>
            <p class="mb-1" style="text-transform:uppercase">${doc.data().detalleActivo}</p>
            <p class="mb-1">Valor: $${doc.data().valorCompra}</p>
            <p class="mb-1">Rendimiento: $${doc.data().montoRendimiento}</p>
            <small class="fw-bold"><i class="bi bi-circle-fill text-dark"></i> otros activos</small>
          </span>
          `
        })

        listarDemasDetalle.innerHTML = htmlDemas;

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
    <p class="mb-0 alert-heading">Resumen</p>
  `
  })

  listarDatosCabeceraDetalle.innerHTML = htmlDatos;

  })})

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
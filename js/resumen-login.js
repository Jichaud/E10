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
          <div class="list-group mt-3 border border-danger rounded-4">
          <span class="list-group-item list-group-item-action" aria-current="true">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1"  style="text-transform:capitalize">${doc.data().domicilioCalle}</h5>
              <small class="text-danger fw-bold">${doc.data().destinoInmueble}</small>
            </div>
            <p class="mb-1">$${doc.data().valorCompra}</p>
            <p class="mb-1">${doc.data().fechaAlta}</p>
            <small class="fw-bold"><i class="bi bi-circle-fill text-danger"></i> inmuebles</small>
          </span>
        </div>
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
          <div class="list-group mt-3 border border-warning rounded-4">
          <span class="list-group-item list-group-item-action" aria-current="true">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1"  style="text-transform:uppercase">${doc.data().marca} | ${doc.data().modelo}</h5>
              <small class="text-warning fw-bold" style="text-transform:uppercase">${doc.data().patenteNumero}</small>
            </div>
            <p class="mb-1">$${doc.data().valorCompra}</p>
            <p class="mb-1">${doc.data().fechaAlta}</p>
            <small class="fw-bold"><i class="bi bi-circle-fill text-warning"></i> rodados</small>
          </span>
        </div>
          `
        })

        listarRodadosDetalle.innerHTML = htmlRodados;
      })

      // listar datos bancos
      const listarBancosDetalle = document.getElementById('listarBancos')

      onSnapshot(collection(db, "clientes", uid, "Bancos"), (listarBancos) => {

        let htmlBancos = ''
        listarBancos.forEach(doc => {
          htmlBancos += `
          <div class="list-group mt-3 border border-success rounded-4">
          <span class="list-group-item list-group-item-action" aria-current="true">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1"  style="text-transform:uppercase">${doc.data().nombreBanco} | ${doc.data().nombreSucursal}</h5>
              <small class="text-success fw-bold" style="text-transform:capitalize">${doc.data().tipoCuenta} <br> ${doc.data().estadoCuenta}</small>
            </div>
            <p class="mb-1">${doc.data().numeroCuenta}</p>
            <p class="mb-1">$${doc.data().saldoPesos}</p>
            <small class="fw-bold"><i class="bi bi-circle-fill text-success"></i> bancos</small>
          </span>
        </div>
          `
        })

        listarBancosDetalle.innerHTML = htmlBancos;
      })

      // listar datos tenencias
      const listarTenenciasDetalle = document.getElementById('listarTenencias')

      onSnapshot(collection(db, "clientes", uid, "Tenencias"), (listarTenencias) => {

        let htmlTenencias = ''
        listarTenencias.forEach(doc => {
          htmlTenencias += `
          <div class="list-group mt-3 border border-primary rounded-4">
          <span class="list-group-item list-group-item-action" aria-current="true">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1"  style="text-transform:capitalize">${doc.data().tipoMoneda}</h5>
              <small class="text-primary fw-bold" style="text-transform:uppercase">${doc.data().nombreMoneda}</small>
            </div>
            <p class="mb-1"  style="text-transform:uppercase">${doc.data().nombreMoneda}${doc.data().montoNominal}</p>
            <p class="mb-1">$${doc.data().valorPesos}</p>
            <small class="fw-bold"><i class="bi bi-circle-fill text-primary"></i> tenencias</small>
          </span>
        </div>
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
          <div class="list-group mt-3 border border-info rounded-4">
          <span class="list-group-item list-group-item-action" aria-current="true">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1"  style="text-transform:capitalize">${doc.data().nombreEmpresa}</h5>
              <small class="text-info fw-bold" style="text-transform:uppercase">${doc.data().tipoSocietario}</small>
            </div>
            <p class="mb-1">Acciones: ${doc.data().tenenciaAcciones}</p>
            <p class="mb-1">$${doc.data().valorPesos}</p>
            <small class="fw-bold"><i class="bi bi-circle-fill text-info"></i> participación accionaria</small>
          </span>
        </div>
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
          <div class="list-group mt-3 border border-secondary rounded-4">
          <span class="list-group-item list-group-item-action" aria-current="true">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1"  style="text-transform:uppercase">${doc.data().nombreEmpresa} ${doc.data().tipoSocietario}</h5>
              <small class="text-secondary fw-bold" style="text-transform:uppercase">${doc.data().tipoSaldo}</small>
            </div>
            <p class="mb-1">${doc.data().nombreME}${doc.data().montoNominalME}</p>
            <p class="mb-1">$${doc.data().valorPesos}</p>
            <small class="fw-bold"><i class="bi bi-circle-fill text-secondary"></i> saldos con empresas</small>
          </span>
        </div>
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
          <div class="list-group mt-3 border border-dark rounded-4">
          <span class="list-group-item list-group-item-action" aria-current="true">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1"  style="text-transform:uppercase">${doc.data().tipoActivo}</h5>
              <small class="text-dark fw-bold" style="text-transform:uppercase">${doc.data().tipoRendimiento}</small>
            </div>
            <p class="mb-1" style="text-transform:uppercase">${doc.data().detalleActivo}</p>
            <p class="mb-1">Valor: $${doc.data().valorCompra}</p>
            <p class="mb-1">Rendimiento: $${doc.data().montoRendimiento}</p>
            <small class="fw-bold"><i class="bi bi-circle-fill text-dark"></i> otros activos</small>
          </span>
        </div>
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
    <p class="mb-0 alert-heading">Inmuebles</p>
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
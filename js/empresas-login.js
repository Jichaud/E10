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

      const updateEmpresa = (id, newFields) => updateDoc(doc(db, "clientes", uid, "Empresas", id), newFields);

      // listar datos
      const listarEmpresasDetalle = document.getElementById('listarEmpresas')

      onSnapshot(collection(db, "clientes", uid, "Empresas"), (listarEmpresas) => {

        let html = ''
        listarEmpresas.forEach(doc => {
          html += `
          <div class="card border border border-success mt-3 align-center">
            <div class="card-header">
              <h5 class="card-title fw-bolder" style="text-transform:uppercase">${doc.data().nombreEmpresa} ${doc.data().tipoSocietario}</h5>
            </div>
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><i class="bi bi-check-circle-fill text-primary"></i> Tenencia acciones: ${doc.data().tenenciaAcciones}</li>
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
  
        listarEmpresasDetalle.innerHTML = html;
        
        // Borrar datos
        const btnBorrar = listarEmpresasDetalle.querySelectorAll('.btn-borrar')
        btnBorrar.forEach(btn => {
          btn.addEventListener('click', ({target: {dataset}}) => {
            const deleteEmpresas = id => deleteDoc(doc(db, "clientes", uid, "Empresas", id));
            deleteEmpresas(dataset.id)
          })
        })

        // Editar datos
        const editarEmpresas = id => getDoc(doc(db, "clientes", uid, "Empresas", id));
        const btnEditar = listarEmpresasDetalle.querySelectorAll('.btn-edit')
          btnEditar.forEach((btn) => {
            btn.addEventListener('click', async (e) => {
              const doc = await editarEmpresas(e.target.dataset.id)
              console.log(doc.data());
              const editar = doc.data()
              empresasFB["nombreEmpresa"].value = editar.nombreEmpresa
              empresasFB["patrimonioEmpresa"].value = editar.patrimonioEmpresa
              empresasFB["totalAcciones"].value = editar.totalAcciones
              empresasFB["tenenciaAcciones"].value = editar.tenenciaAcciones
              empresasFB["porcentajeParticipacion"].value = editar.porcentajeParticipacion
              empresasFB["cuit"].value = editar.cuit
              empresasFB["tipoSocietario"].value = editar.tipoSocietario
              empresasFB["valorPesos"].value = editar.valorPesos
              editStatus = true;
              id = doc.id;
              document.getElementById('agregarEmpresas').innerHTML = "Editar";
            })
          })
      })

    // agregar / editar datos
    
    const empresasFB = document.querySelector("#empresasFB");
    empresasFB.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nombreEmpresa = empresasFB["nombreEmpresa"];
      const patrimonioEmpresa = empresasFB["patrimonioEmpresa"];
      const totalAcciones = empresasFB["totalAcciones"];
      const tenenciaAcciones = empresasFB["tenenciaAcciones"];
      const porcentajeParticipacion = empresasFB["porcentajeParticipacion"];
      const cuit = empresasFB["cuit"];
      const tipoSocietario = empresasFB["tipoSocietario"];
      const valorPesos = empresasFB["valorPesos"];

      if (!editStatus) {
      const docRef = doc(db, "clientes", uid);
      const dataEmpresa = {
        agregaCollection: addDoc(collection(docRef, "Empresas"), {
        nombreEmpresa: nombreEmpresa.value,
        patrimonioEmpresa: patrimonioEmpresa.value,
        totalAcciones: totalAcciones.value,
        tenenciaAcciones: tenenciaAcciones.value,
        porcentajeParticipacion: porcentajeParticipacion.value,
        cuit: cuit.value,
        tipoSocietario: tipoSocietario.value,
        valorPesos: valorPesos.value
      })};
    } else {
      await updateEmpresa(id, {
        nombreEmpresa: nombreEmpresa.value,
        patrimonioEmpresa: patrimonioEmpresa.value,
        totalAcciones: totalAcciones.value,
        tenenciaAcciones: tenenciaAcciones.value,
        porcentajeParticipacion: porcentajeParticipacion.value,
        cuit: cuit.value,
        tipoSocietario: tipoSocietario.value,
        valorPesos: valorPesos.value
      })
      editStatus = false;
      document.getElementById('agregarEmpresas').innerHTML = "Agregar";
    }
    
      empresasFB.reset();
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      nombreEmpresa.focus();
    });

         // auditor
         const puedeEditar = doc(db, "clientes", uid);
         const auditor = await getDoc(puedeEditar);
         const auditorBoolean = await auditor.data().auditorEmpresas;
         // const valueAuditor = puedeEditar.uid;
         console.log(auditor.data().auditorEmpresas);
         if (auditorBoolean === true) {
           console.log("verdadero");
         } else {
           console.log("falso");
           $('.btn-borrar').prop('disabled', true);
           $('.btn-edit').prop('disabled', true);
           const btnAgregar = document.querySelector('.agregarEmpresas');
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
    <p class="mb-0 alert-heading">Participaciones empresarias</p>
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
    $('#patrimonioEmpresa').mask('000.000.000.000.000,00', {reverse: true});
    $('#totalAcciones').mask('000.000.000.000.000', {reverse: true});
    $('#tenenciaAcciones').mask('000.000.000.000.000', {reverse: true});
    $('#cuit').mask('00-00000000-0');
    $('#porcentajeParticipacion').mask('##0,00%', {reverse: true});
  });
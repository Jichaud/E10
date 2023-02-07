  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"
  import { getFirestore, collection, addDoc, getDocs, getDoc, doc, setDoc, onSnapshot, deleteDoc, updateDoc, query, where } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"

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
  tipoMoneda.focus();
    
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      const email = user.email;
      console.log(user.uid);
      console.log(user.email);

      cargaInicio();

      const updateTenencia = (id, newFields) => updateDoc(doc(db, "clientes", uid, "Tenencias", id), newFields);

      // listar datos
      const listarTenenciasDetalle = document.getElementById('listarTenencias')

      onSnapshot(collection(db, "clientes", uid, "Tenencias"), (listarTenencias) => {

        let html = ''
        listarTenencias.forEach(doc => {
          if (doc.data().nombreMoneda=="") {
          html += `
          <div class="card border border border-success mt-3 align-center">
            <div class="card-header">
              <h5 class="card-title fw-bolder" style="text-transform:uppercase">${doc.data().tipoMoneda}</h5>
            </div>
            <div class="card-body">
              <ul class="list-group list-group-flush">
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
          $('#hasPesos').prop("disabled", true);
        } else {

          html += `
          <div class="card border border border-success mt-3 align-center">
            <div class="card-header">
              <h5 class="card-title fw-bolder" style="text-transform:uppercase">${doc.data().tipoMoneda}</h5>
            </div>
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item" style="text-transform:uppercase"><i class="bi bi-check-circle-fill text-primary"></i> Nombre de la moneda extranjera: ${doc.data().nombreMoneda}</li>
                <li class="list-group-item"><i class="bi bi-check-circle-fill text-primary"></i> Monto nominal: ${doc.data().montoNominal}</li>
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
        }
        })
  
        listarTenenciasDetalle.innerHTML = html;
        
        // Borrar datos
        const btnBorrar = listarTenenciasDetalle.querySelectorAll('.btn-borrar')
        btnBorrar.forEach(btn => {
          btn.addEventListener('click', ({target: {dataset}}) => {
            const deleteTenencia = id => deleteDoc(doc(db, "clientes", uid, "Tenencias", id));
            deleteTenencia(dataset.id)
            $('#hasPesos').prop("disabled", false);
            cargaInicio();
          })
        })

        // Editar datos - informa datos en campos Form
        const editarTenencia = id => getDoc(doc(db, "clientes", uid, "Tenencias", id));
        const btnEditar = listarTenenciasDetalle.querySelectorAll('.btn-edit')
          btnEditar.forEach((btn) => {
            btn.addEventListener('click', async (e) => {
              const doc = await editarTenencia(e.target.dataset.id)
              const editar = doc.data()
              if(doc.data().nombreMoneda=="") {
              editaPesos();
              tenenciasFB["tipoMoneda"].value = editar.tipoMoneda
              tenenciasFB["valorPesos"].value = editar.valorPesos
              $('#nombreMoneda').val("")
              $('#montoNominal').val("")

              editStatus = true;
              id = doc.id;
              document.getElementById('agregarTenencias').innerHTML = '<i class="bi bi-check-circle"></i> Editar';
              document.getElementById('labelValorPesos').innerHTML="Valor al 31/12";
            } else {
              editaMoneda();

              tenenciasFB["tipoMoneda"].value = editar.tipoMoneda
              tenenciasFB["nombreMoneda"].value = editar.nombreMoneda
              tenenciasFB["montoNominal"].value = editar.montoNominal
              tenenciasFB["valorPesos"].value = editar.valorPesos
              editStatus = true;
              id = doc.id;
              document.getElementById('agregarTenencias').innerHTML = '<i class="bi bi-check-circle"></i> Editar';
              document.getElementById('labelValorPesos').innerHTML="Valor en pesos al 31/12";
            }
            })
          })
      })

    // agregar / editar datos | Carga de datos final
    const cancelBtn = document.querySelector("#cancela");
    cancelBtn.addEventListener("click", async (e) =>{
      document.getElementById('agregarTenencias').innerHTML = '<i class="bi bi-check-circle"></i> Agregar';
      tenenciasFB.reset();
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      cargaInicio();
    })

    const tenenciasFB = document.querySelector("#tenenciasFB");
    tenenciasFB.addEventListener("submit", async (e) => {
      e.preventDefault();

      const tipoMoneda = tenenciasFB["tipoMoneda"];
      const nombreMoneda = tenenciasFB["nombreMoneda"];
      const montoNominal = tenenciasFB["montoNominal"];
      const valorPesos = tenenciasFB["valorPesos"];

      if (!editStatus) {
      const docRef = doc(db, "clientes", uid);
      if (tipoMoneda==="Pesos") {
      document.getElementById('labelValorPesos').innerHTML="Valor al 31/12";
      const dataTenencia = {
        agregaCollection: addDoc(collection(docRef, "Tenencias"), {
        tipoMoneda: tipoMoneda.value,
        valorPesos: valorPesos.value,
      })};
      } else {
      document.getElementById('labelValorPesos').innerHTML="Valor en pesos al 31/12";
      const dataTenencia = {
        agregaCollection: addDoc(collection(docRef, "Tenencias"), {
        tipoMoneda: tipoMoneda.value,
        nombreMoneda: nombreMoneda.value,
        montoNominal: montoNominal.value,
        valorPesos: valorPesos.value
      })};
    }
      cargaInicio();
    } else {
      await updateTenencia(id, {
        tipoMoneda: tipoMoneda.value,
        nombreMoneda: nombreMoneda.value,
        montoNominal: montoNominal.value,
        valorPesos: valorPesos.value
      })
      editStatus = false;
      document.getElementById('agregarTenencias').innerHTML = '<i class="bi bi-check-circle"></i> Agregar';
      cargaInicio();
    }
      tenenciasFB.reset();
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      tipoMoneda.focus();
    });

         // auditor
         const verBoolean = onSnapshot(doc(db, "clientes", uid), doc => {
          console.log(doc.data().auditorTenencias);
          const valorBoolean = doc.data().auditorTenencias;
  
          if (valorBoolean === true) {
            console.log("verdadero");
            $('.btn-borrar').prop('disabled', false);
            $('.btn-edit').prop('disabled', false);
            const btnAgregar = document.querySelector('.agregarTenencias');
            btnAgregar.disabled = false;
          } else {
            console.log("falso");
            $('.btn-borrar').prop('disabled', true);
            $('.btn-edit').prop('disabled', true);
            const btnAgregar = document.querySelector('.agregarTenencias');
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
    <p class="mb-0 alert-heading">Tenencias</p>
  `
  })

  listarDatosCabeceraDetalle.innerHTML = htmlDatos;

  })

      function cargaInicio(){
        $('#nombreMoneda').hide(),
        $('#labelnombreMoneda').hide(),
        $('#montoNominal').hide(),
        $('#montoNominal').hide(),
        $('#labelmontoNominal').hide(),
        $('#valorPesos').hide(),
        $('#labelValorPesos').hide(),
        $('#agregarTenencias').hide()
        tipoMoneda.focus();
      }

      function editaPesos(){
        $('#valorPesos').show(),
        $('#labelValorPesos').show(),
        $('#nombreMoneda').hide(),
        $('#montoNominal').hide()
      }

      function editaMoneda(){
        $('#valorPesos').show(),
        $('#labelValorPesos').show(),
        $('#nombreMoneda').show(),
        $('#labelnombreMoneda').show(),
        $('#montoNominal').show(),
        $('#labelmontoNominal').show()
      }

      // verificar moneda seleccionada
      $('#tipoMoneda').change(function(){
        switch($(this).val()){
          case 'Seleccionar':
            $('#nombreMoneda').hide()
            $('#labelnombreMoneda').hide()
            $('#montoNominal').hide()
            $('#labelmontoNominal').hide()
            $('#valorPesos').hide()
            $('#labelValorPesos').hide()
            $('#agregarTenencias').hide()
          break;
          case 'Pesos':
            $('#nombreMoneda').hide()
            $('#montoNominal').hide()
            $('#nombreMoneda').val("")
            $('#montoNominal').val("")
            $('#valorPesos').show()
            $('#labelValorPesos').show()
            document.getElementById('labelValorPesos').innerHTML="Valor al 31/12";
            $('#agregarTenencias').show()
          break;
          case 'Otras monedas':
            $('#nombreMoneda').show()
            $('#labelnombreMoneda').show()
            $('#montoNominal').show()
            $('#labelmontoNominal').show()
            $('#valorPesos').show()
            $('#labelValorPesos').show()
            document.getElementById('labelValorPesos').innerHTML="Valor en pesos al 31/12";
            $('#agregarTenencias').show()
          break;
        }
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

  $(function(){
    $('#valorPesos').mask('000.000.000.000.000,00', {reverse: true});
    $('#montoNominal').mask('000.000.000.000.000,00', {reverse: true});
  });
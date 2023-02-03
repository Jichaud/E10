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
  fechaAlta.focus();
  
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      const email = user.email;
      console.log(user.uid);
      console.log(user.email);

      const updateInmueble = (id, newFields) => updateDoc(doc(db, "clientes", uid, "inmuebles", id), newFields);

      // listar datos
      const listarInmueblesDetalle = document.getElementById('listarInmuebles')

      onSnapshot(collection(db, "clientes", uid, "inmuebles"), (listarInmuebles) => {

        let html = ''
        listarInmuebles.forEach(doc => {
          html += `
          <div class="card border border border-success mt-3 align-center">
            <div class="card-header">
              <h5 class="card-title fw-bolder" style="text-transform:uppercase">${doc.data().domicilioCalle}</h5>
            </div>
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><i class="bi bi-check-circle-fill text-primary"></i> Fecha de alta: ${doc.data().fechaAlta}</li>
                <li class="list-group-item"><i class="bi bi-check-circle-fill text-primary"></i> Destino: ${doc.data().destinoInmueble}</li>
                <li class="list-group-item fw-bolder"><i class="bi bi-check-circle-fill text-primary"></i> Valor de compra: $ ${doc.data().valorCompra}</li>
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
  
        listarInmueblesDetalle.innerHTML = html;
        
        // Borrar datos
        const btnBorrar = listarInmueblesDetalle.querySelectorAll('.btn-borrar')
        btnBorrar.forEach(btn => {
          btn.addEventListener('click', ({target: {dataset}}) => {
            const deleteInmueble = id => deleteDoc(doc(db, "clientes", uid, "inmuebles", id));
            deleteInmueble(dataset.id)
          })
        })

        // Editar datos
        const editarInmueble = id => getDoc(doc(db, "clientes", uid, "inmuebles", id));
        const btnEditar = listarInmueblesDetalle.querySelectorAll('.btn-edit')
          btnEditar.forEach((btn) => {
            btn.addEventListener('click', async (e) => {
              const doc = await editarInmueble(e.target.dataset.id)
              const editar = doc.data()
              inmueblesFB["fechaAlta"].value = editar.fechaAlta
              inmueblesFB["tipoInmueble"].value = editar.tipoInmueble
              inmueblesFB["destinoInmueble"].value = editar.destinoInmueble
              inmueblesFB["domicilioCalle"].value = editar.domicilioCalle
              inmueblesFB["domicilioLocalidad"].value = editar.domicilioLocalidad
              inmueblesFB["domicilioCodigoPostal"].value = editar.domicilioCodigoPostal
              inmueblesFB["domicilioProvincia"].value = editar.domicilioProvincia
              inmueblesFB["montoHipoteca"].value = editar.montoHipoteca
              inmueblesFB["partidaInmobiliaria"].value = editar.partidaInmobiliaria
              inmueblesFB["valuacionFiscal"].value = editar.valuacionFiscal
              inmueblesFB["valorCompra"].value = editar.valorCompra
              editStatus = true;
              id = doc.id;
              document.getElementById('agregarInmueble').innerHTML = "Editar";
            })
          })
          
  
      })

    // agregar / editar datos / cancela | Carga de datos final
    const cancelBtn = document.querySelector("#cancela");
    cancelBtn.addEventListener("click", async (e) =>{
      document.getElementById('agregarInmueble').innerHTML = '<i class="bi bi-check-circle"></i> Agregar';
      inmueblesFB.reset();
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      fechaAlta.focus();
    })    
    
    const inmueblesFB = document.querySelector("#inmueblesFB");
    inmueblesFB.addEventListener("submit", async (e) => {
      e.preventDefault();

      const fechaAlta = inmueblesFB["fechaAlta"];
      const tipoInmueble = inmueblesFB["tipoInmueble"];
      const destinoInmueble = inmueblesFB["destinoInmueble"];
      const domicilioCalle = inmueblesFB["domicilioCalle"];
      const domicilioLocalidad = inmueblesFB["domicilioLocalidad"];
      const domicilioCodigoPostal = inmueblesFB["domicilioCodigoPostal"];
      const domicilioProvincia = inmueblesFB["domicilioProvincia"];
      const montoHipoteca = inmueblesFB["montoHipoteca"];
      const partidaInmobiliaria = inmueblesFB["partidaInmobiliaria"];
      const valuacionFiscal = inmueblesFB["valuacionFiscal"];
      const valorCompra = inmueblesFB["valorCompra"];

      if (!editStatus) {
      const docRef = doc(db, "clientes", uid);
      const dataInmueble = {
        agregaCollection: addDoc(collection(docRef, "inmuebles"), {
        fechaAlta: fechaAlta.value,
        tipoInmueble: tipoInmueble.value,
        destinoInmueble: destinoInmueble.value,
        domicilioCalle: domicilioCalle.value,
        domicilioLocalidad: domicilioLocalidad.value,
        domicilioCodigoPostal: domicilioCodigoPostal.value,
        domicilioProvincia: domicilioProvincia.value,
        montoHipoteca: montoHipoteca.value,
        partidaInmobiliaria: partidaInmobiliaria.value,
        valuacionFiscal: valuacionFiscal.value,
        valorCompra: valorCompra.value
      })};
    } else {
      await updateInmueble(id, {
        fechaAlta: fechaAlta.value,
        tipoInmueble: tipoInmueble.value,
        destinoInmueble: destinoInmueble.value,
        domicilioCalle: domicilioCalle.value,
        domicilioLocalidad: domicilioLocalidad.value,
        domicilioCodigoPostal: domicilioCodigoPostal.value,
        domicilioProvincia: domicilioProvincia.value,
        montoHipoteca: montoHipoteca.value,
        partidaInmobiliaria: partidaInmobiliaria.value,
        valuacionFiscal: valuacionFiscal.value,
        valorCompra: valorCompra.value
      })
      editStatus = false;
      document.getElementById('agregarInmueble').innerHTML = "Agregar";
    }
    
      inmueblesFB.reset();
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      fechaAlta.focus();
    });

      // auditor
      const verBoolean = onSnapshot(doc(db, "clientes", uid), doc => {
        console.log(doc.data().auditorInmuebles);
        const valorBoolean = doc.data().auditorInmuebles;

        if (valorBoolean === true) {
          console.log("verdadero");
          $('.btn-borrar').prop('disabled', false);
          $('.btn-edit').prop('disabled', false);
          const btnAgregar = document.querySelector('.agregarInmueble');
          btnAgregar.disabled = false;
        } else {
          console.log("falso");
          $('.btn-borrar').prop('disabled', true);
          $('.btn-edit').prop('disabled', true);
          const btnAgregar = document.querySelector('.agregarInmueble');
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
    <p class="mb-0 alert-heading">Inmuebles</p>
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
    $('#fechaAlta').mask('00/00/0000');
    $('#valorCompra').mask('000.000.000.000.000,00', {reverse: true});
    $('#valuacionFiscal').mask('000.000.000.000.000,00', {reverse: true});
    $('#montoHipoteca').mask('000.000.000.000.000,00', {reverse: true});
  });
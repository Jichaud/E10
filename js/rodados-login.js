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

      const updateRodado = (id, newFields) => updateDoc(doc(db, "clientes", uid, "Rodados", id), newFields);

      // listar datos
      const listarRodadosDetalle = document.getElementById('listarRodados')

      onSnapshot(collection(db, "clientes", uid, "Rodados"), (listarRodados) => {

        let html = ''
        listarRodados.forEach(doc => {
          html += `
          <div class="card border border border-success mt-3 align-center">
            <div class="card-header">
              <h5 class="card-title fw-bolder" style="text-transform:uppercase">${doc.data().marca} | ${doc.data().modelo}</h5>
            </div>
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><i class="bi bi-check-circle-fill text-primary"></i> Fecha de alta: ${doc.data().fechaAlta}</li>
                <li class="list-group-item" style="text-transform:uppercase"><i class="bi bi-check-circle-fill text-primary"></i> Patente: ${doc.data().patenteNumero}</li>
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
  
        listarRodadosDetalle.innerHTML = html;
        
        // Borrar datos
        const btnBorrar = listarRodadosDetalle.querySelectorAll('.btn-borrar')
        btnBorrar.forEach(btn => {
          btn.addEventListener('click', ({target: {dataset}}) => {
            const deleteRodado = id => deleteDoc(doc(db, "clientes", uid, "Rodados", id));
            deleteRodado(dataset.id)
          })
        })

        // Editar datos
        const editarRodado = id => getDoc(doc(db, "clientes", uid, "Rodados", id));
        const btnEditar = listarRodadosDetalle.querySelectorAll('.btn-edit')
          btnEditar.forEach((btn) => {
            btn.addEventListener('click', async (e) => {
              const doc = await editarRodado(e.target.dataset.id)
              console.log(doc.data());
              const editar = doc.data()
              rodadosFB["fechaAlta"].value = editar.fechaAlta
              rodadosFB["yearModelo"].value = editar.yearModelo
              rodadosFB["patenteNumero"].value = editar.patenteNumero
              rodadosFB["marca"].value = editar.marca
              rodadosFB["modelo"].value = editar.modelo
              rodadosFB["tipoRodado"].value = editar.tipoRodado
              rodadosFB["cantidadDePuertas"].value = editar.cantidadDePuertas
              rodadosFB["valorCompra"].value = editar.valorCompra
              editStatus = true;
              id = doc.id;
              document.getElementById('agregarRodados').innerHTML = "Editar";
            })
          })
          
  
      })

    // agregar / editar datos
    
    const rodadosFB = document.querySelector("#rodadosFB");
    rodadosFB.addEventListener("submit", async (e) => {
      e.preventDefault();

      const fechaAlta = rodadosFB["fechaAlta"];
      const yearModelo = rodadosFB["yearModelo"];
      const patenteNumero = rodadosFB["patenteNumero"];
      const marca = rodadosFB["marca"];
      const modelo = rodadosFB["modelo"];
      const tipoRodado = rodadosFB["tipoRodado"];
      const cantidadDePuertas = rodadosFB["cantidadDePuertas"];
      const valorCompra = rodadosFB["valorCompra"];

      if (!editStatus) {
      const docRef = doc(db, "clientes", uid);
      const dataRodado = {
        agregaCollection: addDoc(collection(docRef, "Rodados"), {
        fechaAlta: fechaAlta.value,
        yearModelo: yearModelo.value,
        patenteNumero: patenteNumero.value,
        marca: marca.value,
        modelo: modelo.value,
        tipoRodado: tipoRodado.value,
        cantidadDePuertas: cantidadDePuertas.value,
        valorCompra: valorCompra.value
      })};
    } else {
      await updateRodado(id, {
        fechaAlta: fechaAlta.value,
        yearModelo: yearModelo.value,
        patenteNumero: patenteNumero.value,
        marca: marca.value,
        modelo: modelo.value,
        tipoRodado: tipoRodado.value,
        cantidadDePuertas: cantidadDePuertas.value,
        valorCompra: valorCompra.value
      })
      editStatus = false;
      document.getElementById('agregarRodados').innerHTML = "Agregar";
    }
    
      rodadosFB.reset();
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      fechaAlta.focus();
    });

         // auditor
         const verBoolean = onSnapshot(doc(db, "clientes", uid), doc => {
          console.log(doc.data().auditorRodados);
          const valorBoolean = doc.data().auditorRodados;
  
          if (valorBoolean === true) {
            console.log("verdadero");
            $('.btn-borrar').prop('disabled', false);
            $('.btn-edit').prop('disabled', false);
            const btnAgregar = document.querySelector('.agregarRodados');
            btnAgregar.disabled = false;
          } else {
            console.log("falso");
            $('.btn-borrar').prop('disabled', true);
            $('.btn-edit').prop('disabled', true);
            const btnAgregar = document.querySelector('.agregarRodados');
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
    <p class="mb-0 alert-heading">Rodados</p>
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
  });
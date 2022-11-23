  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"
  import { getFirestore, collection, addDoc, getDocs, getDoc, doc, setDoc, onSnapshot, query, updateDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"

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

      // agrega y chequeo auditor
      const agregaAuditor = await setDoc(doc(db, "clientes", uid), {
        auditorInmuebles: true,
        uid: uid,
      });
      /* const checkAuditor = query(collection(db, "clientes", uid, "auditor"));
      const querySnapshot = await getDocs(checkAuditor);
      querySnapshot.forEach((doc) => {
        console.log(doc.data().auditorInmuebles);
        const dataAuditor = doc.data().auditorInmuebles;

        if (dataAuditor == true) {
          console.log(true);
        } else {
          console.log(false);
        };
    
    }); */

      // leer datos
      const datosPersonales = doc(db, "clientes", uid, "datosPersonales", "datosPersonalesDetalle");
      const datosPersonalesDetalle = await getDoc(datosPersonales);

      document.getElementById('apellido').innerHTML = datosPersonalesDetalle.data().apellido;
      document.getElementById('nombre').innerHTML = datosPersonalesDetalle.data().nombre;
      document.getElementById('fechaDeNacimiento').innerHTML = datosPersonalesDetalle.data().fechaDeNacimiento;
      document.getElementById('apellidoMaterno').innerHTML = datosPersonalesDetalle.data().apellidoMaterno;
      document.getElementById('cuit').innerHTML = datosPersonalesDetalle.data().cuit;

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
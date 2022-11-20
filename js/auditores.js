  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"
  import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
  
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

const signInForm = document.querySelector("#loginFB");

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = signInForm["email"].value;
  const password = signInForm["password"].value;

  try {

  const userCredentials = await signInWithEmailAndPassword(auth, email, password)
  // user correct login
  window.location.href = 'auditores-login.html';

} catch (error) {
  const errorMessage = error.message;
  console.log(errorMessage);
  if (error.code === 'auth/wrong-password') {
    $(document).ready(function(){
      $(".toast").toast("show");
    });
    document.getElementById('toast-msg-error').innerHTML = "Contraseña incorrecta";
  } else if (error.code === 'auth/internal-error') {
    $(document).ready(function(){
      $(".toast").toast("show");
    });
    document.getElementById('toast-msg-error').innerHTML = "Por favor ingrese su contraseña.";
  } else if (error.code === 'auth/invalid-email') {
    $(document).ready(function(){
      $(".toast").toast("show");
    });
    document.getElementById('toast-msg-error').innerHTML = "El correo electrónico no es correcto.";
  } else if (error.code === 'auth/too-many-requests') {
    $(document).ready(function(){
      $(".toast").toast("show");
    });
    document.getElementById('toast-msg-error').innerHTML = "Ha ingresado varias veces su contraseña de forma incorrecta. La cuenta fue suspendida por 10 minutos.";
  } else {
    $(document).ready(function(){
      $(".toast").toast("show");
    });
    document.getElementById('toast-msg-error').innerHTML = "Algo salió mal...";
  }
}
});

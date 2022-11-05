  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js"
  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCQXoksw3C47bOWg7scIbsJWLVTPeT97p0",
    authDomain: "estudio-diez-streaming.firebaseapp.com",
    databaseURL: "https://estudio-diez-streaming.firebaseio.com",
    projectId: "estudio-diez-streaming",
    storageBucket: "estudio-diez-streaming.appspot.com",
    messagingSenderId: "599746842056",
    appId: "1:599746842056:web:c3f8b8c2726b336b55c4fd"
  };

  // Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const signInForm = document.querySelector("#loginFB");

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = signInForm["email"].value;
  const password = signInForm["password"].value;

  try {

  const userCredentials = await signInWithEmailAndPassword(auth, email, password)
  // user correct login
  window.location.href = 'suscriptores-streaming.html';

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
    document.getElementById('toast-msg-error').innerHTML = "Por favor ingrese su contraseña. En caso de no estar registrado, envíe un mail a capacitacion@estudiodiez.com";
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
    document.getElementById('toast-msg-error').innerHTML = "Algo salió mal... envíe un mail a capacitacion@estudiodiez.com";
  }
}
});

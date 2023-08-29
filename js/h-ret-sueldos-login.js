// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYpNpDAKv69LYI1V_2rT-gG25W-LMLm3Q",
  authDomain: "herramientasediez.firebaseapp.com",
  projectId: "herramientasediez",
  storageBucket: "herramientasediez.appspot.com",
  messagingSenderId: "839875197403",
  appId: "1:839875197403:web:7269dace7be72d3b540ffe",
  measurementId: "G-19EHB6HWTY",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);

const focusEmail = document.getElementById("#email");
const newUserForm = document.querySelector("#newHretSueldos");

newUserForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newUserEmail = newUserForm["newUserEmail"].value;
  const newUserPassword = newUserForm["newUserPassword"].value;

  const auth = getAuth();
createUserWithEmailAndPassword(auth, newUserEmail, newUserPassword)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

  location.reload(true);
});

const signInForm = document.querySelector("#loginHretSueldos");

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = signInForm["email"].value;
  const password = signInForm["password"].value;

  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // user correct login
    window.location.href = "h-ret-sueldos.html";
  } catch (error) {
    const errorMessage = error.message;
    console.log(errorMessage);
    if (error.code === "auth/wrong-password") {
      $(document).ready(function () {
        $(".toast").toast("show");
      });
      document.getElementById("toast-msg-error").innerHTML =
        "Contraseña incorrecta";
    } else if (error.code === "auth/internal-error") {
      $(document).ready(function () {
        $(".toast").toast("show");
      });
      document.getElementById("toast-msg-error").innerHTML =
        "Por favor ingrese su contraseña.";
    } else if (error.code === "auth/invalid-email") {
      $(document).ready(function () {
        $(".toast").toast("show");
      });
      document.getElementById("toast-msg-error").innerHTML =
        "El correo electrónico no es correcto.";
    } else if (error.code === "auth/too-many-requests") {
      $(document).ready(function () {
        $(".toast").toast("show");
      });
      document.getElementById("toast-msg-error").innerHTML =
        "Ha ingresado varias veces su contraseña de forma incorrecta. La cuenta fue suspendida por 10 minutos.";
    } else {
      $(document).ready(function () {
        $(".toast").toast("show");
      });
      document.getElementById("toast-msg-error").innerHTML =
        "Algo salió mal...";
    }
  }
});

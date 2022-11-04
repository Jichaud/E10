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

  const userCredentials = await signInWithEmailAndPassword(auth, email, password)
  
  window.location.href = 'suscriptores-streaming.html';
});

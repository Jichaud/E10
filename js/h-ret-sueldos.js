// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, setDoc, onSnapshot, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";
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
export const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    const email = user.email;
    console.log(user.uid);
    console.log(user.email);

    // Declaración de variables globales
    let remMensual = 0;
    let remuneracion = document.getElementById("remuneracion");
    let descuento = document.getElementById("descuento");
    const saveData = document.getElementById("saveData");
    const dataBase = doc(db, "retSueldos", uid);
    // const remEnero = document.getElementById("remEnero").value;

    cargaInicio();
    function cargaInicio() {
      $("#detalleFirstCol").hide();
      $("#detalleSecondCol").hide();
      maskApply();
    }

    $("#eneroMes").click(function(){
      $("#detalleFirstCol").show();
      $("#detalleSecondCol").show();
      remuneracion.innerHTML = "Remuneración enero";
      descuento.innerHTML = "Descuentos enero";
      let detalleMes = document.getElementById("eneroMes").id
      
    })

    $("#cargaDatosRem").click(function(){
      let detalleMes = document.getElementById("febreroMes").id
      $("#inputIdRem").val(detalleMes);

    })

    $("#enviaDatosRem").click(function(){
        const inputIdRem = remForm["inputIdRem"];
        const remMensual = remForm["remMensual"];

        const dataRemuneracion = {
          agregaCollection: addDoc(collection(dataBase, "Remuneraciones"), {
            inputIdRem: inputIdRem.value,
            remMensual: remMensual.value
          })
        }

    })

    $("#febreroMes").click(function(){
      $("#detalleFirstCol").show();
      $("#detalleSecondCol").show();
      remuneracion.innerHTML = "Remuneración febrero";
      descuento.innerHTML = "Descuentos febrero";
      let detalleMes = document.getElementById("febreroMes").id
    })

    // signout process
    const singOutBtn = document.querySelectorAll(".signOut");
    singOutBtn.forEach((singleBtn) => {
      singleBtn.addEventListener("click", function (event) {
        const auth = getAuth();
        signOut(auth)
          .then(() => {
            // Sign-out successful.
          })
          .catch((error) => {
            // An error happened.
          });
      });
    });
  } else {
    window.location.href = "h-ret-sueldos-login.html";
    // User is signed out
  }
});

function maskApply() {
  $(document).ready(function () {
    $("#remEnero").mask("000.000.000.000.000,00", { reverse: true });
    $("#desEnero").mask("000.000.000.000.000,00", { reverse: true });
    $("#remMensual").mask("000.000.000.000.000,00", { reverse: true });
  });
}

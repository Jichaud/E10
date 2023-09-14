// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  setDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  query,
} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";
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
    let remuneracion = document.getElementById("remuneracion");
    let descuento = document.getElementById("descuento");
    let dbEmpleado = "";
    const dataBase = doc(db, "retSueldos", uid);
    let html = "";
    let arrEmp = [];

    cargaInicio();
    function cargaInicio() {
      $("#detalleFirstCol").hide();
      $("#detalleSecondCol").hide();
      maskApply();
      leeDatosEmpleados();
    }

    // Leer datos para lista de empleados
    async function leeDatosEmpleados() {
      const empleadoOption = document.getElementById("empleadoOption");
      const querySnapshot = query(collection(db, "retSueldos"));
      const docSnap = await getDocs(querySnapshot);
      docSnap.forEach((doc) => {
        try {
          const dataArr = doc.data().arrEmp;
          arrEmp = dataArr;

          for (let i = 0; i < dataArr.length; i++) {
            const element = dataArr[i];
            var insertOption = document.createElement("option");
            insertOption.innerText = element;
            empleadoOption.appendChild(insertOption);
          }
        } catch (error) {}
      });
    }

    $("#empleadoOption").on("change", function () {
      let valorOptionEmpleado = $("#empleadoOption").val();
      if (valorOptionEmpleado === "1") {
        $("#nuevoEmp").modal("show");
      }
      if (valorOptionEmpleado > "1") {
        dbEmpleado = valorOptionEmpleado;
        $("#alertEmp").prop("hidden", false);
        let alertEmp = document.getElementById("alertEmp");
        alertEmp.innerHTML = "Estás trabajando con " + dbEmpleado;
      } else {
        $("#alertEmp").prop("hidden", true);
      }
    });

    $("#eneroMes").click(function () {
      $("#detalleFirstCol").show();
      $("#detalleSecondCol").show();
      remuneracion.innerHTML = "Remuneración enero";
      descuento.innerHTML = "Descuentos enero";
    });

    $("#febreroMes").click(function () {
      $("#detalleFirstCol").show();
      $("#detalleSecondCol").show();
      remuneracion.innerHTML = "Remuneración febrero";
      descuento.innerHTML = "Descuentos febrero";
    });

    $("#marzoMes").click(function () {
      $("#detalleFirstCol").show();
      $("#detalleSecondCol").show();
      remuneracion.innerHTML = "Remuneración marzo";
      descuento.innerHTML = "Descuentos marzo";
    });

    $("#abrilMes").click(function () {
      $("#detalleFirstCol").show();
      $("#detalleSecondCol").show();
      remuneracion.innerHTML = "Remuneración abril";
      descuento.innerHTML = "Descuentos abril";
    });

    $("#mayoMes").click(function () {
      $("#detalleFirstCol").show();
      $("#detalleSecondCol").show();
      remuneracion.innerHTML = "Remuneración mayo";
      descuento.innerHTML = "Descuentos mayo";
    });

    $("#junioMes").click(function () {
      $("#detalleFirstCol").show();
      $("#detalleSecondCol").show();
      remuneracion.innerHTML = "Remuneración junio";
      descuento.innerHTML = "Descuentos junio";
    });

    $("#julioMes").click(function () {
      $("#detalleFirstCol").show();
      $("#detalleSecondCol").show();
      remuneracion.innerHTML = "Remuneración julio";
      descuento.innerHTML = "Descuentos julio";
    });

    $("#agostoMes").click(function () {
      $("#detalleFirstCol").show();
      $("#detalleSecondCol").show();
      remuneracion.innerHTML = "Remuneración agosto";
      descuento.innerHTML = "Descuentos agosto";
    });

    $("#septiembreMes").click(function () {
      $("#detalleFirstCol").show();
      $("#detalleSecondCol").show();
      remuneracion.innerHTML = "Remuneración septiembre";
      descuento.innerHTML = "Descuentos septiembre";
    });

    $("#octubreMes").click(function () {
      $("#detalleFirstCol").show();
      $("#detalleSecondCol").show();
      remuneracion.innerHTML = "Remuneración octubre";
      descuento.innerHTML = "Descuentos octubre";
    });

    $("#noviembreMes").click(function () {
      $("#detalleFirstCol").show();
      $("#detalleSecondCol").show();
      remuneracion.innerHTML = "Remuneración noviembre";
      descuento.innerHTML = "Descuentos noviembre";
    });

    $("#diciembreMes").click(function () {
      $("#detalleFirstCol").show();
      $("#detalleSecondCol").show();
      remuneracion.innerHTML = "Remuneración diciembre";
      descuento.innerHTML = "Descuentos diciembre";
    });

    $("#cargaDatosRem").click(function () {
      if ($("#eneroMes").prop("checked") == true) {
        let detalleMes = document.getElementById("eneroMes").id;
        $("#inputIdRem").val(detalleMes + "Rem");
      } else if ($("#febreroMes").prop("checked") == true) {
        let detalleMes = document.getElementById("febreroMes").id;
        $("#inputIdRem").val(detalleMes + "Rem");
      } else if ($("#marzoMes").prop("checked") == true) {
        let detalleMes = document.getElementById("marzoMes").id;
        $("#inputIdRem").val(detalleMes + "Rem");
      } else if ($("#abrilMes").prop("checked") == true) {
        let detalleMes = document.getElementById("abrilMes").id;
        $("#inputIdRem").val(detalleMes + "Rem");
      } else if ($("#mayoMes").prop("checked") == true) {
        let detalleMes = document.getElementById("mayoMes").id;
        $("#inputIdRem").val(detalleMes + "Rem");
      } else if ($("#junioMes").prop("checked") == true) {
        let detalleMes = document.getElementById("junioMes").id;
        $("#inputIdRem").val(detalleMes + "Rem");
      } else if ($("#julioMes").prop("checked") == true) {
        let detalleMes = document.getElementById("julioMes").id;
        $("#inputIdRem").val(detalleMes + "Rem");
      } else if ($("#agostoMes").prop("checked") == true) {
        let detalleMes = document.getElementById("agostoMes").id;
        $("#inputIdRem").val(detalleMes + "Rem");
      } else if ($("#septiembreMes").prop("checked") == true) {
        let detalleMes = document.getElementById("septiembreMes").id;
        $("#inputIdRem").val(detalleMes + "Rem");
      } else if ($("#octubreMes").prop("checked") == true) {
        let detalleMes = document.getElementById("octubreMes").id;
        $("#inputIdRem").val(detalleMes + "Rem");
      } else if ($("#noviembreMes").prop("checked") == true) {
        let detalleMes = document.getElementById("noviembreMes").id;
        $("#inputIdRem").val(detalleMes + "Rem");
      } else if ($("#diciembreMes").prop("checked") == true) {
        let detalleMes = document.getElementById("diciembreMes").id;
        $("#inputIdRem").val(detalleMes + "Rem");
      }
    });

    $("#enviaDatosRem").click(function () {
      const inputIdRem = remForm["inputIdRem"];
      const remMensual = remForm["remMensual"];

      const dataRemuneracion = {
        agregaCollection: addDoc(collection(dataBase, dbEmpleado), {
          inputIdRem: inputIdRem.value,
          remMensual: remMensual.value,
        }),
      };
    });

    $("#enviaDatosEmp").click(async function () {
      const inputNombreEmp = nuevoEmpForm["inputNombreEmp"];
      const cuilEmp = nuevoEmpForm["cuilEmp"];

      dbEmpleado = inputNombreEmp.value;

      const dataEmpleado = {
        agregaCollection: addDoc(collection(dataBase, dbEmpleado), {
          inputNombreEmp: inputNombreEmp.value,
          cuilEmp: cuilEmp.value,
        }),
      };

      arrEmp.push(dbEmpleado);

      await setDoc(doc(db, "retSueldos", uid), {
        arrEmp,
      });

      const empleadoOption = document.getElementById("empleadoOption");
      var insertOption = document.createElement("option");
      insertOption.value = dbEmpleado;
      insertOption.innerText = dbEmpleado;
      empleadoOption.appendChild(insertOption);

      $("#empleadoOption").val("0");
    });

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
    $("#cuilEmp").mask("00-00000000-0", { reverse: true });
  });
}

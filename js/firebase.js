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
const firebaseConfig = {
  apiKey: "AIzaSyCQXoksw3C47bOWg7scIbsJWLVTPeT97p0",
  authDomain: "estudio-diez-streaming.firebaseapp.com",
  databaseURL: "https://estudio-diez-streaming.firebaseio.com",
  projectId: "estudio-diez-streaming",
  storageBucket: "estudio-diez-streaming.appspot.com",
  messagingSenderId: "599746842056",
  appId: "1:599746842056:web:c3f8b8c2726b336b55c4fd",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    const email = user.email;

    // registro usuario con nombre y apellido
    async function checkDataUID() {
      const existUID = doc(db, "users", uid);
      const existName = await getDoc(existUID);

      // Greet process
      var myDate = new Date();
      var hrs = myDate.getHours();
      var greet;
      if (hrs < 12) greet = "Buenos días";
      else if (hrs >= 12 && hrs <= 17) greet = "Buenas tardes";
      else if (hrs >= 17 && hrs <= 24) greet = "Buenas noches";
      try {
        document.getElementById("loged").innerHTML =
          greet +
          " " +
          existName.data().nombre +
          " " +
          existName.data().apellido;
      } catch (error) {
        console.log(error);
      }
    }

    checkDataUID();

    $("#certAsis").on("click", async function () {
      const existCert = doc(db, "users", uid);
      const existCons = await getDoc(existCert);
      let certi = existCons.data().certificado;
      if (existCons.data().Descargado > 0) {
        let clicks = existCons.data().Descargado;
        await setDoc(
          doc(db, "users", uid),
          {
            Descargado: clicks + 1,
          },
          { merge: true }
        );          
      } else {
      await setDoc(
        doc(db, "users", uid),
        {
          Descargado: 1,
        },
        { merge: true }
      );}
      window.open(certi, "");
    });

    // signout process
    document
      .getElementById("signOut")
      .addEventListener("click", function (event) {
        const auth = getAuth();
        signOut(auth)
          .then(() => {
            // Sign-out successful.
          })
          .catch((error) => {
            // An error happened.
          });
      });
  } else {
    window.location.href = "suscriptores.html";
    // User is signed out
  }
});

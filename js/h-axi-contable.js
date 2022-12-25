  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"
  import { getFirestore, collection, addDoc, getDocs, getDoc, doc, setDoc, onSnapshot, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
  
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
export const db = getFirestore(app);

const listarIndicesDetalle = document.getElementById('listarIndices')

const listarIndices = await getDocs(collection(db, "ipc"))

  let html = ''
  listarIndices.forEach(doc => {
    var redondearIndice = (Math.round(doc.data().indice * 100) / 100).toFixed(4);
    var dataIndice = redondearIndice.toString().replace(/\./g, ',');
    
    console.log(doc.data());    
    html += `
    <table class="table table-hover table-sm w-50">
      <thead>
        <tr>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-start">${doc.data().mes}</td>
          <td class="text-end">${dataIndice}</td>
        </tr>
      </tbody>
    </table>
    `
  })
  
  listarIndicesDetalle.innerHTML = html;

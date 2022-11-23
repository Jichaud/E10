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

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      const email = user.email;
      console.log(user.uid);
      console.log(user.email);
      
            // listar clientes
            const listarClientesDetalle = document.getElementById('listarClientes')
      
            onSnapshot(collection(db, "clientes"), (listarClientes) => {
              
            let html = ''
            listarClientes.forEach(doc => {
              html += `
              <tr class="align-middle">
              <th scope="row">${doc.data().uid}</th>
              <td>Hola</td>
              <td>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" checked>
                  <label class="form-check-label text-success fw-bold">Puede editar</label>
                </div>
            </td>
            <td>
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" checked>
                <label class="form-check-label text-success fw-bold">Puede editar</label>
              </div>
            </td>
            <td>
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" checked>
                <label class="form-check-label text-success fw-bold">Puede editar</label>
              </div>
            </td>
            <td>
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" checked>
                <label class="form-check-label text-success fw-bold">Puede editar</label>
              </div>
            </td>
            <td>
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" checked>
                <label class="form-check-label text-success fw-bold">Puede editar</label>
              </div>
            </td>
            <td>
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" checked>
                <label class="form-check-label text-success fw-bold">Puede editar</label>
              </div>
            </td>
            <td>
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" checked>
                <label class="form-check-label text-success fw-bold">Puede editar</label>
              </div>
            </td>
            </tr>
              `
            })
      
            listarClientesDetalle.innerHTML = html;
      
          })

      // lee db
      const querySnapshont = await getDocs(collection(db, "clientes"));
      querySnapshont.forEach((doc) => {
        console.log(doc.id);
      });

                      
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
      window.location.href = "auditores.html";
      // User is signed out    
    }
  });
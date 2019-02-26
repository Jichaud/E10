// Initialize Firebase
var config = {
    apiKey: "AIzaSyCBdHdh0hH5NXTgJpLDZDA-KQ9nJHGzXCU",
    authDomain: "form-fce.firebaseapp.com",
    databaseURL: "https://form-fce.firebaseio.com",
    projectId: "form-fce",
    storageBucket: "form-fce.appspot.com",
    messagingSenderId: "258213920771"
  };
  firebase.initializeApp(config);

  // referencia mensajes

  var messagesRef = firebase.database().ref('messages');

// escucha formulario
document.getElementById('formFce').addEventListener('submit', submitForm);

function submitForm(e){
    e.preventDefault();

    // obtener valores
    var materia = getInputVal('materia');
    var catedra = getInputVal('catedra');

    // graba datos
    saveMessage(materia, catedra);    
}

// obtener valores

function getInputVal(id){
    return document.getElementById(id).value;
}

// enviar mensajes a firebase
function saveMessage(materia, catedra){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        materia:materia,
        catedra:catedra,
    });
}
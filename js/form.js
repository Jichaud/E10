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
document.getElementById('form-fce').addEventListener('submit', submitForm);

function submitForm(e){
    e.preventDefault();

    // obtener valores
    var TYTI = getImputVal('TYTI');
    var TYTII = getImputVal('TYTII');
    var RT = getImputVal('RT');
    var TSA = getImputVal('TSA');
    var FP = getImputVal('FP');
    var PACF = getImputVal('PACF');

    // graba datos
    saveMessage(TYTI, TYTII, RT, TSA, FP, PACF);
}

// obtener valores

function getImputVal(id){
    return document.getElementById(id).value;
}

// enviar mensajes a firebase
function saveMessage(TYTI, TYTII, RT, TSA, FP, PACF){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        TYTI:TYTI,
        TYTII:TYTII,
        RT:RT,
        TSA:TSA,
        FP:FP,
        PACF:PACF,
    });
}
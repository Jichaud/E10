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
    $('#myModal').modal('show');
    e.preventDefault();

    // obtener valores
    var materia = getInputVal('materia');
    var tyticatedra = getInputVal('tyticatedra');
    
    // graba datos
    saveMessage(materia, tyticatedra);    
}

// obtener valores

function getInputVal(id){
    return document.getElementById(id).value;
}

// enviar mensajes a firebase
function saveMessage(materia, tyticatedra){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        materia:materia,
        tyticatedra:tyticatedra,
        
    });
}

// Switch formulario
    $('#tresCincoSeis').hide();
    $('#tresCincoSiete').hide();
$('#materia').on('change',function(){    
    if( $(this).val()==="356 - TEORÍA Y TÉCNICA IMPOSITIVA I"){
    $('#tresCincoSeis').show()
    $('#tresCincoSiete').hide();
    }
    else if( $(this).val()==="357 - TEORÍA Y TÉCNICA IMPOSITIVA II"){
    $('#tresCincoSeis').hide();
    $('#tresCincoSiete').show()
    }
    else {
        $('#tresCincoSeis').hide();
        $('#tresCincoSiete').hide();
    }
});
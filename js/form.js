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
    var catedra = getInputVal('catedra');
    var docenteCargo = getInputVal('docenteCargo');    
    var nombreAyudante = getInputVal('nombreAyudante');
    var mailAyudante = getInputVal('mailAyudante');
    var designacionAyudante = getInputVal('designacionAyudante');
    var otrosDesignacion = getInputVal('otrosDesignacion');
    var fechaEnvio = getInputVal('fechaEnvio');
    
    // graba datos
    saveMessage(materia, catedra, docenteCargo, nombreAyudante, mailAyudante, designacionAyudante, otrosDesignacion, fechaEnvio);


}

// obtener valores

function getInputVal(id){
    return document.getElementById(id).value;
}

// enviar mensajes a firebase
function saveMessage(materia, catedra, docenteCargo, nombreAyudante, mailAyudante, designacionAyudante, otrosDesignacion, fechaEnvio){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        materia:materia,
        catedra:catedra,
        docenteCargo:docenteCargo,        
        nombreAyudante:nombreAyudante,
        mailAyudante:mailAyudante,
        designacionAyudante:designacionAyudante,
        otrosDesignacion:otrosDesignacion,
        fechaEnvio:timestamp,
    });
}

// obtener fecha

var timestamp = Date();

// otros designación ayudante

$('#designacionAyudante').on('change',function(){
    var selection = $(this).val();
   switch(selection){
   case "Otros":
   $("#otrosDesignacion").show()
   $("#otrosDesignacion").attr('required',"");
   $("#otrosDesignacion").val("Detallar");
  break;
   default:
   $("#otrosDesignacion").hide()
   $("#otrosDesignacion").removeAttr('required');
   $("#otrosDesignacion").val("sin información");
   }
});
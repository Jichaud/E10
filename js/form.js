// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyCBdHdh0hH5NXTgJpLDZDA-KQ9nJHGzXCU",
  authDomain: "form-fce.firebaseapp.com",
  projectId: "form-fce"
});

var db = firebase.firestore();

function guardar(){

  var dApellido = document.getElementById('dApellido').value;
  var dNombre = document.getElementById('dNombre').value;
  var dEmail = document.getElementById('dEmail').value;
  var inscriptos = document.getElementById('inscriptos').value;
  var materia = document.getElementById('materia').value;
  var pAusentes = document.getElementById('pAusentes').value;
  var pConvalidados = document.getElementById('pConvalidados').value;
  var pPendientes = document.getElementById('pPendientes').value;
  var tAusentes = document.getElementById('tAusentes').value;
  var tConvalidados = document.getElementById('tConvalidados').value;
  var tPendientes = document.getElementById('tPendientes').value;
  var catedra = document.getElementById('catedra').value;

  db.collection("202001alumnosasistencia").add({
      dApellido: dApellido,
      dNombre: dNombre,
      dEmail: dEmail,
      inscriptos: inscriptos,
      materia: materia,
      pAusentes: pAusentes,
      pConvalidados: pConvalidados,
      pPendientes: pPendientes,
      tAusentes: tAusentes,
      tConvalidados: tConvalidados,
      tPendientes: tPendientes,
      catedra: catedra,
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      $('#myModal').modal('show');

  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });

}


/*
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

    $('#nombreAyudante').val('');
    $('#mailAyudante').val('');
    $('#designacionAyudante').val('');
    $('#otrosDesignacion').val('');
    $('#otrosDesignacion').hide();


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
*/

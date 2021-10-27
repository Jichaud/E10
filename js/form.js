// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyCBdHdh0hH5NXTgJpLDZDA-KQ9nJHGzXCU",
  authDomain: "form-fce.firebaseapp.com",
  projectId: "form-fce"
});

var db = firebase.firestore();

function guardar(){

  var fechaEnvio = timestamp;
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
  var primerInscriptos = document.getElementById('primerInscriptos').value;
  var primerAusentes = document.getElementById('primerAusentes').value;
  var primerCondicionados = document.getElementById('primerCondicionados').value;
  var evaInsuficientes = document.getElementById('evaInsuficientes').value;
  var evaAprobados = document.getElementById('evaAprobados').value;
  var evaAusentes = document.getElementById('evaAusentes').value;

  db.collection("202002alumnosasistencia").add({
      FechadeEnvio: fechaEnvio,
      Apellido: dApellido,
      Nombre: dNombre,
      email: dEmail,
      Inscriptos: inscriptos,
      Materia: materia,
      pAusentes: pAusentes,
      pConvalidados: pConvalidados,
      pPendientes: pPendientes,
      tAusentes: tAusentes,
      tConvalidados: tConvalidados,
      tPendientes: tPendientes,
      catedra: catedra,
      unoCuatrimestreInscriptos: primerInscriptos,
      unoCuatrimestreAusentes: primerAusentes,
      unoCuatrimestreCondicionados: primerCondicionados,
      EvaluaciónintegradoraInsuficientes: evaInsuficientes,
      EvaluaciónintegradoraAprobados: evaAprobados,
      EvaluaciónintegradoraAusentes: evaAusentes
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      document.getElementById('dApellido').value = '';
      document.getElementById('dNombre').value = '';
      document.getElementById('dEmail').value = '';
      document.getElementById('inscriptos').value = '';
      document.getElementById('materia').value = '';
      document.getElementById('pAusentes').value = '';
      document.getElementById('pConvalidados').value = '';
      document.getElementById('pPendientes').value = '';
      document.getElementById('tAusentes').value = '';
      document.getElementById('tConvalidados').value = '';
      document.getElementById('tPendientes').value = '';
      document.getElementById('catedra').value = '';
      document.getElementById('fechaEnvio').value='';
      document.getElementById('primerInscriptos').value='';
      document.getElementById('primerAusentes').value='';
      document.getElementById('primerCondicionados').value='';
      document.getElementById('evaInsuficientes').value='';
      document.getElementById('evaAprobados').value='';
      document.getElementById('evaAusentes').value='';
      document.getElementById('showNew').value='';
      document.getElementById('enviar').setAttribute('disabled','disabled');
      $('#myModal').modal('show');

  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });

}

// obtener fecha

var timestamp = Date();

// Leer datos
var tabla = document.getElementById('ex-table');
db.collection("202002alumnosasistencia").onSnapshot((querySnapshot) => {
    tabla.innerHTML = "";
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().Materia}`);
        tabla.innerHTML += `
        <tr>
          <td>${doc.data().FechadeEnvio}</td>
          <td>${doc.data().Materia}</td>
          <td>${doc.data().catedra}</td>
          <td>${doc.data().Nombre}</td>
          <td>${doc.data().Apellido}</td>
          <td>${doc.data().email}</td>
          <td>${doc.data().Inscriptos}</td>
          <td>${doc.data().tConvalidados}</td>
          <td>${doc.data().tPendientes}</td>
          <td>${doc.data().tAusentes}</td>
          <td>${doc.data().pConvalidados}</td>
          <td>${doc.data().pPendientes}</td>
          <td>${doc.data().pAusentes}</td>
          <td>${doc.data().unoCuatrimestreInscriptos}</td>
          <td>${doc.data().unoCuatrimestreCondicionados}</td>
          <td>${doc.data().unoCuatrimestreAusentes}</td>
          <td>${doc.data().EvaluaciónintegradoraAprobados}</td>
          <td>${doc.data().EvaluaciónintegradoraInsuficientes}</td>
          <td>${doc.data().EvaluaciónintegradoraAusentes}</td>
        </tr>
        `
    });
});

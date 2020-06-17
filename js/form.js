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
      catedra: catedra
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
      $('#myModal').modal('show');

  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });

}

// Leer datos
var tabla = document.getElementById('ex-table');
db.collection("202001alumnosasistencia").onSnapshot((querySnapshot) => {
    tabla.innerHTML = "";
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        tabla.innerHTML += `
        <tr>
          <td>${doc.data().materia}</td>
          <td>${doc.data().catedra}</td>
          <td>${doc.data().dNombre}</td>
          <td>${doc.data().dApellido}</td>
          <td>${doc.data().inscriptos}</td>
          <td>${doc.data().tConvalidados}</td>
          <td>${doc.data().tPendientes}</td>
          <td>${doc.data().tAusentes}</td>
          <td>${doc.data().pConvalidados}</td>
          <td>${doc.data().pPendientes}</td>
          <td>${doc.data().pAusentes}</td>
        </tr>
        `
    });
});

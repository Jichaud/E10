firebase.initializeApp({
    apiKey: 'AIzaSyDpEy3uHqr57WMVz8rqh98xFT5-SyUZ8aU',
    authDomain: 'pedido-de-datos.firebaseapp.com',
    projectId: 'pedido-de-datos'
  });
  
  // Initialize Cloud Firestore through Firebase
  var pedidoDeDatos = firebase.firestore();

  pedidoDeDatos.collection("ceide").doc("datos-personales-ceide").set({
    nombre: "Néstor",
    apellido: "Ceide",
    cuit: "20-07763421-7",
    nacido: "15/01/1947"
})
.then(function() {
    console.log("Documento guardado correctamente");
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

// rellenar datos personales
var docRef = pedidoDeDatos.collection("ceide").doc("datos-personales-ceide");

docRef.get().then(function(documentSnaposhot){
if (documentSnaposhot.exists){
 var data = documentSnaposhot.data().nombre; 
 document.getElementById("nombreF").value = data;
 var data = documentSnaposhot.data().apellido; 
 document.getElementById("apellidoF").value = data;
} else {
    console.log('document not found');
}
});

// rellenar rodados
function guardar(){
    var fecha_alta = document.getElementById("fechaRF").value;
    var marca = document.getElementById("marcaRF").value;
    var patente = document.getElementById("patenteRF").value;
    pedidoDeDatos.collection("ceide").add({
        tipo: "Rodado",
        fecha_alta: fecha_alta,
        marca: marca,
        patente: patente
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

// OTRO USUARIO

pedidoDeDatos.collection("diez").doc("datos-personales-diez").set({
    nombre: "Gustavo",
    apellido: "Diez",
    cuit: "23-12895122-9",
    nacido: "03/12/1958"
})
.then(function() {
    console.log("Documento guardado correctamente");
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

// rellenar datos personales
var docRef = pedidoDeDatos.collection("diez").doc("datos-personales-diez");

docRef.get().then(function(documentSnaposhot){
if (documentSnaposhot.exists){
 var data = documentSnaposhot.data().nombre; 
 document.getElementById("nombreF").value = data;
 var data = documentSnaposhot.data().apellido; 
 document.getElementById("apellidoF").value = data;
} else {
    console.log('document not found');
}
});

// rellenar rodados
function guardar(){
    var fecha_alta = document.getElementById("fechaRF").value;
    var marca = document.getElementById("marcaRF").value;
    var patente = document.getElementById("patenteRF").value;
    pedidoDeDatos.collection("diez").add({
        tipo: "Rodado",
        fecha_alta: fecha_alta,
        marca: marca,
        patente: patente
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

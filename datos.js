firebase.initializeApp({
    apiKey: 'AIzaSyDpEy3uHqr57WMVz8rqh98xFT5-SyUZ8aU',
    authDomain: 'pedido-de-datos.firebaseapp.com',
    projectId: 'pedido-de-datos'
  });
  
  // Initialize Cloud Firestore through Firebase
  var pedidoDeDatos = firebase.firestore();

  pedidoDeDatos.collection("ceide").doc("datos-personales").set({
    nombre: "Néstor",
    apellido: "Ceide",
    cuit: "20-07763421-6",
    nacido: "15/01/1947"
})
.then(function() {
    console.log("Documento guardado correctamente");
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

// rellenar datos personales
var docRef = pedidoDeDatos.collection("ceide").doc("datos-personales");

docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        var nombreF = document.getElementById("nombreF");
        nombreF.value = nombre;
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");        
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
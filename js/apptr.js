// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyCnzSBNe8lOq7AwWSU8f_-TuUwuOJ83VUs",
  authDomain: "reforma-tributaria.firebaseapp.com",
  databaseURL: "https://reforma-tributaria.firebaseio.com",
  projectId: "reforma-tributaria",
  storageBucket: "reforma-tributaria.appspot.com",
  messagingSenderId: "296085476842",
  appId: "1:296085476842:web:f4c91bc5a4063281288e93"
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.requestPermission()
.then(function() {
  console.log('Tiene permiso');
})
.catch(function(err){
  console.log('Error de permiso');
})

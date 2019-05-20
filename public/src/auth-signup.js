let firebaseConfig = {
  apiKey: "AIzaSyDX3oh7iDQNyPIofhcOKmX_8dE-f9XrtIk",
  authDomain: "timecast-1557870834786.firebaseapp.com",
  databaseURL: "https://timecast-1557870834786.firebaseio.com",
  projectId: "timecast-1557870834786",
  storageBucket: "timecast-1557870834786.appspot.com",
  messagingSenderId: "155867587275",
  appId: "1:155867587275:web:0cce55dd26564658"
};

firebase.initializeApp(firebaseConfig);

const signIn = document.querySelector('.login-btn');
signIn.addEventListener("click", (e) => {
  e.preventDefault();

  let email = document.querySelector('#login-email').value;
  let password = document.querySelector('#login-password').value;
  
  firebase.auth().signInWithEmailAndPassword(email, password)
  // .then(function (response) { 
  //   window.location = 'home.html?id=' + response.user.uid; 
  // })
  .catch(function (error) {
    let errorCode = error.code;
    let errorMessage = error.message;
    alert('Ocorreu um erro, tente novamente.');
    console.log(errorCode,errorMessage);
  });
});

const signUp = document.querySelector(".signup-btn");
signUp.addEventListener("click", (e) => {
  e.preventDefault()

  let email = document.querySelector("#signup-email").value;
  let password = document.querySelector("#signup-password").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
  // .then(function (response) {
  //   writeUserData(email, password, response.user.uid);
  //   window.location = 'home.html?id=' + response.user.uid;
  // })
  .catch(function (error) {
    let errorCode = error.code;
    let errorMessage = error.message;
    alert('Ocorreu um erro, tente novamente.');
    console.log(errorCode,errorMessage);
  })
})


// $('#logout-btn').click(function() {
//   firebase.auth().signOut().then(function() {
//       window.location = 'index.html'
//     }).catch(function(error) {
//      alert('Ocorreu um erro, tente novamente.')
//     });
// }) 


// firebase.auth().onAuthStateChanged(function(user) {
// if (user) {
//  console.log('user', user)
// } else {
//   console.log('não conectado')
// }
// });


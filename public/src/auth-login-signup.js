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

$(document).ready(function () {
  $("#signup-btn").click(function () {
    event.preventDefault();
    let name = $("#signup-name").val();
    let email = $("#signup-email").val();
    console.log("foi", email)
    let password = $("#signup-password").val();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      // .then(() => {
      //   const user = firebase.auth().currentUser
      //     // user.updateProfile({
      //     //   displayName: name,
      //     //   photoURL: '',
      //     // })

      .then(() => window.location.href = "categories.html")
      // })
      .catch(error => $('#error-msg').text(error.message));
    console.log(error)
  });

  $("#login-btn").click(function () {
    let email = $("#login-email").val();
    console.log("login email", email)
    let password = $("#login-password").val();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => window.location.href = "home.html")
      .catch(error => $('#error-msg').text(error.message));
  });

  $('#logout-btn').click(function () {
    firebase
      .auth()
      .signOut()
      .then(() => window.location.href = "index.html");
      .catch ((error) => alert('Ocorreu um erro, tente novamente.'));
});
});
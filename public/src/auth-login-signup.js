const firebaseConfig = {
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
    const name = $("#signup-name").val();
    const email = $("#signup-email").val();
    const password = $("#signup-password").val();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser
        user.updateProfile({
          displayName: name
        })
          .then(() => window.location.href = "./pages/categories.html")
      })
      .catch(error => $('#error-msg').text(error.message));
  });

  $("#login-btn").click(function () {
    event.preventDefault();
    const email = $("#login-email").val();
    const password = $("#login-password").val();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => window.location.href = "./pages/home.html")
      .catch(error => $('#error-msg').text(error.message));
  });

  $('#logout-btn').click(function () {
    event.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(() => window.location.href = "../index.html")
      .catch((error) => $('#error-msg').text(error.message));
  });
});
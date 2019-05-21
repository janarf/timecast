

// $(document).ready(function () {
//   let name, email, uid;
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       name = user.displayName;
//       email = user.email;
//       uid = user.uid;
//       createUser(database, name, email, uid);
//     }
//   });
// });

// function createUser(database, name, email, uid) {
//   database.ref('users/' + uid).set({
//     username: name,
//     email: email,
//   });
// }


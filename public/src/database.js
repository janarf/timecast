const database = firebase.database();
const usersDatabase = database.ref('users');
const user = firebase.auth().currentUser;

$(document).ready(function () {
    let name, email, uid;

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            name = user.displayName;
            email = user.email;
            uid = user.uid;
        }
    });
});
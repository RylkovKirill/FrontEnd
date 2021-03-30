var firebaseConfig = {
  apiKey: "AIzaSyBW3zmtoQe--k732w-wyMAwPpxtX52ZBo4",
  authDomain: "anki-9bd54.firebaseapp.com",
  databaseURL: "https://anki-9bd54-default-rtdb.firebaseio.com",
  projectId: "anki-9bd54",
  storageBucket: "anki-9bd54.appspot.com",
  messagingSenderId: "475803046584",
  appId: "1:475803046584:web:663d37bcd04c2f7ca81a4d",
  measurementId: "G-8PK8M8DH0Q"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
// var isAuth = false;
// var isFirstCheck = true;
var currentUser = firebase.auth().currentUser;
firebase.auth().onAuthStateChanged(function (user) {
  currentUser = user;
  if (user) {
    document.getElementById("userButton").innerHTML  = user.displayName;
    document.getElementById("userButton").style.display = "inline";
    document.getElementById("logoutButton").style.display = "inline";
    document.getElementById("loginButton").style.display = "none";
    document.getElementById("registerButton").style.display = "none";
    // isAuth = true;
    // if (isFirstCheck) {
    //   isFirstCheck = false
    //   window.location.hash = '#/';
    // }

  } else {
    // isAuth = false;
    document.getElementById("loginButton").style.display = "inline";
    document.getElementById("registerButton").style.display = "inline";
    document.getElementById("userButton").style.display = "none";
    document.getElementById("logoutButton").style.display = "none";
  }
});

function logout() {
  history.pushState(null, null, '#/logout')
  firebase.auth().signOut();
  window.location.hash = '#/';
}

function user() {
  var user = firebase.auth().currentUser;
  if (user != null) {
    user.providerData.forEach(function (profile) {
      console.log("Sign-in provider: " + profile.providerId);
      console.log("  Provider-specific UID: " + profile.uid);
      console.log("  Name: " + profile.displayName);
      console.log("  Email: " + profile.email);
      console.log("  Photo URL: " + profile.photoURL);
    });
  }
}

// function hashchange() {
//   if (window.location.hash == '#/home') {
//     window.location.hash = '#/';
//   } else {
//     window.location.hash = '#/home';
//   }
// }

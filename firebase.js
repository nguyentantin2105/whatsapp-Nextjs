import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBVDNkKS-hh93YzRuGIyqRJSVa7eT-_SMQ",
    authDomain: "whatsapp-practice-72b68.firebaseapp.com",
    projectId: "whatsapp-practice-72b68",
    storageBucket: "whatsapp-practice-72b68.appspot.com",
    messagingSenderId: "965417226302",
    appId: "1:965417226302:web:fb84072a59ddbdbc3cc16f"
  };

const app = !firebase.apps.length 
            ? firebase.initializeApp(firebaseConfig) 
            : firebase.app();

const db = app.firestore();
const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, provider};
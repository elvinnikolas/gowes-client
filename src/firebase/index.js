import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAINhadCDvj5s_Io7caS62Zuks7eVVUgr0",
    authDomain: "gowes-community.firebaseapp.com",
    projectId: "gowes-community",
    storageBucket: "gowes-community.appspot.com",
    messagingSenderId: "606572426901",
    appId: "1:606572426901:web:ad9369d19fcabdad35cd9c",
    measurementId: "G-7H6NJCWLJM"
}

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, firebase as default }
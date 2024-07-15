import { initializeApp } from "firebase/app";
// import * as firebase from "firebase";
// Optionally import the services that you want to use
import { browserLocalPersistence, initializeAuth } from 'firebase/auth';
import { getDatabase, ref } from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDiaqRM6QzNUDudOm4C07V5tu4z1wRzcY8",
    authDomain: "cars-3eab2.firebaseapp.com",
    projectId: "cars-3eab2",
    storageBucket: "cars-3eab2.appspot.com",
    databaseURL: "https://cars-3eab2-default-rtdb.firebaseio.com",
    messagingSenderId: "671260169378",
    appId: "1:671260169378:web:f7b88da1b088e5411cf3fb",
    measurementId: "G-L3MQME4W5T"
  };
  
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

const app = initializeApp(firebaseConfig);

export default app
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// export { firebase };
// const database = getDatabase(app)
// const auth = initializeAuth(app);
// auth.setPersistence(browserLocalPersistence);
// export default auth
// export const storage = getStorage(app)
// export const db = getDatabase(app)
//export const analytics = getAnalytics(app);

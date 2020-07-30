
  import firebase from "firebase";
  const firebaseApp = firebase.initializeApp({
  
        apiKey: "AIzaSyBVTw1kmGONDmiY-iyejIl1-l8VLLvCP-E",
        authDomain: "intagram-4bh1.firebaseapp.com",
        databaseURL: "https://intagram-4bh1.firebaseio.com",
        projectId: "intagram-4bh1",
        storageBucket: "intagram-4bh1.appspot.com",
        messagingSenderId: "97655755491",
        appId: "1:97655755491:web:796bc1107019fbbd6cebd6",
        measurementId: "G-QN62V06KVJ"
    
  }
  );
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {db,auth,storage}
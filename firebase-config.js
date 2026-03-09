
const firebaseConfig = {
  apiKey: "AIzaSyC888uHhNNp0o_ATP-XYDdyHCTRSdCSkHc",
  authDomain: "roadrunner-runaway.firebaseapp.com",
  projectId: "roadrunner-runaway",
  storageBucket: "roadrunner-runaway.firebasestorage.app",
  messagingSenderId: "479759125781",
  appId: "1:479759125781:web:ae2016ddc4bd6fce852d1c"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

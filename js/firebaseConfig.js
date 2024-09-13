// Importar os módulos necessários do Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js';

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDauCKJDHcESVWyTxeW2oVHk7eoGHN94hY",
  authDomain: "teste-ruminweb.firebaseapp.com",
  projectId: "teste-ruminweb",
  storageBucket: "teste-ruminweb.appspot.com",
  messagingSenderId: "1043468350718",
  appId: "1:1043468350718:web:bc06b3d9830e8b96de61af",
  measurementId: "G-5MR6JFYPSE"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword };

import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrB5Cj-3EI8kwbcu6H8ihOeS84OXok1LY",
  authDomain: "to-do-list-va.firebaseapp.com",
  projectId: "to-do-list-va",
  storageBucket: "to-do-list-va.appspot.com",
  messagingSenderId: "366381761381",
  appId: "1:366381761381:web:980512c4429ddf2da0978c",
  measurementId: "G-V0H21J4LY3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function Login() {
  const history = useHistory();



const handleGoogleAuth = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(async (result) => {
      console.log("Usuário logado:", result.user);

      const db = getFirestore();
      const userRef = doc(db, "users", result.user.uid);

      // Pega os dados do usuário
      const userSnap = await getDoc(userRef);

      // Verifica se o usuário já está cadastrado
      if (userSnap.exists()) {
        // Se já estiver cadastrado, define o campo online como true
        await setDoc(userRef, { online: true }, { merge: true });

        // Redireciona para a página principal
        history.push("/home");
      } else {
        // Se não estiver cadastrado, redireciona para a página de cadastro adicional
        history.push("/signup-details");
      }
    })
    .catch((error) => {
      console.error("Erro durante o login:", error);
    });
};

  return (
    <div className="divLogin">
      <br />
      <h1>To do list squad 1</h1>
      <br />
      <div className="google-btn" onClick={handleGoogleAuth}>
        <div className="google-icon-wrapper">
          <img
            className="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          />
        </div>
        <p className="btn-text">
          <b>Sign up with google</b>
        </p>
      </div>
    </div>
  );
}

export default Login;

import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";
import "../assets/styles/pages/Login.css";
import { firebaseConfig } from "../firebaseConfig";

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

        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          await setDoc(userRef, { online: true }, { merge: true });

          history.push("/home");
        } else {
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
      <h1>To do list</h1>
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

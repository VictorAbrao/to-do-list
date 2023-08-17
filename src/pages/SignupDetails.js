import React, { useState, useEffect } from "react";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function SignupDetails() {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const auth = getAuth();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const nameParts = user.displayName.split(" ");
      setFirstName(nameParts[0]);
      setLastName(nameParts[nameParts.length - 1]);
    }
  }, [auth]);

  const handleSignupDetails = async () => {
    let user = auth.currentUser;

    if (user) {
      const db = getFirestore();
      const userRef = doc(db, "users", user.uid);

      await setDoc(userRef, {
        google_id: user.uid, // Salvando o ID do Google
        first_name: firstName,
        last_name: lastName,
        online: true,
        phone_number: phoneNumber,
      });

      alert("Detalhes atualizados com sucesso!");
      history.push("/home");
    } else {
      alert("Usuário não autenticado");
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5">Complete seu cadastro</h1>
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">
          Nome
        </label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">
          Sobrenome
        </label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="phoneNumber" className="form-label">
          Número de Telefone
        </label>
        <input
          type="text"
          className="form-control"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <button
        onClick={handleSignupDetails}
        className="btn btn-primary btn-submit"
      >
        Salvar detalhes
      </button>
    </div>
  );
}

export default SignupDetails;

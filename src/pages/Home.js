import React, { useEffect, useState } from "react";
import TodoItem from "../components/TodoItem";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importar FontAwesome
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"; // Importar ícone específico
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import AddTodoModal from "../components/AddTodoModal";
import UserList from "../components/UserList";
function Home() {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const firstName = user?.displayName?.split(" ")[0];
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [offlineUsers, setOfflineUsers] = useState([]);
  const [selectedGoogleId, setSelectedGoogleId] = useState("");
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        window.location.href = "/login";
      }
    });
    loadTodosFromDatabase();

    const db = getFirestore();
    const usersQuery = query(collection(db, "users"));

    const unsubscribe = onSnapshot(usersQuery, (snapshot) => {
      const online = [];
      const offline = [];
      snapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.online) {
          online.push(userData);
        } else {
          offline.push(userData);
        }
      });
      setOnlineUsers(online);
      setOfflineUsers(offline);
    });

    // Adicionando evento para quando o usuário sai da página
    const handleBeforeUnload = async (e) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { online: false });
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      unsubscribe(); // Desinscrevendo do snapshot
      window.removeEventListener("beforeunload", handleBeforeUnload); // Removendo o evento de saída de página
    };
  }, [user]);
  const loadTodosFromDatabase = async () => {
    const db = getFirestore();
    const todosCollection = collection(db, "todos");
    const todoSnapshot = await getDocs(todosCollection);
    const usersSnapshot = await getDocs(collection(db, "users"));
    const users = {};
    usersSnapshot.forEach((doc) => {
      users[doc.data().google_id] = doc.data(); // Aqui, usamos google_id como a chave
    });

    const todoList = todoSnapshot.docs.map((doc) => {
      const todoData = doc.data();
      const lastChangedByUser = users[todoData.lastChangedBy];
      const responsibleUser = users[todoData.google_id]; // Pegue o usuário responsável pelo google_id

      return {
        ...todoData,
        id: doc.id,
        lastChangedByName: lastChangedByUser
          ? lastChangedByUser.first_name + " " + lastChangedByUser.last_name
          : "Unknown",
        responsibleName: responsibleUser
          ? responsibleUser.first_name + " " + responsibleUser.last_name
          : "Unknown", // Adicione o nome do responsável
      };
    });

    console.log("todoList", todoList);
    setTodos(todoList);
  };

  const updateState = async (id, currentState) => {
    const db = getFirestore();
    const todoRef = doc(db, "todos", id);

    let newState = currentState;
    if (currentState === "to do") {
      newState = "in progress";
    } else if (currentState === "in progress") {
      newState = "done";
    }

    await updateDoc(todoRef, { state: newState });
    loadTodosFromDatabase();
  };

  const addTodo = async () => {
    const db = getFirestore();
    const todosCollection = collection(db, "todos");
    await addDoc(todosCollection, {
      text: description,
      date: date,
      locked: false,
      state: "to do",
      lastChangedBy: user.uid,
      google_id: selectedGoogleId, // Adicionar o Google ID selecionado
    });
    setDescription("");
    setDate("");
    setSelectedGoogleId(""); // Resetar o Google ID selecionado
    loadTodosFromDatabase();
    setShowModal(false);
  };

  const lockTodo = async (id) => {
    const db = getFirestore();
    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, {
      locked: true,
      lastChangedBy: user.uid, // Atualizar nome completo do usuário logado
    });
    loadTodosFromDatabase();
  };

  const unlockTodo = async (id) => {
    const db = getFirestore();
    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, {
      locked: false,
      lastChangedBy: user.uid, // Atualizar nome completo do usuário logado
    });
    loadTodosFromDatabase();
  };

  const deleteTodo = async (id) => {
    const db = getFirestore();
    const todoRef = doc(db, "todos", id);
    await deleteDoc(todoRef);
    loadTodosFromDatabase();
  };

  const handleSignOut = async () => {
    const db = getFirestore();
    const userRef = doc(db, "users", user.uid); // Certifique-se de que o UID é a chave correta
    await updateDoc(userRef, { online: false });
    signOut(auth).then(() => {
      window.location.href = "/login";
    });
  };

  const revertState = async (id) => {
    const db = getFirestore();
    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, { state: "to do" });
    loadTodosFromDatabase();
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-nav ml-auto">
          <span className="navbar-text">Welcome, {firstName}!</span>
          <button onClick={handleSignOut} className="btn btn-dark btn-logout">
            <FontAwesomeIcon icon={faSignOutAlt} /> {/* Ícone de logout */}
          </button>
        </div>
      </nav>
      <UserList onlineUsers={onlineUsers} offlineUsers={offlineUsers} />

      <AddTodoModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        description={description}
        date={date}
        selectedGoogleId={selectedGoogleId}
        onlineUsers={onlineUsers}
        offlineUsers={offlineUsers}
        setDescription={setDescription}
        setDate={setDate}
        setSelectedGoogleId={setSelectedGoogleId}
        addTodo={addTodo}
      />

      <button onClick={() => setShowModal(true)} className="btn btn-primary">
        Add To Do
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Date</th>
            <th>Responsible</th>
            <th>Last Changed</th>
            <th>Blocked</th>
            <th>State</th> {/* Adicionar coluna de estado */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              loggedInGoogleId={user?.uid}
              onLock={() => lockTodo(todo.id)}
              onUnlock={() => unlockTodo(todo.id)}
              onDelete={() => deleteTodo(todo.id)}
              onUpdateState={() => updateState(todo.id, todo.state)}
              onRevertState={() => revertState(todo.id)} // Adicionando a prop onRevertState
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;

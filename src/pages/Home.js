import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useFirestoreTodos } from "../hooks/useFirestoreTodos";
import Navbar from "../components/Navbar";
import UserList from "../components/UserList";
import AddTodoModal from "../components/AddTodoModal";
import TodoTable from "../components/TodoTable";
import Filter from "../components/Filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/pages/Home.css";

function Home() {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState(null);
  const {
    todos,
    onlineUsers,
    offlineUsers,
    handleBeforeUnload,
    updateUserStatus,
  } = useFirestoreTodos(user);
  const [filters, setFilters] = useState({});

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
    console.log("filters", filters);
  };

  const handleEditTodo = (todoCode) => {
    const todoToEdit = todos.find((todo) => todo.id === todoCode);
    if (todoToEdit) {
      setEditing(true);
      setTodoToEdit(todoToEdit);
      console.log("todo alterado", todoToEdit);
      setShowModal(true);
    } else {
      console.error(`To Do com o código ${todoCode} não encontrado`);
    }
  };

  const handleAddTodo = () => {
    setEditing(false);
    setTodoToEdit(null);
    setShowModal(true);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        window.location.href = "/login";
      }
    });

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [user]);

  const handleSignOut = async () => {
    await updateUserStatus(user, false);
    signOut(auth).then(() => {
      window.location.href = "/login";
    });
  };

  return (
    <div className="container">
      <Navbar user={user} handleSignOut={handleSignOut} />
      <UserList onlineUsers={onlineUsers} offlineUsers={offlineUsers} />
      <br></br>
      <center>
        <h1>To do List</h1>
      </center>

      <AddTodoModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onlineUsers={onlineUsers}
        offlineUsers={offlineUsers}
        user={user}
        editing={editing}
        todoToEdit={todoToEdit}
      />
      <button onClick={handleAddTodo} className="btn btn-primary add-todo-btn">
        <FontAwesomeIcon icon={faPlus} />
      </button>

      <Filter
        users={[...onlineUsers, ...offlineUsers]}
        onFilterChange={handleFilterChange}
      />
      <TodoTable user={user} filters={filters} onEdit={handleEditTodo} />
    </div>
  );
}

export default Home;

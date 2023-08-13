import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";

export const useFirestoreTodos = (user) => {
  const [todos, setTodos] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [offlineUsers, setOfflineUsers] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const todosCollection = collection(db, "todos");
    const usersCollection = collection(db, "users");

    const unsubscribeTodos = onSnapshot(todosCollection, async (snapshot) => {
      const usersSnapshot = await getDocs(usersCollection);
      const users = {};
      usersSnapshot.forEach((doc) => {
        users[doc.data().google_id] = doc.data();
      });

      const todoList = snapshot.docs.map((doc) => {
        const todoData = doc.data();
        const lastChangedByUser = users[todoData.lastChangedBy];
        const responsibleUser = users[todoData.google_id];

        return {
          ...todoData,
          id: doc.id,
          lastChangedByName: lastChangedByUser
            ? lastChangedByUser.first_name + " " + lastChangedByUser.last_name
            : "Unknown",
          responsibleName: responsibleUser
            ? responsibleUser.first_name + " " + responsibleUser.last_name
            : "Unknown",
        };
      });

      setTodos(todoList);
    });

    const usersQuery = query(usersCollection);
    const unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
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

    return () => {
      unsubscribeTodos();
      unsubscribeUsers();
    };
  }, [user]);

  const lockTodo = async (id) => {
    const db = getFirestore();
    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, {
      locked: true,
      lastChangedBy: user.uid,
    });
  };

  const addTodoToDatabase = async (newTodo) => {
    const db = getFirestore();
    const todosCollection = collection(db, "todos");
    await addDoc(todosCollection, newTodo);
    // Resetar o Google ID selecionado
  };

  const updateTodoInDatabase = async (updatedTodo) => {
    const db = getFirestore();
    const todoRef = doc(db, "todos", updatedTodo.id); // Certifique-se de que o updatedTodo contenha o ID do todo que você deseja atualizar
    await updateDoc(todoRef, updatedTodo);
  };

  const unlockTodo = async (id) => {
    const db = getFirestore();
    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, {
      locked: false,
      lastChangedBy: user.uid,
    });
  };

  const deleteTodo = async (id) => {
    const db = getFirestore();
    const todoRef = doc(db, "todos", id);
    await deleteDoc(todoRef);
  };

  const revertState = async (id) => {
    const db = getFirestore();
    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, { state: "to do" });
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
  };

  const handleBeforeUnload = async (e) => {
    if (user) {
      const db = getFirestore();
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { online: false });
    }
  };
  const updateUserStatus = async (user, online) => {
    const db = getFirestore();
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        online: online,
      });
    }
  };

  return {
    todos,
    onlineUsers,
    offlineUsers,
    handleBeforeUnload,
    lockTodo,
    unlockTodo,
    deleteTodo,
    revertState,
    updateState,
    addTodoToDatabase,
    updateTodoInDatabase,
    updateUserStatus,
  };
};

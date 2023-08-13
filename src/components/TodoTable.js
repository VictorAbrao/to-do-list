import React from "react";
import TodoItem from "../components/TodoItem";
import { useFirestoreTodos } from "../hooks/useFirestoreTodos";

const TodoTable = ({
  user,
  onEdit,
  filters,
}) => {
  const { todos, deleteTodo, updateState, revertState, unlockTodo, lockTodo } =
    useFirestoreTodos(user);

  const filteredTodos = todos.filter((todo) => {
    return (
      (!filters.description || todo.text.includes(filters.description)) &&
      (!filters.date || todo.date === filters.date) &&
      // Adicione outras condições de filtragem conforme necessário
      (!filters.state || todo.state === filters.state) &&
      (!filters.google_id || todo.google_id === filters.google_id)
    );
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Description</th>
          <th>Date</th>
          <th>Responsible</th>
          <th>Last Changed</th>
          <th>Blocked</th>
          <th>State</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredTodos.map((todo) => (
      <TodoItem
            key={todo.id}
            todo={todo}
            loggedInGoogleId={user?.uid}
            onLock={() => lockTodo(todo.id)}
            onUnlock={() => unlockTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
            onUpdateState={() => updateState(todo.id, todo.state)}
            onRevertState={() => revertState(todo.id)}
            onEdit={() => onEdit(todo.id)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TodoTable;

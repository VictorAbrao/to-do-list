import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faTrash,
  faArrowRight,
  faArrowLeft,
  faUnlock,
  faPen,
} from "@fortawesome/free-solid-svg-icons"; // Importando o ícone da seta para esquerda
import "../assets/styles/components/TodoItem.css";

function TodoItem({
  todo,
  loggedInGoogleId,
  onLock,
  onUnlock,
  onDelete,
  onUpdateState,
  onRevertState,
  onEdit,
}) {
  // Adicionando uma nova prop onRevertState
  return (
    <tr>
      <td>{todo.text}</td>
      <td>{todo.date}</td>
      <td>{todo.responsibleName}</td>
      <td>{todo.lastChangedByName}</td>
      <td>{todo.locked ? "Yes" : "No"}</td>
      <td>{todo.state}</td>
      <td>
        <div className="divActions" role="group">
          {todo.locked && todo.google_id !== loggedInGoogleId ? (
            "Task Blocked"
          ) : (
            <>
              {todo.state === "in progress" && (
                <button
                  type="button"
                  className="btn btn-secondary mr-2"
                  onClick={onRevertState}
                >
                  <FontAwesomeIcon className="iconAction" icon={faArrowLeft} />
                </button>
              )}
              {todo.state !== "done" && (
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={onUpdateState}
                >
                  <FontAwesomeIcon className="iconAction" icon={faArrowRight} />
                </button>
              )}
              {todo.google_id === loggedInGoogleId && !todo.locked && (
                <button
                  type="button"
                  className="btn btn-warning mr-2"
                  onClick={onLock}
                >
                  <FontAwesomeIcon className="iconAction" icon={faLock} />
                </button>
              )}
              {todo.google_id === loggedInGoogleId && todo.locked && (
                <button
                  type="button"
                  className="btn btn-warning mr-2"
                  onClick={onUnlock}
                >
                  <FontAwesomeIcon className="iconAction" icon={faUnlock} />
                </button>
              )}
              <button
                type="button"
                className="btn btn-success mr-2"
                onClick={() => onEdit(todo)} // Adicione essa linha
              >
                <FontAwesomeIcon className="iconAction" icon={faPen} />
              </button>
              <button
                type="button"
                className="btn btn-danger mr-2"
                onClick={onDelete}
              >
                <FontAwesomeIcon className="iconAction" icon={faTrash} />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

export default TodoItem;

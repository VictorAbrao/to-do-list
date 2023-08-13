import React, { useState, useEffect } from 'react';
import { useFirestoreTodos } from '../hooks/useFirestoreTodos';

function AddTodoModal({ show, handleClose, onlineUsers, offlineUsers, user, editing, todoToEdit }) {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [selectedGoogleId, setSelectedGoogleId] = useState('');
  const [state, setState] = useState('to do');
  const { addTodoToDatabase, updateTodoInDatabase } = useFirestoreTodos(user);

  const addTodo = () => {
    const newTodo = {
      text: description,
      date: date,
      locked: false,
      state: state,
      lastChangedBy: user.uid,
      google_id: selectedGoogleId,
    };

    addTodoToDatabase(newTodo);

    setDescription('');
    setDate('');
    setSelectedGoogleId('');
    setState('to do');
    handleClose();
  };

  const editTodo = () => {
    const updatedTodo = {
      ...todoToEdit,
      text: description,
      date: date,
      google_id: selectedGoogleId,
      state: state,
    };

    updateTodoInDatabase(updatedTodo);

    setDescription('');
    setDate('');
    setSelectedGoogleId('');
    setState('to do');
    handleClose();
  };

  useEffect(() => {
    if (show) {
      const backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop fade show';
      document.body.appendChild(backdrop);
      document.body.classList.add('modal-open');
      if (editing && todoToEdit) {
        setDescription(todoToEdit.text);
        setDate(todoToEdit.date);
        setSelectedGoogleId(todoToEdit.google_id);
        setState(todoToEdit.state);
      }
    } else {
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) document.body.removeChild(backdrop);
      setDescription('');
      setDate('');
      setSelectedGoogleId('');
      setState('to do');
    }
  }, [show]);

  return (
    <div className={`modal fade ${show ? 'show' : ''}`} tabIndex="-1" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{editing ? 'Edit Todo' : 'Add Todo'}</h5>
            <button type="button" className="btn-close" onClick={handleClose} />
          </div>
          <div className="modal-body">
            <input type="text" className="form-control mb-2" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="date" className="form-control mb-2" value={date} onChange={(e) => setDate(e.target.value)} />
            <select className="form-control mb-2" value={selectedGoogleId} onChange={(e) => setSelectedGoogleId(e.target.value)}>
              <option value="">Select Responsible</option>
              {onlineUsers.map((user) => (
                <option key={user.google_id} value={user.google_id}>
                  {user.first_name + " " + user.last_name}
                </option>
              ))}
              {offlineUsers.map((user) => (
                <option key={user.google_id} value={user.google_id}>
                  {user.first_name + " " + user.last_name}
                </option>
              ))}
            </select>
            <select className="form-control mb-2" value={state} onChange={(e) => setState(e.target.value)}>
              <option value="to do">To Do</option>
              <option value="in progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
            {editing ? (
              <button type="button" className="btn btn-primary" onClick={editTodo}>Edit Todo</button>
            ) : (
              <button type="button" className="btn btn-primary" onClick={addTodo}>Add Todo</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTodoModal;

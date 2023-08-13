import React, { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function AddTodoModal({ show, handleClose, description, date, selectedGoogleId, onlineUsers, offlineUsers, setDescription, setDate, setSelectedGoogleId, addTodo }) {

  useEffect(() => {
    if (show) {
      document.body.classList.add('modal-open');
      const backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop fade show';
      document.body.appendChild(backdrop);
    } else {
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) document.body.removeChild(backdrop);
    }

    return () => {
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) document.body.removeChild(backdrop);
    };
  }, [show]);

  return (
    <div className={`modal fade ${show ? 'show' : ''}`} tabIndex="-1" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Todo</h5>
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
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={addTodo}>Add Todo</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTodoModal;

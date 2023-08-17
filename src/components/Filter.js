import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/components/Filter.css";

function Filter({ onFilterChange, users }) {
  return (
    <div className="container my-3 divFilter">
      <form className="row">
        <div className="col form-group">
          <label htmlFor="description" className="mr-1">
            Description:
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            onChange={(e) => onFilterChange("description", e.target.value)}
          />
        </div>
        <div className="col form-group">
          <label htmlFor="responsible" className="mr-1">
            Responsible:
          </label>
          <select
            data-testid="responsible-select"
            className="form-control"
            id="google_id"
            onChange={(e) => onFilterChange("google_id", e.target.value)}
          >
            <option value="">All</option>
            {users.map((user) => (
              <option key={user.google_id} value={user.google_id}>
                {user.first_name + " " + user.last_name}
              </option>
            ))}
          </select>
        </div>
        <div className="col form-group">
          <label htmlFor="date" className="mr-1">
            Date:
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            onChange={(e) => onFilterChange("date", e.target.value)}
          />
        </div>
        <div className="col form-group">
          <label htmlFor="state" className="mr-1">
            State:
          </label>
          <select
            className="form-control"
            id="state"
            onChange={(e) => onFilterChange("state", e.target.value)}
          >
            <option value="">All</option>
            <option value="to do">To do</option>
            <option value="in progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default Filter;

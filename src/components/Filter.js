import React from 'react';

function Filter({ onFilterChange }) {
  return (
    <div>
      <label htmlFor="filter">Filter tasks:</label>
      <select id="filter" onChange={e => onFilterChange(e.target.value)}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
        {/* Adicionar mais opções conforme necessário */}
      </select>
    </div>
  );
}

export default Filter;
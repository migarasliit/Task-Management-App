// frontend/src/components/FilterBar.jsx
function FilterBar({ filterPriority, setFilterPriority, filterStatus, setFilterStatus, onReset }) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="filter-priority">Filter by Priority:</label>
        <select 
          id="filter-priority" 
          value={filterPriority} 
          onChange={(e) => setFilterPriority(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="filter-status">Filter by Status:</label>
        <select 
          id="filter-status" 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <button className="btn btn-reset" onClick={onReset}>
        Clear Filters
      </button>
    </div>
  );
}

export default FilterBar;
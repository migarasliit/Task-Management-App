// frontend/src/components/TaskItem.jsx
function TaskItem({ task, onDelete, onStatusChange }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const handleStatusChange = (e) => {
    onStatusChange(task._id, e.target.value);
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <h3>{task.title}</h3>
        <span 
          className="priority-badge" 
          style={{ backgroundColor: getPriorityColor(task.priority) }}
        >
          {task.priority}
        </span>
      </div>
      
      <p className="task-description">{task.description}</p>
      
      <div className="task-footer">
        <span className="task-date">📅 Due: {formatDate(task.dueDate)}</span>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {/* Status Dropdown */}
          <select 
            value={task.status} 
            onChange={handleStatusChange}
            className="status-select"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Delete Button */}
          <button 
            className="btn btn-delete" 
            onClick={() => onDelete(task._id)}
            title="Delete Task"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
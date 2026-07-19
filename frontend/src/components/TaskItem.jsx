// frontend/src/components/TaskItem.jsx
function TaskItem({ task }) {
  // Helper function to format the date nicely
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Helper function to get color based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#ef4444'; // Red
      case 'Medium': return '#f59e0b'; // Orange
      case 'Low': return '#10b981'; // Green
      default: return '#6b7280';
    }
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
        <span className={`status-badge status-${task.status.toLowerCase().replace(' ', '-')}`}>
          {task.status}
        </span>
      </div>
    </div>
  );
}

export default TaskItem;
// frontend/src/components/TaskItem.jsx
function TaskItem({ task, onDelete, onStatusChange }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'High':
        return {
          badge: 'bg-red-100 text-red-700 border-red-200',
          border: 'border-l-red-500',
        };
      case 'Medium':
        return {
          badge: 'bg-amber-100 text-amber-700 border-amber-200',
          border: 'border-l-amber-500',
        };
      case 'Low':
        return {
          badge: 'bg-green-100 text-green-700 border-green-200',
          border: 'border-l-green-500',
        };
      default:
        return {
          badge: 'bg-gray-100 text-gray-700 border-gray-200',
          border: 'border-l-gray-500',
        };
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'In Progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const styles = getPriorityStyles(task.priority);

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 border-l-4 ${styles.border} p-6 hover:shadow-md transition-shadow duration-200 mb-4`}>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900">{task.title}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${styles.badge}`}>
              {task.priority}
            </span>
          </div>
          
          <p className="text-gray-600 mb-4 leading-relaxed">{task.description}</p>
          
          <div className="flex items-center text-gray-500 text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Due {formatDate(task.dueDate)}</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 md:items-center">
          <select
  value={task.status}
  onChange={(e) => onStatusChange(task._id, e.target.value)}
  className={`px-4 py-2 rounded-lg border font-semibold text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 ${getStatusStyles(task.status)}`}
>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          
          <button
            onClick={() => onDelete(task._id)}
            className="bg-red-50 hover:bg-red-600 hover:text-white text-red-600 border border-red-200 font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
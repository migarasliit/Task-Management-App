// frontend/src/components/TaskList.jsx
import TaskItem from './TaskItem';

function TaskList({ tasks, isLoading, onDelete, onStatusChange }) {
  if (isLoading) {
    return <p className="loading-text">Loading tasks...</p>;
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks found. Add your first task above!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem 
          key={task._id} 
          task={task} 
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}

export default TaskList;
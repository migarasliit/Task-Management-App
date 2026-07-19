// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { getTasks, createTask, updateTask, deleteTask } from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const data = await getTasks();
      setTasks(data);
      setError('');
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks. Is the backend running?');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks((prevTasks) => [newTask, ...prevTasks]);
    } catch (err) {
      console.error('Error creating task:', err);
      alert('Failed to add task. Please check your input and try again.');
    }
  };

  // NEW: Handle Status Update
  const handleStatusChange = async (id, newStatus) => {
    try {
      const updatedTask = await updateTask(id, { status: newStatus });
      // Update the specific task in the local state array
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? updatedTask : task))
      );
    } catch (err) {
      console.error('Error updating task:', err);
      alert('Failed to update task status.');
    }
  };

  // NEW: Handle Delete
  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        // Remove the deleted task from the local state array
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      } catch (err) {
        console.error('Error deleting task:', err);
        alert('Failed to delete task.');
      }
    }
  };

  return (
    <>
      <Navbar />
      <main className="container">
        <TaskForm onAddTask={handleAddTask} />
        
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>Your Tasks</h2>
          {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
          
          {/* Pass the new handlers down to TaskList */}
          <TaskList 
            tasks={tasks} 
            isLoading={isLoading} 
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />
        </div>
      </main>
    </>
  );
}

export default App;
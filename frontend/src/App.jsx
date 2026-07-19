// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import { getTasks, createTask, updateTask, deleteTask } from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // NEW: Filter States
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

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

  const handleStatusChange = async (id, newStatus) => {
    try {
      const updatedTask = await updateTask(id, { status: newStatus });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? updatedTask : task))
      );
    } catch (err) {
      console.error('Error updating task:', err);
      alert('Failed to update task status.');
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      } catch (err) {
        console.error('Error deleting task:', err);
        alert('Failed to delete task.');
      }
    }
  };

  const handleResetFilters = () => {
    setFilterPriority('All');
    setFilterStatus('All');
  };

  // NEW: Filtering Logic
  const filteredTasks = tasks.filter((task) => {
    const matchPriority = filterPriority === 'All' || task.priority === filterPriority;
    const matchStatus = filterStatus === 'All' || task.status === filterStatus;
    return matchPriority && matchStatus;
  });

  return (
    <>
      <Navbar />
      <main className="container">
        <TaskForm onAddTask={handleAddTask} />
        
        <div style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2>Your Tasks</h2>
            <span className="task-count">({filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''})</span>
          </div>
          
          {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
          
          {/* NEW: Filter Bar */}
          <FilterBar 
            filterPriority={filterPriority}
            setFilterPriority={setFilterPriority}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            onReset={handleResetFilters}
          />

          <div style={{ marginTop: '1.5rem' }}>
            <TaskList 
              tasks={filteredTasks} 
              isLoading={isLoading} 
              onDelete={handleDeleteTask}
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
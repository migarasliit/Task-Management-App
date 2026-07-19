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

  const filteredTasks = tasks.filter((task) => {
    const matchPriority = filterPriority === 'All' || task.priority === filterPriority;
    const matchStatus = filterStatus === 'All' || task.status === filterStatus;
    return matchPriority && matchStatus;
  });

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TaskForm onAddTask={handleAddTask} />
        
        <div className="mt-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Your Tasks</h2>
           <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
  {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
</span>
          </div>
          
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          
          <FilterBar
            filterPriority={filterPriority}
            setFilterPriority={setFilterPriority}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            onReset={handleResetFilters}
          />

          <TaskList
            tasks={filteredTasks}
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
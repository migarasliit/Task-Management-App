// frontend/src/App.jsx
import Navbar from './components/Navbar';
import TaskForm from './components/TaskForm';

function App() {
  // Temporary placeholder function. We will connect this to the backend API in Step 4!
  const handleAddTask = (taskData) => {
    console.log('New Task Data:', taskData);
    alert('Task form submitted! Check the browser console (F12) to see the data.');
  };

  return (
    <>
      <Navbar />
      <main className="container">
        <TaskForm onAddTask={handleAddTask} />
      </main>
    </>
  );
}

export default App;
// frontend/src/components/TaskForm.jsx
import { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic Validation
    if (!formData.title.trim() || !formData.description.trim() || !formData.dueDate) {
      setError('Please fill in all required fields (Title, Description, Due Date).');
      return;
    }

    // Pass data up to parent component (we will connect to API in Step 4)
    onAddTask(formData);
    
    // Reset form
    setFormData({ title: '', description: '', priority: 'Medium', dueDate: '' });
  };

  return (
    <div className="container" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Add New Task</h2>
      
      {error && <p style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            placeholder="e.g., Complete MERN assignment"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            rows="3"
            placeholder="Briefly describe the task..."
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              className="form-control"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date *</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              className="form-control"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
          Add Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
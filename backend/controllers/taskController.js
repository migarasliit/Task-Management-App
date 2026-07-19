// backend/controllers/taskController.js
const Task = require('../models/Task');

// @desc    Get all tasks
// @route   GET /api/tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 }); // Newest first
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new task
// @route   POST /api/tasks
const createTask = async (req, res) => {
    const { title, description, priority, status, dueDate } = req.body;

    if (!title || !description || !dueDate) {
        return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    try {
        const newTask = new Task({ title, description, priority, status, dueDate });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
const updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return the updated document
            runValidators: true, // Run schema validation on update
        });

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
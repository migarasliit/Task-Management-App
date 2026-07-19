// backend/models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a task title'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please add a task description'],
            trim: true,
        },
        priority: {
            type: String,
            enum: ['Low', 'Medium', 'High'],
            default: 'Medium',
        },
        status: {
            type: String,
            enum: ['Pending', 'In Progress', 'Completed'],
            default: 'Pending',
        },
        dueDate: {
            type: Date,
            required: [true, 'Please add a due date'],
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

module.exports = mongoose.model('Task', taskSchema);
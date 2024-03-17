const Task = require('../models/Task');
const Column = require('../models/Column');

const TaskController = {
  // Create a new task in a column
  createTask: async (req, res) => {
    const { columnId, title, description } = req.body;
    
    try {
      const column = await Column.findById(columnId);
      if (!column) {
        return res.status(404).json({ message: 'Column not found' });
      }

      const newTask = new Task({ title, description, column: columnId });
      column.tasks.push(newTask._id);
      await newTask.save();
      await column.save();

      res.status(201).json(newTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get a single task by ID
  getTaskById: async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a task by ID
  updateTask: async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a task by ID
  deleteTask: async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      
      // If the task is stored in a column, you would also remove it from the column's task array
      if (task.column) {
        const column = await Column.findById(task.column);
        if (column) {
          column.tasks.pull(task._id);
          await column.save();
        }
      }

      await task.remove();
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = TaskController;

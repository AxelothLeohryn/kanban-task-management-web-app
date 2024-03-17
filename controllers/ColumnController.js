const Board = require("../models/Board");
const Column = require("../models/Column");

const ColumnController = {
  // Add a new column to a board
  createColumn: async (req, res) => {
    const { boardId, name } = req.body;
    try {
      const board = await Board.findById(boardId);
      if (!board) {
        return res.status(404).json({ message: "Board not found" });
      }

      const newColumn = new Column({ name, board: boardId, tasks: [] });
      await newColumn.save();
      board.columns.push(newColumn);
      await board.save();

      res.status(201).json(newColumn);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get a single column by ID
  getColumnById: async (req, res) => {
    try {
      const column = await Column.findById(req.params.id);
      if (!column) {
        return res.status(404).json({ message: "Column not found" });
      }
      res.json(column);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a column by ID
  updateColumn: async (req, res) => {
    try {
      const column = await Column.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!column) {
        return res.status(404).json({ message: "Column not found" });
      }
      res.json(column);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a column by ID
  // Delete a column by ID and all its associated tasks
  deleteColumn: async (req, res) => {
    try {
      const column = await Column.findById(req.params.id);
      if (!column) {
        return res.status(404).json({ message: "Column not found" });
      }

      // Delete all tasks associated with the column
      await Task.deleteMany({ column: column._id });

      await column.remove();
      res.json({
        message: "Column and all associated tasks deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = ColumnController;

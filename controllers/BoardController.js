const Board = require("../models/Board");
const Column = require("../models/Column");
const Task = require("../models/Task");

const BoardController = {
  // Get all boards
  getAllBoards: async (req, res) => {
    try {
      const boards = await Board.find();
      res.json(boards);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create a new board
  createBoard: async (req, res) => {
    const { name } = req.body;
    // You may want to add validation here
    const board = new Board({
      name,
    });

    try {
      const newBoard = await board.save();
      res.status(201).json(newBoard);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get a single board by ID
  getBoardById: async (req, res) => {
    try {
      const board = await Board.findById(req.params.id);
      if (board) {
        res.json(board);
      } else {
        res.status(404).json({ message: "Board not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a board by ID
  updateBoard: async (req, res) => {
    try {
      const board = await Board.findById(req.params.id);
      if (board) {
        // Update the board fields here
        Object.assign(board, req.body);
        const updatedBoard = await board.save();
        res.json(updatedBoard);
      } else {
        res.status(404).json({ message: "Board not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a board by ID and all its associated columns and tasks
  deleteBoard: async (req, res) => {
    try {
      const board = await Board.findById(req.params.id);
      if (!board) {
        return res.status(404).json({ message: "Board not found" });
      }

      // Find and delete all columns associated with the board
      const columns = await Column.find({ board: board._id });
      for (const column of columns) {
        await Task.deleteMany({ column: column._id }); // Delete tasks in the column
        await column.remove(); // Then remove the column itself
      }

      await board.remove();
      res.json({
        message:
          "Board and all associated columns and tasks deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = BoardController;

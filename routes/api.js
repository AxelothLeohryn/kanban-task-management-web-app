const express = require("express");
const router = express.Router();

// Import your controllers here
const BoardController = require("../controllers/BoardController");
const ColumnController = require("../controllers/ColumnController");
const TaskController = require("../controllers/TaskController");

// Board Routes
router.get("/boards", BoardController.getAllBoards);
router.post("/boards", BoardController.createBoard);
router.get("/boards/:id", BoardController.getBoardById);
router.put("/boards/:id", BoardController.updateBoard);
router.delete("/boards/:id", BoardController.deleteBoard);

// Column Routes
// router.post("/columns", ColumnController.createColumn);
// router.put("/columns/:id", ColumnController.updateColumn);
// router.delete("/columns/:id", ColumnController.deleteColumn);

// Task Routes
// router.post("/tasks", TaskController.createTask);
// router.get("/tasks/:id", TaskController.getTaskById);
// router.put("/tasks/:id", TaskController.updateTask);
// router.delete("/tasks/:id", TaskController.deleteTask);

module.exports = router;

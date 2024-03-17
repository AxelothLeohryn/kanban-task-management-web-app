const mongoose = require("../config/mongodb.js");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  column: {
    type: Schema.Types.ObjectId,
    ref: "Column",
  },
  subtasks: [
    {
      title: {
        type: String,
        required: true,
      },
      isCompleted: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

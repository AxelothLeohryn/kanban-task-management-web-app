const mongoose = require("../config/mongodb.js");
const Schema = mongoose.Schema;

const boardSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  columns: [
    {
      type: Schema.Types.ObjectId,
      ref: "Column",
    },
  ],
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
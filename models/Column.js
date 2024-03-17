const mongoose = require("../config/mongodb.js");
const Schema = mongoose.Schema;

const columnSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    board: {
        type: Schema.Types.ObjectId,
        ref: "Board",
    },
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: "Task",
        },
    ],
});

const Column = mongoose.model("Column", columnSchema);

module.exports = Column;
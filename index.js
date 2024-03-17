require("dotenv").config();
require("./config/mongodb.js");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
var cors = require("cors");
const morgan = require("morgan");

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const apiRoutes = require("./routes/api");
app.use("/api/v1", apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
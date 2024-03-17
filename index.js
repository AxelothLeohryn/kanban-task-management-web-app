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

//* Serve static assets in production, must be at this location of this file
if (process.env.NODE_ENV === "production") {
  //*Set static folder (VITE --> dist)
  app.use(express.static("client/dist"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
  );
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
require('dotenv').config();

const express = require("express");
const cors = require("cors");

const dbConnect = require("./config/mongo.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", require("./routes")); // reads routes/index.js by default

app.listen(port, () => {
    console.log("Server listening on port " + port);
});

dbConnect()

module.exports = app
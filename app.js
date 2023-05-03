require('dotenv').config();

const express = require("express");
const cors = require("cors");
const morganBody = require("morgan-body")
const loggerStream = require("./utils/handleLogger")
const swaggerUi = require("swagger-ui-express")
const swaggerSpecs = require("./docs/swagger")

const dbConnect = require("./config/mongo.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpecs)
)

app.use("/api", require("./routes")); // reads routes/index.js by default

morganBody(app, {
    noColors: true,
    skip: function(req, res) {
        return res.statusCode < 400
    },
    stream: loggerStream
})

app.listen(port, () => {
    console.log("Server listening on port " + port);
});

dbConnect()

module.exports = app
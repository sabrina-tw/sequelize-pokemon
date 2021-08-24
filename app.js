require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("./models/index");
const pokemonRouter = require("./routes/pokemon.route.js");
const trainersRouter = require("./routes/trainers.js");

db.sequelize.sync();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", async (req, res) => {
  console.log("Path / is hit");
  res.status(200).json({ test: "done" });
});

app.use("/pokemon", pokemonRouter);
app.use("/trainers", trainersRouter);

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;

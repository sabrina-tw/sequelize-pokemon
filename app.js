require("dotenv/config");
const express = require("express");
const app = express();
app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// const { connectDb } = require("./utils/db.js");
// await connectDb();
const db = require("./models");
db.sequelize.sync();

app.get("/", async (req, res) => {
  console.log("Path / is hit");
  res.status(200).json({ test: "done" });
});

// const { initPokemonModel } = require("./routes/pokemon.route.js");
// const { initTrainerModel } = require("./routes/trainers.route.js");
// await initPokemonModel();
// await initTrainerModel();

const pokemonRouter = require("./routes/pokemon.route.js");
const trainersRouter = require("./routes/trainers.route.js");

app.use("/pokemon", pokemonRouter);
app.use("/trainers", trainersRouter);

module.exports = app;

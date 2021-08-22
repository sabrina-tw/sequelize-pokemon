import "dotenv/config";
import express from "express";
const app = express();
app.use(express.json());

import cookieParser from "cookie-parser";
app.use(cookieParser());

import { connectDb } from "./utils/db.js";
await connectDb();

app.get("/", async (req, res) => {
  console.log("Path / is hit");
  res.status(200).json({ test: "done" });
});

import { initPokemonModel } from "./routes/pokemon.route.js";
import { initTrainerModel } from "./routes/trainers.route.js";
import pokemonRouter from "./routes/pokemon.route.js";
import trainersRouter from "./routes/trainers.route.js";
await initPokemonModel();
await initTrainerModel();

app.use("/pokemon", pokemonRouter());
app.use("/trainers", trainersRouter());

export default app;

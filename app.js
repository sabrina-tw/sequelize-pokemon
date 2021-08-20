import express from "express";

import { initPokemonModel } from "./routes/pokemon.route.js";
import pokemonRouter from "./routes/pokemon.route.js";

import { connectDb } from "./utils/db.js";
await connectDb();

const app = express();

app.get("/", async (req, res) => {
  console.log("Path / is hit");
  res.status(200).json({ test: "done" });
});

await initPokemonModel();

app.use("/pokemon", pokemonRouter());

export default app;

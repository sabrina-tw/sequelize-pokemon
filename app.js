import "dotenv/config";
import express from "express";
const app = express();

import cookieParser from "cookie-parser";
app.use(cookieParser());

import { initPokemonModel } from "./routes/pokemon.route.js";
import pokemonRouter from "./routes/pokemon.route.js";

import { connectDb } from "./utils/db.js";
await connectDb();

app.get("/", async (req, res) => {
  console.log("Path / is hit");
  res.status(200).json({ test: "done" });
});

await initPokemonModel();

app.use("/pokemon", pokemonRouter());

export default app;

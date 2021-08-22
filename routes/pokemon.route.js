import express from "express";
import dbConnection from "../utils/db.js";

import InitSimplePokemon from "../db/models/simple-pokemon.model.js";
let SimplePokemon;

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "done" });
});

router.post("/new", async (req, res) => {
  const requestedPokemon = req.body;

  const createdPokemon = await SimplePokemon.create(requestedPokemon);

  res.status(200).json(createdPokemon);
});

export default () => {
  return router;
};

export const mockPokemonModel = (mockModel) => {
  SimplePokemon = mockModel;
};

export const initPokemonModel = async () => {
  SimplePokemon = await InitSimplePokemon(dbConnection);
};

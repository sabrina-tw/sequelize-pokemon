const express = require("express");
const router = express.Router();

const db = require("../models");

router.get("/", (req, res) => {
  res.status(200).json({ message: "done" });
});

router.post("/new", async (req, res) => {
  const requestedPokemon = req.body;

  const createdPokemon = await db.SimplePokemon.create(requestedPokemon);
  res.status(200).json(createdPokemon.toJSON());
});

module.exports = router;

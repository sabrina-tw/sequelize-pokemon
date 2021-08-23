const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "done" });
});

router.post("/new", async (req, res) => {
  const requestedPokemon = req.body;

  const createdPokemon = await SimplePokemon.create(requestedPokemon);

  res.status(200).json(createdPokemon);
});

module.exports = router;

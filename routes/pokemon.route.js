const express = require("express");
const router = express.Router();

const db = require("../db/models");
const { auth } = require("../middleware/auth");

router.post("/", async (req, res, next) => {
  try {
    const pokemon = req.body;

    const newPokemon = await db.Pokemon.create(pokemon);
    res.status(201).json(newPokemon);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const pokemons = await db.Pokemon.findAll();

    res.json(pokemons);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const pokemonId = req.params.id;
    const pokemon = await db.Pokemon.findByPk(pokemonId); // returns null if not found

    if (pokemon === null) res.sendStatus(404);

    res.json(pokemon);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/catch", auth, async (req, res, next) => {
  try {
    const pokemonId = req.params.id;
    const pokemon = await db.Pokemon.findByPk(pokemonId);

    if (pokemon === null) res.sendStatus(404);

    // find trainer via username in req.user
    const trainer = await db.Trainer.findOne({
      where: {
        username: req.user.username,
      },
    });

    // currently, trainer will always succeed in catching the Pokemon
    // TODO: add randomisation to determine if Trainer will be able to catch Pokemon. if false, pokemon's trainerId will remain unchanged.
    await pokemon.update({ trainerId: trainer.id });

    res.json(pokemon);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

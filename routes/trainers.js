const express = require("express");
const db = require("../models/index");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newTrainer = await db.Trainer.create(req.body);
    res.send(newTrainer);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

module.exports = router;

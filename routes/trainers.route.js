import express from "express";
import dbConnection from "../utils/db.js";

import InitTrainer from "../db/models/trainer.model.js";
let Trainer;

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const trainers = await Trainer.findAll();
    res.send(trainers);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.post("/", async (req, res) => {
  try {
    const newTrainer = await Trainer.create(req.body);
    res.send(newTrainer);
  } catch (err) {
    // TODO: proper error handling
    res.sendStatus(500);
  }
});

export default () => {
  return router;
};

export const mockTrainerModel = (mockModel) => {
  Trainer = mockModel;
};

export const initTrainerModel = async () => {
  Trainer = await InitTrainer(dbConnection);
};

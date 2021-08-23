const express = require("express");
const controller = require("../controller/trainers.controller");

const router = express.Router();

router.get("/", controller.getTrainers);

// router.post("/", async (req, res) => {
//   try {
//     const newTrainer = await Trainer.create(req.body);
//     res.send(newTrainer);
//   } catch (err) {
//     // TODO: proper error handling
//     res.sendStatus(500);
//   }
// });

module.exports = router;

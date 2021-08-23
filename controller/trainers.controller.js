const db = require("../db");

const getTrainers = async (req, res) => {
  try {
    const trainers = await db.Trainer.findAll();
    res.send(trainers);
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = {
  getTrainers,
};

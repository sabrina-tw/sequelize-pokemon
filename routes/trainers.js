const express = require("express");
const { protectRoute } = require("../middleware/protectRoute");
const db = require("../models/index");
const bcrypt = require("bcryptjs");
const createJWTToken = require("../config/jwt");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newTrainer = await db.Trainer.create(req.body);
    res.send(newTrainer);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:username", protectRoute, async (req, res, next) => {
  try {
    const username = req.params.username;
    const trainer = await db.Trainer.findOne({
      where: { username: { [db.Sequelize.Op.iLike]: "%" + username + "%" } },
    });
    res.send(trainer);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const trainer = await db.Trainer.findOne({
      where: { username: { [db.Sequelize.Op.iLike]: "%" + username + "%" } },
    });

    if (!trainer) {
      return res.status(422).json({ message: "Invalid username or password." });
    }

    const result = await bcrypt.compare(password, trainer.password);

    if (!result) {
      throw new Error("Login failed");
    }

    const token = createJWTToken(trainer.username);

    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = oneDay * 7;
    const expiryDate = new Date(Date.now() + oneWeek);

    // you are setting the cookie here, and the name of your cookie is `token`
    res.cookie("token", token, {
      expires: expiryDate,
      httpOnly: true, // client-side js cannot access cookie info
      secure: true, // use HTTPS
    });

    res.send("You are now logged in!");
  } catch (err) {
    if (err.message === "Login failed") {
      err.statusCode = 400;
    }
    next(err);
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token").send("You are now logged out!");
});

module.exports = router;

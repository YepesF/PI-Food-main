require("dotenv").config();
const express = require("express");
const router = express.Router();
const { Diet } = require("../db");

const firsDiets = [
  "Gluten Free",
  "Ketogenic",
  "Vegetarian",
  "Lacto-Vegetarian",
  "Ovo-Vegetarian",
  "Vegan",
  "Pescetarian",
  "Paleo",
  "Primal",
  "Low FODMAP",
  "Whole30",
];

router.get("/", async (req, res) => {
  try {
    firsDiets.forEach((diet) => {
      Diet.findOrCreate({
        where: { name: diet },
      });
    });
    const diets = await Diet.findAll();
    res.json(diets);
  } catch (error) {
    res.send(`Error durante la ejecucion por favor intente nuevamente`);
  }
});
module.exports = router;

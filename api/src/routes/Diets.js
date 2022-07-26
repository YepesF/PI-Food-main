require("dotenv").config();
const express = require("express");
const router = express.Router();
const { Diet } = require("../db");

router.get("/", async (req, res) => {
  try {
    const diets = await Diet.findAll();
    res.json(diets);
  } catch (error) {
    res.send(`Error durante la ejecucion por favor intente nuevamente`);
  }
});
module.exports = router;

require("dotenv").config();
const models = require("./models");
const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Recipe } = require("../db");
const { API_KEY } = process.env;
const ALL_RECIPES = `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`;

const respuestaAPI = require("../../../complexSearch.json");

router.get("/", async (req, res) => {
  const { name } = req.query;
  //Se almacenan todos los resultados de la API
  //   const resultApi = await axios
  //     .get(ALL_RECIPES)
  //     .then((response) => response.data.results);

  Recipe.create({ name: "Felipe", sumary: "1, 2, 3" });

  const recipes = respuestaAPI.results;

  let resultApi = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(name.toLocaleLowerCase())
  );

  console.log(resultApi);

  res.json("ok");
});

module.exports = router;

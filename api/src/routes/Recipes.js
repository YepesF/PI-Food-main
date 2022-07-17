require("dotenv").config();
const { Op } = require("sequelize");
const models = require("./models"); //TODO - Modularizar en un archivo todas las funciones.
const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Recipe } = require("../db");
const { API_KEY } = process.env;
const ALL_RECIPES = `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`;

const respuestaAPI = require("../../../complexSearch.json");

router.get("/", async (req, res) => {
  const { name } = req.query;

  // await Recipe.create({ title: "Tomato", sumary: "1, 2, 3" });
  // await Recipe.create({ title: "Tomato2", sumary: "1, 2, 3" });
  // await Recipe.create({ title: "Tomato3", sumary: "1, 2, 3" });
  // await Recipe.create({ title: "Tomato4", sumary: "1, 2, 3" });
  // await Recipe.create({ title: "Tomato5", sumary: "1, 2, 3" });

  try {
    if (name) {
      // const recipes = respuestaAPI.results;

      const recipes = await axios
        .get(ALL_RECIPES)
        .then((response) => response.data.results);

      const resultApi = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(name.toLowerCase())
      );

      const queryBD = await Recipe.findAll({
        where: {
          title: { [Op.iLike]: `%${name}%` },
        },
      });

      const resultBD = queryBD.map((recipe) => recipe.dataValues);

      const consolidate = [...resultApi, ...resultBD];

      if (!consolidate.length)
        return res
          .status(404)
          .send(
            `No puedimos encontrar ninguna receta que contenga el texto ${name}`
          );

      return res.json(consolidate);
    }

    res
      .status(400)
      .send(
        "Debe enviar el pametro 'name' con el nombre de la receta(Ej. ?name=tomato) para poder procesar su solicitud."
      );
  } catch (error) {
    res
      .status(400)
      .send(`Error durante la ejecucion por favor intente nuevamente`);
  }
});

router.get("/idReceta:", async (req, res) => {
  const { idReceta } = req.params;

  try {
    const recipes = respuestaAPI.results;

    console.log(recipes);
  } catch (error) {
    res
      .status(400)
      .send(`Error durante la ejecucion por favor intente nuevamente`);
  }
});

module.exports = router;

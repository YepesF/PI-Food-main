require("dotenv").config();
const { Op } = require("sequelize");
const models = require("./models"); //TODO - Modularizar en un archivo todas las funciones.
const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;
const ALL_RECIPES = `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`;

const respuestaAPI = require("../../../complexSearch.json"),
  respuestaID = require("../../../information.json");

router.get("/", async (req, res) => {
  const { name } = req.query;

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

      const resultBD = queryBD.map((recipe) => recipe.dataValues); //TODO - No esta mostrando la combinacion IDNAME.

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

router.get("/:idReceta", async (req, res) => {
  const { idReceta } = req.params;

  // [] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
  // [] Resumen del plato
  // [] Nivel de "comida saludable" (health score)
  // [] Paso a paso

  try {
    // let recipeAPI;
    let recipeAPI = respuestaID;

    // const recipeAPI = await axios
    //   .get(
    //     `https://api.spoonacular.com/recipes/${Number(
    //       idReceta
    //     )}/information?apiKey=${API_KEY}`
    //   )
    //   .then((response) => response.data);

    if (!recipeAPI) {
      var recipeBD = await Recipe.findByPk(Number(idReceta));

      if (!recipeBD)
        return res
          .status(404)
          .send(
            `No puedimos encontrar ninguna receta con el ID ${Number(idReceta)}`
          );
    }

    const {
      image,
      title,
      dishTypes,
      diets,
      summary,
      healthScore,
      analyzedInstructions,
    } = recipeAPI || recipeBD;

    res.json({
      image,
      title,
      dishTypes,
      diets,
      summary,
      healthScore,
      analyzedInstructions,
    });
  } catch (error) {
    res.status(400).send(error.message);
    // .send(`Error durante la ejecucion por favor intente nuevamente`);
  }
});

module.exports = router;

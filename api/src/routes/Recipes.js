require("dotenv").config();
const { Op } = require("sequelize");
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
        include: {
          model: Diet,
          attributes: ["name"],
          through: {
            attributes: [],
          },
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

router.get("/:idRecipe", async (req, res) => {
  const { idRecipe } = req.params;

  // [] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
  // [] Resumen del plato
  // [] Nivel de "comida saludable" (health score)
  // [] Paso a paso

  try {
    let recipeAPI, recipeBD;
    // let recipeAPI = respuestaID;
    if (Number(idRecipe)) {
      recipeAPI = await axios
        .get(
          `https://api.spoonacular.com/recipes/${Number(
            idRecipe
          )}/information?apiKey=${API_KEY}`
        )
        .then((response) => response.data);
    } else {
      recipeBD = await Recipe.findByPk(idRecipe, {
        include: {
          model: Diet,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });

      if (!recipeBD)
        return res
          .status(404)
          .send(`No puedimos encontrar ninguna receta con el ID ${idRecipe}`);
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
    // res.status(400).send(error.message);
    res.send(`Error durante la ejecucion por favor intente nuevamente`);
  }
});

router.post("/", async (req, res) => {
  // [ ] Un formulario controlado con JavaScript con los siguientes campos:
  // Nombre
  // Resumen del plato
  // Nivel de "comida saludable" (health score)
  // Paso a paso
  // [ ] Posibilidad de seleccionar/agregar uno o más tipos de dietas
  // [ ] Botón/Opción para crear una nueva receta
  const { title, summary, healthScore, analyzedInstructions, diets } = req.body;

  try {
    if (!title)
      return res.status(400).send("El nombre de la recetra es requerido.");
    if (!/^[\w][\w _]*$/.test(title))
      return res
        .status(400)
        .send(
          "El nombre de la recetra es invalido, recuerda no incluir simbolos, ni espacios al inicio del texto."
        );

    const findName = await Recipe.findOne({
      where: {
        title,
      },
    });
    if (findName)
      return res
        .status(400)
        .send(
          "La receta ya existe, por favor ingresar un nombre receta diferente."
        );

    if (!summary)
      return res.status(400).send("El resumen de la receta es requerido.");
    if (/^[ _]*$/.test(input.summary))
      return res
        .status(400)
        .send(
          "El resumen de la receta es invalido, no puede contener espacios al inicio del texto."
        );

    if (!/^[0-9]*$/.test(input.healthscore))
      return res
        .status(400)
        .send(
          "El nivel de comida saludable es invalido, solo se admiten numeros."
        );
    if (healthScore > 100 || healthScore < 0)
      return res
        .status(400)
        .send(
          "El nivel de comida saludable no puede ser mayor que 100 ni menor que 0."
        );

    const queryDiets = await Diet.findAll({ where: { name: diets } });

    const newRecipe = await Recipe.create({
      title,
      summary,
      healthScore,
      analyzedInstructions,
    });

    await newRecipe.addDiet(queryDiets);

    const recipe = await Recipe.findOne({
      where: {
        title,
      },
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    res.json(recipe);
  } catch (error) {
    res.send(`Error durante la ejecucion por favor intente nuevamente`);
  }
});

module.exports = router;

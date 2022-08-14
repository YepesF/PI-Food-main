const express = require("express");
const router = express.Router();

const {
  validationTitle,
  validationSummary,
  validationHealthScore,
  validationImage,
} = require("../controllers/validators");
const {
  createRecipe,
  getAllRecipesApi,
  findRecipeByNameBD,
  getAllRecipesBD,
  getRecipeApiById,
  getRecipeBDById,
  getAllRecipesBDbyName,
  getAllRecipesBDbyDiet,
  getAllRecipesApibyName,
  getAllRecipesApibyDiet,
} = require("../controllers/recipes");

router.get("/", async (req, res) => {
  const { name, diet } = req.query;

  try {
    if (name) {
      const recipesAPI = await getAllRecipesApibyName(name);
      const recipesBD = await getAllRecipesBDbyName(name.toLocaleLowerCase());

      const recipes = [...recipesAPI, ...recipesBD];

      if (!recipes.length)
        return res.status(404).json({
          msg: `No puedimos encontrar ninguna receta que contenga el texto ${name}`,
        });

      return res.json(recipes);
    }

    if (diet) {
      const recipesAPI = await getAllRecipesApibyDiet(diet.toLocaleLowerCase());
      const recipesBD = await getAllRecipesBDbyDiet(diet.toLocaleLowerCase());

      const recipes = [...recipesAPI, ...recipesBD];

      if (!recipes.length)
        return res.status(404).json({
          msg: `No puedimos encontrar ninguna receta que contenga la dieta ${diet}`,
        });

      return res.json(recipes);
    }
    const recipesAPI = await getAllRecipesApi();
    const recipesBD = await getAllRecipesBD();

    const recipes = [...recipesAPI, ...recipesBD];

    return res.json(recipes);
  } catch (error) {
    res.status(400).send(error.message);
    // res
    //   .status(400)
    //   .send(`Error durante la ejecucion por favor intente nuevamente`);
  }
});

router.get("/:idRecipe", async (req, res) => {
  const { idRecipe } = req.params;

  try {
    // const recipeAPI = await getRecipeApiById(Number(idRecipe)),
    //   recipeBD = await getRecipeBDById(Number(idRecipe));

    if (
      !/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        idRecipe
      )
    ) {
      var recipe = await getRecipeApiById(idRecipe);
    } else {
      var recipe = await getRecipeBDById(idRecipe);
    }

    if (!recipe)
      return res.status(404).send({
        msg: `No puedimos encontrar ninguna receta con el ID ${idRecipe}`,
      });

    const {
      image,
      title,
      dishTypes,
      diets,
      summary,
      healthScore,
      instructions,
    } = recipe;

    res.json({
      image,
      title,
      dishTypes,
      diets,
      summary,
      healthScore,
      instructions,
    });
  } catch (error) {
    res.status(400).send(error.message);
    // res.send(`Error durante la ejecucion por favor intente nuevamente`);
  }
});

router.post("/", async (req, res) => {
  const { title, summary, healthScore, instructions, image, diets } = req.body;
  try {
    console.log(validationImage(image));
    const error =
      validationTitle(title) ||
      (await findRecipeByNameBD(title)) ||
      validationSummary(summary) ||
      validationHealthScore(healthScore) ||
      validationImage(image);

    if (error) return res.status(400).send(error);

    res.json(
      await createRecipe({
        title,
        summary,
        healthScore,
        instructions,
        diets,
        image,
      })
    );
  } catch (error) {
    res.status(400).send(error.message);
    // res.status(400).send(`Error durante la ejecucion por favor intente nuevamente`);
  }
});

module.exports = router;

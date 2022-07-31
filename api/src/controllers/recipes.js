require("dotenv").config({ path: "../../.env" });
const axios = require("axios");
const { Op } = require("sequelize");
const { Recipe, Diet } = require("../db");
const { API_KEY1, API_KEY2 } = process.env;
const ALL_RECIPES = `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY2}`;

const findRecipeByNameBD = async (title) => {
  return (
    (await Recipe.findOne({
      where: {
        title,
      },
    })) && "La receta ya existe, por favor ingresar un nombre receta diferente."
  );
};

const createRecipe = async (recipe) => {
  let { title, summary, healthScore, instructions, diets, image, dishTypes } =
    recipe;

  diets = diets.map((diet) => diet.toLowerCase());

  try {
    const queryDiets = await Diet.findAll({
      where: { name: diets },
    });

    // Opcional para crear dietas.
    // const queryDiets = await Promise.all(
    //   diets.map(async (d) => {
    //     const [diet, create] = await Diet.findOrCreate({
    //       where: { name: d },
    //     });
    //     return diet;
    //   })
    // );

    const newRecipe = await Recipe.create({
      title,
      summary,
      healthScore,
      instructions,
      image,
      dishTypes,
    });

    await newRecipe.addDiet(queryDiets);

    return { msg: "La receta ha sido creada." };
  } catch (error) {
    return new Error(error.message);
  }
};

const getAllRecipesApi = () => {
  return axios
    .get(ALL_RECIPES)
    .then((response) => response.data.results)
    .catch((err) => err.response.data.message);
};

const getAllRecipesBD = async () => {
  const queryBD = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  return queryBD.map((recipe) => {
    return {
      ...recipe.dataValues,
      diets: recipe.diets.map((diet) => diet.name),
    };
  });
};

const getAllRecipesBDbyName = async (value) => {
  const queryBD = await Recipe.findAll({
    where: {
      title: { [Op.iLike]: `%${value}%` },
    },
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  return queryBD.map((recipe) => {
    return {
      ...recipe.dataValues,
      diets: recipe.diets.map((diet) => diet.name),
    };
  });
};

const getAllRecipesBDbyDiet = async (diet) => {
  const queryBD = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
      where: {
        name: { [Op.iLike]: `%${diet}%` },
      },
    },
  });

  return queryBD.map((recipe) => {
    return {
      ...recipe.dataValues,
      diets: recipe.diets.map((diet) => diet.name),
    };
  });
};

const getRecipeApiById = (id) => {
  return axios
    .get(
      `https://api.spoonacular.com/recipes/${Number(
        id
      )}/information?apiKey=${API_KEY2}`
    )
    .then((response) => response.data)
    .catch((err) => null);
};

const getRecipeBDById = async (id) => {
  const queryBD = await Recipe.findByPk(id, {
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const mapDiets = queryBD.diets.map((diet) => diet.name);

  return { ...queryBD.dataValues, diets: mapDiets };
};

//==========================================================

// (async () => {
//   console.log(await getRecipeById(100000000000));
// })();

//==========================================================

module.exports = {
  findRecipeByNameBD,
  createRecipe,
  getAllRecipesApi,
  getAllRecipesBD,
  getAllRecipesBDbyName,
  getAllRecipesBDbyDiet,
  getRecipeApiById,
  getRecipeBDById,
};

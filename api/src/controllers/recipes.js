require("dotenv").config({ path: "../../.env" });
const axios = require("axios");
const { Op } = require("sequelize");
const { Recipe, Diet } = require("../db");
const {
  API_KEY1,
  API_KEY2,
  API_KEY3,
  API_KEY4,
  API_KEY5,
  API_KEY6,
  API_KEY7,
  API_KEY8,
  API_KEY9,
  API_KEY10,
} = process.env;
const ALL_RECIPES = `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY1}`;

const findRecipeByNameBD = async (title) => {
  try {
    return (
      (await Recipe.findOne({
        where: {
          title,
        },
      })) && {
        msg: "La receta ya existe, por favor ingresar un nombre receta diferente.",
      }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const createRecipe = async (recipe) => {
  let { title, summary, healthScore, instructions, diets, image } = recipe;

  if (diets.length > 1) {
    diets = diets.map((diet) => diet.toLowerCase());
  }

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
    });

    await newRecipe.addDiet(queryDiets);

    return { msg: "La receta ha sido creada." };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllRecipesApi = () => {
  try {
    return axios
      .get(ALL_RECIPES)
      .then((response) => response.data.results)
      .catch((err) => err.response.data.message);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllRecipesBD = async () => {
  try {
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
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllRecipesApibyName = async (name) => {
  try {
    const recipesAPI = await getAllRecipesApi();
    return recipesAPI.filter((recipe) => {
      return recipe.title.toLowerCase().includes(name.toLowerCase());
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllRecipesBDbyName = async (name) => {
  try {
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

    return queryBD.map((recipe) => {
      return {
        ...recipe.dataValues,
        diets: recipe.diets.map((diet) => diet.name),
      };
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllRecipesApibyDiet = async (diet) => {
  try {
    const recipesAPI = await getAllRecipesApi();
    return recipesAPI.filter((recipe) => {
      return recipe.diets.includes(diet.toLowerCase());
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllRecipesBDbyDiet = async (diet) => {
  try {
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
  } catch (error) {
    throw new Error(error.message);
  }
};

const getRecipeApiById = (id) => {
  try {
    return axios
      .get(
        `https://api.spoonacular.com/recipes/${Number(
          id
        )}/information?apiKey=${API_KEY1}`
      )
      .then((response) => response.data)
      .catch((err) => null);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getRecipeBDById = async (id) => {
  try {
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
  } catch (error) {
    throw new Error(error.message);
  }
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
  getAllRecipesApibyName,
  getAllRecipesApibyDiet,
};

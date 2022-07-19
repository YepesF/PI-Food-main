//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const server = require("./src/app.js");
const { conn, Recipe, Diet } = require("./src/db.js");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    //Precarga Recipes
    const recipeTomato = await Recipe.create({
      title: "Tomato",
      summary: "1, 2, 3",
      healthScore: 76,
      analyzedInstructions: [
        {
          name: "",
          steps: [
            {
              number: 1,
              step: "Remove the cauliflower's",
              ingredients: [],
              equipment: [],
            },
          ],
        },
      ],
      image: "https://spoonacular.com/recipeImages/716426-556x370.jpg",
      dishTypes: ["side dish"],
    });

    //Precarga Diets
    await Promise.all([
      Diet.create({ name: "Gluten Free" }),
      Diet.create({ name: "Ketogenic" }),
      Diet.create({ name: "Vegetarian" }),
      Diet.create({ name: "Lacto-Vegetarian" }),
      Diet.create({ name: "Ovo-Vegetarian" }),
      Diet.create({ name: "Vegan" }),
      Diet.create({ name: "Pescetarian" }),
      Diet.create({ name: "Paleo" }),
      Diet.create({ name: "Primal" }),
      Diet.create({ name: "Low FODMAP" }),
      Diet.create({ name: "Whole30" }),
      recipeTomato.setDiets([1, 2, 3]),
      recipeTomato.addDiets([4, 5]),
    ]);

    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});

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
    //Precarga Diets
    await Diet.create({ name: "Gluten Free" });
    await Diet.create({ name: "Ketogenic" });
    await Diet.create({ name: "Vegetarian" });
    await Diet.create({ name: "Lacto-Vegetarian" });
    await Diet.create({ name: "Ovo-Vegetarian" });
    await Diet.create({ name: "Vegan" });
    await Diet.create({ name: "Pescetarian" });
    await Diet.create({ name: "Paleo" });
    await Diet.create({ name: "Primal" });
    await Diet.create({ name: "Low FODMAP" });
    await Diet.create({ name: "Whole30" });

    //Precarga Recipes
    await Recipe.create({
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
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});

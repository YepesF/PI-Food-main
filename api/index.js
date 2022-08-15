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

const firtsDiets = [
  "Gluten Free",
  "Ketogenic",
  "Vegetarian",
  "Lacto Vegetarian",
  "Ovo Vegetarian",
  "Vegan",
  "Pescetarian",
  "Paleo",
  "Primal",
  "Low FODMAP",
  "Whole 30",
];

// Syncing all the models at once.
conn.sync({ alter: true }).then(() => {
  server.listen(3001, async () => {
    firtsDiets.forEach((diet) => {
      Diet.findOrCreate({
        where: { name: diet.toLocaleLowerCase() },
      });
    });

    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});

/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Recipe, conn } = require("../../src/db.js");

const agent = session(app);
const recipe = {
  title: "Milanea a la napolitana2",
  summary: "1234",
};
const recipe2 = {
  title: "Tomato",
  summary: "1234",
  diets: [],
};
const badRecipe = {
  title: "",
  summary: "1234",
  diets: [],
};

let id;

xdescribe("Recipe routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Recipe.sync({ force: true })
      .then(() => Recipe.create(recipe))
      .then((r) => (id = r.id))
  );

  describe("GET /recipes", () => {
    it("should get 200", () => agent.get("/recipes").expect(200));
  });
  describe("GET /recipes with query", () => {
    it("should get 200 if title exist", () =>
      agent.get(`/recipes?name=${recipe.title}`).expect(200));
    it("should get 404 if name does not exist", () =>
      agent.get(`/recipes?name=felipe`).expect(404));
    it("should get 200 if diet exist", () =>
      agent.get(`/recipes?diet=vegan`).expect(200));
    it("should get 404 if diet does not exist", () =>
      agent.get(`/recipes?diet=felipe`).expect(404));
  });
  describe("GET /recipes/idRecipe", () => {
    it("should get 200 if recipe exist in API", () =>
      agent.get("/recipes/157344").expect(200));
    it("should get 200 if recipe exist in local data base", () =>
      agent.get(`/recipes/${id}`).expect(200));
    it(`should get 400 if recipe does nos exist in API or BD`, () =>
      agent.get("/recipes/BA258").expect(404));
  });
  describe("POST /recipes", () => {
    it("should get 200 if recipe is create", async () =>
      await agent.post("/recipes").send(recipe2).expect(200));
    it("should get 400 if recipe is not create", async () => {
      await agent.post("/recipes").send(badRecipe).expect(400);
    });
  });
});

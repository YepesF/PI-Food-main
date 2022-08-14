const { Recipe, conn } = require("../../src/db.js");
const { expect, should } = require("chai");

const name = "Felipe";

describe("Recipe model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  xdescribe("Validators", () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe("Title", () => {
      it("should throw an error if title is null", (done) => {
        Recipe.create({ summary: "123" })
          .then(() => done(new Error("It requires a valid title")))
          .catch(() => done());
      });
      it("should work when its a valid title", (done) => {
        Recipe.create({ title: "Milanesa a la napolitana", summary: "123" })
          .then(() => done())
          .catch(() => done(new Error("It requires a invalid title")));
      });
    });
    describe("Summary", () => {
      it("should throw an error if summary is null", (done) => {
        Recipe.create({ title: "Milanesa a la napolitana" })
          .then(() => done(new Error("It requires a valid summary")))
          .catch(() => done());
      });
      it("should work when its a valid summary", (done) => {
        Recipe.create({ title: "Milanesa a la napolitana", summary: "123" })
          .then(() => done())
          .catch(() => done(new Error("It requires a invalid summary")));
      });
    });
    describe("Health Score", () => {
      it("should throw an error if health score isn't number", (done) => {
        Recipe.create({
          title: "Milanesa a la napolitana",
          summary: "123",
          healthScore: "123",
        })
          .then(() => done(new Error("It requires a valid health score")))
          .catch(() => done());
      });
      it("should work when its a valid health score", (done) => {
        Recipe.create({
          title: "Milanesa a la napolitana",
          summary: "123",
          healthScore: 12,
        })
          .then(() => done())
          .catch(() => done(new Error("It requires a invalid health score")));
      });
      it("should throw an error if health score is less than 0", (done) => {
        Recipe.create({
          title: "Milanesa a la napolitana",
          summary: "123",
          healthScore: -1,
        })
          .then(() => done(new Error("It requires a valid health score")))
          .catch(() => done());
      });
      it("should throw an error if health score is greater than 100", (done) => {
        Recipe.create({
          title: "Milanesa a la napolitana",
          summary: "123",
          healthScore: 101,
        })
          .then(() => done(new Error("It requires a valid health score")))
          .catch(() => done());
      });
    });
  });
});

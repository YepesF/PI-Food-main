const express = require("express");
const router = express.Router();
const { Diet } = require("../db");

router.get("/", async (req, res) => {
  try {
    const diets = await Diet.findAll();
    res.json(diets);
  } catch (error) {
    res.send(error.message);
    // res.send(`Error durante la ejecucion por favor intente nuevamente`);
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const [diet, created] = await Diet.findOrCreate({
      where: { name: name.toLocaleLowerCase() },
    });

    created
      ? res.json({ msg: `La dieta ${name.toUpperCase()} ha sido creada` })
      : res.json({ msg: `La dieta ${name.toUpperCase()} ya existe` });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/", async (req, res) => {
  const { id, newName } = req.body;

  try {
    const diet = await Diet.findByPk(id);
    if (diet) {
      await diet.update({ name: newName });
      await diet.save();
      return res.send({ msg: "La dieta ha sido actualizada." });
    }

    res.send({ msg: `No se pudo encontrar la dieta con el el ID: ${id}` });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:idDiet", async (req, res) => {
  const { idDiet } = req.params;
  try {
    const diet = await Diet.findByPk(idDiet);
    if (diet) {
      await diet.destroy();
      return res.send({ msg: "La dieta ha sido eliminada." });
    }
    res.send({ msg: `No se pudo encontrar la dieta con el el ID: ${idDiet}` });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

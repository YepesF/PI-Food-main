import React from "react";
import { useState } from "react";

export default function CreateRecipe() {
  let [input, setInput] = useState({
    title: "",
    summary: "",
    steps: "",
    diets: [],
  });

  const handleChange = (event) => {
    event.preventDefault();
    setInput((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleChangeDiets = (event) => {
    // event.preventDefault();
    event.target.checked
      ? setInput((prev) => ({
          ...prev,
          diets: [...input.diets, event.target.value],
        }))
      : setInput((prev) => ({
          ...prev,
          diets: input.diets.filter((e) => e !== event.target.value),
        }));
  };

  const handledSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h1>Crear Receta</h1>
      <form onSubmit={handledSubmit}>
        <div>
          <label>Titulo</label>
          <input
            type={"text"}
            name={"title"}
            value={input.title}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <br />

        <div>
          <label>Resumen del plato</label>
          <input
            type={"text"}
            name={"summary"}
            value={input.summary}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <br />

        <div>
          <label>Paso a paso</label>
          <input
            type={"text"}
            name={"steps"}
            value={input.steps}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <br />

        <div>
          <input
            type="checkbox"
            name={"gluten free"}
            value={"gluten free"}
            onChange={(e) => handleChangeDiets(e)}
          />
          <label>Gluten Free</label>

          <input
            type="checkbox"
            name={"ketogenic"}
            value={"ketogenic"}
            onChange={(e) => handleChangeDiets(e)}
          />
          <label>Ketogenic</label>

          <input
            type="checkbox"
            name={"vegetarian"}
            value={"vegetarian"}
            onChange={(e) => handleChangeDiets(e)}
          />
          <label>Vegetarian</label>

          <input
            type="checkbox"
            name={"lacto-vegetarian"}
            value={"lacto-vegetarian"}
            onChange={(e) => handleChangeDiets(e)}
          />
          <label>Lacto-Vegetarian</label>

          <input
            type="checkbox"
            name={"ovo-vegetarian"}
            value={"ovo-vegetarian"}
            onChange={(e) => handleChangeDiets(e)}
          />
          <label>Ovo-Vegetarian</label>

          <input
            type="checkbox"
            name={"vegan"}
            value={"vegan"}
            onChange={(e) => handleChangeDiets(e)}
          />
          <label>Vegan</label>

          <input
            type="checkbox"
            name={"pescetarian"}
            value={"pescetarian"}
            onChange={(e) => handleChangeDiets(e)}
          />
          <label>Pescetarian</label>

          <input
            type="checkbox"
            name={"paleo"}
            value={"paleo"}
            onChange={(e) => handleChangeDiets(e)}
          />
          <label>Paleo</label>

          <input
            type="checkbox"
            name={"primal"}
            value={"primal"}
            onChange={(e) => handleChangeDiets(e)}
          />
          <label>Primal</label>

          <input
            type="checkbox"
            name={"low fodmap"}
            value={"low fodmap"}
            onChange={(e) => handleChangeDiets(e)}
          />
          <label>Low FODMAP</label>

          <input
            type="checkbox"
            name={"whole30"}
            value={"whole30"}
            onChange={(e) => handleChangeDiets(e)}
          />
          <label>Whole30</label>
        </div>

        <br />

        <div>
          <input type={"submit"} value={"Crear Receta"} id="" />
        </div>
      </form>
    </div>
  );
}

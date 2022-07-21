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
    event.preventDefault();
    console.log(event);
  };

  return (
    <div>
      <h1>Crear Receta</h1>
      <form>
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
          <input type="checkbox" />
          <label>Ketogenic</label>
          <input type="checkbox" />
          <label>Vegetarian</label>
          <input type="checkbox" />
          <label>Lacto-Vegetarian</label>
          <input type="checkbox" />
          <label>Ovo-Vegetarian</label>
          <input type="checkbox" />
          <label>Vegan</label>
          <input type="checkbox" />
          <label>Pescetarian</label>
          <input type="checkbox" />
          <label>Paleo</label>
          <input type="checkbox" />
          <label>Primal</label>
          <input type="checkbox" />
          <label>Low FODMAP</label>
          <input type="checkbox" />
          <label>Whole30</label>
        </div>

        <br />

        <div>
          <input type="submit" name="Crear Receta" id="" />
        </div>
      </form>
    </div>
  );
}

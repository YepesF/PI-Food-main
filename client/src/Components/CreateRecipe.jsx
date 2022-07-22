import React from "react";
import { useState } from "react";

export function validate(input) {
  let error = {};
  if (!input.title) {
    error.title = "El nombre de la recetra es requerido.";
  } else if (!/^[\w][\w _]*$/.test(input.title)) {
    error.title =
      "El nombre de la recetra es invalido, recuerda no incluir simbolos, ni espacios al inicio del texto.";
  }

  if (!input.summary) {
    error.summary = "El resumen de la receta es requerido.";
  } else if (/^[ _]*$/.test(input.summary)) {
    error.summary =
      "El resumen de la receta es invalido, no puede contener espacios al inicio del texto.";
  }

  if (!/^[0-9]*$/.test(input.healthscore)) {
    error.healthscore =
      "El nivel de comida saludable es invalido, solo se admiten numeros.";
  } else if (input.healthscore > 100 || input.healthscore < 0) {
    error.healthscore =
      "El nivel de comida saludable no puede ser mayor que 100 ni menor que 0.";
  }

  return error;
}

export default function CreateRecipe() {
  let [input, setInput] = useState({
    title: "",
    summary: "",
    healthscore: 0,
    steps: "",
    diets: [],
  });

  let [error, setError] = useState({});

  const handleChange = (event) => {
    event.preventDefault();
    setInput((prev) => ({ ...prev, [event.target.name]: event.target.value }));

    let objError = validate({
      ...input,
      [event.target.name]: event.target.value,
    });
    setError(objError);
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
          {error.title && <p>{error.title}</p>}
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
          {error.summary && <p>{error.summary}</p>}
        </div>

        <br />

        <div>
          <label>Nivel de Comida Saludable</label>
          <input
            type={"text"}
            name={"healthscore"}
            value={input.healthscore}
            onChange={(e) => handleChange(e)}
          />
          {error.healthscore && <p>{error.healthscore}</p>}
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
          {error.steps && <p>{error.steps}</p>}
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
          {error.title ||
          error.summary ||
          error.healthscore ||
          !input.title ||
          !input.summary ? null : (
            <input type={"submit"} value={"Crear Receta"} id="" />
          )}
        </div>
      </form>
    </div>
  );
}

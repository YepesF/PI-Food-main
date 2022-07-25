import React from "react";
import { useState } from "react";
import { createRecipe } from "../actions";
import { useDispatch } from "react-redux";

export function validate(recipe) {
  let error = {};
  if (!recipe.title) {
    error.title = "El nombre de la recetra es requerido.";
  } else if (!/^[\w][\w _]*$/.test(recipe.title)) {
    error.title =
      "El nombre de la recetra es invalido, recuerda no incluir simbolos, ni espacios al inicio del texto.";
  }

  if (!recipe.summary) {
    error.summary = "El resumen de la receta es requerido.";
  } else if (/^[ _]*$/.test(recipe.summary)) {
    error.summary =
      "El resumen de la receta es invalido, no puede contener espacios al inicio del texto.";
  }

  if (!/^[0-9]*$/.test(recipe.healthscore)) {
    error.healthscore =
      "El nivel de comida saludable es invalido, solo se admiten numeros.";
  } else if (recipe.healthscore > 100 || recipe.healthscore < 0) {
    error.healthscore =
      "El nivel de comida saludable no puede ser mayor que 100 ni menor que 0.";
  }

  if(!/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(recipe.image)) {error.image = "La URL de la imagen es invalida.";}

  return error;
}

export default function CreateRecipe() {
  let [recipe, setRecipe] = useState({
    title: "",
    summary: "",
    healthscore: 0,
    instructions: "",
    image: "",
    diets: [],
  });

  let [checked, setChecked] = useState({
    glutenfree: false,
    ketogenic: false,
    vegetarian: false,
    lactovegetarian: false,
    ovovegetarian: false,
    vegan: false,
    pescetarian: false,
    paleo: false,
    primal: false,
    lowfodmap: false,
    whole30: false,
  });

  let [error, setError] = useState({});

  const handleChange = (event) => {
    event.preventDefault();
    setRecipe((prev) => ({ ...prev, [event.target.name]: event.target.value }));

    let objError = validate({
      ...recipe,
      [event.target.name]: event.target.value,
    });
    setError(objError);
  };

  const handleChangeDiets = (event) => {
    // event.preventDefault();
    console.log(event.target.name);
    if (event.target.checked) {
      setRecipe((prev) => ({
        ...prev,
        diets: [...recipe.diets, event.target.value],
      }));
      setChecked((prev) => ({ ...prev, [event.target.name]: true }));
    } else {
      setRecipe((prev) => ({
        ...prev,
        diets: recipe.diets.filter((e) => e !== event.target.value),
      }));
      setChecked((prev) => ({ ...prev, [event.target.name]: false }));
    }
  };

  let dispatch = useDispatch();

  const handledSubmit = (event) => {
    event.preventDefault();
    dispatch(createRecipe(recipe));

    setRecipe({
      title: "",
      summary: "",
      healthscore: 0,
      instructions: "",
      diets: [],
    });

    setChecked({
      glutenfree: false,
      ketogenic: false,
      vegetarian: false,
      lactovegetarian: false,
      ovovegetarian: false,
      vegan: false,
      pescetarian: false,
      paleo: false,
      primal: false,
      lowfodmap: false,
      whole30: false,
    });
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
            value={recipe.title}
            onChange={(e) => handleChange(e)}
            onFocus={(e) => (e.target.placeholder = "Example: Lasagna")}
            autoFocus
          />
          {error.title && <p>{error.title}</p>}
        </div>

        <br />

        <div>
          <label>Resumen del plato</label>
          <input
            type={"text"}
            name={"summary"}
            value={recipe.summary}
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
            value={recipe.healthscore}
            onChange={(e) => handleChange(e)}
          />
          {error.healthscore && <p>{error.healthscore}</p>}
        </div>

        <br />

        <div>
          <label>Paso a paso</label>
          <input
            type={"text"}
            name={"instructions"}
            value={recipe.instructions}
            onChange={(e) => handleChange(e)}
          />
          {error.instructions && <p>{error.instructions}</p>}
        </div>

          <br />

          <div>
            <label>Imagen</label>
            <input
              type={"text"}
              name={"image"}
              value={recipe.image}
              onChange={(e) => handleChange(e)}
            />
            {error.image && <p>{error.image}</p>}
          </div>

        <br />

        <div>
          <input
            type="checkbox"
            name={"glutenfree"}
            value={"Gluten Free"}
            checked={checked.glutenfree}
            onChange={(e) => handleChangeDiets(e)}
          />
          <label>Gluten Free</label>

          <input
            type="checkbox"
            name={"ketogenic"}
            value={"Ketogenic"}
            checked={checked.ketogenic}
            onChange={(e) => handleChangeDiets(e)}
          />
          <label>Ketogenic</label>

          <input
            type="checkbox"
            name={"vegetarian"}
            value={"Vegetarian"}
            checked={checked.vegetarian}
            onChange={(e) => handleChangeDiets(e)}
          />
          <label>Vegetarian</label>

          <input
            type="checkbox"
            name={"lactovegetarian"}
            value={"Lacto Vegetarian"}
            checked={checked.lactovegetarian}
            onChange={(e) => handleChangeDiets(e)}
          />
          <label>Lacto-Vegetarian</label>

          <input
            type="checkbox"
            name={"ovovegetarian"}
            value={"Ovo Vegetarian"}
            checked={checked.ovovegetarian}
            onChange={(e) => handleChangeDiets(e)}
          />
          <label>Ovo-Vegetarian</label>

          <input
            type="checkbox"
            name={"vegan"}
            value={"Vegan"}
            checked={checked.vegan}
            onChange={(e) => handleChangeDiets(e)}
          />
          <label>Vegan</label>

          <input
            type="checkbox"
            name={"pescetarian"}
            value={"Pescetarian"}
            checked={checked.pescetarian}
            onChange={(e) => handleChangeDiets(e)}
          />
          <label>Pescetarian</label>

          <input
            type="checkbox"
            name={"paleo"}
            value={"Paleo"}
            checked={checked.paleo}
            onChange={(e) => handleChangeDiets(e)}
          />
          <label>Paleo</label>

          <input
            type="checkbox"
            name={"primal"}
            value={"Primal"}
            checked={checked.primal}
            onChange={(e) => handleChangeDiets(e)}
          />
          <label>Primal</label>

          <input
            type="checkbox"
            name={"lowfodmap"}
            value={"Low FODMAP"}
            checked={checked.lowfodmap}
            onChange={(e) => handleChangeDiets(e)}
          />
          <label>Low FODMAP</label>

          <input
            type="checkbox"
            name={"whole30"}
            value={"Whole30"}
            checked={checked.whole30}
            onChange={(e) => handleChangeDiets(e)}
          />
          <label>Whole30</label>
        </div>

        <br />

        <div>
          {error.title ||
          error.summary ||
          error.healthscore ||
          !recipe.title ||
          !recipe.summary ? null : (
            <input type={"submit"} value={"Crear Receta"} id="" />
          )}
        </div>
      </form>
    </div>
  );
}

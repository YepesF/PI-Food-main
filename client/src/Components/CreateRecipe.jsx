import React from "react";
import { useState } from "react";
import { createRecipe } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { firtsDiets } from "./Home";

import style from "./CreateRecipe.module.css";

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

  if (!/^[0-9]*$/.test(recipe.healthScore)) {
    error.healthScore =
      "El nivel de comida saludable es invalido, solo se admiten numeros.";
  } else if (recipe.healthScore > 100 || recipe.healthScore < 0) {
    error.healthScore =
      "El nivel de comida saludable no puede ser mayor que 100 ni menor que 0.";
  }

  if (
    //eslint-disable-next-line no-useless-escape
    !/^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)+$/.test(
      recipe.image
    )
  ) {
    error.image = "La URL de la imagen es invalida.";
  }

  return error;
}

export default function CreateRecipe() {
  const msg = useSelector((state) => state.msg),
    dispatch = useDispatch();

  const [recipe, setRecipe] = useState({
    title: "",
    summary: "",
    healthScore: "",
    instructions: "",
    image: "",
    diets: [],
  });

  const [checked, setChecked] = useState({
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

  const [error, setError] = useState({});

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
    if (event.target.checked) {
      setRecipe((prev) => ({
        ...prev,
        diets: [...prev.diets, event.target.value],
      }));
      setChecked((prev) => ({ ...prev, [event.target.name]: true }));
    } else {
      setRecipe((prev) => ({
        ...prev,
        diets: prev.diets.filter((e) => e !== event.target.value),
      }));
      setChecked((prev) => ({ ...prev, [event.target.name]: false }));
    }
  };

  const handledSubmit = (event) => {
    event.preventDefault();
    dispatch(createRecipe(recipe));

    setRecipe({
      title: "",
      summary: "",
      healthScore: 0,
      instructions: "",
      image: "",
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

    setError({});
  };

  return (
    <div className={style.content}>
      {msg.length > 0 && (
        <div class="alert">
          <span
            class="closebtn"
            onclick="this.parentElement.style.display='none';"
          >
            &times;
          </span>
          <strong>{msg}</strong>
        </div>
      )}

      <h2>
        Crear <span>Receta</span>
      </h2>
      <form className={style.form} onSubmit={handledSubmit}>
        <div className={style.firstData}>
          <div>
            <input
              className={error.title ? style.danger : style.cell}
              type={"text"}
              name={"title"}
              value={recipe.title}
              onChange={(e) => handleChange(e)}
              placeholder={"Nombre de la receta"}
            />
            {error.title && <p>{error.title}</p>}
          </div>

          <div>
            <input
              className={error.summary ? style.danger : style.cell}
              type={"text"}
              name={"summary"}
              value={recipe.summary}
              onChange={(e) => handleChange(e)}
              placeholder={"Resumen de la receta"}
            />
            {error.summary && <p>{error.summary}</p>}
          </div>

          <div>
            <input
              className={error.healthScore ? style.danger : style.cell}
              type={"text"}
              name={"healthScore"}
              value={recipe.healthScore}
              onChange={(e) => handleChange(e)}
              placeholder={"Nivel de comida saludable"}
            />
            {error.healthScore && <p>{error.healthScore}</p>}
          </div>

          <div>
            <input
              className={error.instructions ? style.danger : style.cell}
              type={"text"}
              name={"instructions"}
              value={recipe.instructions}
              onChange={(e) => handleChange(e)}
              placeholder={"Paso a paso de la receta"}
            />
            {error.instructions && <p>{error.instructions}</p>}
          </div>

          <div>
            <input
              className={error.image ? style.danger : style.cell}
              type={"text"}
              name={"image"}
              value={recipe.image}
              onChange={(e) => handleChange(e)}
              placeholder={"URL de la imagen"}
            />
            {error.image && <p>{error.image}</p>}
          </div>
        </div>

        <div className={style.diets}>
          {firtsDiets.map((diet, current) => (
            <div key={`CB${current}`}>
              <input
                id={`CB${current}`}
                type={"checkbox"}
                name={diet.value} //glutenfree
                value={diet.name.toLocaleLowerCase()} //gluten free
                checked={checked[diet.value]}
                onChange={(e) => handleChangeDiets(e)}
              />
              <label className={style.diet} for={`CB${current}`}>
                {diet.name}
              </label>
            </div>
          ))}
        </div>

        <div>
          {error.title ||
          error.summary ||
          error.healthscore ||
          !recipe.title ||
          !recipe.summary ? null : (
            <input type={"submit"} value={"Crear Receta"} />
          )}
        </div>
      </form>
    </div>
  );
}

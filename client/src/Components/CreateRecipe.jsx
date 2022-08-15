import React, { useEffect, useState } from "react";
import { createRecipe, clearMSG, getDiets } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { title, summary, healthScore, image } from "../controllers/validators";

import style from "./CreateRecipe.module.css";

export default function CreateRecipe() {
  const msg = useSelector((state) => state.msg),
    diets = useSelector((state) => state.diets),
    dispatch = useDispatch();

  const [recipe, setRecipe] = useState({
    title: "",
    summary: "",
    healthScore: null,
    instructions: "",
    image: "",
    diets: [],
  });

  const [checked, setChecked] = useState({});

  const [error, setError] = useState({});

  const handleChange = (event) => {
    let objError = {};

    event.preventDefault();

    setRecipe((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

    if (event.target.name === "title") {
      objError = title({
        ...recipe,
        [event.target.name]: event.target.value,
      });
    }

    if (event.target.name === "summary") {
      objError = summary({
        ...recipe,
        [event.target.name]: event.target.value,
      });
    }

    if (event.target.name === "healthScore") {
      objError = healthScore({
        ...recipe,
        [event.target.name]: event.target.value,
      });
    }

    if (event.target.name === "image") {
      objError = image({
        ...recipe,
        [event.target.name]: event.target.value,
      });
    }

    setError(objError);
  };

  const handleChangeDiets = (event) => {
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

  const handledSubmit = async (event) => {
    event.preventDefault();

    if (!error.healthScore && !error.title && !error.summary && !error.image) {
      dispatch(createRecipe(recipe));

      setRecipe({
        title: "",
        summary: "",
        healthScore: null,
        instructions: "",
        image: "",
        diets: [],
      });

      setChecked({});

      setError({});

      //Limpia todo los inputs
      event.target.reset();
      //Desactiva el focus en los inputs
      document.activeElement.blur();
    }
  };

  const hide = (e) => {
    e.preventDefault();
    dispatch(clearMSG());
  };

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div className={style.content}>
      <h2>
        Crear <span>Receta</span>
      </h2>
      <form className={style.form} onSubmit={handledSubmit}>
        {msg && (
          <div id="15" className={style.overlay}>
            <div className={style.popup}>
              <div className={style.content2}>{msg}</div>
              <button onClick={(e) => hide(e)}>{"Aceptar"}</button>
            </div>
          </div>
        )}

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
          {diets.map((diet) => (
            <div key={diet.id}>
              <input
                id={diet.id}
                type={"checkbox"}
                name={diet.name}
                value={diet.name}
                checked={checked[diet.name]}
                onChange={(e) => handleChangeDiets(e)}
              />
              <label className={style.diet} htmlFor={diet.id}>
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
            <input
              className={style.btn}
              type={"submit"}
              value={"Crear Receta"}
            />
          )}
        </div>
      </form>
    </div>
  );
}

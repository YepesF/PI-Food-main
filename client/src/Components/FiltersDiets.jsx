import React, { useState } from "react";
import { filterDiet, defaultRecepes } from "../actions";
import { useDispatch } from "react-redux";
import { firtsDiets } from "./Home";

import style from "./FilterDiets.module.css";

export default function FiltersDiets({ paginate }) {
  const dispatch = useDispatch();

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

  const handledChange = (event, nameDiet) => {
    // event.preventDefault();
    paginate(1);
    setChecked(() => {
      return {
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
        [event.target.value]: true,
      };
    });

    dispatch(filterDiet(nameDiet.toLowerCase()));
  };

  const clearFilters = (event) => {
    event.preventDefault();
    dispatch(defaultRecepes());
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
    <div className={style.content}>
      <div className={style.flexButton}>
        <button className={style.btn} onClick={clearFilters}>
          {"Limpiar Filtros"}
        </button>
      </div>

      {firtsDiets.map((diet, current) => {
        return (
          <div className={style.radio} key={`DT${current}`}>
            <input
              id={diet.value}
              type="radio"
              name="diets"
              value={diet.value}
              onChange={(e) => handledChange(e, diet.name)}
              checked={checked[diet.value]}
            />
            <label for={diet.value}>{diet.name}</label>
          </div>
        );
      })}
    </div>
  );
}

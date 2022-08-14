import React, { useState } from "react";
import { filterDiet, defaultRecepes } from "../actions";
import { useDispatch } from "react-redux";
import { firtsDiets } from "./Home";

import style from "./FiltersDiets.module.css";

export default function FiltersDiets({ checked, checkedDiet, paginate }) {
  const dispatch = useDispatch();

  // const [checked, setChecked] = useState({});

  const handledChange = (event, nameDiet) => {
    // event.preventDefault();
    paginate(1);

    // setChecked({ [event.target.value]: event.target.checked });
    checkedDiet({ [event.target.value]: event.target.checked });

    dispatch(filterDiet(nameDiet.toLowerCase()));
  };

  const clearFilters = (event) => {
    event.preventDefault();
    dispatch(defaultRecepes());
    // setChecked({});
    checkedDiet({});
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

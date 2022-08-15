import React from "react";
import { filterDiet, defaultRecepes, getDiets } from "../actions";
import { useDispatch, useSelector } from "react-redux";

import style from "./FiltersDiets.module.css";
import { useEffect } from "react";

export default function FiltersDiets({
  checked,
  checkedDiet,
  selectedFilter,
  paginate,
}) {
  const diets = useSelector((state) => state.diets),
    dispatch = useDispatch();

  const handledChange = (event, nameDiet) => {
    // event.preventDefault();
    paginate(1);
    selectedFilter("");
    checkedDiet({ [event.target.value]: event.target.checked });
    dispatch(filterDiet(nameDiet.toLowerCase()));
  };

  const clearFilters = (event) => {
    event.preventDefault();
    dispatch(defaultRecepes());
    selectedFilter("");
    checkedDiet({});
  };

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div className={style.content}>
      <div className={style.flexButton}>
        <button className={style.btn} onClick={clearFilters}>
          {"Limpiar Filtros"}
        </button>
      </div>

      {diets.map((diet) => {
        return (
          <div className={style.radio} key={diet.id}>
            <input
              id={diet.id}
              type="radio"
              name="diets"
              value={diet.name}
              onChange={(e) => handledChange(e, diet.name)}
              checked={checked[diet.name]}
            />
            <label htmlFor={diet.id}>{diet.name}</label>
          </div>
        );
      })}
    </div>
  );
}

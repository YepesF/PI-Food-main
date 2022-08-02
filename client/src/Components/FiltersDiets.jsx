import React, { useState } from "react";
import { filterDiet, defaultRecepes } from "../actions";
import { useDispatch } from "react-redux";

export const firtsDiets = [
  { name: "Gluten Free", value: "glutenfree" },
  { name: "Ketogenic", value: "ketogenic" },
  { name: "Vegetarian", value: "vegetarian" },
  { name: "Lacto Vegetarian", value: "lactovegetarian" },
  { name: "Ovo Vegetarian", value: "ovovegetarian" },
  { name: "Vegan", value: "vegan" },
  { name: "Pescetarian", value: "pescetarian" },
  { name: "Paleo", value: "paleo" },
  { name: "Primal", value: "primal" },
  { name: "Low FODMAP", value: "Low FODMAP" },
  { name: "Whole30", value: "whole30" },
];

export default function FiltersDiets() {
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
    <div>
      {firtsDiets.map((diet, current) => {
        return (
          <div>
            <input
              key={`DT${current}`}
              type="radio"
              name="diets"
              value={diet.value}
              onChange={(e) => handledChange(e, diet.name)}
              checked={checked[diet.value]}
            />
            <label>{diet.name}</label>
          </div>
        );
      })}
      <button onClick={clearFilters}>{"Limpiar Filtros"}</button>
    </div>
  );
}

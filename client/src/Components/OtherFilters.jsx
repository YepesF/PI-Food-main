import React from "react";
import { othersFilters } from "../actions";
import { useDispatch, useSelector } from "react-redux";

import style from "./OtherFilters.module.css";

const otherFilters = [
  { name: "Ascendente", value: "asc" },
  { name: "Descendente", value: "desc" },
  { name: "Health Score Max.", value: "max" },
  { name: "Health Score Min.", value: "min" },
];

export default function OtherFilters({ selected, selectedFilter }) {
  const recipes = useSelector((state) => state.results),
    dispatch = useDispatch();

  const handledChange = (event) => {
    event.preventDefault();
    if (event.target.value === "asc") {
      selectedFilter(event.target.value);
      const results = [...recipes].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      dispatch(othersFilters(results));
    }
    if (event.target.value === "desc") {
      selectedFilter(event.target.value);
      const results = [...recipes].sort((a, b) =>
        b.title.localeCompare(a.title)
      );
      dispatch(othersFilters(results));
    }
    if (event.target.value === "max") {
      selectedFilter(event.target.value);
      const results = [...recipes].sort(
        (a, b) => b.healthScore - a.healthScore
      );
      dispatch(othersFilters(results));
    }
    if (event.target.value === "min") {
      selectedFilter(event.target.value);
      const results = [...recipes].sort(
        (a, b) => a.healthScore - b.healthScore
      );
      dispatch(othersFilters([...results]));
    }
  };

  return (
    <div className={style.select}>
      <select
        className={style.filters}
        name="sortBy"
        value={selected}
        onChange={(e) => handledChange(e)}
      >
        <option defaultValue={""} hidden>
          Ordenar por
        </option>
        {otherFilters.map((filter, current) => (
          <option key={`FT${current}`} value={filter.value}>
            {filter.name}
          </option>
        ))}
      </select>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../actions";
import FiltersDiets from "./FiltersDiets";
import OtherFilters from "./OtherFilters";

export const firtsDiets = [
  { name: "glutenfree", value: "Gluten Free" },
  { name: "ketogenic", value: "Ketogenic" },
  { name: "vegetarian", value: "Vegetarian" },
  { name: "lactovegetarian", value: "Lacto Vegetarian" },
  { name: "ovovegetarian", value: "Ovo Vegetarian" },
  { name: "vegan", value: "Vegan" },
  { name: "pescetarian", value: "Pescetarian" },
  { name: "paleo", value: "Paleo" },
  { name: "primal", value: "Primal" },
  { name: "lowfodmap", value: "Low FODMAP" },
  { name: "whole30", value: "Whole30" },
];

export default function Home(props) {
  let results = useSelector((state) => state.results),
    dispatch = useDispatch(); //Obtengo informacion del estado global.

  let [filter, setFilter] = useState(""),
    [pagination, setPagination] = useState(1);

  const handleChangeFilters = (event) => {
    event.preventDefault();
    if (event.target.value === "asc") {
      results.sort((a, b) => a.title.localeCompare(b.title));
      setFilter(event.target.value);
    }
    if (event.target.value === "desc") {
      results.sort((a, b) => b.title.localeCompare(a.title));
      setFilter(event.target.value);
    }
    if (event.target.value === "max") {
      results.sort((a, b) => b.healthScore - a.healthScore);
      setFilter(event.target.value);
    }
    if (event.target.value === "min") {
      results.sort((a, b) => a.healthScore - b.healthScore);
      setFilter(event.target.value);
    }
    if (event.target.value === "most") {
      dispatch(getRecipes());
      document.getElementsByName("diet").forEach((element) => {
        element.checked = false;
      });
    }
  };

  const startIndex = (pagination - 1) * 9,
    endIndex = pagination * 9,
    totalPage = results.length / 9;

  const handleChangePage = (event) => {
    // event.preventDefault();
    if (event.target.value === "next") {
      setPagination(pagination + 1);
    }
    if (event.target.value === "previous") {
      setPagination(pagination - 1);
    }
  };

  useEffect(() => {
    //Obtener la informacion una vez cargue la pagina y traiaga la informacion necesaria.
    dispatch(getRecipes());
  }, [dispatch]);

  return (
    <div>
      <h1>Home</h1>
      <SearchBar />

      <h1>Recetas</h1>
      <div>
        {results.msg ? (
          <p>{results.msg}</p>
        ) : (
          results
            .slice(startIndex, endIndex)
            .map((recipe) => (
              <Recipe
                key={recipe.id}
                id={recipe.id}
                image={recipe.image}
                title={recipe.title}
                diets={recipe.diets}
                healthScore={recipe.healthScore}
              />
            ))
        )}
      </div>

      <h2>Dietas</h2>
      <FiltersDiets />

      <h2>Filtros</h2>
      <OtherFilters />

      <h2>Paginacion</h2>
      <h3>Pagina {pagination}</h3>
      {pagination > 1 && (
        <button onClick={(e) => handleChangePage(e)} value={"previous"}>
          {"< Anterior"}
        </button>
      )}
      {pagination < totalPage && (
        <button onClick={(e) => handleChangePage(e)} value={"next"}>
          {"Siguiente >"}
        </button>
      )}
    </div>
  );
}

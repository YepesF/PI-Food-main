import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../actions";
import FiltersDiets from "./FiltersDiets";
import OtherFilters from "./OtherFilters";
import Pagination from "./Pagination";

import style from "./Home.module.css";

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

export default function Home(props) {
  const results = useSelector((state) => state.results),
    dispatch = useDispatch(); //Obtengo informacion del estado global.

  const [currentPage, setCurrentPage] = useState(1),
    [recipesPerPage] = useState(9);

  const lastRecipe = currentPage * recipesPerPage,
    firstRecipe = lastRecipe - recipesPerPage,
    paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    //Obtener la informacion una vez cargue la pagina y traiaga la informacion necesaria.
    dispatch(getRecipes());
  }, [dispatch]);

  return (
    <div>
      <SearchBar />

      <div className={style.content}>
        <div className={style.filterDiets}>
          <FiltersDiets paginate={paginate} />
        </div>
        <div className={style.recipesFilters}>
          <div className={style.others}>
            <span>Ordenar Por:</span>
            <OtherFilters />
          </div>
          <section className={style.recipes}>
            {results.msg ? (
              <p>{results.msg}</p>
            ) : (
              results
                .slice(firstRecipe, lastRecipe)
                .map((recipe) => (
                  <Recipe
                    key={`R${recipe.id}`}
                    id={recipe.id}
                    image={recipe.image}
                    title={recipe.title}
                    diets={recipe.diets}
                    healthScore={recipe.healthScore}
                  />
                ))
            )}
          </section>
        </div>
      </div>
      <div>
        <Pagination
          recipesPerPage={recipesPerPage}
          totalRecipes={results.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

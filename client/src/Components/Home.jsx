import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../actions";
import FiltersDiets from "./FiltersDiets";
import OtherFilters from "./OtherFilters";
import Pagination from "./Pagination";

import style from "./Home.module.css";

export default function Home(props) {
  const results = useSelector((state) => state.results),
    dispatch = useDispatch(); //Obtengo informacion del estado global.

  const [currentPage, setCurrentPage] = useState(1),
    [recipesPerPage] = useState(9),
    [checked, setChecked] = useState({}),
    [selected, setSelected] = useState(""),
    [loading, setLoading] = useState(true);

  const lastRecipe = currentPage * recipesPerPage,
    firstRecipe = lastRecipe - recipesPerPage,
    paginate = (pageNumber) => setCurrentPage(pageNumber),
    checkedDiet = (dietState) => setChecked(dietState),
    selectedFilter = (filter) => setSelected(filter);

  useEffect(() => {
    //Obtener la informacion una vez cargue la pagina y traiaga la informacion necesaria.
    dispatch(getRecipes());
  }, [dispatch]);

  return (
    <div>
      <SearchBar
        checkedDiet={checkedDiet}
        selectedFilter={selectedFilter}
        paginate={paginate}
      />

      <div className={style.content}>
        <div className={style.filterDiets}>
          <FiltersDiets
            checked={checked}
            checkedDiet={checkedDiet}
            selectedFilter={selectedFilter}
            paginate={paginate}
          />
        </div>
        <div className={style.recipesFilters}>
          <div className={style.others}>
            <span>Ordenar Por:</span>
            <OtherFilters selected={selected} selectedFilter={selectedFilter} />
          </div>
          <section className={style.recipes}>
            {results.msg ? (
              <p className={style.error}>{results.msg}</p>
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

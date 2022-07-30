import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, getRecipesName, filterDiet } from "../actions";

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
  let recipes = useSelector((state) => state.recipes),
    dispatch = useDispatch(); //Obtengo informacion del estado global.

  // let [checked, setChecked] = useState({
  //   glutenfree: false,
  //   ketogenic: false,
  //   vegetarian: false,
  //   lactovegetarian: false,
  //   ovovegetarian: false,
  //   vegan: false,
  //   pescetarian: false,
  //   paleo: false,
  //   primal: false,
  //   lowfodmap: false,
  //   whole30: false,
  // });

  let [search, setSearch] = useState(""),
    [filter, setFilter] = useState(""),
    [pagination, setPagination] = useState(1);

  const handleChange = (event) => {
    event.preventDefault();
    setPagination(1);
    document.getElementsByName("diet").forEach((element) => {
      element.checked = false;
    });

    document.getElementsByTagName("select")[0].value = "most";
    setSearch(event.target.value);

    dispatch(getRecipesName(event.target.value));

    // clearFilters();
  };

  const handleChangeDiets = (event) => {
    // setFilter(event.target.value);
    setPagination(1);
    dispatch(filterDiet(event.target.value));
  };

  const clearFilters = () => {
    document.getElementsByName("diet").forEach((element) => {
      element.checked = false;
    });
    setPagination(1);
    // dispatch(getRecipes());
  };

  const handleChangeFilters = (event) => {
    event.preventDefault();
    if (event.target.value === "asc") {
      recipes.sort((a, b) => a.title.localeCompare(b.title));
      setFilter(event.target.value);
    }
    if (event.target.value === "desc") {
      recipes.sort((a, b) => b.title.localeCompare(a.title));
      setFilter(event.target.value);
    }
    if (event.target.value === "max") {
      recipes.sort((a, b) => b.healthScore - a.healthScore);
      setFilter(event.target.value);
    }
    if (event.target.value === "min") {
      recipes.sort((a, b) => a.healthScore - b.healthScore);
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
    totalPage = recipes.length / 9;

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
      <input
        type="text"
        placeholder="Ingrese la receta a buscar"
        name={"search"}
        value={search}
        onChange={(e) => handleChange(e)}
      />
      <br />
      <hr />
      <br />
      <h1>Recetas</h1>
      <div>
        {recipes.msg ? (
          <p>{recipes.msg}</p>
        ) : (
          recipes
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

      <br />
      <hr />
      <br />
      <h2>Dietas</h2>

      {firtsDiets.map((diet, current) => (
        <div key={`D${current}`}>
          <input
            type="radio"
            name="diet"
            value={diet.value.toLocaleLowerCase()}
            onChange={(e) => handleChangeDiets(e)}
          />
          <label>{diet.value}</label>
        </div>
      ))}
      <button onClick={clearFilters}>Limpiar Filtros</button>

      <br />
      <hr />
      <br />
      <h2>Filtros</h2>
      <select name="sortBy" onChange={(e) => handleChangeFilters(e)}>
        <option value={"most"}>Mas Relevantes</option>
        <option value={"asc"}>Alfabetico Ascendente</option>
        <option value={"desc"}>Alfabetico Descendente</option>
        <option value={"max"}>Health Score Max.</option>
        <option value={"min"}>Health Score Min.</option>
      </select>
      <br />
      <hr />
      <br />
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

// function mapStateToProps(state) {
//   return {
//     recipes: state.recipes,
//   };
// }

// export default connect(mapStateToProps)(Home);

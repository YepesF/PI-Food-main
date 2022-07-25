import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, getRecipesName } from "../actions";

export default function Home(props) {
  const firtsDiets = [
    { name: "glutenfree", value: "Gluten Free" },
    { name: "ketogenic", value: "Ketogenic" },
    { name: "vegetarian", value: "Vegetarian" },
    { name: "lactovegetarian", value: "Lacto-Vegetarian" },
    { name: "ovovegetarian", value: "Ovo-Vegetarian" },
    { name: "vegan", value: "Vegan" },
    { name: "pescetarian", value: "Pescetarian" },
    { name: "paleo", value: "Paleo" },
    { name: "primal", value: "Primal" },
    { name: "lowfodmap", value: "Low-FODMAP" },
    { name: "whole30", value: "Whole30" },
  ];

  let [checked, setChecked] = useState({
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

  let [search, setSearch] = React.useState("");

  let dispatch = useDispatch();

  let recipes = useSelector((state) => state.recipes); //Obtengo informacion del estado global.

  const handleChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
    dispatch(getRecipesName(event.target.value));
  };

  const handleChangeDiets = (event) => {
    // event.preventDefault();
    console.log(event.target);
    if (event.target.checked) {
      setChecked((prev) => ({ ...prev, [event.target.name]: true }));
      const filter = recipes.filter((recipe) =>
        recipe.diets.includes(event.target.name)
      );
      console.log(filter);
    } else {
      setChecked((prev) => ({ ...prev, [event.target.name]: false }));
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
          recipes.map((recipe) => (
            <Recipe
              key={recipe.id}
              id={recipe.id}
              image={recipe.image}
              title={recipe.title}
              vegetarian={recipe.vegetarian}
              vegan={recipe.vegan}
              glutenFree={recipe.glutenFree}
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
            type="checkbox"
            name={diet.name}
            value={diet.value}
            checked={checked[diet.name]}
            onChange={(e) => handleChangeDiets(e)}
          />
          <label>{diet.value}</label>
        </div>
      ))}

      <br />
      <hr />
      <br />
      <h2>Filtros</h2>
      <select name="sortBy">
        <option value={"asc"}>Alfabetico Ascendente</option>
        <option value={"desc"}>Alfabetico Descendente</option>
        <option value={"max"}>Health Score Max.</option>
        <option value={"min"}>Health Score Min.</option>
      </select>
      <br />
      <hr />
      <br />
      <h2>Paginacion</h2>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>10</button>
      <button>11</button>
    </div>
  );
}

// function mapStateToProps(state) {
//   return {
//     recipes: state.recipes,
//   };
// }

// export default connect(mapStateToProps)(Home);
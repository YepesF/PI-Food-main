import React from "react";
import { connect } from "react-redux";
import Recipe from "./Recipe";

export function Home({ recipes }) {
  // const firsDiets = [
  //     "Gluten Free",
  //     "Ketogenic",
  //     "Vegetarian",
  //     "Lacto-Vegetarian",
  //     "Ovo-Vegetarian",
  //     "Vegan",
  //     "Pescetarian",
  //     "Paleo",
  //     "Primal",
  //     "Low FODMAP",
  //     "Whole30",
  //   ];

  return (
    <div>
      <h1>Home</h1>
      <input type="text" placeholder="Ingrese la receta a buscar" />
      <button>Buscar</button>
      <br />
      <hr />
      <br />
      <h1>Recetas</h1>
      <div>
        {recipes &&
          recipes.map((recipe) => (
            <div>
              <Recipe
                key={recipe.id}
                image={recipe.image}
                title={recipe.title}
                typediet={recipe.typediet}
              />
            </div>
          ))}
      </div>

      <br />
      <hr />
      <br />
      <h2>Filtros Dietas</h2>
      <button>Gluten Free</button>
      <button>Ketogenic</button>
      <button>Vegetarian</button>
      <button>Lacto-Vegetarian</button>
      <button>Ovo-Vegetarian</button>
      <button>Vegan</button>
      <button>Pescetarian</button>
      <button>Paleo</button>
      <button>Primal</button>
      <button>Low FODMAP</button>
      <button>Whole30</button>
      <br />
      <hr />
      <br />
      <h2>Filtros Alfabetico/Health Score</h2>
      <button>Alfabetico Acendente</button>
      <button>Alfabetico Descendente</button>
      <button>Health Score Max.</button>
      <button>Health Score Min.</button>
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

function mapStateToProps(state) {
  return {
    recipes: state.recipes,
  };
}

export default connect(mapStateToProps)(Home);

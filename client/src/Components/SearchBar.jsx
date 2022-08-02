import React, { useState } from "react";
import { getRecipesName, defaultRecepes } from "../actions";
import { useDispatch } from "react-redux";

export default function SearchBar() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const handledChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
    if (event.target.value.length === 0) dispatch(defaultRecepes());
  };

  const searchRecipes = (event) => {
    event.preventDefault();
    dispatch(getRecipesName(search));
  };

  return (
    <form onSubmit={searchRecipes}>
      <input
        type="text"
        placeholder="Ingrese la receta a buscar"
        name={"search"}
        value={search}
        onChange={(e) => handledChange(e)}
      />
      <input type="submit" value={"Buscar Recetas"} />
    </form>
  );
}

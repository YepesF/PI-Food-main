import React, { useState } from "react";
import { getRecipesName, defaultRecepes } from "../actions";
import { useDispatch } from "react-redux";

import style from "./SearchBar.module.css";

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
        className={style.search}
        type="text"
        placeholder="Filet Mignon"
        name={"search"}
        value={search}
        onChange={(e) => handledChange(e)}
      />
      <input className={style.btn} type="submit" value="" />
    </form>
  );
}
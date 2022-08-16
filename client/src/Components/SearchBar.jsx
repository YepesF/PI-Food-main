import React, { useState } from "react";
import { getRecipesName, defaultRecepes } from "../actions";
import { useDispatch } from "react-redux";

import style from "./SearchBar.module.css";

export default function SearchBar({ checkedDiet, selectedFilter, paginate }) {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const handledChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
    event.target.value.length === 0 && dispatch(defaultRecepes());
  };

  const searchRecipes = (event) => {
    event.preventDefault();
    if (search) {
      dispatch(getRecipesName(search));
      checkedDiet({});
      paginate(1);
      setSearch("");
      selectedFilter("");
      document.activeElement.blur();
    }
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

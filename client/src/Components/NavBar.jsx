import React from "react";
import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";

export default function NavBar() {
  return (
    <nav>
      <h2 className={style.logo}>
        Henry<span>Food</span>
      </h2>
      <ul className={style.options}>
        <li>
          <NavLink to={"/recipes"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/recipes/create"}>Crear Receta</NavLink>
        </li>
      </ul>
    </nav>
  );
}
